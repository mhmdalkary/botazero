const axios = require("axios");

module.exports.config = {
	name: "سيم",
	version: "1",
	hasPermission: 0,
	credits: "Grey/api by jerome",
	description: "Simsimi",
	usePrefix: false,
    usages: "Message",
	commandCategory: "🄰🄸",
	cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
	try {
		let message = args.join(" ");
		if (!message) {
			return api.sendMessage(`Please put Message`, event.threadID, event.messageID);
		}

		const response = await axios.get(`https://heckermenpro-2--indayaypangitna.repl.co/get?message=${message}`);
		const respond = response.data.response;
		api.sendMessage(respond, event.threadID, event.messageID);
	} catch (error) {
		console.error("An error occurred:", error);
		api.sendMessage("Oops! Something went wrong.", event.threadID, event.messageID);
	}
};