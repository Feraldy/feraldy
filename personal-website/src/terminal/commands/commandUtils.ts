import { Command } from '../types';
import { allCommands } from './index';

// Get all commands without circular dependency
export const getAllCommands = (): Command[] => {
  return allCommands;
};

// Get commands by category
export const getCommandsByCategory = (category: string): Command[] => {
  return getAllCommands().filter(cmd => cmd.category === category);
};