import fs from 'fs';
import path from 'path';
import { validationResult } from 'express-validator';
import Product from '../models/product';
import { Request, Response } from 'express';

const postProduct = async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error['statusCode'] = 422;
        throw error;
    }

    if (!req.body.imgUrl) {
        const error = new Error('No image provided');
        error['statusCode'] = 422;
        throw error;
    }
    try {
        const imgUrl = req.body.imgUrl;
        const productName = req.body.productName;
        const preview = req.body.preview;
        const overview = req.body.overview;
        const price = req.body.price;
        const product = new Product({ imgUrl, productName, preview, overview, price });
        await product.save();
        res.status(200).json({ imgUrl, productName, preview, overview });
    } catch (err) {
        if (!err['statusCode']) {
            err['statusCode'] = 500;
        }
        next(err);
    }
};

const getProducts = async (req: Request, res: Response, next) => {
    try {
        const products = await Product.find();
        const result: any[] = [];
        for (const item of products) {
            const productName = item['productName'];
            const id = item['_id'];
            const preview = item['preview'];
            const overview = item['overview'];
            const imgUrl = item['imgUrl'];
            const price = item['price'];
            result.push({productName, id, preview, overview, imgUrl, price});
        }
        res.status(200).json({ data: [...result] });
    } catch (error) {
        if (!error['statusCode']) {
            error['statusCode'] = 500;
        }
        next(error);
    }
};

export { getProducts, postProduct };
