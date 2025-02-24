import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './src/modules/users/user.entity';
import { Product } from './src/modules/products/product.entity';
import { Order } from './src/modules/orders/order.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Product, Order],
  migrations: ['./src/migrations/*.ts'],
  synchronize: false,
  migrationsRun: true,
  logging: true,
});

AppDataSource.initialize()
  .then(() => console.log('✅ DataSource inicializado!'))
  .catch((err) => console.error('❌ Erro ao inicializar DataSource', err));
