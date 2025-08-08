import { Command, CommandResult, TerminalContext } from '../../types';

export const cd: Command = {
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
};