// EL ROUTER VALIDA METODOS Y RUTAS PROPIAS DE LA ENTIDAD

// GET http://localhost:3000/product

import { Router } from "express"
import movieController from "../controllers/movieController"
import authMiddleware from "../middleware/authMiddleware"

const movieRouter = Router()

// TODAS LAS PETICIONES QUE LLEGAN AL PRODUCTROUTER EMPIEZAN CON
// POST http://localhost:3000/products/

movieRouter.get("/", movieController.getAllmovies)
movieRouter.get("/:id", movieController.getMovie)
movieRouter.post("/", authMiddleware, movieController.addProduct)
movieRouter.patch("/:id", authMiddleware, movieController.updateProduct)
movieRouter.delete("/:id", authMiddleware, movieController.deleteProduct)

export default movieRouter