import { getCurrentLocalDateTimeAsString } from './DateTime';

describe('getCurrentLocalDateTimeAsString', () => {
	it('should return a date time as string', () => {
		const currentDateTime = getCurrentLocalDateTimeAsString();
		expect(typeof currentDateTime).toBe('string');
		// Test with regex
		expect(currentDateTime).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
	});
});
