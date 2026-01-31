import express from 'express';
import morgan from 'morgan';
import userRouter from '../routes/user.routes.js';
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))

app.use('/api/users',userRouter)

app.get("/", (req, res) => {
    res.send("Done");
})

export default app;
