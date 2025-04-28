import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as number | undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/**/**/*.entity.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  ssl: ['localhost', 'host.docker.internal'].includes(
    String(process.env.DB_HOST)
  )
    ? false
    : { rejectUnauthorized: false },
});
