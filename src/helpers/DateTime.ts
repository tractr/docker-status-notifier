/**
 * Get current date time in format YYYY-MM-DD HH:mm:ss.SSS for current timezone
 */
export function getCurrentDateTimeForTimezone() {
	const date = new Date();
	const offset = date.getTimezoneOffset() / 60;
	const hours = date.getHours();
	const hoursOffset = hours - offset;
	const dateTime = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		hoursOffset,
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds()
	);
	return dateTime.toISOString().slice(0, 23).replace('T', ' ');
}
