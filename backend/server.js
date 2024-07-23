import path from "path";
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// import files
import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';
import usersRouter from './routes/users.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

// middlewares
app.use(express.json());
app.use(cookieParser());

// routers
app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/users', usersRouter);

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
});