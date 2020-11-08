const mongoose = require('mongoose');
const Schema = mongoose.Schema

const projectSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },  
    user: {
        ref: "User",
        type: Schema.Types.ObjectId
    },  
    tasks: [{
        ref: "Task",
        type: Schema.Types.ObjectId
    }]

});

module.exports = mongoose.model('Project', projectSchema);