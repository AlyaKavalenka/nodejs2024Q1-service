import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: (process.env.DOCKER_HOST || process.env.HOSTNAME).toString(),
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME.toString(),
  password: process.env.POSTGRES_PASSWORD.toString(),
  database: process.env.DB_NAME.toString(),
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/migration/*.js'],
});
