import React, { forwardRef } from 'react';
import TabManager from './TabManager';
import { TerminalTab } from '../../terminal/types';
import { AppAnimationStage } from '../../utils/constants';

interface TerminalWindowProps {
  appAnimationStage: AppAnimationStage;
  tabs: TerminalTab[];
  activeTabId: string;
  isTabLoading: boolean;
  loadingTabId: string | null;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  children: React.ReactNode;
}

const TerminalWindow = forwardRef<HTMLDivElement, TerminalWindowProps>(({
  appAnimationStage,
  tabs,
  activeTabId,
  isTabLoading,
  loadingTabId,
  onTabClick,
  onTabClose,
  children
}, ref) => {
  return (
    <div 
      className={`bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-2xl w-full max-w-6xl mx-auto transition-all duration-1000 ease-out ${
        appAnimationStage === 'tiny' 
          ? 'scale-0 opacity-0' 
          : 'scale-100 opacity-100'
      }`}
      style={{
        transformOrigin: 'center center',
        height: 'clamp(700px, 95vh, 1200px)',
        filter: appAnimationStage === 'opened'
          ? 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.6))' 
          : 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.4))',
        willChange: 'transform, opacity, filter'
      }}
    >
      {/* Terminal Header */}
      {appAnimationStage !== 'tiny' && (
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-gray-400 text-sm font-mono">feraldy@portfolio ~ </div>
          <div className="w-4"></div>
        </div>
      )}
      
      {/* Tab Manager */}
      {appAnimationStage !== 'tiny' && (
        <TabManager
          tabs={tabs}
          activeTabId={activeTabId}
          onTabClick={onTabClick}
          onTabClose={onTabClose}
          isLoading={isTabLoading}
          loadingTabId={loadingTabId}
        />
      )}
      
      {/* Terminal Content */}
      {appAnimationStage === 'opened' && (
        <div className="flex flex-col h-full" style={{ height: tabs.length > 1 ? 'calc(100% - 100px)' : 'calc(100% - 60px)' }}>
          <div ref={ref} className="flex-1 overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </div>
      )}
    </div>
  );
});

export default TerminalWindow;