import { Command, TerminalContext, CommandResult } from '../../types';

export const close: Command = {
  name: 'close',
  description: 'Close current tab or specified tab',
  category: 'system',
  usage: 'close [tab_number]',
  execute: (args: string[], context: TerminalContext): CommandResult => {
    if (!context.tabs || !context.setTabs || !context.activeTabId || !context.setActiveTabId) {
      return { output: 'Tab management not available' };
    }

    // If no arguments, close current tab
    if (args.length === 0) {
      const activeTab = context.tabs.find(tab => tab.isActive);
      if (!activeTab || activeTab.type === 'main') {
        return { output: 'Cannot close main terminal tab' };
      }

      // Close the active tab
      const filteredTabs = context.tabs.filter(tab => tab.id !== activeTab.id);
      const updatedTabs = filteredTabs.map(tab => ({
        ...tab,
        isActive: tab.id === 'main'
      }));
      
      context.setTabs(updatedTabs);
      context.setActiveTabId('main');
      
      return { output: `Closed tab: ${activeTab.title}` };
    }

    // Close specific tab by number
    const tabNumber = parseInt(args[0]);
    if (isNaN(tabNumber) || tabNumber < 1 || tabNumber > context.tabs.length) {
      return { output: `Invalid tab number. Use 'tabs' to see available tabs.` };
    }

    const targetTab = context.tabs[tabNumber - 1];
    if (targetTab.type === 'main') {
      return { output: 'Cannot close main terminal tab' };
    }

    const filteredTabs = context.tabs.filter(tab => tab.id !== targetTab.id);
    
    // If we're closing the active tab, switch to main
    if (context.activeTabId === targetTab.id) {
      const updatedTabs = filteredTabs.map(tab => ({
        ...tab,
        isActive: tab.id === 'main'
      }));
      context.setTabs(updatedTabs);
      context.setActiveTabId('main');
    } else {
      context.setTabs(filteredTabs);
    }

    return { output: `Closed tab: ${targetTab.title}` };
  }
};