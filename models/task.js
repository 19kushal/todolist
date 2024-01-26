const mongoose=require('mongoose');

const Task = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    isComplete: {
        type: Boolean,
        required: true,
        default: false
    },
    category: {
        type: String,
        enum: ['urgent','important','save for later']
    }
});

module.exports = mongoose.model('Task', Task);