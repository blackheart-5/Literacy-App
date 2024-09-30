import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,'Please provide a username'],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },

    progress:{
        type:Map,
        of:Number,
        default:{},
    },

    level:{
        type: Number,
        default: 1,
    },
});


let User;

try {
  // Check if the model already exists, or create a new one
  User = mongoose.model('User', UserSchema);
} catch (error) {
  console.error('Error creating or retrieving the User model:', error);
}




// const User = mongoose.models.User || mongoose.model('User', UserSchema); 

export default User

// export default (mongoose.model('User', UserSchema));

// mongoose.models.UserSchema ||