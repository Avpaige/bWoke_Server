const express = require('express');
const router = express.Router();
const searchController = require("../controllers/search-controller");

// Matches with "/search/celeb/:SEARCH" 
router
    .route("/celeb/:search")
    .get(searchController.getCeleb)

// Matches with "/search/:SEARCH" 
router
    .route("/:search")
    .get(searchController.getSearch)

// Matches with "search/CHARITY/:SEARCH" 
router
    .route("/charity/:search")
    .get(searchController.getCharity)

// POST AND ADD TO DATABASE with "/search/celeb/"
router
    .route("/celeb")
    .post(searchController.addCeleb)

    // USE THIS SET UP TO ADD THE INFORMATION!
// {
//     "celeb": "celebrity",
//     "charity": "charity",
//     "cause": "cause",
//     "mission": "mission",
//     "url": "url",
//     "tagLine": "tagLine"

// }

module.exports = router;

