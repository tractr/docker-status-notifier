import { get } from './Sqlite';
import { DockerContainerSummary, DockerState } from '../watcher/interfaces';
import { Database } from 'sqlite3';

/**
 * Returns only state for the given container
 */
export async function getLastStateForContainer(
	db: Database,
	containerId: string
): Promise<DockerState | undefined> {
	const containerSummary = await get<DockerContainerSummary>(
		db,
		`SELECT state FROM containers WHERE id = ?`,
		[containerId]
	);
	return containerSummary?.state;
}

/**
 * Returns the full container summary for the given container
 */
export async function getContainerSummary(
	db: Database,
	containerId: string
): Promise<DockerContainerSummary | undefined> {
	return await get<DockerContainerSummary>(
		db,
		`SELECT * FROM containers WHERE id = ?`,
		[containerId]
	);
}

/**
 * Inserts a new container into the database
 */
export async function insertContainer(
	db: Database,
	containerSummary: DockerContainerSummary
): Promise<void> {
	await db.run(
		`INSERT INTO containers (id, name, image, state, status) VALUES (?, ?, ?, ?, ?)`,
		[
			containerSummary.id,
			containerSummary.name,
			containerSummary.image,
			containerSummary.state,
			containerSummary.status,
		]
	);
}

/**
 * Updates the state of a container
 */
export async function updateContainerState(
	db: Database,
	containerId: string,
	state: DockerState
): Promise<void> {
	await db.run(`UPDATE containers SET state = ? WHERE id = ?`, [
		state,
		containerId,
	]);
}

/**
 * Upserts a container into the database
 */
export async function upsertContainer(
	db: Database,
	containerSummary: DockerContainerSummary
): Promise<void> {
	await db.run(
		`INSERT OR REPLACE INTO containers (id, name, image, state, status) VALUES (?, ?, ?, ?, ?)`,
		[
			containerSummary.id,
			containerSummary.name,
			containerSummary.image,
			containerSummary.state,
			containerSummary.status,
		]
	);
}
