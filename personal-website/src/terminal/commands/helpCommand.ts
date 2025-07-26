import { Command, TerminalContext, CommandResult } from '../types';

export const helpCommand: Command = {
  name: 'help',
  description: 'Show available commands',
  category: 'system',
  usage: 'help [category]',
  examples: ['help', 'help fun', 'help navigation'],
  execute: (args: string[]): CommandResult => {
    const category = args[0]?.toLowerCase();
    
    if (category === 'fun') {
      return {
        output: `Fun & Interactive Commands:
  <span class="text-yellow-400">choose [opts]</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Pick randomly from options
  <span class="text-yellow-400">compliment</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Get a positive message
  <span class="text-yellow-400">dadjoke</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Classic dad humor
  <span class="text-yellow-400">fortune</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Programming quotes
  <span class="text-yellow-400">fortunecookie</span>&nbsp;&nbsp;&nbsp;&nbsp;- Fortune cookie wisdom
  <span class="text-yellow-400">hack</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Simulate hacking sequence
  <span class="text-yellow-400">insult</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Playful roasts
  <span class="text-yellow-400">joke</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Random programming jokes
  <span class="text-yellow-400">matrix</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Enter the Matrix
  <span class="text-yellow-400">morse [text]</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Convert to Morse code
  <span class="text-yellow-400">roll [X]d[Y]</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Roll virtual dice
  <span class="text-yellow-400">secret</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Find hidden surprises
  <span class="text-yellow-400">story</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Interactive story
  <span class="text-yellow-400">tarot</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Mystical card reading
  <span class="text-yellow-400">trivia</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Tech quiz questions
  <span class="text-yellow-400">weather</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show weather conditions`
      };
    }
    
    if (category === 'navigation') {
      return {
        output: `Navigation Commands:
  <span class="text-yellow-400">blog</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Navigate to blog page
  <span class="text-yellow-400">contact</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Open contact form
  <span class="text-yellow-400">projects</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Navigate to projects page
  <span class="text-yellow-400">resume</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Navigate to resume page`
      };
    }
    
    if (category === 'system') {
      return {
        output: `System Commands:
  <span class="text-yellow-400">cal</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show calendar
  <span class="text-yellow-400">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear the terminal screen
  <span class="text-yellow-400">date</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show current date and time
  <span class="text-yellow-400">df</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show filesystem usage
  <span class="text-yellow-400">ls</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- List files and directories
  <span class="text-yellow-400">ping</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show social links
  <span class="text-yellow-400">ps</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show running processes
  <span class="text-yellow-400">pwd</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Print working directory
  <span class="text-yellow-400">uptime</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show system uptime
  <span class="text-yellow-400">version</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show version
  <span class="text-yellow-400">whoami</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show current user info`
      };
    }
    
    if (category === 'info') {
      return {
        output: `Information Commands:
  <span class="text-yellow-400">dy</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show personal info menu
  <span class="text-yellow-400">dy --history</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show feraldy's history
  <span class="text-yellow-400">dy --tree</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show feraldy's skill tree
  <span class="text-yellow-400">dy --skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show feraldy's skills & expertise
  <span class="text-yellow-400">dy --achievements</span>&nbsp;&nbsp;- Show feraldy's achievements
  <span class="text-yellow-400">dy --top</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show top skills & projects
  <span class="text-yellow-400">manual</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show user manual
  <span class="text-yellow-400">mood</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show current mood`
      };
    }
    
    // Default help - show all categories
    return {
      output: `General Commands:
  <span class="text-yellow-400">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear the terminal screen
  <span class="text-yellow-400">dy</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show personal info menu
  <span class="text-yellow-400">help</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show this help message
  <span class="text-yellow-400">ls</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- List files and directories
  <span class="text-yellow-400">manual</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show user manual
  <span class="text-yellow-400">pwd</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Print working directory
  <span class="text-yellow-400">version</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show version
  <span class="text-yellow-400">whoami</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show current user info

System Commands:
  <span class="text-yellow-400">cal</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show calendar
  <span class="text-yellow-400">date</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show current date and time
  <span class="text-yellow-400">df</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show filesystem usage
  <span class="text-yellow-400">ping</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show social links
  <span class="text-yellow-400">ps</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show running processes
  <span class="text-yellow-400">uptime</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show system uptime

Fun & Interactive:
  <span class="text-yellow-400">choose [opts]</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Pick randomly from options
  <span class="text-yellow-400">compliment</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Get a positive message
  <span class="text-yellow-400">dadjoke</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Classic dad humor
  <span class="text-yellow-400">fortune</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Programming quotes
  <span class="text-yellow-400">fortunecookie</span>&nbsp;&nbsp;&nbsp;&nbsp;- Fortune cookie wisdom
  <span class="text-yellow-400">hack</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Simulate hacking sequence
  <span class="text-yellow-400">insult</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Playful roasts
  <span class="text-yellow-400">joke</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Random programming jokes
  <span class="text-yellow-400">matrix</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Enter the Matrix
  <span class="text-yellow-400">mood</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show current mood
  <span class="text-yellow-400">morse [text]</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Convert to Morse code
  <span class="text-yellow-400">roll [X]d[Y]</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Roll virtual dice
  <span class="text-yellow-400">secret</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Find hidden surprises
  <span class="text-yellow-400">story [choice]</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Interactive career journey
  <span class="text-yellow-400">tarot</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Mystical card reading
  <span class="text-yellow-400">trivia</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Tech quiz questions
  <span class="text-yellow-400">weather</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show weather conditions

Navigation:
  <span class="text-yellow-400">blog</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Navigate to blog page
  <span class="text-yellow-400">contact</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Open contact form
  <span class="text-yellow-400">projects</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Navigate to projects page
  <span class="text-yellow-400">resume</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Navigate to resume page

<span class="text-green-400">💡 Tips:</span>
• Try "help [category]" for specific command groups (e.g., "help fun")
• Use "dy" to explore my professional background
• Try "hack", "secret", or "roll 2d6" for some fun!
• Type "story" for an interactive career journey`
    };
  }
};