import { Command, CommandResult, TerminalContext } from '../../types';

export const blog: Command = {
  name: 'blog',
  description: 'Open blog in new tab',
  category: 'navigation',
  usage: 'blog',
  execute: (_args: string[], _context: TerminalContext): CommandResult => {
    return {
      output: 'Opening blog tab...',
      shouldOpenTab: {
        type: 'blog',
        title: 'Blog'
      }
    };
  }
};