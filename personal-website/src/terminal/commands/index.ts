import { Command, CommandRegistry } from '../types';
import { systemCommands } from './systemCommands';
import { navigationCommands } from './navigationCommands';
import { infoCommands } from './infoCommands';
import { funCommands } from './funCommands';
import { interactiveCommands } from './interactiveCommands';
import { helpCommand } from './helpCommand';
import { storyCommand } from './storyCommand';
import { tabCommands } from './tabCommands';

// Combine all commands
const allCommands: Command[] = [
  helpCommand,
  storyCommand,
  ...systemCommands,
  ...navigationCommands,
  ...infoCommands,
  ...funCommands,
  ...interactiveCommands,
  ...tabCommands
];

// Create command registry
export const createCommandRegistry = (): CommandRegistry => {
  const registry = new Map<string, Command>();
  
  allCommands.forEach(command => {
    // Register main command name
    registry.set(command.name, command);
    
    // Register aliases if they exist
    if (command.aliases) {
      command.aliases.forEach(alias => {
        registry.set(alias, command);
      });
    }
  });
  
  return registry;
};

// Get command by name
export const getCommand = (registry: CommandRegistry, name: string): Command | undefined => {
  return registry.get(name.toLowerCase());
};

// Get all commands by category
export const getCommandsByCategory = (category: string): Command[] => {
  return allCommands.filter(cmd => cmd.category === category);
};

// Get command suggestions for autocomplete
export const getCommandSuggestions = (input: string, limit: number = 5): string[] => {
  const commands = Array.from(createCommandRegistry().keys());
  return commands
    .filter(cmd => cmd.toLowerCase().startsWith(input.toLowerCase()))
    .slice(0, limit);
};

// Get "did you mean" suggestions for typos
export const getDidYouMeanSuggestions = (input: string, limit: number = 3): string[] => {
  const commands = Array.from(createCommandRegistry().keys());
  
  // Simple Levenshtein distance calculation
  const levenshteinDistance = (a: string, b: string): number => {
    const matrix = [];
    
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[b.length][a.length];
  };
  
  // Find commands with small edit distance
  const suggestions = commands
    .map(cmd => ({
      command: cmd,
      distance: levenshteinDistance(input.toLowerCase(), cmd.toLowerCase())
    }))
    .filter(item => item.distance <= 2 && item.distance > 0)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map(item => item.command);
    
  return suggestions;
};

// Export all commands for reference
export { allCommands };
export type { Command };