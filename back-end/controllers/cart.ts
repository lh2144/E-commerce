import Cart from '../models/cart';
import User from '../models/user';
import { Request, Response } from 'express';
import { error } from '../middleware/error';
const stripe = require('stripe')(
    'pk_test_51HfxuTEODCEgB92csJjsHcLCdScmobY2pdaAhK8XjnOyxbBBkzBIHSrYHsGgEZQhs7mlYOe33TDMAM5rDiehWfek00p7E2wGpn'
);

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
                totalPrice: cart['totalPrice'],
            });
        } else {
            res.status(200).json({});
        }
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
    const totalPrice = req.body.totalPrice;
    try {
        let shippingAddress;
        let contactEmail;
        const user = await User.findById(cartId);
        if (user) {
            shippingAddress = user['address'];
            contactEmail = user['email'];
        }

        const activeCart = await Cart.findById(cartId);
        if (activeCart) {
            await Cart.updateOne({ _id: cartId }, { totalPrice, items });
            const updateCart = await Cart.findById(cartId);
            console.log(updateCart);
            if (updateCart) {
                res.status(200).json({ id: cartId, totalPrice: updateCart['totalPrice'], items: updateCart['items'] });
                res.end();
            }
        } else {
            const cart = new Cart({
                _id: cartId,
                shippingAddress,
                contactEmail,
                items,
                totalPrice,
            });
            await cart.save();
            res.status(200).json({ id: cartId, totalPrice, items });
            res.end();
        }
    } catch (err) {
        if (!err['statusCode']) {
            err['statusCode'] = 500;
            next(err);
        }
    }
};

const getPaymentIntent = async (req: Request, res: Response, next) => {
    const userId = req['id'];
    if (!userId) {
        throw error('user should login to checkout', 500);
    }
    try {
        const cart = await Cart.findById(userId);
        if (!cart) {
            throw error('cart dont exits', 500);
        }
        const amount = cart['totalPrice'];
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            metadata: { integration_check: 'accept_a_payment' },
        });
        res.status(200).json({client_secret: paymentIntent.client_secret});
    } catch (err) {
        next(err);
    }
};

export { getCart, postCart };
