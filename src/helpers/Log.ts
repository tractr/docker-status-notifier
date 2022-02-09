import { getCurrentDateTimeForTimezone } from './DateTime';

export function prependDateTime(message: string): string {
	return `[${getCurrentDateTimeForTimezone()}] ${message}`;
}
export function logError(error: Error) {
	console.error(prependDateTime(error.message));
	console.error(error);
}
export function logWarning(warning: string) {
	console.warn(prependDateTime(warning));
}
export function logInfo(info: string) {
	console.info(prependDateTime(info));
}
export function logDebug(debug: string) {
	console.debug(prependDateTime(debug));
}
export function log(message: string) {
	console.log(prependDateTime(message));
}
export function separator() {
	console.log('');
	console.log('----------------------------------------------');
}
