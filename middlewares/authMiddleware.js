import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'

export const verifyToken = (req, res, next) => {
      const token = req.headers.token;
    // const token = req.cookies.access_token
    if (!token) return next(createError(401, "You are not authenticated."));

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(401, "Token is not authorized."));
        req.user = user;
        next();
    });
}

// Checking authticate user is admin or not.
export const isAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "ADMIN") {
            return next()
        }

        return next(createError(401, "You are not authorized."));
    });
}