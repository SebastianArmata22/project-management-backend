import mongoose from 'mongoose';
import { DatabaseHelper } from './core/database/database-helper';

export class Database {
  static async connect(databaseUrl: string) {
    await mongoose
      .connect(databaseUrl)
      .then(() => {
        console.log(`Connection to ${DatabaseHelper.getURL()} established`);
      })
      .catch(err => {
        console.error(`Connection to ${DatabaseHelper.getURL()} failed`, err);
      });
  }
}
