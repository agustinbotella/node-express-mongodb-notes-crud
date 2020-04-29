//I first require Mongoose, so I can connect to MongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    tittle: String,
    description: String,
    status: {
        type: Boolean,
        default: true
    }
});

//We export the model as module so other files can use it
//We will use a box called 'tasks'and we will save TaskSchema
module.exports = mongoose.model('tasks', TaskSchema);