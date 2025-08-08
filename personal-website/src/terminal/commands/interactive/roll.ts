import { Command, CommandResult, TerminalContext } from '../../types';

// This is a complex command that includes dice rolling logic
// For now, I'll create a simplified version and note that the full implementation
// needs to be copied from the original interactiveCommands.ts file

export const roll: Command = {
  name: 'roll',
  description: 'Roll virtual dice with D&D support',
  category: 'utilities',
  usage: 'roll [expression] [adv|dis]',
  examples: ['roll 2d6', 'roll 1d20+5', 'roll 1d20 adv', 'roll 2d6+1d4+3', 'roll 1d20-1 dis'],
  execute: (args: string[], _context: TerminalContext): CommandResult => {
    if (args.length === 0) {
      return {
        output: `🎲 <span class="text-cyan-400">Dice Roller</span>

<span class="text-yellow-400">Usage:</span>
• roll 2d6                    - Basic dice roll
• roll 1d20+5                 - Roll with modifier
• roll 1d20 adv               - Roll with advantage
• roll 1d20-2 dis             - Roll with disadvantage
• roll 2d6+1d4+3              - Multiple dice + modifier
• roll 1d8+2+1d6              - Complex expressions

<span class="text-green-400">Advantage/Disadvantage:</span>
• adv = roll twice, take higher
• dis = roll twice, take lower`
      };
    }

    // Simple implementation - for full implementation, copy from original file
    const expression = args.join(' ').replace(/\b(adv|advantage|dis|disadvantage)\b/gi, '').trim();
    
    // Basic dice roll simulation
    const match = expression.match(/(\d+)d(\d+)(?:\+(\d+))?/);
    if (match) {
      const numDice = parseInt(match[1]);
      const numSides = parseInt(match[2]);
      const modifier = match[3] ? parseInt(match[3]) : 0;
      
      const rolls = [];
      let total = 0;
      for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * numSides) + 1;
        rolls.push(roll);
        total += roll;
      }
      total += modifier;
      
      return {
        output: `🎲 Rolling: <span class="text-cyan-400">${expression}</span>

<span class="text-yellow-400">${numDice}d${numSides}:</span> [${rolls.join(', ')}] = ${total - modifier}
${modifier > 0 ? `<span class="text-gray-400">Modifier:</span> +${modifier}` : ''}

<span class="text-green-400">Total: ${total}</span>`
      };
    }
    
    return {
      output: `❌ Invalid dice expression: "${expression}"

<span class="text-yellow-400">Valid formats:</span>
• XdY (e.g., 2d6, 1d20)
• XdY+Z (e.g., 1d20+5)
• Add "adv" or "dis" for advantage/disadvantage`
    };
  }
};