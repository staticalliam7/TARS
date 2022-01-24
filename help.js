module.exports = {
  'help': {
    description: 'Shows the list of commands or help on specified command.',
    format: 'help [command-name]'
  },
  'ping': {
    description: 'Checks connectivity with discord\'s servers.',
    format: 'ping'
  },
  'tars': {
    aliases: ['info'],
    description: 'gives info on the tars bot.',
    format: 'tars'
  },
  'bug_report': {
    aliases: ['bug report'],
    description: 'Command that send a bug report to the devs. NOTE: PLEASE PUT UNDERSCORES BETWEEN SPACES ON YOUR BUG REPORT. THE REPORT SYSTEM IS CURRENTLY EXPERIENCING ISSUES. Example: Bot_won\'t_respond_to_command',
    format: 'bug_report <YourBugHere>'
  } 
}