import React from 'react';
import CommandSuggestions from './CommandSuggestions';
import DidYouMean from './DidYouMean';
import LoadingDots from './LoadingDots';
import { CommandHistoryItem } from '../../terminal/types';
import { getDidYouMeanSuggestions } from '../../terminal/commands';

interface InteractiveTerminalProps {
  commandHistory: CommandHistoryItem[];
  lastInvalidCommand: string;
  suggestions: string[];
  showSuggestions: boolean;
  highlightedSuggestion: number;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onInputChange: (value: string) => void;
  onSuggestionSelect: (suggestion: string) => void;
  onDidYouMeanSelect: (suggestion: string) => void;
  showHeader?: boolean;
  showAnimationContent?: boolean;
}

const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  commandHistory,
  lastInvalidCommand,
  suggestions,
  showSuggestions,
  highlightedSuggestion,
  onKeyDown,
  onInputChange,
  onSuggestionSelect,
  onDidYouMeanSelect,
  showHeader = false,
  showAnimationContent = false
}) => {
  return (
    <div>
      {/* Header */}
      {showHeader && (
        <div className="pb-2 border-b border-gray-700 mb-2">
          <p className="text-green-400">Welcome to Feraldy's Terminal Portfolio v1.0.0</p>
          <p className="text-gray-400 text-xs mt-1">Type 'help' for available commands</p>
        </div>
      )}

      {/* Animation Content */}
      {showAnimationContent && (
        <div className="space-y-2 mb-4">
          {/* whoami command and response */}
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="text-cyan-400">feraldy@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">$</span>
              <span className="text-gray-100 ml-2">whoami</span>
            </div>
            <div className="-mt-1 space-y-1 text-gray-200">feraldy - Test Engineer & Project Manager</div>
          </div>
          
          {/* Welcome text */}
          <div className="-mt-1 space-y-1 pl-3 sm:pl-4 border-l-2 border-yellow-400">
            <p className="text-yellow-300">Hi, I'm Feraldy Nathanael!</p>
            <p className="text-yellow-300">Welcome to My Terminal Portfolio v1.0.0</p>
            <p className="text-yellow-300">Thanks for visiting and let's connect!</p>
          </div>

          {/* cat about.txt command and response */}
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="text-cyan-400">feraldy@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">$</span>
              <span className="text-gray-100 ml-2">cat about.txt</span>
            </div>
            <div className="ml-0 font-mono text-gray-200">
              Hi, I am a passionate Test Engineer and Project Manager with over 3 years of experience in quality assurance and product development. I specialize in implementing effective QA processes, maintaining comprehensive test coverage with tools like Playwright and Qase.io, and managing product documentation to bridge the gap between technical and product teams.
            </div>
          </div>
        </div>
      )}
      
      {/* Command History */}
      {commandHistory.map((item, index) => (
        <div key={index} className="mb-3">
          <div className="flex items-center">
            <span className="text-cyan-400">feraldy@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$</span>
            <span className="text-gray-100 ml-2">{item.command}</span>
          </div>
          {item.output && (
            <div className="mt-1 whitespace-pre-line">
              <div className="font-mono text-gray-200" dangerouslySetInnerHTML={{ __html: item.output }} />
              {item.isUpdating && (
                <div className="mt-2">
                  <LoadingDots text="🔮 Consulting the Oracle" className="text-purple-400" />
                </div>
              )}
            </div>
          )}
          {/* Show "Did You Mean" for invalid commands */}
          {!item.output && item.command.split(' ')[0] === lastInvalidCommand && (
            <DidYouMean
              suggestions={getDidYouMeanSuggestions(lastInvalidCommand)}
              originalCommand={lastInvalidCommand}
              onSelectSuggestion={onDidYouMeanSelect}
            />
          )}
        </div>
      ))}
      
      {/* Interactive Input */}
      <div className="relative">
        <div className="flex items-center mb-4">
          <span className="text-cyan-400">feraldy@portfolio</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$</span>
          <input
            type="text"
            className="flex-1 bg-transparent text-gray-100 outline-none terminal-font terminal-input ml-2"
            placeholder="Type a command (e.g., help, projects)..."
            autoFocus
            onKeyDown={onKeyDown}
            onChange={(e) => onInputChange(e.target.value)}
          />
        </div>
        
        {/* Command Suggestions */}
        <CommandSuggestions
          suggestions={suggestions}
          onSelectSuggestion={onSuggestionSelect}
          isVisible={showSuggestions}
          highlightedIndex={highlightedSuggestion}
        />
      </div>
    </div>
  );
};

export default InteractiveTerminal;