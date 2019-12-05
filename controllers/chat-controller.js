const db = require("../models-mongo")

module.exports = {

    // (POST) - POST EVENT ON FEED PAGE
    postMessage: function (req, res) {
        let message = req.body.message;
        let user = req.body.user;
        let room = req.body.room

        let chatroom = {
            room: room
        }

        let messagePost = {
            message: message,
            username: user
        }


        db.Room.find({ room: room })
            .then(roomFound => {
                // res.json({length: room.length})
                if (roomFound.length === 0) {
                    db.Room.create(chatroom)
                        .then(roomMade => {
                            // res.json(roomMade)
                            db.Chat.create(messagePost)
                                .then(createdMessage => {
                                    // res.json(createdMessage)
                                    db.Room.updateOne({ room: room }, { $push: { messages: createdMessage._id } }, { new: true })
                                        .then(addedNote => {
                                            console.log("Note added", addedNote);
                                            // res.sendStatus(200)
                                            res.json(addedNote)
                                            // console.log(addedNote)
                                        })
                                        .catch(err => {
                                            res.json({ data: "error" })
                                            console.log(err)
                                        });
                                })
                        })
                        .catch((err) => {
                            res.json({ data: "error" })
                            console.log(err)
                        })

                } else {
                    db.Chat.create(messagePost)
                        .then(createdMessage => {
                            // res.json(createdMessage)
                            db.Room.updateOne({ room: room }, { $push: { messages: createdMessage._id } }, { new: true })
                                .then(addedNote => {
                                    console.log("Note added", addedNote);
                                    // res.sendStatus(200)
                                    res.json(addedNote)
                                    // console.log(addedNote)
                                })
                                .catch(err => {
                                    res.json({ data: "error" })
                                    console.log(err)
                                });
                        })
                }

            })
            .catch(err => {
                console.log("room", err);
                res.sendStatus(500);
            });




    },

    // (GET) - all events
    getMessages: function (req, res) {
        let room = req.params.room

        db.Room.find({ room: room })
            .populate("messages")
            .then(foundChats => {
                // console.log(handlebarsObject)
                if (foundChats[0].messages.length > 0) {

                    res.json(foundChats[0].messages);
                }

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