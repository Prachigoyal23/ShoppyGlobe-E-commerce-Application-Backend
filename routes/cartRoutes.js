import express from 'express'
import {
    addToCart,
    updateCartItem,
    removeCartItem
} from '../controllers/cartController.js';

import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// ------ Only logged-in users can access this -----
// All routes are protected ( need JWT token)
router.post('/', verifyToken, addToCart); // POST /api/cart
router.put('/', verifyToken, updateCartItem); // PUT /api/cart
router.delete('/:productId', verifyToken, removeCartItem); // DELETE /api/cart/:productId

export default router;