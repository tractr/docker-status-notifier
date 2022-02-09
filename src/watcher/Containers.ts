import { getEnv } from '../helpers';
import * as http from 'http';
import { DockerContainer, DockerContainerSummary } from './interfaces';

/**
 * Get the docker socket path.
 */
function getDockerSocketPath(): string {
	const dockerSocketPath = getEnv('DOCKER_SOCKET', '/var/run/docker.sock');
	if (!dockerSocketPath) {
		throw new Error('DOCKER_SOCKET environment variable is not set');
	}
	return dockerSocketPath;
}

/**
 * Generic function to get http response
 */
async function makeHttpRequest(options: http.RequestOptions) {
	return new Promise<string>((resolve, reject) => {
		const callback = (res: http.IncomingMessage) => {
			const chunks: Buffer[] = [];
			res.setEncoding('utf8');
			res.on('data', (data) => {
				chunks.push(data);
			});
			res.on('error', (data) => {
				reject(data);
			});
			res.on('end', () => resolve(chunks.join('')));
		};

		const request = http.request(options, callback);
		request.on('error', reject);
		request.end();
	});
}

/**
 * Get list of containers using docker socket and http client
 */
async function getRawDockerContainersList(): Promise<DockerContainer[]> {
	const options: http.RequestOptions = {
		socketPath: getDockerSocketPath(),
		path: '/containers/json?all=1',
	};

	const json = await makeHttpRequest(options);
	return JSON.parse(json) as DockerContainer[];
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
export async function getDockerContainerLogs(
	containerId: string,
	lines: number
): Promise<string> {
	const options: http.RequestOptions = {
		socketPath: getDockerSocketPath(),
		path: `/containers/${containerId}/logs?stdout=1&stderr=1&tail=${lines}`,
	};

	return await makeHttpRequest(options);
}
