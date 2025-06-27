import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    process.env.BD_NAME,
    process.env.BD_USER,
    process.env.BD_PASSWORD,
    {
        host:process.env.BD_HOST,
        dialect:process.env.BD_DIALECT
    }
);
export default sequelize;