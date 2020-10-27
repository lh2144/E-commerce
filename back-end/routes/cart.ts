import exprss from 'express';
import { getCart, postCart, getPaymentIntent, placeOrder } from '../controllers/cart';
import { isAuth } from '../middleware/is-auth';
const router = exprss.Router();

router.get('/cart', getCart);
router.post('/cart', postCart);
router.get('/paymentIntent', isAuth, getPaymentIntent);
router.post('/placeorder', isAuth, placeOrder);

export default router;
