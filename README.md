# Docker status notifier

This is a simple status notifier for Docker containers.
It watches one or more containers and sends a notification when their state changes to `exited`.

Notifications can be broadcast through Slack, Discord, SMTP or more.

## Usage

### Environment variables

This image is configurable through environment variables.
Here is a list of all the available environment variables:

#### Slack

First, you have to create a bot on Slack: https://api.slack.com/bot-users

|Name|Description|Default|Required|
|---|---|---|---|
|`SLACK_ENABLED`|Enable Slack integration|`0`|No|
|`SLACK_TOKEN`|Bot's token|None|If enabled|
|`SLACK_CHANNEL`|Channel id where messages are sent|None|If enabled|

Slack will be enabled if the `SLACK_TOKEN` and `SLACK_CHANNEL` environment variable are set.

Don't forget to invite the bot on the channel.

#### Discord

First, you have to create a webhook on Discord: https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks
Extract the webhook's id and token from URL: `https://discord.com/api/webhooks/{WEBHOOK}/{TOKEN}`.

|Name|Description|Default|Required|
|---|---|---|---|
|`DISCORD_ENABLED`|Enable Discord integration|`0`|No|
|`DISCORD_TOKEN`|Webhook's token|None|If enabled|
|`DISCORD_WEBHOOK`|Webhook id|None|If enabled|

#### SMTP

|Name|Description|Default|Required|
|---|---|---|---|
|`SMTP_ENABLED`|Enable SMTP integration|`0`|No|
|`SMTP_HOST`|Host|None|If enabled|
|`SMTP_PORT`|Port to use|`25`|No|
|`SMTP_SECURE`|Is secure (`0`, `1`, `true` or `false`)|`0`|No|
|`SMTP_USER`|Auth user|None|No|
|`SMTP_PASSWORD`|Auth password|None|No|
|`SMTP_FROM`|Sender address (`name@mail.com` or `"Fred Foo" <foo@example.com>`)|None|If enabled|
|`SMTP_TO`|List of receivers, comma separated (`foo@mail.com,bar@mail.com`)|None|If enabled|
|`SMTP_SUBJECT`|Subject line of the email|None|If enabled|

For more information, please refer to the [Nodemailer documentation](https://nodemailer.com/about/).

#### Database

The database is used to store the containers' states.

|Name|Description|Default|Required|
|---|---|---|---|
|`SQLITE_DB_PATH`|Path for Sqlite file|`:memory:`|No|

#### Application

|Name|Description|Default|Required|
|---|---|---|---|
|`LOGS_LENGTH`|Amount of lines of log sent with the message|`10`|No|
|`DOCKER_SOCKET`|Path to the Docker socket|`/var/run/docker.sock`|No|
|`CHECK_INTERVAL`|Delay between 2 status scans (in seconds)|`30`|No|