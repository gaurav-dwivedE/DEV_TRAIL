import express from 'express';
const app = express();

app.get("/", (req, res) => {
    res.send("Done");
})

export default app;
