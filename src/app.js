import express from 'express';
import morgan from 'morgan';
import cors from 'cors';


import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';


const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// Auth endpoints at root, per assignment: POST /signup and POST /login
app.use('/', authRoutes);


// Book routes
app.use('/books', bookRoutes);


// Review routes
app.use('/reviews', reviewRoutes);


// fallback handlers
app.use(notFound);
app.use(errorHandler);


export default app;