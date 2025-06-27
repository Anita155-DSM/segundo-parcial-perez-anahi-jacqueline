import express from "express";
import { 
    createMovie, getAllMovies, getMoviesID, movieDelete, movieUpdate
} from "../controllers/movie.controllers.js";
const router = express.Router();

router.get('/', getAllMovies);
router.get('/:id', getMoviesID);
router.post('/', createMovie);
router.put('/:id', movieUpdate);
router.delete('/:id', movieDelete);

export default moviesRouters;