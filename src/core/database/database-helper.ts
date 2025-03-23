import { ConfigHelper } from '../config/config';
import { DatabaseConfig } from './database-config.model';

export class DatabaseHelper {
  static getURL(): string {
    if (ConfigHelper.getEnvVariable('DB_OPTIONS') !== '') {
      return `${ConfigHelper.getEnvVariable('DB_URL')}/${ConfigHelper.getEnvVariable(
        'DB_NAME',
      )}?${ConfigHelper.getEnvVariable('DB_OPTIONS')}`;
    }
    return ConfigHelper.getEnvVariable('DB_URL');
  }

  static getConfig(): DatabaseConfig {
    return {
      dbName: ConfigHelper.getEnvVariable('DB_NAME'),
    };
  }
}
