import { DataSource } from "typeorm";
import { config } from 'dotenv';

config();

//Export the DATABASE_URL env variable on the terminal to run the migration:generate and the migration:run
const AppDataSource = new DataSource({
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
    // "subscribers": [
    //     "src/subscriber/**/*.ts"
    // ],
  });
  
  export default AppDataSource;