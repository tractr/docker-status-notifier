import { Database } from 'sqlite3';
import { getEnv } from '../helpers';
import { initialize } from './Initialize';

export * from './Containers';

let databaseSingleton: Database;
export async function getDatabase(): Promise<Database> {
	// If the database is not initialized yet, initialize it
	if (!databaseSingleton) {
		const dbPath = getEnv('SQLITE_DB_PATH', ':memory:');
		if (!dbPath) {
			throw new Error('SQLITE_DB_PATH is not set');
		}
		databaseSingleton = await initialize(dbPath);
	}

	return databaseSingleton;
}
