import { Command, CommandResult, TerminalContext } from '../../types';

export const resume: Command = {
  name: 'resume',
  description: 'Open resume in new tab',
  category: 'navigation',
  usage: 'resume',
  aliases: ['cat ./resume.pdf'],
  execute: (_args: string[], _context: TerminalContext): CommandResult => {
    return {
      output: 'Opening resume tab...',
      shouldOpenTab: {
        type: 'resume',
        title: 'Resume'
      }
    };
  }
};