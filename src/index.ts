// LEVANTAR NUESTRO SERIVICIO Y CONFIGURACIONES GLOBALES
import express, { Request, Response } from "express"
import cors from "cors"
import connectDB from "./config/mongodb"
import productRouter from "./routes/movieRouters"
import authRouter from "./routes/authRouter"
import morgan from "morgan"
import IUserTokenPayload from "./interfaces/IUserTokenPayload"
import dotenv from "dotenv"


dotenv.config()

declare global {
  namespace Express {
    interface Request {
      user?: IUserTokenPayload
    }
  }
}

const PORT = process.env.PORT
const SECRET_KEY = process.env.JWT_SECRET

//validacion de la secret_key
if (!SECRET_KEY) {
  console.error("JWT_SECRET no está definido")
  process.exit(1)
}


const app = express()

app.use(cors()) //CORS para permitir peticiones desde el frontend
app.use(express.json())
app.use(morgan("dev"))



app.get("/", (__: Request, res: Response) => {
  res.json({ status: true, message: "API REST funcionando" })
})

app.use("/auth", authRouter)
app.use("/products", productRouter)


// endpoint para el 404 - no se encuentra el recurso
app.use((__, res) => {
  res.status(404).json({ success: false, error: "El recurso no se encuentra" })
})

// servidor en escucha
app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectDB()
})