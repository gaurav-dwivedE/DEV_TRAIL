const mongoose = require('mongoose');

async function connect_db(){
    try {
        await mongoose.connect()
    } catch (error) {
        
    }
}