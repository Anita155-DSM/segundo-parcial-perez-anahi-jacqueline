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
export const getAllMovies = async (req, res) => {
    try{
        const allMovies = await movies.findAll();
        if (allMovies.length === 0) {
            return res.status(200).json({ message: "No se encontraron los titulos correspondientes" });
        }
        res.status(200).json(allMovies);
    }catch(error){
        console.error("Error al obtener todos los titulos... error;", error);
        res.status(500).json ({ message: "Error interno del servidor al obtener los titulos" });
    }
};
export const getMoviesID = async (req, res)=> {
    try{
        const { id } = req.params;
        const movieExist = await movies.findByPk(id);
        if (!movieExist) {
            return res.status(404).json({ message: `(Not found): Titulo con ID ${id} no exise` });
        }
        res.status(200).json(movies);
    }catch (error){
        console.error("Error al titulo por ID:", error);
        res.status(500).json ({ message: "Error interno del servidor el titulo por ID.. ups" });
    }
};
export const movieUpdate = async (req, res)=> {
    const { id } = req.params;
    const { title, director, duration, genre, description } = req.body;
    try{
        const movie = await movies.findByPk(id);
        if (!movie){
            return res.status(404).json({ message: `titulo con ID ${id} no encontrado` });
        }
        if (!title || !director || !genre || !duration){
            return res.status(400).json({ message: "Faltan datos obligatorios :(" });
        }
        if (!Number.isInteger(duration)) {
            return res.status(400).json({ message: "la duracion deberia de ser un número entero válido" });
        }
        if (genre !== "Terror" && genre !== "Acción" && genre!== "Romance" && genre !=="Comedia") {
            return res.status(400).json({ message: "El género debe ser cinematografico" });
        }
        const nameUsed = await movies.findOne({ where: {title} });
        if (nameUsed && nameUsed.id !== movies.id) {
            return res.status(400).json({ message: `Ya existe un personaje con el nombre '${name}' !!! OJO` });
        }
        await movies.update({ title, duration, director, genre, description });
        return res.status(200).json({ message: "title actualizado exitosamente", movie }); // Retornar el personaje actualizado
    }catch(error) {
        console.error("Error al actualizar el la movie:", error);
        return res.status(500).json({ message: 'Error interno del servidor al actualizar la movie D:' });
    }
};
export const movieDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await movies.findByPk(id);
        if (!movie) {
            return res.status(404).json({ message: `titulo con ID ${id} no encontrado para Delete` });
        }
        await movie.destroy();
        res.status(200).json({ message: `titulo con ID ${id} eliminado correctamente!!!! felicidades` });
    } catch (error) {
        console.error("Error al eliminar la movie... el error es:", error);
        res.status(500).json({ message: 'Error interno al eliminar la movie' });
    }
}