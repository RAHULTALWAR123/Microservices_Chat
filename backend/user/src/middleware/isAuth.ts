import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Extend Express Request to include req.user
export interface AuthRequest extends Request {
    user?: any; 
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1] as string;

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as any;

        // Attach user to request
        req.user = decoded.user;

        next();

    } catch (err) {
        console.log("Auth error:", err);
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};
