import { StatusMessage, StatusMessageHandler } from '../interfaces';
import { log, logInfo, separator } from '../../helpers';

export class Console implements StatusMessageHandler {
	async send(message: StatusMessage): Promise<void> {
		separator();
		log(message.message);
		if (message.logs) logInfo(message.logs);
	}
}
