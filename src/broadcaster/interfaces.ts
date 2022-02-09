export type MessageType = 'failure' | 'stopped';

export interface StatusMessage {
	message: string;
	type: MessageType;
	logs?: string;
}

export interface StatusMessageHandler {
	send(message: StatusMessage): Promise<void>;
}
