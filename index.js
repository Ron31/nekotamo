const Discord = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
const enmap = require('enmap');

const client = new Discord.Client();
client.categs = [];
client.command = new enmap();

const init() = async () => {
  await for (let dir of Commands) {
      let group = fs.readdirSync(`./commands/${dir}`);
      client.categs.push(dir);
      console.log(`>> Loading ${group.length} commands from '${dir}' -`);
      for (let commandFile of group) {
          if (!commandFile.endsWith('.js')) return;
          let command = require(`./commands/${dir}/${commandFile}`);
          client.commands.set(commandFile.split('.')[0], command);
          console.log(`> Loading command ${commandFile.split('.')[0]}`);
      }
  };

  await for (let file of Commands) {
    console.log(`>> Loading Commands without Group`)
    if (!file.endsWith('.js')) return;
    let command = require(`./commands/${file}`);
    client.cache.set(commandFile.split('.')[0], [require(`./commands/${dir}/${commandFile}`), command.info, `${dir}`]);
    console.log(`> Loading command ${commandFile.split('.')[0]}`);
  }
  ​
  fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });
}

init();
client.login(config.token);
