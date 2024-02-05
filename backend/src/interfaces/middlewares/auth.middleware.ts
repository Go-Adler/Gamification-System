import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

// Extend the Request interface to include a user property for decoded JWT payload
declare module "express" {
  interface Request {
    user?: JwtPayload
  }
}

export class JwtMiddleware {
  constructor() {
  }
  // Middleware function to verify JWT token
  verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const secretKey: string = process.env.JWT_SECRET_KEY!

      // Extract the Authorization header
      const authHeader = req.header("Authorization")

      
      // Check if Authorization header is missing
      if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." })
      }
      
      // Extract token from the Authorization header
      const token = authHeader.split(" ")[1]

      // Check if token is missing
      if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." })
      }

      // Verify the token using the provided secret key
      const decoded = jwt.verify(token, secretKey) as JwtPayload

      
      // Attach the decoded user information to the request object
      req.user = decoded

      next()
    } catch (error) {
      
      // Handle token verification errors
      return res.json({ invalidToken: true })
    }
  }
}
