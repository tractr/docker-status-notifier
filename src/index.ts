import dotenv from 'dotenv';
import { startWatcher, stopWatcher } from './watcher';
import { logError } from './helpers';

dotenv.config();

// Cleanup on exit
process.on('exit', stopWatcher);
process.on('SIGINT', stopWatcher);
// Catch uncaught exceptions
process.on('uncaughtException', logError);

// Start watching
startWatcher();
