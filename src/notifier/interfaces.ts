export type MessageType = 'failure' | 'stopped';

export interface StatusMessage {
	message: string;
	type: MessageType;
	log?: string;
}

export interface StatusMessageHandler {
	send(message: StatusMessage): Promise<void>;
}
