const uuidv4 = require('uuid/v4');
const db = require("../models-mongo")

module.exports = {

    // (POST) - POST EVENT ON FEED PAGE
    postEvent: function (req, res) {
        const event = {
            title: req.body.title,
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
        };

        // console.log(volunteer)
        db.Event
            .create(event)
            .then(dbevent => {
                console.log("added", dbevent)
            })
            .catch(err => {
                res.status(422)
                console.log("create volunteer", err)
            });
    },

    // (GET) - all events
    getEvents: function (req, res) {
        db.Events  
            .find({})
            .sort({ '_id': -1 })
            .then(events => {
                res.json(events)
                console.log("allevents", events)
            })
            .catch(err => {
                res.status(422)
                console.log("get volunteer", err)
            });
    },

};