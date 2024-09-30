// import mongoose from 'mongoose'

// const VocabSchema =  new mongoose.Schema({
//     word:{
//         type:String,
//         required: true
//     },

//     transaltion:{
//         type: String,
//         required: true
//     },

//     difficulty:{
//         type: String,
//         enum: ['beginner', 'intermediate', 'advanced'],
//         default: 'beginner',
//     },

//     imageUrl: String,
//     audioUrl: String
// })


// export default mongoose.models.Vocabulary || mongoose.model('Vocabulary', VocabSchema);



import mongoose from 'mongoose';

const VocabularySchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique:true,
  },
  translation: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  audio: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  },
});

export default mongoose.models.Vocabulary || mongoose.model('Vocabulary', VocabularySchema);