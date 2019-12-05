const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
    
    title: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    date: {
        type: String,
        required: true
    }
})


    const events = mongoose.model('events', eventsSchema);

    module.exports = events;
    