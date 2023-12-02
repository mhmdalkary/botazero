module.exports.config = {
	name: "ياريم",
	version: "1.1.1",
	hasPermssion: 0,
	credits: "John Lester",
	description: "بوت قائلا",
  usePrefix:false,
	commandCategory: "🄶🄰🄼🄴",
	usages: "[نص/رسالة/دردشة]",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
var say = args.join(" ")
	if (!say) api.sendMessage("من فضلك أدخل رسالة", event.threadID, event.messageID)
	else api.sendMessage(`${say}`, event.threadID, event.messageID);
                       }
