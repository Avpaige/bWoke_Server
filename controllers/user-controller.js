const uuidv4 = require('uuid/v4');
const db = require("../models-mysql")
const bcrypt = require("bcrypt");

module.exports = {

    login: function (req, res) {
        const { username, password } = req.body;

        // if the username / password is missing, we use status code 400
        // indicating a bad request was made and send back a message
        if (!username || !password) {
            return res.status(400).send("Request missing username or password param");
        }

        db.users
            .findOne({ where: { username: username } })
            .then(results => {
                // res.json(results)
                // console.log(hash);
                let enteredPass = results.password;

                bcrypt.compare(password, enteredPass, function (err, confirm) {
                    if (confirm) {
                        res.json({
                            username: results.username
                        });
                    } else {
                        res.json({ error: "true" });
                    }
                })
            })
            .catch(err => {
                console.log(err);
                return res.status(400).send(err);
            });
    },

    signup: function (req, res) {
        // hash the password provided by the user with bcrypt so that
        // const hash = bcrypt.hashSync(req.body.password, 10);
        let hash;
        let username = req.body.username;
        let password = req.body.password;

        // SEARCH THROUGH USERNAME AND MAKE SURE IT IS UNIQUE
        db.users.findAll({ where: { username: username } }).then(results => {
            // console.log(results)
            // res.send({result: results.length})
            if (results.length === 0) {
                // IF NO RESULTS THEN SEND SAVE
                try {
                    hash = bcrypt.hashSync(password, 10);
                    console.log(hash);

                    db.users
                        .create({
                            username: username,
                            password: hash
                        })
                        .then(results => {
                            // console.log(results)
                            // res.send(results)
                            let username = results.username;
                            return res.json({ username: username });
                        });
                } catch (err) {
                    console.log(err);
                    return res.status(400).send(err);
                }

            } else {
                // res.send({ results: results });
                res.json({ username: "taken" });

            }
        });
    }

};