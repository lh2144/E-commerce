import exprss from 'express';
import { getCart, postCart } from '../controllers/cart';
import { isAuth } from '../middleware/is-auth';
const router = exprss.Router();

router.get('/cart', isAuth, getCart);
router.post('/cart', isAuth, postCart);

export default router;
