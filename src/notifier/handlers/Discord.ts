import { StatusMessage, StatusMessageHandler } from '../interfaces';
import Axios, { AxiosInstance } from 'axios';
import { logError, logWarning } from '../../helpers';

export class Discord implements StatusMessageHandler {
	/**
	 * The Discord API client.
	 */
	private readonly client: AxiosInstance;
	/**
	 * Timeout for requests to Discord.
	 */
	private readonly clientTimeout = 5000;

	constructor(
		private readonly token: string,
		private readonly webhookId: string
	) {
		this.client = Axios.create({
			baseURL: this.getWebhookUrl(),
			timeout: this.clientTimeout,
		});
	}

	/**
	 * Compose full webhook url
	 */
	private getWebhookUrl() {
		return `https://discord.com/api/webhooks/${this.webhookId}/${this.token}`;
	}

	async send(message: StatusMessage): Promise<void> {
		await this.client.post('', { content: message }).catch((error) => {
			logWarning(`Cannot send message to Discord: ${error.toString()}`);
			logError(error);
		});
	}
}
