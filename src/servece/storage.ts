import type { SQLiteDatabase } from 'expo-sqlite';
import { mockTasks } from '../store/slice/mockdata';

const DATABASE_VERSION = 1;

const setupDatabase = async (db: SQLiteDatabase) => {
  const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const currentVersion = result?.user_version ?? 0;

  if (currentVersion >= DATABASE_VERSION) {
    return;
  }

  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS tasks (
      id          TEXT    PRIMARY KEY NOT NULL,
      title       TEXT    NOT NULL,
      description TEXT    NOT NULL DEFAULT '',
      priority    TEXT    NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
      dueDate     TEXT    NOT NULL,
      isCompleted INTEGER NOT NULL DEFAULT 0 CHECK (isCompleted IN (0, 1))
    );
  `);

  // Add sample data.
  // for (const task of mockTasks) {
  //   await db.runAsync(
  //     'INSERT OR IGNORE INTO tasks (id, title, description, priority, dueDate, isCompleted) VALUES (?, ?, ?, ?, ?, ?)',
  //     task.id, task.title, task.description, task.priority, task.dueDate, task.isCompleted ? 1 : 0,
  //   );
  // }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export default setupDatabase;
