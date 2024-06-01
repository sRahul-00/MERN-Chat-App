import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// import files
import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';
import usersRouter from './routes/users.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// middlewares
app.use(express.json());
app.use(cookieParser());

// routers
app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
});