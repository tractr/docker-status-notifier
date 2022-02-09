import { StatusMessage, StatusMessageHandler } from '../interfaces';
import { SlackOAuthClient } from 'messaging-api-slack';
import { logError, logWarning } from '../../helpers';

export class Slack implements StatusMessageHandler {
	/**
	 * Slack client
	 */
	private readonly client: SlackOAuthClient;

	constructor(
		private readonly token: string,
		private readonly channel: string
	) {
		this.client = new SlackOAuthClient({
			accessToken: token,
		});
	}

	async send(message: StatusMessage): Promise<void> {
		this.client
			.callMethod('chat.postMessage', {
				channel: this.channel,
				text: message,
			})
			.catch((error) => {
				logWarning(`Cannot send message to Slack: ${error.toString()}`);
				logError(error);
			});
	}
}
