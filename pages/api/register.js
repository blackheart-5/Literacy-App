import User from '@/models/User';
import bycrypt from 'bcrypt';
import dbConnect from '@/utils/database';
import { createSession } from '@/lib/session';

export default async function handler(req,res){
    if (req.method !== 'POST'){
        return res.status(405).json({message:"Method not allowed"});
    }

    try{
        //not needed to convert raw request body to json since it always comes
        //in as json 
        const {username, email, password} = req.body;

        if (!username || !email || !password){
            return res.status(400).json({message:"Provide both email and password."});
        }
        console.log(username, email, password);

        await dbConnect();
        
        //check database of matching users
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message:'User already in use.'});
        }

        const hashedPassword = await bycrypt.hash(password, 10);

        const newUser = new User({username:username, email:email, password:hashedPassword});
        //console.log(newUser);
        await newUser.save();
        


        // alert("Thank you for signing up, " + username);
        return res.status(200).json({success: true, message:"Signup successful."});


    }catch(error){
        console.error('Registration error:', error);
        return res.status(500).json({message: "Server error. Please try again later."});
    
    }
}