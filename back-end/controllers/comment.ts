import Comment from '../models/comment';
import { Request, response, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/product';
import comment from '../models/comment';

const ObjectId = mongoose.Types.ObjectId;

const createComment = async (req: Request, res: Response, next) => {
    const auth = req.get('Authorization');
    if (!auth) {
        const error = new Error('User should login to comment');
        error['statusCode'] = 422;
    }
    const { title, nickName, detail, productId, rating } = req.body;
    console.log(new ObjectId(productId));
    const comment = new Comment({ title, nickName, detail, rating, productId: new ObjectId(productId) });
    try {
        const response = await comment.save();
        const product = await Product.findById(productId);
        if (product) {
            if (product['reviews'].length < 10) {
                product['reviews'].push(response);
            } else if (product['reviews'].length >= 10) {
                product['reviews'].shift();
                product['reviews'].push(response);
            }
        }
        await product?.save();

        res.status(200).json({
            id: response['_id'],
            title: response['title'],
            nickName: response['nickName'],
            detail: response['detail'],
            rating: response['rating'],
            productId: response['productId'].toString(),
            createdAt: response['createdAt']
        });
    } catch (err) {
        if (!err['statusCode']) {
            err['statusCode'] = 500;
            next(err);
        }
    }
};
const getCommentsById = async (req: Request, res: Response, next) => {
    const productId = req.params.id;
    if (!productId) {
        const error = new Error('bad request, url should come with productId params');
        error['statusCode'] = 400;
        throw error;
    }
    try {
        const convertId = new ObjectId(productId);
        const comments = await Comment.find({ productId: convertId });
        const count = comments.length;
        res.status(200).json({
            data: {
                comments: [...comments],
                total: count
            }
        });
    } catch (err) {
        if (!err['statusCode']) {
            err['statusCode'] = 500;
            next(err);
        }
    }
};
export { createComment, getCommentsById };
