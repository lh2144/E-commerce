import express, { Request, Response } from 'express';
import { body } from 'express-validator/check';
import User from '../models/user';
import { login, register } from '../controllers/auth';
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

router.post('/login', login);
router.post('/register', [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom((value, { req }) => {
                return User.findOne({email: value}).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('E-mail address already exists!');
                    }
                });
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({min: 6}),
        body('name')
            .trim()
            .not()
            .isEmpty()
    ],
    register);

export default router;
