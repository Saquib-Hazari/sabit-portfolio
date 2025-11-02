// Creating middleware for token verification
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
}

export const Authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;

    if (!token)
      return res.status(401).json({
        success: false,
        message: "Access token required Please login.",
      });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
    };

    next();
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Internal Server Error." });
    // handle errors
    if (error.name === "JsonWebTokenError")
      return res.status(401).json({ success: false, message: "Invalid Token" });
    if (error.name === "TokenExpiredError")
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login agian.",
      });
  }
};
