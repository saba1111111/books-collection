import { DatabaseType } from 'typeorm';

export interface IDatabaseCredentials {
  type: DatabaseType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: any;
  entities: string[];
  synchronize: boolean;
}
