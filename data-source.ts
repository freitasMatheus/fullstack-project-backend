import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './src/modules/users/user.entity';
import { Product } from './src/modules/products/product.entity';
import { Order } from './src/modules/orders/order.entity';

// 🔹 Criando uma instância do ConfigService para carregar as variáveis
const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [User, Product, Order],
  migrations: ['./src/migrations/*.ts'],
  synchronize: false,
  migrationsRun: true,
  logging: configService.get<boolean>('DB_LOGGING', false),
});

AppDataSource.initialize()
  .then(() => {
    console.log('✅ DataSource inicializado!');
    console.log(
      '🔹 Entidades registradas:',
      AppDataSource.entityMetadatas.map((e) => e.name),
    );
  })
  .catch((err) => console.error('❌ Erro ao inicializar DataSource', err));
