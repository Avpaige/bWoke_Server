const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise

// Define userSchema
const celebritiesSchema = new Schema({


    celebrity: {
        type: String,
        require: true
    },

    // charity name
    name: {

        type: String,
        unique: false,
        required: true
    },

    // charity cause
    cause: {

        type: String,
        unique: false,
        required: false
    },

    // charity mission
    mission: {

        type: String,
        unique: false,
        required: true
    },

    // charity tagline
    tagline: {

        type: String,
        unique: false,
        required: true
    },
  // charity url
    url: {

        type: String,
        unique: false,
        required: true
    },

});

const celeb = mongoose.model('celebrities', celebritiesSchema)
module.exports = celeb;