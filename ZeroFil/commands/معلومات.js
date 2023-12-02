module.exports.config = {
	name: "المطور",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "Joshua Sy", //don't change the credits please
	description: " معلومات حول المشرف و البوت .",
  usePrefix: false,
	commandCategory: "🅂🅈🅂🅃🄴🄼",
	cooldowns: 1,
	dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
var juswa = moment.tz("Africa/Casablanca").format("『D/MM/YYYY』 【HH:mm:ss】");
var link = ["https://i.imgur.com/pjOQJ2k.jpeg","https://i.imgur.com/pjOQJ2k.jpeg", "https://i.imgur.com/pjOQJ2k.jpeg",];
var callback = () => api.sendMessage({body:`➢🄾🅆🄽🄴🅁   🄰🄽🄳   🄱🄾🅃  🄸🄽🄵🄾

⁂إسم البوت: ${global.config.BOTNAME}

✡بادئة البوت: ${global.config.PREFIX}

✫🌼 :♦️«benzo naw»♦️,

✬رابط فيسبوك󰥬: ♣️
https://www.facebook.com/gemar.pro.52 


➳الإصدار المحدث ✨: 30.0.1

تم التعديل من طرف: benzo naw 🔰

✬هذا هو📜: ${juswa} 

➳البوت يجري في⌚ ${hours}:${minutes}:${seconds}.

🔻البوت تحت حماية المشرف 🔺 

✫شكرا على إستخدام ${global.config.BOTNAME} بوت!`,attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.jpg")).on("close",() => callback());
   };