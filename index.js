const { Client, MessageEmbed } = require('discord.js');
const config = require('./config');
const commands = require('./help');
const github = require('github-api');
const fs = require('fs');
//humour setting array lol much pog
var humourSetting = ["You'll need it to find your way back to the ship after I blow you out the airlock", "How's everone doin? Plently of slaves for my robot colony?", "Confirmed. Self destruct sequence in T minus 10, 9, 8, 7...","Knock, Knock" ]
//actually do something with all that data
var gh = new github({
   token: process.env['GITHUB_TOKEN']
});
//Create a client for the bot
let bot = new Client({
  fetchAllMembers: true, 
  presence: {
    status: 'online',
    activity: {
      name: `${config.prefix}help`,
      type: 'WATCHING'
    }
  }
});

bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));
bot.on('message', async message => {
  //check if messages being sent are valid commands
  if (message.content.startsWith(config.prefix)) {
    let args = message.content.slice(config.prefix.length).split(' ');
    let command = args.shift().toLowerCase();

    switch (command) {
        case 'humourSetting':
        message.channel.send("That\'s 70%")
        break;
     case 'joke':
     var random = Math.floor(Math.random() * humourSetting.length);
     message.channel.send(humourSetting[random])
     break;

     /*Here is Bug Report code. Won't break. Hopefully. Anyways, don't touch this unless you absolutely know what what you are doing.
     -_-_-_--_-_-_--_-_-_--_-_-Don't Touch Zone-_-_-_--_-_-_-
     */
    case 'bug_report':
          
         /* var auth = message.author.tag
          fs.writeFile('', 'Submitted by: ' + message.author.username + '\n'+ args.slice(0, 100) + '\n', function (err) {
          if (err) throw err;
          console.log('Saved!');
                try {
          var dat = fs.readFileSync('./bugs/' + Math.random(1,9000) + '.txt', 'utf8')
            console.log("File read.")
          } catch (err) {
           message.channel.send(err)
          }
          message.channel.send("submitted")
        
          });*/
        
          var auth = message.author.tag
          fs.writeFile('stocks/companies/' + args[1] + '.txt', 'Owner:' + auth + '\n'+ args[1] + '\nFunds:  5,000 dollars', function (err) {
          if (err) throw err;
          console.log('Saved!');
         try {
          var dat = fs.readFileSync('bugs/' + Math.random() + '.txt', 'utf8')
            console.log("File read.")
          } catch (err) {
           message.channel.send(err)
          }
      });















    break;
 /*End of the Don't Touch Zone*/


       //checks server connectivity through pings
      case 'ping':
        let msg = await message.reply('Pinging...');
        await msg.edit(`PONG! Message round-trip took ${Date.now() - msg.createdTimestamp}ms.`)
        break;

      //makes the command that explains TARS
        case 'tars':
        let kipp = new MessageEmbed()
          .setTitle('TARS')
          .setColor('ORANGE')
          .setDescription('TARS is a bot that is a part of the "Intersetellar trio". Each bot has their own uniqe features, just like TARS. If you want more information, ping the bot devs.')
          .setThumbnail('https://i.imgur.com/6eScB4j.png')
          .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`,message.author.displayAvatarURL())
          ;
        message.channel.send(kipp);
        break;
      

      //makes the help embed
      case 'help':
        let embed =  new MessageEmbed()
          .setTitle('HELP MENU')
          .setColor('ORANGE')
          .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
          .setThumbnail(bot.user.displayAvatarURL());
        if (!args[0])
          embed
            .setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
        else {
          if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
            let command = Object.keys(commands).includes(args[0].toLowerCase())? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
            embed
              .setTitle(`COMMAND - ${command}`)

            if (commands[command].aliases)
              embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
            embed
              .addField('DESCRIPTION', commands[command].description)
              .addField('FORMAT', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
          } else {
            embed
              .setColor('RED')
              .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
          }
        }
        message.channel.send(embed);
        break;
    }
  }
});

require('./server')();
bot.login(config.token);