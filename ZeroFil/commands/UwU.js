const fs = require("fs");
module.exports.config = {
	name: "uwu",
    version: "1.0.2",
	hasPermssion: 0,
	credits: "Cjas",
	description: "no prefix",
	commandCategory: "🄶🄰🄼🄴",
usePrefix: true,
	usages: "Yo Yo",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("UwU")==0 || (event.body.indexOf("اواو")==0 || (event.body.indexOf("Ara")==0 || (event.body.indexOf("ara")==0)))) {
		var msg = {
				body: "UwU~~",
				attachment: fs.createReadStream(__dirname + `/noprefix/UwU.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😸", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

                                                                                }