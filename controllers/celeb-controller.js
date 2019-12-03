
const db = require("../models-mongo")

module.exports = {

    // (POST) - POST EVENT ON FEED PAGE
    getCelebrity: function (req, res) {
        const search = req.params.search

        // console.log(volunteer)
        db.Celeb
            .find({
                $or: [
                    { "celebrity": { "$in": [search] } },
                    { "name": { "$in": [search] } },
                    { "cuase": { "$in": [search] } },
                    { "mission": { "$in": [search] } },
                ]
            })
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                res.status(422)
                console.log("create volunteer", err)
            });
    }

};