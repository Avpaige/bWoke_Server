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

        db.ChatRoom.find({ room: room })
            .then(room => {
                if (room === []) {
                    db.ChatRoom.create({ room: room })
                }
            })
            .then(() => {
                db.Messages.create({ messagePost })
                    .then(createdMessage => {
                        return db.ChatRoom.findOneAndUpdate({ room: room }, { $push: { messages: createdMessage._id } }, { new: true })
                            .then(addedNote => {
                                console.log("Note added", addedNote);
                                // res.sendStatus(200)
                                res.json(addedNote)
                                // console.log(addedNote)
                            })
                            .catch(err => {
                                console.log(err);
                                res.sendStatus(500);
                            });
                    })
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });


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