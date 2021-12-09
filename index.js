const { readdirSync } = require("fs");
const fs = require('fs');
const config = require("./config.json");
const keepAlive = require('./server.js')
const discord = require("discord.js");
const { Collection } = require("discord.js");
const client = new discord.Client({
  disableMentions: 'everyone'
});


client.commands = new Collection();
client.aliases = new Collection();
//read event 
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});
//get commands
for (const command of readdirSync("./commands").filter(x =>
  x.endsWith(".js")
)) {
  let cmd = require(`./commands/${command}`);
  client.commands.set(cmd.help.name.toLowerCase(), cmd);
  // get aliases command
  for (const alias of cmd.conf.aliases) {
    client.aliases.set(alias.toLowerCase(), cmd.help.name.toLowerCase());
  }
}
client.on('message', msg => {
  if (msg.content === "luci") {
    msg.channel.send('đẹp trai đáng yêu, và là tình yêu của em bé')
  }
})


keepAlive();
const mySecret = process.env['TOKEN']
client.login(mySecret);