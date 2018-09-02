exports.run = async (client, message, args) => {
    //message.delete();
    try {
      const code = args.join(" ");
      let evaled = eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      console.log(clean(evaled), {code:"xl"});
    } catch (err) {
      console.log(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
};

exports.info = {
  description: 'Führe JavaScript-Code aus',
  aliases: ['exec', 'vl'],
  enabled: true
};

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
