import dbConnect from '../../../utils/database';
import User from '../../../models/User';
import bcrypts from 'bcryptjs';

export default async function handler(request, response){
    if (request.method !== 'POST'){
        return resizeBy.status(405).json({message: 'Method not allowed'});
    }

    await dbConnect(); //wait to connect to database tafter that do the following
    const {username, password} = request.body;

    try{
        const hashedPassword = await bcrypts.hash(password, 10);
        const user = await User.create({username, password:hashedPassword});
        response.status(201).json({message:'Successful', userId:user._id});
    } catch (error){
        request.status(400).json({message:'Error creating User', error:error.message});
    }
}