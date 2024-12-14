import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(express.json());//allows us to parse json data
app.use(cookieParser());//allows us to parse incomming cookies 
app.use(express.urlencoded({extended:true}));

app.use('/api/auth',authRoutes);

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
