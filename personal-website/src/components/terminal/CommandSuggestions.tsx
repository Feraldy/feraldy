import React from 'react';

interface CommandSuggestionsProps {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
  isVisible: boolean;
  highlightedIndex: number;
}

const CommandSuggestions: React.FC<CommandSuggestionsProps> = ({
  suggestions,
  onSelectSuggestion,
  isVisible,
  highlightedIndex
}) => {
  if (!isVisible || suggestions.length === 0) return null;

  return (
    <div className="absolute bottom-full left-0 mb-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-10 min-w-64 max-w-sm">
      <div className="p-2">
        <div className="text-xs text-gray-400 mb-2 px-2">Suggestions:</div>
        <div className="space-y-1">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              onClick={() => onSelectSuggestion(suggestion)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors duration-150 ${
                index === highlightedIndex
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="font-mono">{suggestion}</span>
            </button>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-2 px-2">
          Use ↑↓ to navigate, Tab or Enter to select
        </div>
      </div>
      <div className="border-t border-gray-700 p-2">
        <div className="text-xs text-gray-500 space-y-1">
          <div><kbd className="bg-gray-700 px-1 rounded text-xs">↑↓</kbd> Command history</div>
          <div><kbd className="bg-gray-700 px-1 rounded text-xs">Ctrl+A/E</kbd> Line start/end</div>
          <div><kbd className="bg-gray-700 px-1 rounded text-xs">Ctrl+L</kbd> Clear screen</div>
        </div>
      </div>
    </div>
  );
};

export default CommandSuggestions;