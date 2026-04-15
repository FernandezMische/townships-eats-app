import express from 'express';
import { 
    getCart, addToCart, updateCartItem, 
    removeFromCart, clearCart 
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/item/:item_id', updateCartItem);
router.delete('/item/:item_id', removeFromCart);
router.delete('/clear', clearCart);

export default router;