import { Command, CommandRegistry } from '../types';

// Import individual commands
// Entertainment commands
import { fortune } from './entertainment/fortune';
import { weather } from './entertainment/weather';
import { matrix } from './entertainment/matrix';
import { hack } from './entertainment/hack';

import { joke } from './entertainment/joke';
import { roast } from './entertainment/roast';

// System commands
import { clear } from './system/clear';
import { ls } from './system/ls';
import { pwd } from './system/pwd';
import { whoami } from './system/whoami';
import { date } from './system/date';

// Info commands
import { dy } from './info/dy';

// Navigation commands
import { cd } from './navigation/cd';
import { projects } from './navigation/projects';
import { resume } from './navigation/resume';
import { blog } from './navigation/blog';
import { contact } from './navigation/contact';

// Personal commands
import { playlist } from './personal/playlist';

// Tab commands
import { tabs } from './tab/tabs';
import { close } from './tab/close';
import { switchTab } from './tab/switch';

// Utility commands
import { performance } from './utility/performance';
import { base64 } from './utility/base64';

// Interactive commands
import { roll } from './interactive/roll';
import { choose } from './interactive/choose';
import { morse } from './interactive/morse';
import { trivia } from './interactive/trivia';
import { tarot } from './interactive/tarot';

// Games commands
import { story } from './games/story';

// Help command
import { help } from './help/help';

// Combine all commands
const allCommands: Command[] = [
  // Help
  help,
  
  // System
  clear,
  ls,
  pwd,
  whoami,
  date,
  
  // Navigation
  cd,
  projects,
  resume,
  blog,
  contact,
  
  // Info
  dy,
  
  // Entertainment
  fortune,
  weather,
  matrix,
  hack,
  joke,
  roast,
  
  // Personal
  playlist,
  
  // Tab management
  tabs,
  close,
  switchTab,
  
  // Utilities
  performance,
  base64,
  
  // Interactive
  roll,
  choose,
  morse,
  trivia,
  tarot,
  
  // Games
  story
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