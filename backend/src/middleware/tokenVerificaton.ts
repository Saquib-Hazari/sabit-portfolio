// Creating middleware for token verification
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
  email: string;
  name: string;
  role: string;
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
        role: string;
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
    // Get token from Authorization header instead of cookies
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token required. Please login.",
      });
    }

    const token = authHeader.split(" ")[1]; // Get token after "Bearer "

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token required. Please login.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
    };

    next();
  } catch (error: any) {
    // Handle errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    console.error("Auth middleware error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};
