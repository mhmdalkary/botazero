module.exports.config = {
	name: "اوامر",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "J",
	description: "Beginner's Guide",
	usages: "[all/-a] [number of pages]",
	commandCategory: "🅂🅈🅂🅃🄴🄼",
  usePrefix: true,
	cooldowns: 5
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
	let num = parseInt(event.body.split(" ")[0].trim());
	(handleReply.bonus) ? num -= handleReply.bonus : num;
	let msg = "";
	let data = handleReply.content;
	let check = false;
	if (isNaN(num)) msg = "Please enter a number you want";
	else if (num > data.length || num <= 0) msg = "The number you selected is not in the list, please try again";
	else {
		const { commands } = global.client;
		let dataAfter = data[num-=1];
		if (handleReply.type == "cmd_info") {
			let command_config = commands.get(dataAfter).config;
			msg += ` 『  ${command_config.commandCategory.toUpperCase()}   』   \n`;
			msg += `\nCommand name: ${dataAfter}`;
			msg += `\nDescription: ${command_config.description}`;
			msg += `\nUsage: ${(command_config.usages) ? command_config.usages : ""}`;
			msg += `\nCooldown: ${command_config.cooldowns || 5}s`;
			msg += `\nHas Permission: ${(command_config.hasPermssion == 0) ? "User" : (command_config.hasPermssion == 1) ? "Group administrator" : "Bot admin"}`;
      msg += `\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏`
			msg += `\n\n» Module code by ${command_config.credits} «`;
		} else {
			check = true;
			let count = 0;
			msg += `» ${dataAfter.group.toUpperCase()} «\n`;

			dataAfter.cmds.forEach(item => {
				msg += `\n ${count+=1}. » ${item}: ${commands.get(item).config.description}`;
			})
			msg += "\n\n╭──────╮\n    Reply \n╰──────╯ 𝔪𝔢𝔰𝔰𝔞𝔤𝔢 𝔟𝔶 𝔫𝔲𝔪𝔟𝔢𝔯 𝔱𝔬 𝔰𝔢𝔢 𝔠𝔬𝔪𝔪𝔞𝔫𝔡 𝔡𝔢𝔱𝔞𝔦𝔩𝔰 𝔞𝔫𝔡 𝔥𝔬𝔴 𝔱𝔬 𝔲𝔰𝔢 𝔠𝔬𝔪𝔪𝔞𝔫𝔡";
		}
	}
	const axios = require('axios');
	const fs = require('fs-extra');
	const img = ["https://i.imgur.com/XOo1ttb.jpeg", "https://i.imgur.com/azIizxs.jpg", "https://i.imgur.com/HwRt7HA.jpg", "https://i.imgur.com/rf0D95J.jpg", "https://i.imgur.com/PmDb6Iz.jpg", "https://i.imgur.com/QmQFbIq.jpg", "https://i.imgur.com/AeiWDPr.jpg", "https://i.imgur.com/6QOVxwW.jpg", "https://i.imgur.com/LrvgN4z.jpg", "https://i.imgur.com/iTvfcD5.jpg", "https://i.imgur.com/psLYO3q.jpg"]
	var path = __dirname + "/cache/menu.jpg"
	var rdimg = img[Math.floor(Math.random() * img.length)]; 
	const imgP = []
	let dowloadIMG = (await axios.get(rdimg, { responseType: "arraybuffer" } )).data; 
	fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8") );
	imgP.push(fs.createReadStream(path))
	var msgg = {body: msg, attachment: imgP}
	return api.sendMessage(msgg, event.threadID, (error, info) => {
		if (error) console.log(error);
		if (check) {
			global.client.handleReply.push({
				type: "cmd_info",
				name: this.config.name,
				messageID: info.messageID,
				content: data[num].cmds
			})
		}
	}, event.messageID);
}

