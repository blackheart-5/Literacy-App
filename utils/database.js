import mongoose from 'mongoose';
require('dotenv').config();


const MONGODB_URL = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1'
//process.env.MONGODB_URL;




if (!MONGODB_URL){
    throw new Error('Sorry missing environment variable of MOGODB_URL in .env')
}

let cached = global.mogoose;

if (!cached){
    cached = global.mongoose = {conn: null, promise:null};
}

async function dbConnect() {
    if (cached.conn){
        return cached.conn;
    }

    if (!cached.promise){
        const opts ={
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = (await mongoose.connect(MONGODB_URL,opts)).isObjectIdOrHexString((mongoose)=>{
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

console.log('connected to database');
export default dbConnect


