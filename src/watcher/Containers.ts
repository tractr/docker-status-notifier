import { getEnv } from '../helpers';
import { DockerContainer, DockerContainerSummary } from './interfaces';
import Axios from 'axios';

/**
 * Get the docker socket path.
 */
export function getDockerSocketPath(): string {
	const dockerSocketPath = getEnv('DOCKER_SOCKET', '/var/run/docker.sock');
	if (!dockerSocketPath) {
		throw new Error('DOCKER_SOCKET environment variable is not set');
	}
	return dockerSocketPath;
}

/**
 * Call the docker API using the given path.
 */
export async function callDockerApi<T>(path: string): Promise<T> {
	const response = await Axios.get<T>(path, {
		socketPath: getDockerSocketPath(),
	});
	if (response.status < 200 || response.status >= 300) {
		throw new Error(
			`Docker API call failed: ${response.status} ${response.statusText}`
		);
	}
	return response.data;
}

/**
 * Get list of containers using docker socket and http client
 */
export function getRawDockerContainersList(): Promise<DockerContainer[]> {
	return callDockerApi('/containers/json?all=1');
}

/**
 * Get simplified list of docker containers
 */
export async function getDockerContainersList(): Promise<
	DockerContainerSummary[]
> {
	const rawContainers = await getRawDockerContainersList();
	return rawContainers.map((container) => {
		return {
			id: container.Id,
			name: container.Names[0].replace(/^\//, ''),
			image: container.Image,
			state: container.State,
			status: container.Status,
		};
	});
}

/**
 * Get the N last lines of logs for the given container
 */
export function getDockerContainerLogs(
	containerId: string,
	tail: number
): Promise<string> {
	return callDockerApi(
		`/containers/${containerId}/logs?stdout=1&stderr=1&tail=${tail}`
	);
}
