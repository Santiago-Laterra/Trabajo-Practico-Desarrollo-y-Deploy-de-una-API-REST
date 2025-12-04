import { z } from "zod"

const productSchemaValidator = z.object({
  title: z.string().min(3, "El titulo no puede estar vacio"),
  synopsis: z.string(),
  reting: z.number().min(0, "El rating mínimo es 0").max(10, "El rating máximo es 10"),
  genre: z.string().min(2, "El género es demasiado corto"),
  releaseYear: z.number().int("El año debe ser un número entero").min(1895, "El año debe ser posterior a 1895."),
  director: z.string().min(3, "El nombre del director es muy corto")
})

export const createMovieSchema = productSchemaValidator

export const updatedMovieSchema = productSchemaValidator.partial()