import Cart from '../models/cart';
import User from '../models/user';
import { Request, Response } from 'express';

const getCart = async (req: Request, res: Response, next) => {
    if (!req['isLogged']) {
        const err = new Error('user should log in to fetch cart');
        err['statusCode'] = 402;
        throw err;
    }
    const userId = req['id'];
    try {
        const cart = await Cart.findById(userId);
        if (cart) {
            res.status(201).json({
                items: cart['items'],
                shippingAddress: cart['shippingAddress'],
                contactEmail: cart['contactEmail'],
                price: cart['price']
            });
        }
        res.status(200).json({});
    } catch (err) {
        next(err);
    }
};

const postCart = async (req: Request, res: Response, next) => {
    if (!req['isLogged']) {
        const err = new Error('user should log in to fetch cart');
        err['statusCode'] = 402;
        throw err;
    }
    const cartId = req['id'];
    const items = req.body.items;
    const price = req.body.price;
    try {
        let shippingAddress;
        let contactEmail;
        const user = await User.findById(cartId);
        if (user) {
            shippingAddress = user['address'];
            contactEmail = user['email'];
        }
        const cart = new Cart({
            _id: cartId,
            shippingAddress,
            contactEmail,
            items,
            price
        });
        await cart.save();
        res.status(200).json({shippingAddress, _id: cartId, contactEmail, price, items});
    } catch (err) {
        if (!err['statusCode']) {
            err['statusCode'] = 500;
            next(err);
        }
    }
};

export { getCart, postCart };
