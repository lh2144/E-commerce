import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { Request, Response } from 'express';

const login = async (req: Request, res: Response, next) => {
    let token = req.get('Authorization');
    if (token) {
        token = token.replace('Bearer ', '');
    }
    const email = req.body.email;
    const password = req.body.password;
    if (token && !email && !password) {
        const decoded = jwt.verify(token, 'newNodeProject');
        const user = await User.findOne({email: decoded.email});
        if (!user) {
            throw new Error('user not exist');
        }
        res.setHeader('Autorization', 'Bearer ' + token);
        res.status(201).json({email: user['email'], name: user['name'] });
    }
    if (email && password) {
        const loadedUser = await User.findOne({ email });
        if (!loadedUser) {
            const error = new Error('A user with this email could not be found');
            // tslint:disable-next-line: no-string-literal
            error['statusCode'] = 401;
            throw error;
        }
        const isEqual = bcrypt.compare(password, loadedUser['password']);
        if (!isEqual) {
            const error = new Error('Wrong Password');
            error['statusCode'] = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedUser['email'],
            name: loadedUser['name']
        }, 'newNodeProject', { expiresIn: '1h'});
        res.status(201).json({ token });
    }
};

const register = async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error['statusCode'] = 422;
        error['data'] = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const phone = req.body.phone;
    const password = req.body.password;
    console.log(password);
    bcrypt.hash(password, 12).then((hasedPw) => {
        const user = new User({email, password, phone, name});
        return user.save();
    })
    .then(ressult => {
        res.status(201).json({email, password, phone, name});
    })
    .catch((err) => {
        if (!err.statusCode) {
            err['statusCode'] = 500;
        }
        next(err);
    });
};

export { login, register };
