import React from 'react';

interface DidYouMeanProps {
  suggestions: string[];
  originalCommand: string;
  onSelectSuggestion: (suggestion: string) => void;
}

const DidYouMean: React.FC<DidYouMeanProps> = ({
  suggestions,
  originalCommand,
  onSelectSuggestion
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="mt-2 p-3 bg-gray-800/50 border border-gray-700 rounded-lg">
      <div className="flex items-start space-x-2">
        <span className="text-yellow-400 text-lg">💡</span>
        <div className="flex-1">
          <p className="text-gray-300 text-sm mb-2">
            Command <span className="text-red-400 font-mono">"{originalCommand}"</span> not found.
          </p>
          <p className="text-gray-400 text-sm mb-3">Did you mean:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onSelectSuggestion(suggestion)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors duration-200 font-mono"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-2">
            Or type <span className="text-yellow-400 font-mono">help</span> to see all available commands.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DidYouMean;