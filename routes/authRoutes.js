import express from 'express';
const router = express.Router();

import { getAllUsers, registerUser, loginUser } from '../controllers/authController.js'; // import controller functions
import { verifyToken } from '../middleware/verifyToken.js';
import { isAdmin } from '../middleware/isAdmin.js';


router.post('/POST/register', registerUser); // POST /api/auth/register
router.post('/POST/login', loginUser); // POST /api/auth/login

// GET /api/auth/users — only Admin can access 
router.get('/users', verifyToken, isAdmin, getAllUsers);


export default router; // export to use in server.js