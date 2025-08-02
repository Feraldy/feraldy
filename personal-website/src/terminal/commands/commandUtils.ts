import { Command } from '../types';
import { systemCommands } from './systemCommands';
import { navigationCommands } from './navigationCommands';
import { infoCommands } from './infoCommands';
import { funCommands } from './funCommands';
import { interactiveCommands } from './interactiveCommands';
import { interactiveCommands2 } from './interactiveCommands2';
import { storyCommand } from './storyCommand';
import { tabCommands } from './tabCommands';
import { utilityCommands } from './utilityCommands';
import { personalCommands } from './personalCommands';

// Get all commands without circular dependency
export const getAllCommands = (): Command[] => {
  return [
    storyCommand,
    ...systemCommands,
    ...navigationCommands,
    ...infoCommands,
    ...funCommands,
    ...interactiveCommands,
    ...interactiveCommands2,
    ...utilityCommands,
    ...personalCommands,
    ...tabCommands
  ];
};

// Get commands by category
export const getCommandsByCategory = (category: string): Command[] => {
  return getAllCommands().filter(cmd => cmd.category === category);
};