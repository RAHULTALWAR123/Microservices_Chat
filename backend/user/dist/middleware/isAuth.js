import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        const token = authHeader.split(" ")[1];
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        // Attach user to request
        req.user = decoded.user;
        next();
    }
    catch (err) {
        console.log("Auth error:", err);
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};
//# sourceMappingURL=isAuth.js.map