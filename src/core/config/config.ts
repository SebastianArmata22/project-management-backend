import dotenv from 'dotenv';

dotenv.config();

export class ConfigHelper {
  static getEnvVariable(key: string): string {
    return process.env[key] ?? '';
  }
}
