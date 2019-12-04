const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
    
    title: {
        type: String,
        required: true,
        Default: false
    },
    name: {
        type: String, 
        required: true,
        Default: false
    },
    description: {
        type: String, 
        required: true,
        Default: false
    },
    date: {
        type: Date,
        Default: Date.now
    }
})


    const Events = mongoose.model('events', eventsSchema);

    module.exports = Events;
    