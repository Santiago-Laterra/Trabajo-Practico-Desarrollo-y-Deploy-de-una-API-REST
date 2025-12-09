import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import IUserTokenPayload from "../interfaces/IUserTokenPayload"

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const SECRET_KEY = process.env.JWT_SECRET
  const header = req.headers.authorization

  //validacion de la secret_key, le asegura ts que no llega undefined
  if (!SECRET_KEY) {
    return res.status(500).json({ success: false, error: "Error de configuración del servidor." })
  }

  if (!header) {
    return res.status(401).json({ succes: false, error: "El token es requerido" })
  }

  const [scheme, token] = header.split(" ")

  //validarmos si el formato es "Bearer" y si hay un token
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ success: false, error: "Formato de token inválido. Use Bearer <token>." })
  }

  try {
    const payload = verify(token, SECRET_KEY);

    req.user = payload as IUserTokenPayload

    next()
  } catch (e) {
    //Manejo de errores en JWT por nombres de errores
    const error = e as Error
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, error: "El token expiró" })
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, error: "Token inválido" })
    }

    res.status(401).json({ succes: false, error: "Error al procesar el token" })
  }
}

export default authMiddleware 