import { StatusMessage, StatusMessageHandler } from './interfaces';

export class Broadcaster implements StatusMessageHandler {
	/**
	 * The list of registered handlers.
	 */
	private handlers: StatusMessageHandler[] = [];

	/**
	 * Add a handler to the list of handlers.
	 */
	addHandler(handler: StatusMessageHandler) {
		this.handlers.push(handler);
	}

	/**
	 * Remove a handler from the list of handlers.
	 */
	removeHandler(handler: StatusMessageHandler) {
		this.handlers = this.handlers.filter((h) => h !== handler);
	}

	/**
	 * Send a message to all handlers.
	 */
	async send(message: StatusMessage): Promise<void> {
		await Promise.all(this.handlers.map((h) => h.send(message)));
	}
}
