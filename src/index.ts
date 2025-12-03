// LEVANTAR NUESTRO SERIVICIO Y CONFIGURACIONES GLOBALES
import express, { Request, Response } from "express"
import cors from "cors"
import connectDB from "./config/mongodb"
import productRouter from "./routes/productRoutes"
import authRouter from "./routes/authRouter"
import morgan from "morgan"
import IUserTokenPayload from "./interfaces/IUserTokenPayload"
import dotenv from "dotenv"
import logger from "./config/logger"
import transporter from "./config/emailConfig"
import createTemplate from "./templates/emailTemplate"
dotenv.config()

declare global {
  namespace Express {
    interface Request {
      user?: IUserTokenPayload
    }
  }
}

const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

app.use(morgan("dev"))

app.get("/", (__: Request, res: Response) => {
  res.json({ status: true })
})

app.use("/auth", authRouter)
// http://localhost:3000/products?
app.use("/products", productRouter)

// enviar correo electrónico
app.post("/email/send", async (req, res) => {
  const { subject, email: emailUser, message } = req.body

  if (!subject || !emailUser || !message) {
    return res.status(400).json({ success: false, message: "Data invalida" })
  }

  try {
    const info = await transporter.sendMail({
      from: `Mensaje de la tienda: ${emailUser}`,
      to: process.env.EMAIL_USER,
      subject,
      html: createTemplate(emailUser, message)
    })

    res.json({ succes: true, message: "Correo fue enviado exitosamente", info })

  } catch (e) {
    const error = e as Error
    res.status(500).json({ success: false, error: error.message })
  }
})

// endpoint para el 404 - no se encuentra el recurso
app.use((__, res) => {
  res.status(404).json({ success: false, error: "El recurso no se encuentra" })
})

// servidor en escucha
app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectDB()
})