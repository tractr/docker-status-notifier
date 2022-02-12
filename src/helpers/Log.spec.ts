import {
	log,
	logDebug,
	logError,
	logInfo,
	logWarning,
	prependDateTime,
	separator,
} from './Log';

describe('prependDateTime', () => {
	it('should prepend date time to the string', () => {
		const result = prependDateTime('test');
		expect(result).toMatch(
			/^\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}] test$/
		);
	});
});

describe('logError', () => {
	it('should log error', () => {
		console.error = jest.fn();
		const error = new Error('test');
		logError(error);
		expect(console.error).toHaveBeenCalledTimes(2);
		expect(console.error).toHaveBeenCalledWith(error);
	});
});

describe('logWarning', () => {
	it('should log warning', () => {
		console.warn = jest.fn();
		logWarning('test');
		expect(console.warn).toHaveBeenCalledTimes(1);
	});
});

describe('logInfo', () => {
	it('should log info', () => {
		console.info = jest.fn();
		logInfo('test');
		expect(console.info).toHaveBeenCalledTimes(1);
	});
});

describe('logDebug', () => {
	it('should log debug', () => {
		console.debug = jest.fn();
		logDebug('test');
		expect(console.debug).toHaveBeenCalledTimes(1);
	});
});

describe('log', () => {
	it('should log info', () => {
		console.log = jest.fn();
		log('test');
		expect(console.info).toHaveBeenCalledTimes(1);
	});
});

describe('separator', () => {
	it('should log separator', () => {
		console.log = jest.fn();
		separator();
		expect(console.log).toHaveBeenCalledTimes(2);
		expect(console.log).toHaveBeenCalledWith('');
		expect(console.log).toHaveBeenCalledWith(
			'----------------------------------------------'
		);
	});
});
