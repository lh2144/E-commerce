import { validationResult } from 'express-validator/check';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const login = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const email = req.body.email;
    const password = req.body.password;
    if (token && !email && !password) {
        const decoded = jwt.verify(token, 'newNodeProject');
        const user = await User.findOne({email: decoded.email});
        if (!user) {
            throw new Error('user not exist');
        }
        res.setHeader('Autorization', 'Bearer ' + token).status(201).json({email: user['email'], name: user['name'] });
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

const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error['statusCode'] = 422;
        error['data'] = errors.array();
        throw error;
    }
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const hasedPw = await bcrypt.hash(password, 12);
    if (!hasedPw) {
        throw new Error('Internal Issue');
    }
    const user = await new User({email, password, phone}).save();
    if (!user) {
        throw new Error('Internal issue');
    }
    res.status(201).json({message: 'user created', userId: user._id});
};
