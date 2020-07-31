require('dotenv').config();
const axios = require("axios");

// Setting up hooks: https://medium.com/@xabaras/setting-your-telegram-bot-webhook-the-easy-way-c7577b2d6f72

const TELE_URL = `https://api.telegram.org/bot${process.env.API_SECRET}`;

const sendMessage = (userid, message) => {
	const data = {
		chat_id: userid,
		text: message
	}
	axios.post(`${TELE_URL}/sendMessage`, data)
		.catch(err => console.log(err));
}

const getUpdates = (callback) => {
	axios.get(`${TELE_URL}/getUpdates`)
		.then(res => {
			const data = res.data.result;
			data.forEach(msg => {
				callback(null, msg);
			})
			const offset = data[data.length-1].update_id + 1
			axios.get(`${TELE_URL}/getUpdates?offset=${offset}`)
				.catch(err => console.log(err));
			// This axios command is useless once we do webhooks
		})
		.catch(err => callback(err, null));
}

const checkCommands = (err, result) => {
	if (err) {
		console.log(err);
	} else {
		const message = result.message;
		if (message.entities != undefined && message.entities[0].type === 'bot_command') {
			// Check whether command exists && if it's a command
			const command = message.text;
			const chatID = message.chat.id;
			switch (command) {
				case "/help":
					sendMessage(chatID, "You've just typed /help :D");
					break;
				default:
					sendMessage(chatID, "Sorry! That's an invalid command :(");
					break;
			}
		}
	}
}

getUpdates(checkCommands);
// Sends updates based upon commands by user


// Get TelegramID: https://t.me/userinfobot
const TELEGRAM_ID = 0 // Insert ur id here

// sendMessage(TELEGRAM_ID, "hi there");

