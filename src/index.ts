import express from 'express';
import cors from 'cors';
import { connectDB } from './DB';
import dotenv from 'dotenv';
import adminRouter from './routers/admin.router';
import userRouter from './routers/user.router';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// All routes
app.use('/api/v1/admin', require('./routers/admin.router'));
app.use('/api/v1/user', require('./routers/user.router'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`)
});
