import express from 'express';
import { body } from 'express-validator';
import { getProducts, postProduct } from '../controllers/product';
const router = express.Router();

router.get('/products', getProducts);
router.post('/createProduct', [
    body('productName')
        .trim(),
    body('preview')
        .trim(),
    body('overview')
        .trim(),
    body('imgUrl')
        .trim()
], postProduct);

export default router;
