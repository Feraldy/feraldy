import React from 'react';

interface TabLoadingAnimationProps {
  command: string;
  message: string;
}

const TabLoadingAnimation: React.FC<TabLoadingAnimationProps> = ({ command, message }) => {
  return (
    <div className="p-3 sm:p-4 terminal-font text-xs sm:text-sm md:text-base text-gray-300 space-y-2">
      <div className="flex items-center">
        <span className="text-cyan-400">feraldy@portfolio</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-white">$</span>
        <span className="text-gray-100 ml-2">{command}</span>
        <span className="text-cyan-400 ml-2">↵</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <span className="text-gray-400 font-mono">{message}</span>
      </div>
    </div>
  );
};

export default TabLoadingAnimation;
