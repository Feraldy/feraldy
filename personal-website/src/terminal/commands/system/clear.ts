import { Command, TerminalContext, CommandResult } from '../../types';

export const clear: Command = {
  name: 'clear',
  description: 'Clear the terminal screen',
  category: 'system',
  usage: 'clear',
  execute: (_args: string[], context: TerminalContext): CommandResult => {
    context.setCommandHistory([]);
    return { output: '', shouldAddToHistory: false };
  }
};