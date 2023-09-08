import express, { Application } from 'express';
import cors from 'cors';
require('dotenv').config();
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/storage', express.static(`${__dirname}/public`));
app.use('/api', userRoutes);
app.use('/api', authRoutes);

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));