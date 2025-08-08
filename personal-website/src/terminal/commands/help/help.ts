import { Command, CommandResult } from '../../types';
import { getCommandsByCategory } from '../commandUtils';

export const help: Command = {
  name: 'help',
  description: 'Show available commands',
  category: 'system',
  usage: 'help [category]',
  examples: ['help', 'help entertainment', 'help games', 'help utilities'],
  execute: (args: string[]): CommandResult => {
    const category = args[0]?.toLowerCase();
    
    // Helper function to format command name with usage
    const formatCommand = (cmd: Command, maxLength: number): string => {
      const usage = cmd.usage || cmd.name;
      const padding = '&nbsp;'.repeat(Math.max(1, maxLength - usage.length));
      return `<span class="text-yellow-400">${usage}</span>${padding}- ${cmd.description}`;
    };

    // Helper function to calculate max usage length for a list of commands
    const getMaxUsageLength = (commands: Command[]): number => {
      if (commands.length === 0) return 10; // fallback for empty arrays
      const lengths = commands.map(cmd => (cmd.usage || cmd.name).length);
      const maxLength = Math.max(...lengths);
      // Cap the max length to prevent excessive padding
      return Math.min(maxLength + 1, 35);
    };
    
    if (category === 'entertainment') {
      const entertainmentCommands = getCommandsByCategory('entertainment').sort((a, b) => a.name.localeCompare(b.name));
      const maxLength = getMaxUsageLength(entertainmentCommands);
      return {
        output: `Entertainment Commands:\n${entertainmentCommands.map(cmd => `  ${formatCommand(cmd, maxLength)}`).join('\n')}`
      };
    }
    
    if (category === 'navigation') {
      const navCommands = getCommandsByCategory('navigation').sort((a, b) => a.name.localeCompare(b.name));
      const maxLength = getMaxUsageLength(navCommands);
      return {
        output: `Navigation Commands:\n${navCommands.map(cmd => `  ${formatCommand(cmd, maxLength)}`).join('\n')}`
      };
    }
    
    if (category === 'system') {
      const systemCommands = getCommandsByCategory('system').sort((a, b) => a.name.localeCompare(b.name));
      const maxLength = getMaxUsageLength(systemCommands);
      return {
        output: `System Commands:\n${systemCommands.map(cmd => `  ${formatCommand(cmd, maxLength)}`).join('\n')}`
      };
    }
    
    if (category === 'info') {
      const infoCommands = getCommandsByCategory('info').sort((a, b) => a.name.localeCompare(b.name));
      const maxLength = getMaxUsageLength(infoCommands);
      return {
        output: `Information Commands:\n${infoCommands.map(cmd => `  ${formatCommand(cmd, maxLength)}`).join('\n')}`
      };
    }
    
    if (category === 'games') {
      const gamesCommands = getCommandsByCategory('games').sort((a, b) => a.name.localeCompare(b.name));
      const maxLength = getMaxUsageLength(gamesCommands);
      return {
        output: `Games Commands:\n${gamesCommands.map(cmd => `  ${formatCommand(cmd, maxLength)}`).join('\n')}`
      };
    }
    
    if (category === 'utilities') {
      const utilitiesCommands = getCommandsByCategory('utilities').sort((a, b) => a.name.localeCompare(b.name));
      const maxLength = getMaxUsageLength(utilitiesCommands);
      return {
        output: `Utilities Commands:\n${utilitiesCommands.map(cmd => `  ${formatCommand(cmd, maxLength)}`).join('\n')}`
      };
    }
    
    // Default help - show all categories
    const systemCommands = getCommandsByCategory('system').sort((a, b) => a.name.localeCompare(b.name));
    const entertainmentCommands = getCommandsByCategory('entertainment').sort((a, b) => a.name.localeCompare(b.name));
    const gamesCommands = getCommandsByCategory('games').sort((a, b) => a.name.localeCompare(b.name));
    const utilitiesCommands = getCommandsByCategory('utilities').sort((a, b) => a.name.localeCompare(b.name));
    const infoCommands = getCommandsByCategory('info').sort((a, b) => a.name.localeCompare(b.name));
    const navCommands = getCommandsByCategory('navigation').sort((a, b) => a.name.localeCompare(b.name));
    
    // Get some essential commands for the general section
    const essentialCommands = ['clear', 'help', 'ls', 'pwd', 'whoami'];
    const generalCommands = systemCommands.filter(cmd => essentialCommands.includes(cmd.name));
    const nonEssentialSystemCommands = systemCommands.filter(cmd => !essentialCommands.includes(cmd.name));
    
    // Calculate global max length for consistent alignment across all sections
    const allCommands = [...generalCommands, ...nonEssentialSystemCommands, ...entertainmentCommands, ...gamesCommands, ...utilitiesCommands, ...infoCommands, ...navCommands];
    const maxLength = getMaxUsageLength(allCommands);
    
    return {
      output: `General Commands:
${generalCommands.map(cmd => `  ${formatCommand(cmd, maxLength)}`).join('\n')}

System Commands:
${nonEssentialSystemCommands.map(cmd => `  ${formatCommand(cmd, maxLength)}`).join('\n')}

Information:
${infoCommands.map(cmd => `  ${formatCommand(cmd, maxLength)}`).join('\n')}

Entertainment:
${entertainmentCommands.map(cmd => `  ${formatCommand(cmd, maxLength)}`).join('\n')}

Games:
${gamesCommands.map(cmd => `  ${formatCommand(cmd, maxLength)}`).join('\n')}

Utilities:
${utilitiesCommands.map(cmd => `  ${formatCommand(cmd, maxLength)}`).join('\n')}

Navigation:
${navCommands.map(cmd => `  ${formatCommand(cmd, maxLength)}`).join('\n')}
<span class="text-green-400">💡 Tips:</span>
• Try "help [category]" for specific command groups (e.g., "help entertainment")
• Use "dy" to explore my professional background
• Try "coffee-order" or "playlist" to see my preferences
• Check "bucket-list" to see my personal and professional goals
• Try "story" for interactive adventures
• Use "fortune code" or "joke dad" for specific content types
• Try "roast nice" or "roast mean" for different vibes`
    };
  }
};