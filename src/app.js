import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import eventRoutes from './routes/event.routes.js';
import ticketRoutes from './routes/ticket.routes.js'

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

const corsOptions = {
    origin: 'http://192.168.1.135:8081', // Permitir solo este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use('/api', authRoutes);
app.use('/api', eventRoutes);
app.use('/api', ticketRoutes);

export default app;