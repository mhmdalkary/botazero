module.exports.config = {
  name: "قمر",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Rishad",
  description: "Generate moon image based on your information",
  usages: "moonwall name | day | month | year",
  commandCategory: "🄻🄾🄶🄾🅂",
  usePrefix: true,
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const axios = global.nodemodule["axios"];

  try {
    const input = args.join(" ").split(" | ");

    if (input.length !== 4) {
      return api.sendMessage('Invalid format. Please use: /moonwall name | day | month | year', event.threadID);
    }

    const [name, day, month, year] = input;

    const API = `https://for-devs.rishadapis.repl.co/api/moon?name=${encodeURIComponent(name)}&day=${encodeURIComponent(day)}&month=${encodeURIComponent(month)}&year=${encodeURIComponent(year)}&apikey=fuck`;

    const response = await axios.get(API, {
      responseType: 'stream',
      headers: {
        'Content-Type': 'image/png'
      }
    });

    const responseBody = `✅Image Generated\n🔰Name: ${name}\n📆Day: ${day}\n🗓️Month: ${month}\n🎆Year: ${year}`;

    api.sendMessage({
      body: responseBody,
      attachment: response.data,
    }, event.threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while processing the moonwall API', event.threadID);
  }
};