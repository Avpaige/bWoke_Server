const db = require("../models-mongo")

module.exports = {

    // (POST) - POST EVENT ON FEED PAGE
    postMessage: function (req, res) {
        let message = req.body.message;
        let user = req.body.user;
        let room = req.body.room

        let messagePost = {
            message: message,
            username: user
        }

        db.Messages.create({ messagePost })
            .then(createdMessage => {
                return db.ChatRoom.findOneAndUpdate({ room: room }, { $push: { messages: createdMessage._id } }, { new: true })
                    .then(addedNote => {
                        console.log("Note added", addedNote);
                        response.sendStatus(200)
                        // console.log(addedNote)
                    })
                    .catch(err => {
                        console.log(err);
                        response.sendStatus(500);
                    });
            })
    },

    // (GET) - all events
    getMessages: function (req, res) {
        let room = req.params.room

        db.Article.findOne({ room: room })
            .populate("messages")
            .then(foundChats => {
                // console.log(handlebarsObject)
                res.json(foundChats);

                console.log(foundChats)

                // response.json(handlebarsObject)
                response.status(200);
            })
            .catch(err => {
                console.log(err);
                response.status(500);
            })
    },

};