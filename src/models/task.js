const mongoose = require('mongoose');
const Schema = mongoose.Schema

const taskSchema = new Schema({
    
    description: {
        type: String,
        required: true
    },
    creationDate: {
        type: String,
        required: true
    },
    done:{
        type: Boolean,
        required: true,
        default: false
    },
    finishDate: {
        type: String
    },  
    project: {
        ref: "Project",
        type: Schema.Types.ObjectId
    },  

});

module.exports = mongoose.model('Task', taskSchema);