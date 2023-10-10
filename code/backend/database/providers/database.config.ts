import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as process from 'process';
dotenv.config();

export const defaultDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5436,
  username: 'postgres',
  password: 'password',
  database: 'lab_moedas',

  migrations: ['./database/migrations/*.ts'],
  migrationsTableName: 'migrations_check',
  synchronize: true,
});
