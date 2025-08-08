import { Command, CommandResult, TerminalContext } from '../../types';

export const projects: Command = {
  name: 'projects',
  description: 'Open projects in new tab',
  category: 'navigation',
  usage: 'projects',
  execute: (_args: string[], _context: TerminalContext): CommandResult => {
    return {
      output: 'Opening projects tab...',
      shouldOpenTab: {
        type: 'projects',
        title: 'Projects'
      }
    };
  }
};