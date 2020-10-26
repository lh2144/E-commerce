import Cart from '../models/cart';
import User from '../models/user';
import Order from '../models/order';
import { Request, Response } from 'express';
import { error } from '../middleware/error';
import mongoose from 'mongoose';
import { ObjectID } from 'mongodb';

// const ObjectId = mongoose.Types.ObjectId;
const stripe = require('stripe')(
    'sk_test_51HfxuTEODCEgB92cXFmEitoCYWIljD5pNixd2zwCk71bScTzwblIRPkptB1z1UqFRwvNcMEN1WoOeE0GUJIw1MOj00PitvmFYI'
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

    try {
        const cart = await Cart.findById(userId);
        if (!cart) {
            throw error('cart dont exits', 500);
        }
        const amount = Math.ceil(cart['totalPrice']);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            metadata: { integration_check: 'accept_a_payment' },
        });
        res.status(200).json({ client_secret: paymentIntent.client_secret });
    } catch (err) {
        next(err);
    }
};

const placeOrder = async (req: Request, res: Response, next) => {
    const userId = req['id'];
    try {
        const user = await User.findById(userId).populate('cart').exec();
        if (!user) {
            throw error('user dont exist or some db issuer', 500);
        }
        const totalPrice = user['cart']['totalPrice'];
        const email = user['email'];
        const products: any = [];
        const cartItems = user['cart']['items'];
        for (const item of cartItems) {
            products.push({ ...item });
        }
        const orderId = genereateOrderId();
        const order = new Order({
            _id: orderId,
            userId: new ObjectID(userId),
            products
        });
        await order.save();
        res.status(200).json({ email, products, totalPrice });
    } catch (err) {
        next(err);
    }
};

function genereateOrderId(): string {
    const data = new Date();
    const year = data.getFullYear;
    const month = data.getMonth;
    const date = data.getDate;
    const hour = data.getHours;
    const minute = data.getMinutes;
    const second = data.getSeconds;
    const random = Math.floor(Math.random() * 10);
    let res = '';
    res = year.toString() + '-' +
        month.toString() + date.toString() + hour.toString() + '-' +
        minute.toString() + second.toString() + random;
    return res;
}
export { getCart, postCart, placeOrder, getPaymentIntent };
