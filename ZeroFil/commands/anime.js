module.exports.config = {
	name: "انمي", 
  version: "1.0.0", 
  permission: 0,
  credits: "benzo",
  description: "Random anime video",
  commandCategory: "🄼🄴🄳🄸🄰", 
  usages: "", 
  usePrefix: true,
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "fs":""
  }
};

const videoDATA = "https://videos-api--xaikon4y4n.repl.co/video/anime";

module.exports.onLoad = ({}) => {
  if (!global.nodemodule["fs"].existsSync(__dirname + '/ainme')) {
    global.nodemodule["fs"].mkdirSync(__dirname + '/ainme');
  }
  global.nodemodule["fs"].readdirSync(__dirname + '/ainme').forEach(file => {
    global.nodemodule["fs"].unlinkSync(__dirname + `/ainme/${file}`);
  })
}

module.exports.run = async ({ api, event }) => {
  global.nodemodule["axios"]
    .get(videoDATA)
    .then(res => {
      global.nodemodule["axios"]
        .get(encodeURI(res.data.data), { responseType: "arraybuffer" })
        .then(ress => {
          let path = __dirname + `/ainme/${Date.now()}.mp4`;
          global.nodemodule["fs"].writeFileSync(path, Buffer.from(ress.data, 'utf-8'));
          api.sendMessage({
            body: "☆《ANIME VIDEO》☆",
            attachment: global.nodemodule["fs"].createReadStream(path)
          }, event.threadID, () => global.nodemodule["fs"].unlinkSync(path), event.messageID);
          return;
        })
        .catch(e => {
          api.sendMessage("Something went wrong...", event.threadID, event.messageID);
          return;
        });
    })
  .catch(e => {
    api.sendMessage("Something went wrong...", event.threadID, event.messageID);
    return;
  });

  return;
}