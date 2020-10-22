const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');


class Advice extends Command {
    constructor() {
        super('advice', {
            aliases: ['advice'],
            channel: 'guild',
            category: 'Fun',
            description: {
                content: 'Gives a random advice.'
            },
            typing: true
        });
    }

    exec (message){

        superagent.get("http://api.adviceslip.com/advice").end((err, res) => {
            if (!err && res.status === 200) {
                try {
                    JSON.parse(res.text);
                } catch (e) {
                    return message.reply(", an api error occurred.");
                }
                const advice = JSON.parse(res.text);
                message.channel.send(`👉  __**${advice.slip.advice}**__`);
            } else {
                console.error(`REST call failed: ${err}, status code: ${res.status}`);
            }
        });
    }

}

module.exports = Advice;