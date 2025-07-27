import React from 'react';
import { TerminalTab } from '../../terminal/types';

interface TabManagerProps {
  tabs: TerminalTab[];
  activeTabId: string;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

const TabManager: React.FC<TabManagerProps> = ({
  tabs,
  activeTabId: _activeTabId,
  onTabClick,
  onTabClose
}) => {
  if (tabs.length <= 1) return null;

  return (
    <div className="bg-gray-800 border-b border-gray-700 px-2 py-1 flex items-center space-x-1 overflow-x-auto">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex items-center space-x-2 px-3 py-1 rounded-t-md cursor-pointer transition-colors duration-200 ${
            tab.isActive
              ? 'bg-gray-900 text-white border-t border-l border-r border-gray-700'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => onTabClick(tab.id)}
        >
          <span className="text-sm font-mono whitespace-nowrap">{tab.title}</span>
          {tab.type !== 'main' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TabManager;