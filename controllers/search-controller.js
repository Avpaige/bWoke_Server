
const db = require("../models-mongo")
const axios = require("axios")
const dotenv = require("dotenv");
dotenv.config({ path: '../env' });

module.exports = {

    // (GET) - GET CELEB FROM DATABASE
    getCeleb: function (req, res) {
        const search = req.params.search

        // console.log(search)
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
    },

    // (GET) - GET CHARITY FROM api
    getCharity: function (req, res) {
        const search = req.params.search
        const url = `https://api.data.charitynavigator.org/v2/Organizations?app_id=${process.env.CHARITY_ID}&app_key=${process.env.CHARITY_API}&pageSize=1&pageNum=1&search=${search}&searchType=NAME_ONLY&rated=true`

        axios
            .get(url)
            .then((response) => {
                let charityList = []
                for (let charity of response) {
                    let name = charity.organization.charityName
                    let cuase = charity.cause.causeName
                    let mission = charity.mission

                    let charityObject = {
                        name: name,
                        cuase: cuase,
                        mission: mission
                    }

                    charityList.push(charityObject)
                }

                res.json(charityList)
            })
            .catch(err => {
                res.status(422);
                console.log(err)
            });
    },

    // (GET) - GET CHARITY FROM api
    getSearch: function (req, res) {
        const search = req.params.search
        const url = `https://api.data.charitynavigator.org/v2/Organizations?app_id=${process.env.CHARITY_ID}&app_key=${process.env.CHARITY_API}&pageSize=1&pageNum=1&search=${search}&searchType=NAME_ONLY&rated=true`
        let resultsList = []

        axios
            .get(url)
            .then((response) => {

                for (let charity of response) {
                    let name = charity.organization.charityName
                    let cuase = charity.cause.causeName
                    let mission = charity.mission

                    let charityObject = {
                        name: name,
                        cuase: cuase,
                        mission: mission
                    }

                    resultsList.push(charityObject)
                }

            })
            .then(() => {
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
                        for (let result of results) {
                            resultsList.push(result)
                        }

                    })
                    .catch(err => {
                        res.status(422)
                        console.log("create volunteer", err)
                    });

            })
            .then(() => res.json(resultsList))
            .catch(err => {
                res.status(422);
                console.log(err)
            });



    }

};