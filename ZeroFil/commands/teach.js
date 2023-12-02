const axios = require('axios');
const fs = require('fs');

module.exports.config = {
    name: "تعليم",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Jonell Magallanes/api by jerome",
    description: "Teaching the simini command",
    usePrefix: true,
    commandCategory: "🄰🄸",
    usages: "teach <message> | <response>",
    cooldowns: 10,
};

module.exports.run = async ({ api, event, args }) => {
    const content = args.join(" ");
    const [ask, ans] = content.split("|").map(item => item.trim());

    // Checking arguments
    if (!ask || !ans) return api.sendMessage('Missing query!', event.threadID);

    const url = `https://heckermenpro-2.indayaypangitna.repl.co/teach?message=${encodeURIComponent(ask)}&respond=${encodeURIComponent(ans)}`;

    try {
        const response = await axios.get(url);
        if (response.data) {
            api.sendMessage(`successfully teached!\n\nYour Ask: ${ask}\nBot response: ${ans}`, event.threadID);
        } 
    } catch(err) {
        api.sendMessage('Error while teaching', event.threadID);
        console.log(err);
    }
};