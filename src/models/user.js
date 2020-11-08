const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    
    username: {
        type: Number,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    projects: [{
        ref: "Project",
        type: Schema.Types.ObjectId
    }]

});

module.exports = mongoose.model('User', userSchema);