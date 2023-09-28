import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function optionalOrderJwt(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken) return next();
    jwt.verify(accessToken, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            if (err.message === 'jwt expired') return res.status(401).json({ message: err.message });
            else return next();
        }
        req.body.user = user;
        next();
    })
}

export default optionalOrderJwt;