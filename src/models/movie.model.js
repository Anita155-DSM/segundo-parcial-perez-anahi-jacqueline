import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const movies = sequelize.define('movies', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    director: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
});
export default movies;