require("dotenv").config({ silent: process.env.NODE_ENV === "production" });
//ALL DEPENDENCIES
const express = require("express");
const app = express();

const mongoose = require("mongoose");

const cors = require("cors");
const http = require("http");
const morgan = require('morgan')
app.use(morgan('combined'))

const server = http.Server(app);

const bodyParser = require("body-parser");
const path = require("path");

const userController = require("./routes");
require("./controllers/socket")(server);
const mongoRoutes = require("./mongo-routes");

// directory references
const clientDir = path.join(__dirname, "../client");
// set up the Express App
const PORT = process.env.PORT || 8000;
// Requiring our models for syncing
const db = require("./models");
// also udpated force to FALSE so that it wont delete all users everytime the server starts
db.sequelize.sync({ force: false })

app.use(cors());

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});


// Express middleware that allows POSTing data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve up the public folder so we can request static
// assets from the client
// app.use("/assets", express.static(clientDir));

// hook up our controllers (MYSQL)
app.use(userController);
// MONGO ROUTED CONNECTION
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).catch(err => {
	console.log(`Unable to connect to mongoose:: ${err}`)
});
mongoose.Promise = global.Promise;
app.use(mongoRoutes);

// Start the API server
server.listen(PORT, function(res, err) {
	console.log(`🌎  ==> OYA Server now listening on PORT ${PORT}!`);

	if (err) {
		console.err("there is an ERROR", err)
	}
  });

