

import dbConnect from '../../../utils/database';
import User from '../../../models/User';
import bcrypts from 'bcryptjs';
import jwt  from 'jsonwebtoken';




export default async function handler(request, response){
    await dbConnect;
    if (request.method !== 'POST'){
        return response.status(405).json({message: 'Method not supported'});
    }


    const {username, password} = request.body;

    try{
        const user = await User.findOne({username});
        if(!user){
            return response.status(400).json({message:'Invalid Username'});
        }

        const isFound = await bcrypt.comapare(password, user.password);
        if (!isFound){
            return response.status(400).json({message:'Invalid Password'})
        }
        //if user is valid
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:'1h'});
        response.status(200).json({token,userId: user._id});
    } catch (error){
        response.status(500).json({message:'Error logging in', error: error.message});
    }
}