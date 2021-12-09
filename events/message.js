module.exports = (client, message) => {

    if (message.author.bot) return;
    let config = require('../config.json')
    let prefix = config.prefix;

    if (message.content.indexOf(prefix) !== 0) return;

    let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    if (!cmd) return;

    cmd.run(client, message, args);

};
