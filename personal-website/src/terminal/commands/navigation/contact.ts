import { Command, CommandResult, TerminalContext } from '../../types';

export const contact: Command = {
  name: 'contact',
  description: 'Open contact form',
  category: 'navigation',
  usage: 'contact',
  aliases: ['./contact.sh'],
  execute: (_args: string[], _context: TerminalContext): CommandResult => {
    return {
      output: 'Opening contact form...',
      shouldOpenContact: true
    };
  }
};