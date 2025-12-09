import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import User from "../model/UserModel"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { loginAndRegisterValidator } from "../validators/movieValidator"

dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET //as string

class AuthController {
  static register = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ success: false, error: "Email y contraseña son requeridos" })
      }

      //validamos con zod que sea un MAIL valido
      const validator = loginAndRegisterValidator.safeParse(req.body)

      if (!validator.success) {
        return res.status(400).json({ success: false, error: validator.error.flatten().fieldErrors });
      }

      const user = await User.findOne({ email })

      if (user) {
        return res.status(409).json({ success: false, error: "El usuario ya existe en la base de datos." })
      }

      // crear el hash de la contraseña
      const hash = await bcrypt.hash(password, 10)
      const newUser = new User({ email, password: hash })

      await newUser.save()
      res.status(201).json({ success: true, data: newUser })
    } catch (e) {
      const error = e as Error
      switch (error.name) {
        case "MongoServerError":
          return res.status(409).json({ success: false, error: "Usuario ya existente en nuestra base de datos" })
      }
    }
  }

  static login = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ success: false, error: "Email y contraseña son requeridos" })
      }

      //validamos con zod que sea un MAIL valido
      const validator = loginAndRegisterValidator.safeParse(req.body)

      if (!validator.success) {
        return res.status(400).json({ success: false, error: validator.error.flatten().fieldErrors });
      }

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(401).json({ success: false, error: "No autorizado" })
      }

      // validar la contraseña
      const isValid = await bcrypt.compare(password, user.password)

      if (!isValid) {
        return res.status(401).json({ success: false, error: "No autorizado" })
      }
      //validacion de la secret_key, le asegura ts que no llega undefined
      if (!SECRET_KEY) {
        throw new Error("Error interno del servidor");
      }

      const token = jwt.sign(
        { id: user._id, email: user.email } //payload le enviado el id del usuario y mail
        , SECRET_KEY,
        { expiresIn: "1h" }
      )
      res.json({ success: true, token })
    } catch (e) {
      const error = e as Error
      res.status(500).json({ success: false, error: "Error al iniciar sesion" })
    }
  }
}

export default AuthController