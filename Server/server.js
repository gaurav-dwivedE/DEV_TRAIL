import {config} from 'dotenv'
config()
import app from './src/app.js'
import connect_db from './db/db.js'

connect_db()

app.listen(process.env.PORT,()=>{
    console.log("Server running on port = ",process.env.PORT);
    
})