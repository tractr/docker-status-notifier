import {
	getDockerContainerLogs,
	getDockerContainersList,
	getDockerSocketPath,
	getRawDockerContainersList,
} from './Containers';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('getDockerSocketPath', () => {
	afterEach(() => {
		delete process.env.DOCKER_SOCKET;
	});
	it('should return the default path', () => {
		const result = getDockerSocketPath();
		expect(result).toEqual('/var/run/docker.sock');
	});
	it('should return the path from the environment', () => {
		process.env.DOCKER_SOCKET = '/tmp/docker.sock';
		const result = getDockerSocketPath();
		expect(result).toEqual('/tmp/docker.sock');
	});
});

describe('Axios based functions', () => {
	let mock: MockAdapter;
	beforeAll(() => {
		mock = new MockAdapter(Axios);
	});
	afterEach(() => {
		mock.reset();
	});
	describe('getRawDockerContainersList', () => {
		const path = '/containers/json?all=1';
		it('should call docker api', async () => {
			// Mock response
			const containers = [
				{
					Names: ['/test-container'],
					Id: 'test-container-id',
					Image: 'test-image',
					State: 'running',
				},
			];
			mock.onGet(path).reply(200, containers);

			const result = await getRawDockerContainersList();
			expect(mock.history.get[0].url).toEqual(path);
			expect(result).toEqual(containers);
		});
		it('should throw on authentication error', async () => {
			mock.onGet(path).reply(401);
			await expect(getRawDockerContainersList()).rejects.toBeInstanceOf(
				Error
			);
		});
		it('should throw on network error', async () => {
			mock.onGet(path).networkErrorOnce();
			await expect(getRawDockerContainersList()).rejects.toBeInstanceOf(
				Error
			);
		});
	});
	describe('getDockerContainersList', () => {
		const path = '/containers/json?all=1';
		it('should call docker api', async () => {
			// Mock response
			mock.onGet(path).reply(200, [
				{
					Names: ['/test-container'],
					Id: 'test-container-id',
					Image: 'test-image',
					State: 'running',
					Status: 'Created 2 minutes ago',
					Ports: [],
					Command: 'echo 1',
				},
			]);

			const result = await getDockerContainersList();
			expect(mock.history.get[0].url).toEqual(path);
			expect(result).toEqual([
				{
					id: 'test-container-id',
					name: 'test-container',
					image: 'test-image',
					state: 'running',
					status: 'Created 2 minutes ago',
				},
			]);
		});
		it('should throw on authentication error', async () => {
			mock.onGet(path).reply(401);
			await expect(getDockerContainersList()).rejects.toBeInstanceOf(
				Error
			);
		});
		it('should throw on network error', async () => {
			mock.onGet(path).networkErrorOnce();
			await expect(getDockerContainersList()).rejects.toBeInstanceOf(
				Error
			);
		});
	});

	describe('getDockerContainerLogs', () => {
		const containerId = 'test-container-id';
		const tail = 10;
		const path = `/containers/${containerId}/logs?stdout=1&stderr=1&tail=${tail}`;
		it('should call docker api', async () => {
			// Mock response
			const response = 'logs lines....';
			mock.onGet(path).reply(200, response);

			const result = await getDockerContainerLogs(containerId, tail);
			expect(mock.history.get[0].url).toEqual(path);
			expect(result).toEqual(response);
		});
		it('should throw on authentication error', async () => {
			mock.onGet(path).reply(401);
			await expect(
				getDockerContainerLogs(containerId, tail)
			).rejects.toBeInstanceOf(Error);
		});
		it('should throw on network error', async () => {
			mock.onGet(path).networkErrorOnce();
			await expect(
				getDockerContainerLogs(containerId, tail)
			).rejects.toBeInstanceOf(Error);
		});
	});
});
