import { Command, TerminalContext, CommandResult } from '../../types';

export const switchTab: Command = {
  name: 'switch',
  description: 'Switch to specified tab',
  category: 'system',
  usage: 'switch [tab_number]',
  aliases: ['tab'],
  execute: (args: string[], context: TerminalContext): CommandResult => {
    if (!context.tabs || !context.setTabs || !context.setActiveTabId) {
      return { output: 'Tab management not available' };
    }

    if (args.length === 0) {
      return { output: 'Usage: switch <tab_number>\nUse "tabs" to see available tabs.' };
    }

    const tabNumber = parseInt(args[0]);
    if (isNaN(tabNumber) || tabNumber < 1 || tabNumber > context.tabs.length) {
      return { output: `Invalid tab number. Use 'tabs' to see available tabs.` };
    }

    const targetTab = context.tabs[tabNumber - 1];
    const updatedTabs = context.tabs.map(tab => ({
      ...tab,
      isActive: tab.id === targetTab.id
    }));

    context.setTabs(updatedTabs);
    context.setActiveTabId(targetTab.id);

    return { output: `Switched to tab: ${targetTab.title}` };
  }
};