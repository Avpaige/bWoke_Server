const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define userSchema
const chatSchema = new Schema({


    username: {
        type: String,
        allowNull: false,
    },

    message: {

        type: String,
        unique: false,
        allowNull: false,
    },

    // createdAt: {
    //     type: "TIMESTAMP",
    //     defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    // }

});


const chat = mongoose.model('chat', chatSchema)
module.exports = chat;
