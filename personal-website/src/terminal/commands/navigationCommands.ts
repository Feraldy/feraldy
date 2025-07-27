import { Command, CommandResult } from '../types';

export const navigationCommands: Command[] = [
  {
    name: 'projects',
    description: 'Open projects in new tab',
    category: 'navigation',
    usage: 'projects',
    aliases: ['cd ./projects', 'cd projects'],
    execute: (): CommandResult => {
      return {
        output: 'Opening projects tab...',
        shouldOpenTab: {
          type: 'projects',
          title: 'Projects'
        }
      };
    }
  },
  {
    name: 'resume',
    description: 'Open resume in new tab',
    category: 'navigation',
    usage: 'resume',
    aliases: ['cd ./resume', 'cd resume', 'cat ./resume.pdf'],
    execute: (): CommandResult => {
      return {
        output: 'Opening resume tab...',
        shouldOpenTab: {
          type: 'resume',
          title: 'Resume'
        }
      };
    }
  },
  {
    name: 'blog',
    description: 'Open blog in new tab',
    category: 'navigation',
    usage: 'blog',
    aliases: ['cd ./blog', 'cd blog'],
    execute: (): CommandResult => {
      return {
        output: 'Opening blog tab...',
        shouldOpenTab: {
          type: 'blog',
          title: 'Blog'
        }
      };
    }
  },
  {
    name: 'contact',
    description: 'Open contact form',
    category: 'navigation',
    usage: 'contact',
    aliases: ['./contact.sh'],
    execute: (): CommandResult => {
      return {
        output: 'Opening contact form...',
        shouldOpenContact: true
      };
    }
  }
];