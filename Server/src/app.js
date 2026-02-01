import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
config();
import userRouter from './routes/user.routes.js';
import LogsRouter from './routes/logs.routes.js'
import pointsRouter from './routes/poits.routes.js';

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/api/users", userRouter);
app.use("/api/logs", LogsRouter );
app.use("/api/points", pointsRouter );



export default app;
