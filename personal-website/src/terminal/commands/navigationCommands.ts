import { Command, CommandResult, TerminalContext } from '../types';

export const navigationCommands: Command[] = [
  {
    name: 'cd',
    description: 'Change directory / Open tab',
    category: 'navigation',
    usage: 'cd [directory]',
    examples: ['cd projects', 'cd project', 'cd resume', 'cd blog'],
    execute: (args: string[], _context: TerminalContext): CommandResult => {
      if (args.length === 0) {
        return {
          output: 'Usage: cd <directory>\nAvailable directories: projects, resume, blog'
        };
      }

      const target = args[0].toLowerCase();
      
      // Directory mappings
      const directoryMap: Record<string, { type: 'projects' | 'resume' | 'blog', title: string }> = {
        'projects': { type: 'projects', title: 'Projects' },
        'project': { type: 'projects', title: 'Projects' },
        './projects': { type: 'projects', title: 'Projects' },
        'resume': { type: 'resume', title: 'Resume' },
        './resume': { type: 'resume', title: 'Resume' },
        'blog': { type: 'blog', title: 'Blog' },
        './blog': { type: 'blog', title: 'Blog' }
      };

      const destination = directoryMap[target];
      
      if (!destination) {
        return {
          output: `cd: ${args[0]}: No such directory\nAvailable directories: projects, resume, blog`
        };
      }

      return {
        output: `Opening ${destination.title.toLowerCase()} tab...`,
        shouldOpenTab: {
          type: destination.type,
          title: destination.title
        }
      };
    }
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  }
];