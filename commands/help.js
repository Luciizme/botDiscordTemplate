const { MessageEmbed } = require('discord.js')
const config = require('../config.json');
exports.run = async (client, message) => {
    let commands = message.client.commands.array();
    console.log(commands)
    let helpEmbed = new MessageEmbed()
      .setTitle("Help table")
      .setDescription("Commands & Usage")
      .setColor("BLACK");

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${config.prefix}${cmd.help.name} ${cmd.conf.aliases ? `(${cmd.conf.aliases})` : ""}**`,
        `${cmd.help.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
};


exports.conf = {
  aliases: ["h"]
};

exports.help = {
  name: "help",
  description: "show help panel",
  usage: "help"
};
