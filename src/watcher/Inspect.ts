import { DockerContainerSummary } from './interfaces';
import { getDockerContainerLogs, getDockerContainersList } from './Containers';
import {
	getDatabase,
	getLastStateForContainer,
	upsertContainer,
} from '../database';
import { Database } from 'sqlite3';
import { StatusMessage } from '../broadcaster';
import { getEnv } from '../helpers';

/**
 * Returns containers that were not exited
 */
async function filterRecentlyExitedContainers(
	db: Database,
	exitedContainers: DockerContainerSummary[]
): Promise<DockerContainerSummary[]> {
	const recentlyExitedContainers: DockerContainerSummary[] = [];
	for (const container of exitedContainers) {
		// Check from database if the container was already exited
		const lastState = await getLastStateForContainer(db, container.id);
		if (lastState && lastState !== 'exited') {
			recentlyExitedContainers.push(container);
		}
	}
	return recentlyExitedContainers;
}

/**
 * Upserts containers in the database
 */
async function updateContainersInDatabase(
	db: Database,
	containers: DockerContainerSummary[]
): Promise<void> {
	for (const container of containers) {
		await upsertContainer(db, container);
	}
}

/**
 * Create StatusMessage for a container summary
 */
async function createStatusMessageForContainer(
	container: DockerContainerSummary
): Promise<StatusMessage> {
	// Get amount of lines to fetch from environment variable
	const lines = Number(getEnv('LOGS_LENGTH', '10'));
	// Get logs from the container
	const logs = await getDockerContainerLogs(container.id, lines);

	return {
		message: `Container ${container.name} (image: ${container.image}). State is ${container.state} (${container.status})`,
		type: container.status.includes('Exited (0)') ? 'stopped' : 'failure',
		logs,
	};
}

/**
 * This methods fetch containers, update the local database and return a list of message to send
 */
export async function inspectContainers(): Promise<StatusMessage[]> {
	const db = await getDatabase();
	const containers = await getDockerContainersList();

	// Find exited containers
	const exitedContainers = containers.filter(
		(container) => container.state === 'exited'
	);

	// Find recently exited containers
	const recentlyExitedContainers = await filterRecentlyExitedContainers(
		db,
		exitedContainers
	);

	// Store containers in sqlite
	await updateContainersInDatabase(db, containers);

	// Create status messages for recently exited containers
	const statusMessages: StatusMessage[] = [];
	for (const container of recentlyExitedContainers) {
		statusMessages.push(await createStatusMessageForContainer(container));
	}

	return statusMessages;
}
