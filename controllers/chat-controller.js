const uuidv4 = require('uuid/v4');
const db = require("../models-mongo")

module.exports = {

    // (POST) - POST EVENT ON FEED PAGE
    postMessage: function (req, res) {
        // const chatMessage = {
        //     username: req.body.userID,
        //     message: req.body.message
        // };

        // // console.log(volunteer)
        // db.Chat
        //     .create(chatMessage)
        //     .then(dbevent => {
        //         console.log("added", dbevent)
        //     })
        //     .catch(err => {
        //         res.status(422)
        //         console.log("create volunteer", err)
        //     });
    },

    // (GET) - all events
    getMessages: function (req, res) {
        // db.Chat  
        //     .find({})
        //     .sort({ '_id': 1 })
        //     .then(events => {
        //         res.json(events)
        //         console.log("allevents", events)
        //     })
        //     .catch(err => {
        //         res.status(422)
        //         console.log("get volunteer", err)
        //     });
    },

};