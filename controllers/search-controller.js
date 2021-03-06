
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
            .find({ celebrity: search })
            .then(results => {
                console.log(results)
                // if (results === []) {
                //     res.json({ data: "none" });
                // } else {
                res.json(results)
                // }

            })
            .catch(err => {
                // res.status(422)
                res.json({ data: "none" });
                console.log("create volunteer", err)
            });
    },

    // (GET) - GET CHARITY FROM api (DONE)
    getCharity: function (req, res) {
        const search = req.params.search
        const url = `https://api.data.charitynavigator.org/v2/Organizations?app_id=${process.env.CHARITY_ID}&app_key=${process.env.CHARITY_API}&pageSize=1&pageNum=1&search=${search}&searchType=NAME_ONLY&rated=true`
        axios
            .get(url)
            .then((response) => {
                let name = response.data[0].organization.charityName
                let cause = response.data[0].cause.causeName
                let mission = response.data[0].mission
                let url = response.data[0].websiteURL
                let tagline = response.data[0].tagLine

                let charityObject = {
                    name: name,
                    cause: cause,
                    mission: mission,
                    url: url,
                    tagline: tagline
                }
                res.json(charityObject)

            })
            .catch(err => {
                res.json({ data: "none" });
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

                let name = response.data[0].organization.charityName
                let cause = response.data[0].cause.causeName
                let mission = response.data[0].mission
                let url = response.data[0].websiteURL
                let tagline = response.data[0].tagLine

                let charityObject = {
                    name: name,
                    cause: cause,
                    mission: mission,
                    url: url,
                    tagline: tagline
                }

                resultsList.push(charityObject)

                db.Celeb
                    .find({ celebrity: search })
                    .then(results => {
                        console.log(results)

                        for (let result of results) {
                            resultsList.push(result)
                        }

                        if (resultsList === []) {
                            res.json({ data: "none" });
                        } else {
                            res.json(resultsList)
                        }

                    })
                    .catch(err => {
                        // res.status(422)
                        res.json({ data: "none" });
                        console.log("", err)
                    });



            })

            .catch(err => {
                // res.status(422);
                res.json({ data: "none" });
                console.log(err)
            });



    },
    addCeleb: function (req, res) {
        const celebName = req.body.celeb
        const charityname = req.body.charity
        const cause = req.body.cause
        const mission = req.body.mission
        const url = req.body.url
        const tagline = req.body.tagLine

        const celeb = {
            celebrity: celebName,
            name: charityname,
            cause: cause,
            mission: mission,
            url: url,
            tagline: tagline
        }


        // console.log(search)
        db.Celeb
            .create(celeb)
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                // res.status(422)
                res.json({ data: "none" });
                console.log("create volunteer", err)
            });
    }

};