const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'مطور',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Rickciel',
  usePrefix: false,
  description: 'Display bot owner information',
  commandCategory: '🅂🅈🅂🅃🄴🄼',
  usages: '',
  cooldowns: 20
};

module.exports.run = async ({ api, event }) => {
  try {
    const ownerInfo = {
      name: 'benzo nw',
      gender: 'ذكر',
      age: '20',
      height: '187',
      facebookLink: 'https://www.facebook.com/gemar.pro.52',
      status: 'مرتبط'
    };

    const videoUrl = 'https://drive.google.com/uc?export=download&id=1JJwwQDPrHMKzLQq_AYHvlMNLjD-kTIMO'; // Replace with your Google Drive videoid link https://drive.google.com/uc?export=download&id=here put your video id

    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    const response = `
مـ͓̽ـعـ͓̽ـلَوٌمـ͓̽ـآتـ͓̽ـ آلَمـ͓̽ـآلَكـ͓̽ـ:
آسِمً: ${ownerInfo.name}
النوع: ${ownerInfo.gender}
عٌمًر: ${ownerInfo.age}
طول: ${ownerInfo.height}
رآبًطِ: ${ownerInfo.facebookLink}
حاله: ${ownerInfo.status}
`;


    await api.sendMessage({
      body: response,
      attachment: fs.createReadStream(videoPath)
    }, event.threadID, event.messageID);

    if (event.body.toLowerCase().includes('ownerinfo')) {
      api.setMessageReaction('🥵', event.messageID, (err) => {}, true);
    }
  } catch (error) {
    console.error('Error in ownerinfo command:', error);
    return api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
};