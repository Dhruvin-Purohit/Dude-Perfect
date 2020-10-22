const { Command } = require('discord-akairo');

class CreateChannel extends Command {
    constructor() {
        super('createChannel', {
            aliases: ['createChannel', 'create-channel', 'cch'],
            channel: 'guild',
            category: 'Guild Management',
            description: {
                content: 'Creates text/voice channel as per the arguments entered by the command executor.',
                usage: '<channel type> <channel name>',
                examples: ['text general-chat', 'voice General VC']
            },
            args: [
                {
                    id: 'chtype',
                    type: 'string',
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **You need to mention channel type ie. `text/voice`!**"
                    },
                },
                {
                    id: 'name',
                    type: 'string',
                    prompt: {
                        start: "<a:RedTick:760514410115498025> **You need to mention channel name!**"
                    },
                }
            ],
            typing: true

        });
    }

    async exec(message, { chtype, name }) {

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("<a:RedTick:760514410115498025> **You need `MANAGE_CHANNELS` permission to use this command!**");

        try {
            await message.guild.channels.create(`${name}`, { type: `${chtype}` });
            return message.channel.send(`<:check:753484699237613630> **${name}** has been successfully created by **${message.author.tag}**.`);

        } catch (err) {
            message.channel.send(`<a:RedTick:760514410115498025> **${err}**`);
        }

    }

}

module.exports = CreateChannel;