import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Client } from 'pg';
import { GeneralSettings } from './entities/generalSettings.entity';

dotenv.config();

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [GeneralSettings],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  migrationsTableName: 'custom_migrations_table',
};

// ✅ Explicitly export AppDataSource
export const AppDataSource = new DataSource(databaseConfig);

// ✅ Ensure database creation before initializing TypeORM
async function ensureDatabaseExists() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'postgres', // Connect to default DB
  });

  try {
    await client.connect();
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [process.env.DB_NAME],
    );

    if (result.rowCount === 0) {
      console.log(
        `Database "${process.env.DB_NAME}" does not exist. Creating...`,
      );
      await client.query(`CREATE DATABASE "${process.env.DB_NAME}";`);
      console.log(`Database "${process.env.DB_NAME}" created successfully.`);
    } else {
      console.log(`Database "${process.env.DB_NAME}" already exists.`);
    }
  } catch (error) {
    console.error('Error checking/creating database:', error);
  } finally {
    await client.end();
  }
}

// ✅ Initialize Database
async function initializeDatabase() {
  await ensureDatabaseExists();
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

export { initializeDatabase };
