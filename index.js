const Discord = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
const CommandHandler = require('./CommandHandler');

const client = new Discord.Client();

/*fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventName = file.split(".")[0];
    client.on(eventName, require(`./events/${eventName}.js`).bind(null, client));
  });
});*/
var Test = async () => {
  const out = await CommandHandler.isCommand("~vl i bims ein message commands")
  if(out){console.log("Yep!"); CommandHandler.runCommand("~eval console.log('i bims ein test XD')");}
  else console.log("nope!")
}
Test();
//client.login(config.token);
