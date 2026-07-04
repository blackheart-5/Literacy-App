import mongoose from 'mongoose';
// import User from './Vocabulary';

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    languages: [String], // Optional field for languages

    wordsLearned: {
         type: Number, 
         default: 0 
    } // Optional field for word count

    // progress:{
    //     type:Map,
    //     of:Number,
    //     default:{},
    // },

    // level:{
    //     type: Number,
    //     default: 1,
    // },
});

// try {
//   // Check if the model already exists, or create a new one
//   const User_model = mongoose.models.User || mongoose.model('User', UserSchema);
  
// } catch (error) {
//   console.error('Error creating or retrieving the User model:', error);
// }
const User = mongoose.models.User || mongoose.model('User', UserSchema);
//let User = User_model
export default User