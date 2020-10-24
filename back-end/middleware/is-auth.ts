import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const isAuth = (req: Request, res: Response, next) => {
    let token = req.get('Authorization');
    if (!token) {
        const err = new Error('User should logged in');
        err['statusCode'] = 402;
        throw err;
    }
    token = token.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, 'newNodeProject');
        if (!decoded) {
            const err = new Error('user is not valid');
            throw err;
        }
        req['isLogged'] = true;
        req['id'] = decoded.id;
        next();
    } catch (err) {
        err['statusCode'] = 500;
        throw err;
    }

};
