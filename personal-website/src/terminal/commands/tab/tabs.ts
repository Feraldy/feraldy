import { Command, TerminalContext, CommandResult } from '../../types';

export const tabs: Command = {
  name: 'tabs',
  description: 'List all open tabs',
  category: 'system',
  usage: 'tabs',
  execute: (_args: string[], context: TerminalContext): CommandResult => {
    if (!context.tabs) {
      return { output: 'No tabs available' };
    }

    const tabList = context.tabs
      .map((tab, index) => {
        const activeIndicator = tab.isActive ? ' (active)' : '';
        return `${index + 1}. ${tab.title}${activeIndicator}`;
      })
      .join('\n');

    return {
      output: `Open tabs:\n${tabList}`
    };
  }
};