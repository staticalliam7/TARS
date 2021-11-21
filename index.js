const { Client, MessageEmbed } = require('discord.js');
const config = require('./config');
const commands = require('./help');
//humour setting array lol much pog
var humourSetting = ["You'll need it to find your way back to the ship after I blow you out the airlock", "How's everone doin? Plently of slaves for my robot colony?", "Confirmed. Self destruct sequence in T minus 10, 9, 8, 7...","Knock, Knock" ]
//actually do something with all that data

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
     case 'clear':
        if(!args[0]) return message.reply('Error. Please define how many messages you wanna delete, ***Ex: t!clear 10*** ')
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You can't use this command.`);
              if (message.channel.type === 'text') 
      
    var clearEmbed = new MessageEmbed()
	.setColor('RED')
	.setTitle('Deleted Messages')
	.setDescription('Someone used t!clear')
	.setThumbnail('https://i.imgur.com/gcElJpw.png')
	.addField('Deleted ' + args[0] + 'Messages', true)
	.setTimestamp()
	.setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())

    message.channel.send(clearEmbed);
    var deleteThisMany = ++args[0];
    message.channel.bulkDelete(deleteThisMany);
    break;
      case 'ping':
        let msg = await message.reply('Pinging...');
        await msg.edit(`PONG! Message round-trip took ${Date.now() - msg.createdTimestamp}ms.`)
        break;

      

      /* Unless you know what you're doing, don't change this command. */
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