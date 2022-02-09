/**
 * Function to get env variables. Returns the default value if the variable is not found.
 */
export function getEnv(name: string): string | undefined;
export function getEnv(name: string, defaultValue: string): string;
export function getEnv(name: string, defaultValue?: string) {
	const value = process.env[name];
	if (!value) {
		return defaultValue;
	}
	return value;
}

/**
 * Function to get env variables as boolean. Returns the default value if the variable is not found.
 */
export function getEnvBoolean(name: string): boolean | undefined;
export function getEnvBoolean(name: string, defaultValue: boolean): boolean;
export function getEnvBoolean(name: string, defaultValue?: boolean) {
	const value = getEnv(name);
	if (!value && typeof defaultValue === 'boolean') {
		return defaultValue;
	}
	return value ? value === '1' || value === 'true' : undefined;
}

/**
 * Function to get env variables as number. Returns the default value if the variable is not found.
 */
export function getEnvNumber(name: string): number | undefined;
export function getEnvNumber(name: string, defaultValue: number): number;
export function getEnvNumber(name: string, defaultValue?: number) {
	const value = getEnv(name);
	if (!value && typeof defaultValue === 'number') {
		return defaultValue;
	}
	return value ? parseInt(value, 10) : undefined;
}
/**
 * Function to get env variables. Throws an error if the variable is not found.
 */
export function requireEnv(name: string): string {
	const value = getEnv(name);
	if (!value) {
		throw new Error(`Environment variable ${name} not found.`);
	}
	return value;
}
/**
 * Function to get env variables as boolean. Throws an error if the variable is not found.
 */
export function requireEnvBoolean(name: string): boolean {
	const value = getEnvBoolean(name);
	if (typeof value !== 'boolean') {
		throw new Error(`Environment variable ${name} not found.`);
	}
	return value;
}
/**
 * Function to get env variables as number. Throws an error if the variable is not found.
 */
export function requireEnvNumber(name: string): number {
	const value = getEnvNumber(name);
	if (typeof value !== 'number') {
		throw new Error(`Environment variable ${name} not found.`);
	}
	return value;
}
