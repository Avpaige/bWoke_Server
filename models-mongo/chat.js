const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define userSchema
const chatSchema = new Schema({


    username: {
        type: String,
        allowNull: false,
    },

    text: {

        type: String,
        unique: false,
        allowNull: false,
    },

    createdAt: {
        type: Date, 
        default: Date.now 
    }

});


const chat = mongoose.model('chat', chatSchema)
module.exports = chat;
