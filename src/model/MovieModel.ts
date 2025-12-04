// DEFINE EL ESQUEMA DE DATOS Y CREA EL MODELO
// EL MODELO:
// 1 - crea la colección en mongodb
// 2 - habilita los métodos de manipulación de data

import { model, Model, Schema } from "mongoose"
import IMovie from "../interfaces/IMovie";

const movieSchema = new Schema<IMovie>({
  title: {
    type: String,
    required: true
  },
  synopsis: {
    type: String,
    default: "Sin synopsis disponible"
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  genre: {
    type: String,
    default: "General"
  },
  releaseYear: {
    type: Number,
    required: true,
    min: 1895
  },
  director: {
    type: String,
    required: true
  }
}, {
  versionKey: false
})

const Movie: Model<IMovie> = model('movie', movieSchema);

export default Movie