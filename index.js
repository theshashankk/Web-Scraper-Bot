const axios = require('axios')
const fs = require('fs')
const {Snake} = require('tgsnake')
const bot = new Snake({
    apiHash : process.env.apihash, 
    apiId : process.env.apiid, 
    botToken : process.env.token,
    logger:"none" 
  })

const AXIOS_OPTIONS = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
  },
};

bot.run()


bot.on("message",function (ctx) {
        const text = ctx.text;
        if (text == '/start') {
            return;
        } else {
            return axios
                .get(
                    text,
                    AXIOS_OPTIONS
                )
                .then(function ({ data }) {
                    fs.writeFile(ctx.from.id + '.txt', data, function (err) {
                        if (err)
                            console.log('Error:' + err);                                                                           
                        ctx.telegram.sendDocument(ctx.chat.id, './' + ctx.from.id + '.txt');
                    });
                });
        }
    })
