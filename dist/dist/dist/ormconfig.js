"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: true,
    "entities": [
        "src/**/*.entity.ts"
    ],
    "migrations": [
        "src/database/migrations/*.ts"
    ]
});
exports.default = AppDataSource;
//# sourceMappingURL=ormconfig.js.map