module.exports.run = async function({ api, event, args }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	const axios = require('axios');
	const fs = require('fs-extra');
	const imgP = []
	const img = ["https://i.imgur.com/XOo1ttb.jpeg", "https://i.imgur.com/azIizxs.jpg", "https://i.imgur.com/RsZWObd.jpg", "https://i.imgur.com/rf0D95J.jpg", "https://i.imgur.com/PmDb6Iz.jpg", "https://i.imgur.com/QmQFbIq.jpg", "https://i.imgur.com/AeiWDPr.jpg", "https://i.imgur.com/6QOVxwW.jpg", "https://i.imgur.com/LrvgN4z.jpg", "https://i.imgur.com/iTvfcD5.jpg", "https://i.imgur.com/psLYO3q.jpg"]
	var path = __dirname + "/cache/menu.jpg"
	var rdimg = img[Math.floor(Math.random() * img.length)]; 

   	let dowloadIMG = (await axios.get(rdimg, { responseType: "arraybuffer" } )).data; 
        fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8") );
        imgP.push(fs.createReadStream(path))
	const command = commands.values();
	var group = [], msg = "» 𝔏𝔦𝔰𝔱 𝔬𝔣 𝔠𝔬𝔪𝔪𝔞𝔫𝔡𝔰 𝔞𝔳𝔞𝔦𝔩𝔞𝔟𝔩𝔢 «\n";
	let check = true, page_num_input = "";
	let bonus = 0;

	for (const commandConfig of command) {
		if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
		else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
	}

	if (args[0] && ["all", "-a"].includes(args[0].trim())) {
		let all_commands = [];
		group.forEach(commandGroup => {
			commandGroup.cmds.forEach(item => all_commands.push(item));
		});
		let page_num_total = Math.ceil(all_commands.length / 2222222222);
		if (args[1]) {
			check = false;
			page_num_input = parseInt(args[1]);
			if (isNaN(page_num_input)) msg = "Please choose number";
			else if (page_num_input > page_num_total || page_num_input <= 0) msg = "The number you selected is not in the list, please try again";
			else check = true;
		}
		if (check) {
		index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
			bonus = index_start;
			index_end = (index_start + 2222222222 > all_commands.length) ? all_commands.length : index_start + 2222222222;
			all_commands = all_commands.slice(index_start, index_end);
			all_commands.forEach(e => {
				msg += `\n${index_start+=1}. » ${e}: ${commands.get(e).config.description}`;
			})
			msg += `\n\nPage ${page_num_input || 1}/${page_num_total}`;
			msg += `\nTo view other pages, use: ${prefix}𝔪𝔢𝔫𝔲 [𝔞𝔩𝔩/-𝔞] [𝔫𝔲𝔪𝔟𝔢𝔯 𝔬𝔣 𝔭𝔞𝔤𝔢𝔰]`;
      msg += `\𝔜𝔬𝔲 𝔠𝔞𝔫 𝔲𝔰𝔢 ${prefix}اوامر 𝔞𝔩𝔩 𝔱𝔬 𝔰𝔢𝔢 𝔞𝔩𝔩 𝔠𝔬𝔪𝔪𝔞𝔫𝔡𝔰`
			msg += "\n╭──────╮\n     Reply \n╰──────╯𝔪𝔢𝔰𝔰𝔞𝔤𝔢 𝔟𝔶 𝔫𝔲𝔪𝔟𝔢𝔯 𝔱𝔬 𝔰𝔢𝔢 𝔠𝔬𝔪𝔪𝔞𝔫𝔡 𝔡𝔢𝔱𝔞𝔦𝔩𝔰 𝔞𝔫𝔡 𝔥𝔬𝔴 𝔱𝔬 𝔲𝔰𝔢 𝔠𝔬𝔪𝔪𝔞𝔫𝔡";	}
		var msgg = {body: msg, attachment: imgP}
		return api.sendMessage(msgg, threadID, (error, info) => {
			if (check) {
				global.client.handleReply.push({
					type: "cmd_info",
					bonus: bonus,
					name: this.config.name,
					messageID: info.messageID,
					content: all_commands
				})
			}
		}, messageID)
	}

	let page_num_total = Math.ceil(group.length / 2222222222);
	if (args[0]) {
		check = false;
		page_num_input = parseInt(args[0]);
		if (isNaN(page_num_input)) msg = "Vui lòng chọn số";
		else if (page_num_input > page_num_total || page_num_input <= 0) msg = "The number you selected is not in the list, please try again";
		else check = true;
	}
	if (check) {
		index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
		bonus = index_start;
		index_end = (index_start + 2222222222 > group.length) ? group.length : index_start + 2222222222;
		group = group.slice(index_start, index_end);
		group.forEach(commandGroup => msg += `\n${index_start+=1} 👉🏻 ◇◇◇◇◇※★※◇◇◇◇◇ ༺ཌ༈ ${commandGroup.group.toUpperCase()} ༈ད༻`);
		msg += `\n\n𝔓𝔞𝔤𝔢【${page_num_input || 1}/${page_num_total}】`;
		msg += `\ne𝔗𝔬 𝔳𝔦𝔢𝔴 𝔬𝔱𝔥𝔢𝔯 𝔭𝔞𝔤𝔢𝔰, 𝔲𝔰𝔢: ${prefix}𝔪𝔢𝔫𝔲 [𝔞𝔩𝔩/-𝔞] [𝔫𝔲𝔪𝔟𝔢𝔯 𝔬𝔣 𝔭𝔞𝔤𝔢𝔰]`;
    msg += `\n𝔜𝔬𝔲 𝔠𝔞𝔫 𝔲𝔰𝔢 ${prefix}𝔥𝔢𝔩𝔭2 𝔞𝔩𝔩 𝔱𝔬 𝔰𝔢𝔢 𝔞𝔩𝔩 𝔠𝔬𝔪𝔪𝔞𝔫𝔡𝔰`
		msg += `\n╭──────╮\n       『ℜ𝔢𝔭𝔩𝔶』 \n╰──────╯ 𝔪𝔢𝔰𝔰𝔞𝔤𝔢 𝔟𝔶 𝔫𝔲𝔪𝔟𝔢𝔯 𝔱𝔬 𝔳𝔦𝔢𝔴 𝔠𝔬𝔪𝔪𝔞𝔫𝔡𝔰 𝔟𝔶 『𝐛𝐞𝐧𝐳𝐨』`;
	}
	var msgg = {body: msg, attachment: imgP}
	return api.sendMessage(msgg, threadID, async (error, info) => {
		global.client.handleReply.push({
			name: this.config.name,
			bonus: bonus,
			messageID: info.messageID,
			content: group
		})
	});
    }