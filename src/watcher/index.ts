import { getEnv, log, logError, logWarning } from '../helpers';
import { inspectContainers } from './Inspect';
import { getBroadcaster, StatusMessage } from '../broadcaster';

/**
 * Declares the watcher interval
 */
let watcherInterval: NodeJS.Timer | undefined;

/**
 * Inspects the containers and handle errors
 */
async function getMessagesToSendIfAny(): Promise<StatusMessage[]> {
	try {
		return await inspectContainers();
	} catch (error) {
		logWarning(
			`Error during container inspection: ${(error as Error).toString()}`
		);
		logError(error as Error);
		// Return an empty array in case of error
		return [] as StatusMessage[];
	}
}

/**
 * Start the interval
 */
export function startWatcher() {
	if (watcherInterval) {
		logWarning('Watcher already started');
		return;
	}
	log('Start watcher');
	const intervalTime = 1000 * Number(getEnv('CHECK_INTERVAL', '30'));
	const broadcaster = getBroadcaster();
	watcherInterval = setInterval(async () => {
		try {
			const messages = await getMessagesToSendIfAny();
			for (const message of messages) {
				await broadcaster.send(message);
			}
		} catch (error) {
			logError(error as Error);
		}
	}, intervalTime);
}
/**
 * Stop the interval
 */
export function stopWatcher() {
	if (watcherInterval) {
		log('Stop watcher');
		clearInterval(watcherInterval);
		watcherInterval = undefined;
	}
}
