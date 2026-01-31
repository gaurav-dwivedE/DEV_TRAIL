import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

import userRouter from './routes/user.routes.js';

app.use("/api/users/", userRouter);


export default app;
