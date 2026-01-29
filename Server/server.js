import { config } from 'dotenv';
config();
import app from './src/app.js';
import connect_db from './db/db.js';


app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
    connect_db();
})
