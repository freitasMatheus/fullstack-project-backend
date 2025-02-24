"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./src/modules/users/user.entity");
const product_entity_1 = require("./src/modules/products/product.entity");
const order_entity_1 = require("./src/modules/orders/order.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [user_entity_1.User, product_entity_1.Product, order_entity_1.Order],
    migrations: ['./src/migrations/*.ts'],
    synchronize: false,
    migrationsRun: true,
    logging: true,
});
exports.AppDataSource.initialize()
    .then(() => console.log('✅ DataSource inicializado!'))
    .catch((err) => console.error('❌ Erro ao inicializar DataSource', err));
//# sourceMappingURL=data-source.js.map