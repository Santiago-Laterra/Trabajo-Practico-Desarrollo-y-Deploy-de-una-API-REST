// DEFINE EL ESQUEMA DE DATOS Y CREA EL MODELO
// EL MODELO:
// 1 - crea la colección en mongodb
// 2 - habilita los métodos de manipulación de data

import { model, Model, Schema } from "mongoose"
import IProduct from "../interfaces/IMovie"

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  synopsis: { type: String, default: "No tiene synopsis" },
  rating: { type: Number, default: 0, min: 0 },
  genre: { type: String, default: "No tiene genero" },
  releaseYear: { type: Number, default: 0, min: 0 },
  director: { type: String, default: "No tiene director" }
}, {
  versionKey: false
})

const Product: Model<IProduct> = model("Product", productSchema)

export default Product