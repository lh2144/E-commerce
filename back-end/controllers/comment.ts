import Comment from '../models/comment';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const createComment = async (req: Request, res: Response, next) => {
    const auth = req.get('Authorization');
    if (!auth) {
        const error = new Error('User should login to comment');
        error['statusCode'] = 422;
    }
    const {title, nickName, detail, productId, rating} = req.body;
    const comment = new Comment({title, nickName, detail, rating, productId: new ObjectId(productId)
    });
    try {
        const res = await comment.save();
    } catch (err) {
        if (!err['statusCode']) {
            err['statusCode'] = 500;
            next(err);
        }
    }
    res.status(200).json({...res});
};
