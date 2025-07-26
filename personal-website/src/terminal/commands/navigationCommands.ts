import { Command, TerminalContext, CommandResult } from '../types';

export const navigationCommands: Command[] = [
  {
    name: 'projects',
    description: 'Navigate to projects page',
    category: 'navigation',
    usage: 'projects',
    aliases: ['cd ./projects', 'cd projects'],
    execute: (args: string[], context: TerminalContext): CommandResult => {
      return {
        output: 'Navigating to projects...',
        shouldNavigate: '/projects'
      };
    }
  },
  {
    name: 'resume',
    description: 'Navigate to resume page',
    category: 'navigation',
    usage: 'resume',
    aliases: ['cd ./resume', 'cd resume'],
    execute: (args: string[], context: TerminalContext): CommandResult => {
      return {
        output: 'Navigating to resume...',
        shouldNavigate: '/resume'
      };
    }
  },
  {
    name: 'blog',
    description: 'Navigate to blog page',
    category: 'navigation',
    usage: 'blog',
    aliases: ['cd ./blog', 'cd blog'],
    execute: (args: string[], context: TerminalContext): CommandResult => {
      return {
        output: 'Navigating to blog...',
        shouldNavigate: '/blog'
      };
    }
  },
  {
    name: 'contact',
    description: 'Open contact form',
    category: 'navigation',
    usage: 'contact',
    aliases: ['./contact.sh'],
    execute: (args: string[], context: TerminalContext): CommandResult => {
      return {
        output: 'Opening contact form...',
        shouldOpenContact: true
      };
    }
  }
];