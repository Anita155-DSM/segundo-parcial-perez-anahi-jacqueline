import movies from "../models/movie.model.js";
export const createMovie = async (req, res) => {
    const { title, director, duration, genre } = req.body;
    if (!title || !director || !duration || !genre){
        return res.status(400).json ({ message: "Faltan datos obligatorios" });
    }
    if (!Number.isInteger(duration)){
        return res.status(400).json ({ message: "La duración debe ser un número entero positivo" });
    }
    if (genre !== "Terror" && genre !== "Acción" && genre!== "Romance" && genre !=="Comedia" ){
        return res.status(400).json ({ message: "No es válido, el género debe ser cinematográfico" });
    }
    try{
        const movieExist = await movies.findOne({ title});
        if (movieExist){
            return res.status(400).json ({ message: `La pelicula con ese nombre: '${title}' ya existe.` });
        }
        const newMovie = await movies.create({ title, director, duration, genre, description });
        res.status(201).json({ message: "Pelicula creado exitosamente", title: newMovie });
    } catch (error){
        console.error("Error al crear la película... error;", error);
        res.status(500).json ({ message: "Error interno del servidor al crear el titulo" });
    }
}