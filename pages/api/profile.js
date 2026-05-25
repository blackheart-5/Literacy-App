import { getUser } from '@/lib/dal';



export default async function handler(req, res){
    if (req.method !== 'GET'){
        return res.status(405).json({ message: 'Method not allowed' });
    }
    console.log('fetching user');
    try {
        
        const user_instance = await getUser(req);
        if (!user_instance){
            return res.status(401).json({ message: 'Email is required.' });
        }
        // const user = await User.findOne({email });
        // if (!user){
        //     return res.status(404).json({ message: 'User not found.' });
        // }
        return res.status(200).json({success: true, user_instance});
    } catch (error) {
        console.error('Error fetching user session:', error.message);
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
}
