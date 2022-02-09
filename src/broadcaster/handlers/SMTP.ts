import { StatusMessage, StatusMessageHandler } from '../interfaces';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export interface SMTPOptions {
	host: string;
	port: number;
	secure: boolean;
	user?: string;
	password?: string;
	from: string;
	to: string;
	subject: string;
}

export class SMTP implements StatusMessageHandler {
	/**
	 * SMTP client
	 */
	private readonly transporter: nodemailer.Transporter;

	constructor(private readonly options: SMTPOptions) {
		// Create SMTP transporter options
		const transportOptions: SMTPTransport.Options = {
			host: options.host,
			port: options.port,
			secure: options.secure,
		};
		// If user and password are set, add them to the transporter options
		if (options.user && options.password) {
			transportOptions.auth = {
				user: options.user,
				pass: options.password,
			};
		}
		// Create SMTP transporter
		this.transporter = nodemailer.createTransport(transportOptions);
	}

	async send(message: StatusMessage): Promise<void> {
		await this.transporter.sendMail({
			from: this.options.from,
			to: this.options.to,
			subject: this.options.subject,
			text: message.message,
			html: `<span>${message.message}<span><br /><br /><b>${message.logs}</b>`,
		});
	}
}
