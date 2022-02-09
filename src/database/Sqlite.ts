import { Database } from 'sqlite3';

/**
 * Promisify the `run` method of the SQLite3 database.
 */
export function run(
	db: Database,
	sql: string,
	params: any[] = []
): Promise<void> {
	return new Promise((resolve, reject) => {
		db.run(sql, params, (error) => {
			if (error) {
				reject(error);
			} else {
				resolve();
			}
		});
	});
}

/**
 * Promisify the `get` method of the SQLite3 database.
 */
export function get<T = unknown>(
	db: Database,
	sql: string,
	params: any[] = []
): Promise<T | undefined> {
	return new Promise((resolve, reject) => {
		db.get(sql, params, (error, row: T | undefined) => {
			if (error) {
				reject(error);
			} else {
				resolve(row);
			}
		});
	});
}

/**
 * Promisify the `all` method of the SQLite3 database.
 */
export function all<T = unknown>(
	db: Database,
	sql: string,
	params: any[] = []
): Promise<T[]> {
	return new Promise((resolve, reject) => {
		db.all(sql, params, (error, rows: T[]) => {
			if (error) {
				reject(error);
			} else {
				resolve(rows);
			}
		});
	});
}
