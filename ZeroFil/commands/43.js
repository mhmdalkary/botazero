module.exports.config = {
  name: "fcmp4",
  version: "1.0.",
  hasPermssion: 0,
  credits: "jameslim",
  description: "تحميل فيديو إنطفاقا من رابط فيسبوك",
  commandCategory: "🄼🄴🄳🄸🄰",
  usages: "وسائط",
  usePrefix: false,
  cooldowns: 0
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require('axios');
const fs = require('fs-extra');
  let link = args.join(" ");
  
  if (!args[0]) {
    api.sendMessage("يرجى وضع رابط فيديو صالح على للفيسبوك", event.threadID, event.messageID);
    return;
  }
  
  api.sendMessage("⬇️ جاري تنزيل الفيديو، يرجى الانتظار...", event.threadID, event.messageID);
  
  try {
    let path = __dirname + `/cache/fbVID.mp4`;
  
    const aa = await axios.get(`https://api.samirthakuri.repl.co/api/videofb?url=${encodeURI(link)}`);
    
    const vid = (await axios.get(aa.data.video, { responseType: "arraybuffer", })).data;
    
    fs.writeFileSync(path, Buffer.from(vid, 'utf-8'));
    
    api.sendMessage({
      body: `تم تحميل الفيديو بنجاح ✅`,
      attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    
  } catch (e) {
     api.sendMessage(`${e}`, event.threadID, event.messageID);
  };
  
};