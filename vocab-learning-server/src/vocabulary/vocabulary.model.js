import mongoose from 'mongoose';

const VocabularySchema = mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    meaning: {
        type: String,
        required: true
    }, 
    wordType: {
        type: String,
        required: false
    },
    example: { 
        type: String,
        required: false
    },
    folder: {
        type: String,
        required: true
    }
})

const Vocabulary = mongoose.model('Vocabulary', VocabularySchema);

export default Vocabulary