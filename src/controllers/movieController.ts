import { Request, Response } from "express"
import Product from "../model/MovieModel"
import { Types } from "mongoose"
import { createProductSchema, updatedProductSchema } from "../validators/productValidator"

class MovieController {
  static getAllmovies = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { title, synopsis, minRating, maxRating, genre, releaseYear, director } = req.query

      const filter: any = {}

      // Validaciones 
      if (title) filter.title = new RegExp(String(title), "i")
      if (synopsis) filter.synopsis = new RegExp(String(synopsis), "i")
      if (director) filter.director = new RegExp(String(director), "i")
      if (releaseYear) filter.releaseYear = Number(releaseYear)
      if (genre) filter.genre = new RegExp(String(genre), "i")
      if (minRating || maxRating) {

        filter.rating = {}
        if (minRating) filter.price.$gte = minRating
        if (maxRating) filter.price.$lte = maxRating
      }
      const movie = await Product.find(filter)
      res.json({ success: true, data: movie })

    } catch (e) {
      res.status(500).json({ success: false, error: "Error interno al obtener las peliculas" })
    }
  }

  static getProduct = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { id } = req.params

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "ID Inválido" })
      }

      const product = await Product.findById(id)

      if (!product) {
        return res.status(404).json({ success: false, error: "Producto no encontrado" })
      }

      res.status(200).json({ success: true, data: product })
    } catch (e) {
      const error = e as Error
      res.status(500).json({ success: false, error: "error interno al obtener el producto" })
    }
  }

  static addProduct = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { body } = req

      const { name, description, price, category, stock } = body

      if (!name || !description || !price || !category || !stock) {
        return res.status(400).json({ message: "Todos los campos son requeridos" })
      }

      // VALIDACIONES DE INPUT

      const validator = createProductSchema.safeParse(body)

      if (!validator.success) {
        return res.status(400).json({ success: false, error: validator.error.flatten().fieldErrors });
      }

      const newProduct = new Product(validator.data)

      await newProduct.save()
      res.status(201).json({ succes: true, data: newProduct })
    } catch (e) {
      const error = e as Error
      res.status(500).json({ success: false, error: "Error interno al agregar el producto" })
    }
  }

  static updateProduct = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { id } = req.params
      const { body } = req

      if (!Types.ObjectId.isValid(id)) res.status(400).json({ succes: false, error: "ID Inválido" })

      const validator = updatedProductSchema.safeParse(body)

      if (!validator.success) {
        return res.status(400).json({ success: false, error: validator.error.flatten().fieldErrors });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, validator.data, { new: true })

      if (!updatedProduct) {
        return res.status(404).json({ success: false, error: "Producto no encontrado" })
      }

      res.json({ success: true, data: updatedProduct })
    } catch (e) {
      const error = e as Error
      res.status(500).json({ success: false, error: "error interno al actualizar el producto" })
    }
  }

  static deleteProduct = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const id = req.params.id

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID Inválido" });
      }

      const deletedProduct = await Product.findByIdAndDelete(id)

      if (!deletedProduct) {
        return res.status(404).json({ success: false, error: "Producto no encontrado" })
      }

      res.json({ success: true, data: deletedProduct })
    } catch (e) {

      res.status(500).json({ success: false, error: "error interno al borrar el producto" })
    }
  }
}

export default MovieController