const config = require('./config.json');
const fs = require('fs');
const Commands = fs.readdirSync('./commands/')

let aliases = [];

class CommandHandler {
  /**
   * Nachricht überprüfen nach Commands
   *
   * @param message Die Nachricht, um zu prüfen, obs ein Command ist
   *
   * @returns {String} true
   */
  static async isCommand(message){
    if(!message.startsWith(config.prefix)) return;
    let args = message.split(/ +/g);
    let command = args.shift().slice(config.prefix).toLowerCase().replace(config.prefix, '');
    for (let file of Commands){
      let commandF = require(`./commands/${file}`)
      if (commandF.info.aliases) {
          for (let alias of commandF.info.aliases) {
              aliases.push(alias);
          }
      };

      if(file.split('.')[0] == command) return 'true';
      console.log(aliases);
      if(aliases.includes(command)) return 'true';
    }
    console.log("for out")
    return 'false';
  }
  /**
   * Nachricht ausführen
   *
   * @param message Die Nachricht, um zu runnen
   * @param client Der Client zum weitergeben.
   */
  static async runCommand(message, client){
    if(!message.startsWith(config.prefix)) return;
    let args = message.split(/ +/g);
    let command = args.shift().slice(config.prefix).toLowerCase().replace(config.prefix, '');
    for (let file of Commands){
      if(file.split('.')[0] == command) {
        require(`./commands/${file}`).run(client, message, args)
        //file.run(client, message, args);
      }
    }
    console.log("for out")
    return false;
  }
}

module.exports = CommandHandler;
