import { Broadcaster } from './Broadcaster';
import { Discord } from './handlers/Discord';
import { getEnv } from '../helpers';
import { Slack } from './handlers/Slack';
import { SMTP } from './handlers/SMTP';
import { Console } from './handlers/Console';

export * from './interfaces';

/**
 * Creates a new instance of Discord if environment variables are set.
 */
function getDiscordHandler(): Discord | undefined {
	const webhook = getEnv('DISCORD_WEBHOOK');
	const token = getEnv('DISCORD_TOKEN');
	if (webhook && token) {
		return new Discord(token, webhook);
	}
}

/**
 * Creates a new instance of Slack if environment variables are set.
 */
function getSlackHandler(): Slack | undefined {
	const token = getEnv('SLACK_TOKEN');
	const channel = getEnv('SLACK_CHANNEL');
	if (token && channel) {
		return new Slack(token, channel);
	}
}

/**
 * Creates a new instance of SMTP if environment variables are set.
 */
function getSMTPHandler(): SMTP | undefined {
	const host = getEnv('SMTP_HOST');
	const port = Number(getEnv('SMTP_PORT', '25'));
	const secure = getEnv('SMTP_SECURE', '0') === '1';
	const user = getEnv('SMTP_USER');
	const password = getEnv('SMTP_PASSWORD');
	const from = getEnv('SMTP_FROM');
	const to = getEnv('SMTP_TO');
	const subject = getEnv('SMTP_SUBJECT');
	if (host && port && from && to && subject) {
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

/**
 * Create broadcaster and its handlers
 */
export function getBroadcaster(): Broadcaster {
	const broadcaster = new Broadcaster();

	// Add Discord handler
	const discord = getDiscordHandler();
	if (discord) {
		broadcaster.addHandler(discord);
	}
	// Add Slack handler
	const slack = getSlackHandler();
	if (slack) {
		broadcaster.addHandler(slack);
	}
	// Add SMTP handler
	const smtp = getSMTPHandler();
	if (smtp) {
		broadcaster.addHandler(smtp);
	}
	// Add Console handler
	broadcaster.addHandler(getConsoleHandler());

	return broadcaster;
}
