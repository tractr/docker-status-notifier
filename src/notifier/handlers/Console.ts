import { StatusMessage, StatusMessageHandler } from '../interfaces';
import { log, logInfo } from '../../helpers';

export class Console implements StatusMessageHandler {
	async send(message: StatusMessage): Promise<void> {
		log(message.message);
		if (message.log) logInfo(message.log);
	}
}
