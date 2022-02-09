import { Database } from 'sqlite3';
import { run } from './Sqlite';

/**
 * Create the tables in the database.
 */
async function createTables(db: Database) {
	await run(
		db,
		`
    CREATE TABLE IF NOT EXISTS "containers" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT NOT NULL,
      "image" TEXT NOT NULL,
      "state" TEXT NOT NULL,
      "status" TEXT NOT NULL
    );
  `
	);
}

/**
 * Create indexes on the database.
 */
async function createIndexes(db: Database) {
	await run(
		db,
		`
    CREATE UNIQUE INDEX IF NOT EXISTS "containers_name" ON "containers" ("name");
  `
	);
	await run(
		db,
		`
    CREATE UNIQUE INDEX IF NOT EXISTS "containers_state" ON "containers" ("state");
  `
	);
}

/**
 * Initialize the SQLite3 database and return the connection.
 */
export async function initialize(filepath: string): Promise<Database> {
	const db = new Database(filepath);
	await createTables(db);
	await createIndexes(db);
	return db;
}
