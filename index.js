require('dotenv').config();
const Telegram = require("./telegram");
var bodyParser = require('body-parser');
var express = require('express');
const { checkCommands } = require('./telegram');

const app = express();

const PRODUCTION = false;

if (PRODUCTION) {
	// Bodyparser middleware 
	//   -> it passes through here before arriving as req (req.body)
	app.use(
	bodyParser.urlencoded({
		extended: false,
	})
	);
	app.use(bodyParser.json());

	app.post('/', (req, res) => {
		// Web hooks
		const { message } = req.body;
		Telegram.checkCommands(null, message);
		// res.sendStatus(200);
		res.send("webhooker");
	});

	const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
	app.listen(port, () =>
	console.log(`Server up and running on port ${port} !`)
	);
} else {
	Telegram.getUpdates(checkCommands);
}
