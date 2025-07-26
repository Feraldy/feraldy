import React, { useState, useEffect } from 'react';

interface HelpHint {
  id: string;
  title: string;
  description: string;
  commands: string[];
  icon: string;
}

interface HelpHintsProps {
  commandsTyped: number;
  exploredCommands: Set<string>;
  isVisible: boolean;
}

const helpHints: HelpHint[] = [
  {
    id: 'getting_started',
    title: 'Getting Started',
    description: 'New to the terminal? Try these essential commands to explore my portfolio.',
    commands: ['help', 'ls', 'whoami'],
    icon: '🚀'
  },
  {
    id: 'navigation',
    title: 'Quick Navigation',
    description: 'Jump directly to different sections of my portfolio.',
    commands: ['projects', 'resume', 'blog'],
    icon: '🧭'
  },
  {
    id: 'about_me',
    title: 'Learn About Me',
    description: 'Discover my professional background and skills.',
    commands: ['dy', 'dy --skills', 'dy --history'],
    icon: '👨‍💻'
  },
  {
    id: 'fun_stuff',
    title: 'Interactive Features',
    description: 'Try these fun and interactive commands for a unique experience.',
    commands: ['story', 'hack', 'fortune', 'joke'],
    icon: '🎮'
  },
  {
    id: 'advanced',
    title: 'Advanced Commands',
    description: 'Power user features and hidden gems.',
    commands: ['secret', 'matrix', 'tarot', 'roll 2d6'],
    icon: '⚡'
  }
];

const HelpHints: React.FC<HelpHintsProps> = ({
  commandsTyped,
  exploredCommands,
  isVisible
}) => {
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);

  // Determine which hint to show based on user progress
  useEffect(() => {
    if (!isVisible) return;

    let hintIndex = 0;
    
    if (commandsTyped === 0) {
      hintIndex = 0; // Getting started
    } else if (commandsTyped < 3) {
      hintIndex = 1; // Navigation
    } else if (!exploredCommands.has('dy')) {
      hintIndex = 2; // About me
    } else if (!exploredCommands.has('story') && !exploredCommands.has('joke')) {
      hintIndex = 3; // Fun stuff
    } else {
      hintIndex = 4; // Advanced
    }

    setCurrentHintIndex(hintIndex);
    setShowHints(true);
  }, [commandsTyped, exploredCommands, isVisible]);

  const currentHint = helpHints[currentHintIndex];

  const nextHint = () => {
    setCurrentHintIndex((prev) => (prev + 1) % helpHints.length);
  };

  const prevHint = () => {
    setCurrentHintIndex((prev) => (prev - 1 + helpHints.length) % helpHints.length);
  };

  if (!isVisible || !showHints) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm">
      <div className="bg-gray-800/95 backdrop-blur-md border border-gray-600 rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{currentHint.icon}</span>
            <h3 className="font-semibold text-white text-sm">{currentHint.title}</h3>
          </div>
          <button
            onClick={() => setShowHints(false)}
            className="text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-gray-700/50"
            aria-label="Close hints"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-300 text-sm mb-3 leading-relaxed">
            {currentHint.description}
          </p>

          {/* Command examples */}
          <div className="space-y-2 mb-4">
            <p className="text-gray-400 text-xs font-medium">Try these commands:</p>
            <div className="flex flex-wrap gap-2">
              {currentHint.commands.map((command) => (
                <span
                  key={command}
                  className="px-2 py-1 bg-gray-700 text-gray-200 text-xs font-mono rounded border border-gray-600"
                >
                  {command}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {helpHints.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentHintIndex ? 'bg-blue-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={prevHint}
                className="p-1 text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Previous hint"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextHint}
                className="p-1 text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Next hint"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Footer tip */}
        <div className="px-4 pb-3">
          <p className="text-gray-500 text-xs">
            💡 Tip: Type <span className="text-yellow-400 font-mono">help</span> anytime for a full command list
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpHints;