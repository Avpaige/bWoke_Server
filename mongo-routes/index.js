const path = require("path");
const router = require("express").Router();
const chatRoutes = require("./chat.js");
const eventRoutes = require("./events.js");
const celebEvents = require("./celebrities.js");

//your local database url
//27017 is the default mongoDB port
const localURI = 'mongodb://localhost:27017/bWokedDB' 

mongoose.connect(process.env.MONGODB_URI || localURI, {useNewUrlParser: true})
.then( () => { 

    console.log('Connected to Mongo');
        
    }).catch ( err => {
       
         console.log('error connecting to Mongo: ')
         console.log(err);
         
        });
  
// module.exports = mongoose.connection

router.use("/chat", chatRoutes);
router.use("/events", eventRoutes);
router.use("/celebrity", celebEvents);


module.exports = router;