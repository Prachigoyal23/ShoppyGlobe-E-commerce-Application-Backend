import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/', authRoutes);

export default app;
