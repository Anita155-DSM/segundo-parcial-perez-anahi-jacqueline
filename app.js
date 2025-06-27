import express from "express";
import sequelize from "./src/config/database.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
const PORT=process.env.BD_PORT;
sequelize.sync()
    .then(() => {
        console.log("Base de datos conectada correctamente :D");
        app.listen(PORT, () => {
            console.log(`servidor corriendo en: http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error al conectarse con la BD :(... lo siento", err);
    });
app.get('/', (req, res) => {
    res.send('Api funcionando :D');
});