import { Broadcaster } from './Broadcaster';
import { Discord } from './handlers/Discord';
import { getEnv, getEnvBoolean, getEnvNumber, requireEnv } from '../helpers';
import { Slack } from './handlers/Slack';
import { SMTP } from './handlers/SMTP';
import { Console } from './handlers/Console';
import { StatusMessageHandler } from './interfaces';

export * from './interfaces';

/**
 * Creates a new instance of Discord if environment variables are set.
 */
function getDiscordHandler(): Discord | undefined {
	const enabled = getEnv('DISCORD_ENABLED', '0') === '1';
	if (enabled) {
		const webhook = requireEnv('DISCORD_WEBHOOK');
		const token = requireEnv('DISCORD_TOKEN');
		return new Discord(token, webhook);
	}
}

/**
 * Creates a new instance of Slack if environment variables are set.
 */
function getSlackHandler(): Slack | undefined {
	const enabled = getEnv('SLACK_ENABLED', '0') === '1';
	if (enabled) {
		const token = requireEnv('SLACK_TOKEN');
		const channel = requireEnv('SLACK_CHANNEL');
		return new Slack(token, channel);
	}
}

/**
 * Creates a new instance of SMTP if environment variables are set.
 */
function getSMTPHandler(): SMTP | undefined {
	const enabled = getEnv('SMTP_ENABLED', '0') === '1';
	if (enabled) {
		const host = requireEnv('SMTP_HOST');
		const port = getEnvNumber('SMTP_PORT', 25);
		const secure = getEnvBoolean('SMTP_SECURE', false);
		const user = getEnv('SMTP_USER');
		const password = getEnv('SMTP_PASSWORD');
		const from = requireEnv('SMTP_FROM');
		const to = requireEnv('SMTP_TO');
		const subject = requireEnv('SMTP_SUBJECT');
		return new SMTP({
			host,
			port,
			secure,
			user,
			password,
			from,
			to,
			subject,
		});
	}
}

/**
 * Creates a new instance of Console
 */
function getConsoleHandler(): Console {
	return new Console();
}

let broadcasterSingleton: Broadcaster;
/**
 * Create broadcaster and its handlers
 */
export function getBroadcaster(): Broadcaster {
	if (!broadcasterSingleton) {
		broadcasterSingleton = new Broadcaster();

		// Create handlers and add them to broadcaster
		const handlers = [
			getDiscordHandler(),
			getSlackHandler(),
			getSMTPHandler(),
			getConsoleHandler(),
		].filter((handler) => !!handler) as StatusMessageHandler[];
		handlers.forEach((handler) => broadcasterSingleton.addHandler(handler));
	}

	return broadcasterSingleton;
}
