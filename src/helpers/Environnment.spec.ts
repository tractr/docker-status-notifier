import {
	getEnv,
	getEnvBoolean,
	getEnvNumber,
	requireEnv,
	requireEnvBoolean,
	requireEnvNumber,
} from './Environnment';

describe('getEnv', () => {
	beforeEach(() => {
		delete process.env.TEST_ENV;
	});
	it('should return the value of the environment variable', () => {
		process.env.TEST_ENV = 'test';
		expect(getEnv('TEST_ENV')).toBe('test');
	});
	it('should return undefined if the environment variable is not set', () => {
		expect(getEnv('TEST_ENV')).toBeUndefined();
	});
	it('should return the default value if the environment variable is not set', () => {
		expect(getEnv('TEST_ENV', 'default')).toBe('default');
	});
});

describe('getEnvBoolean', () => {
	beforeEach(() => {
		delete process.env.TEST_ENV_BOOLEAN;
	});
	it('should return true if the environment variable is set to true', () => {
		process.env.TEST_ENV_BOOLEAN = 'true';
		expect(getEnvBoolean('TEST_ENV_BOOLEAN')).toBe(true);
	});
	it('should return false if the environment variable is set to false', () => {
		process.env.TEST_ENV_BOOLEAN = 'false';
		expect(getEnvBoolean('TEST_ENV_BOOLEAN')).toBe(false);
	});
	it('should return true if the environment variable is set to 1', () => {
		process.env.TEST_ENV_BOOLEAN = '1';
		expect(getEnvBoolean('TEST_ENV_BOOLEAN')).toBe(true);
	});
	it('should return false if the environment variable is set to 0', () => {
		process.env.TEST_ENV_BOOLEAN = '0';
		expect(getEnvBoolean('TEST_ENV_BOOLEAN')).toBe(false);
	});
	it('should return false if the environment variable is set to something else', () => {
		process.env.TEST_ENV_BOOLEAN = 'test';
		expect(getEnvBoolean('TEST_ENV_BOOLEAN')).toBe(false);
	});

	it('should return undefined if the environment variable is not set', () => {
		expect(getEnvBoolean('TEST_ENV_BOOLEAN')).toBeUndefined();
	});
	it('should return the default value if the environment variable is not set', () => {
		expect(getEnvBoolean('TEST_ENV_BOOLEAN', true)).toBe(true);
	});
});

describe('getEnvNumber', () => {
	beforeEach(() => {
		delete process.env.TEST_ENV_NUMBER;
	});
	it('should return the value of the environment variable', () => {
		process.env.TEST_ENV_NUMBER = '1';
		expect(getEnvNumber('TEST_ENV_NUMBER')).toBe(1);
	});
	it('should return undefined if the environment variable is not set', () => {
		expect(getEnvNumber('TEST_ENV_NUMBER')).toBeUndefined();
	});
	it('should return the default value if the environment variable is not set', () => {
		expect(getEnvNumber('TEST_ENV_NUMBER', 1)).toBe(1);
	});
});

describe('requireEnv', () => {
	beforeEach(() => {
		delete process.env.TEST_ENV_REQUIRE;
	});
	it('should return the environment variable if set', () => {
		process.env.TEST_ENV_REQUIRE = 'test';
		expect(requireEnv('TEST_ENV_REQUIRE')).toBe('test');
	});
	it('should throw an error if the environment variable is not set', () => {
		expect(() => {
			requireEnv('TEST_ENV_REQUIRE');
		}).toThrowError('Environment variable TEST_ENV_REQUIRE not found.');
	});
});

describe('requireEnvBoolean', () => {
	beforeEach(() => {
		delete process.env.TEST_ENV_REQUIRE_BOOLEAN;
	});
	it('should return true if the environment variable is set to true', () => {
		process.env.TEST_ENV_REQUIRE_BOOLEAN = 'true';
		expect(requireEnvBoolean('TEST_ENV_REQUIRE_BOOLEAN')).toBe(true);
	});
	it('should return false if the environment variable is set to false', () => {
		process.env.TEST_ENV_REQUIRE_BOOLEAN = 'false';
		expect(requireEnvBoolean('TEST_ENV_REQUIRE_BOOLEAN')).toBe(false);
	});
	it('should return true if the environment variable is set to 1', () => {
		process.env.TEST_ENV_REQUIRE_BOOLEAN = '1';
		expect(requireEnvBoolean('TEST_ENV_REQUIRE_BOOLEAN')).toBe(true);
	});
	it('should return false if the environment variable is set to 0', () => {
		process.env.TEST_ENV_REQUIRE_BOOLEAN = '0';
		expect(requireEnvBoolean('TEST_ENV_REQUIRE_BOOLEAN')).toBe(false);
	});
	it('should return false if the environment variable is set to something else', () => {
		process.env.TEST_ENV_REQUIRE_BOOLEAN = 'test';
		expect(requireEnvBoolean('TEST_ENV_REQUIRE_BOOLEAN')).toBe(false);
	});
	it('should throw an error if the environment variable is not set', () => {
		expect(() => {
			requireEnvBoolean('TEST_ENV_REQUIRE_BOOLEAN');
		}).toThrowError(
			'Environment variable TEST_ENV_REQUIRE_BOOLEAN not found.'
		);
	});
});

describe('requireEnvNumber', () => {
	beforeEach(() => {
		delete process.env.TEST_ENV_REQUIRE_NUMBER;
	});
	it('should return the value of the environment variable', () => {
		process.env.TEST_ENV_REQUIRE_NUMBER = '1';
		expect(requireEnvNumber('TEST_ENV_REQUIRE_NUMBER')).toBe(1);
	});
	it('should throw an error if the environment variable is not set', () => {
		expect(() => {
			requireEnvNumber('TEST_ENV_REQUIRE_NUMBER');
		}).toThrowError(
			'Environment variable TEST_ENV_REQUIRE_NUMBER not found.'
		);
	});
});
