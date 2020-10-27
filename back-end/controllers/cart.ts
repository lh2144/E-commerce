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
    try {
        const sessionId = res.get('sessionId');
        if (sessionId) {
            const cart = await Cart.findById(sessionId);
            if (cart) {
                res.status(201).json({
                    items: cart['items'],
                    shippingAddress: cart['shippingAddress'],
                    contactEmail: cart['contactEmail'],
                    totalPrice: cart['totalPrice'],
                });
            }
        } else {
            throw error('no cart found in db', 500);
        }
    } catch (err) {
        next(err);
    }
};

const postCart = async (req: Request, res: Response, next) => {
    try {
        let sessionId = req.get('sessionId');
        const items = req.body.items;
        const totalPrice = req.body.totalPrice;
        if (!sessionId) {
            sessionId = genereateOrderId();
            const cart = new Cart({
                _id: sessionId,
                items,
                totalPrice,
            });
            await cart.save();
            res.status(200).json({ id: sessionId, totalPrice, items });
            res.end();
        } else {
            const updatedCart = await Cart.findByIdAndUpdate(sessionId, { items, totalPrice }, { new: true });
            if (updatedCart) {
                res.status(200).json({ id: sessionId, totalPrice: updatedCart['totalPrice'], items: updatedCart['items'] });
                res.end();
            }
        }
    } catch (err) {
        next(err);
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
            products,
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
    res =
        year.toString() + '-' + month.toString() + date.toString() + hour.toString() + '-' + minute.toString() + second.toString() + random;
    return res;
}
export { getCart, postCart, placeOrder, getPaymentIntent };
