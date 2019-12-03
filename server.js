// require("dotenv").config({ silent: process.env.NODE_ENV === "production" });

//ALL DEPENDENCIES
const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const morgan = require('morgan')
app.use(morgan('combined'))
const models = require("./models-mongo/index"); 
const server = http.Server(app);
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");

//passport and sessions
var passport = require('./config/passport/passport'); 
var session = require('express-session'); 
const MongoStore = require("connect-mongo")(session);

// For Passport
app.use(session({ 
    secret: 'keyboard cat', 
    store: new MongoStore({ mongooseConnection: models}),
    resave: false, 
    saveUninitialized: false 
})); 

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require("./controllers/socket")(server);
const clientDir = path.join(__dirname, "../client");
const PORT = process.env.PORT || 8000;
app.use(cors());

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

// Express middleware that allows POSTing data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use the cookie-parser to help with auth token,
// it must come before the customAuthMiddleware
app.use(cookieParser());

// serve up the public folder so we can request static
// assets from the client
app.use("/assets", express.static(clientDir));

// Start the API server
server.listen(PORT, function(res, err) {
	console.log(`🌎  ==> bWoke Server now listening on PORT ${PORT}!`);

	if (err) {
		console.err("there is an ERROR", err)
	}
  });

