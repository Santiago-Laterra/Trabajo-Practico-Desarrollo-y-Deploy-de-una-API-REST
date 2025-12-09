// EL ROUTER VALIDA METODOS Y RUTAS PROPIAS DE LA ENTIDAD

// GET http://localhost:3000/product

import { Router } from "express"
import movieController from "../controllers/movieController"
import authMiddleware from "../middleware/authMiddleware"

const movieRouter = Router()

// TODAS LAS PETICIONES QUE LLEGAN AL MOVIEROUTERS EMPIEZAN CON
// POST http://localhost:3000/movies/

movieRouter.get("/", movieController.getAllmovies)
movieRouter.get("/:id", movieController.getMovie)
movieRouter.post("/", authMiddleware, movieController.addMovie)
movieRouter.patch("/:id", authMiddleware, movieController.updateMovie)
movieRouter.delete("/:id", authMiddleware, movieController.deleteMovie)

export default movieRouter