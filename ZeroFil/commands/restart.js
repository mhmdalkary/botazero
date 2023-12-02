module.exports.config = {
	name: "رستر",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "manhIT",
	description: "Restart Bot",
  usePrefix: true,
	commandCategory: "🅂🅈🅂🅃🄴🄼",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;
	return api.sendMessage(`${global.config.BOTNAME} ساعود يا احبائي...`, threadID, () => process.exit(1));
}