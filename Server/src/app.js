import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
config();
import userRouter from './routes/user.routes.js';
import LogsRouter from './routes/logs.routes.js'
import pointsRouter from './routes/poits.routes.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // ❗ EXACT origin
    credentials: true,               // ❗ allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));


app.use("/api/users", userRouter);
app.use("/api/logs", LogsRouter );
app.use("/api/points", pointsRouter );



export default app;
