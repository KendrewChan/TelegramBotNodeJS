require('dotenv').config();
const axios = require("axios");

const TELE_URL = `https://api.telegram.org/bot${process.env.API_SECRET}`;

const Telegram = {
	sendMessage: (userid, message) => {
		const data = {
			chat_id: userid,
			text: message
		}
		axios.post(`${TELE_URL}/sendMessage`, data)
			.catch(err => console.log(err));
	},
	checkCommands: (err, message) => {
		if (err) {
			console.log(err);
		} else {
			if (message.entities != undefined && message.entities[0].type === 'bot_command') {
				// Check whether command exists && if it's a command
				const command = message.text;
				const chatID = message.chat.id;
				switch (command) {
					case "/help":
						Telegram.sendMessage(chatID, "You've just typed /help :D");
						break;
					default:
						Telegram.sendMessage(chatID, "Sorry! That's an invalid command :(");
						break;
				}
			}
		}
	},
	getUpdates: (callback) => {
		axios.get(`${TELE_URL}/getUpdates`)
			.then(res => {
				const data = res.data.result;
				data.forEach(msg => {
					callback(null, msg.message);
				})
				const offset = data[data.length-1].update_id + 1
				axios.get(`${TELE_URL}/getUpdates?offset=${offset}`)
					.catch(err => console.log(err));
				// This axios command is useless once we do webhooks
			})
			.catch(err => callback(err, null));
	},
}

module.exports = Telegram;
