import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const MONGODB_URL =process.env.MONGODB_URL;




// if (!MONGODB_URL){
//     throw new Error('Sorry missing environment variable of MOGODB_URL in .env')
// }

// let cached = global.mogoose;

// if (!cached){
//     cached = global.mongoose = {conn: null, promise:null};
// }

const dbConnect = async() => {
    try {
        //console.log('MongoDB URI:', process.env.MONGODB_URL);

        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('MongoDB connected'); //check if connected
    } catch (error) { 
        console.log(error, 'MongoDB connection not established'); //
        process.exit(1);
    }
};

export default dbConnect


