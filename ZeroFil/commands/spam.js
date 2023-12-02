module.exports.config = {
    name: 'سبان',
    version: '1.0',
    hasPermssion: 2,
    credits: 'Eugene Aguilar | Kem convert for bot Mirai',
    description: 'spam a message multiple times',
    commandCategory: "🅂🅈🅂🅃🄴🄼",
    usePrefix: true,
    usages: "[amount] [message]",
    cooldowns: 2 
};
  
module.exports.run = async function ({ api, event, args }) {
     
      const amount = parseInt(args[0]);
      const message = args.slice(1).join(" ");
  
      if (isNaN(amount) || !message) {
          return api.sendMessage(`Invalid usage. Usage: /spam [amount] [message]`, event.threadID);
      }
  
      for (let i = 0; i < amount; i++) {
          api.sendMessage(message, event.threadID);
      }
};