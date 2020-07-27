const axios = require("axios");

const API_SECRET = "1034174341:AAEU_XhxGFzwTNpHEFJ8Y_R71aQ6BLJdEMw";

const TELE_URL = `https://api.telegram.org/bot${API_SECRET}`;

const sendMessage = (userid, message) => {
	const data = {
		chat_id: userid,
		text: message
	}
	axios.post(`${TELE_URL}/sendMessage`, data)
		.catch(err => console.log(err));
}

// Get TelegramID: https://t.me/userinfobot
const TELEGRAM_ID = 0 // Insert ur id here

sendMessage(TELEGRAM_ID, "hi there");

