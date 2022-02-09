/**
 * Function to get env variables. Throws an error if the variable is not found.
 */
export function requireEnv(name: string): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(`Environment variable ${name} not found.`);
	}
	return value;
}
/**
 * Function to get env variables. Returns the default value if the variable is not found.
 */
export function getEnv(
	name: string,
	defaultValue?: string
): string | typeof defaultValue {
	const value = process.env[name];
	if (!value) {
		return defaultValue;
	}
	return value;
}
