import React, { useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface TerminalLayoutProps {
  children: ReactNode;
  title: string;
  command?: string;
}

const TerminalLayout: React.FC<TerminalLayoutProps> = ({ children, title, command }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [terminalOpened, setTerminalOpened] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset states on route change
    setIsVisible(false);
    setTerminalOpened(false);
    setContentVisible(false);

    // OS-like app opening sequence
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setTerminalOpened(true), 400);
    setTimeout(() => setContentVisible(true), 700);
  }, [location.pathname]);

  // Get command based on current route
  const getCurrentCommand = () => {
    if (command) return command;
    
    const path = location.pathname;
    switch (path) {
      case '/projects': return 'cd ./projects && ls -la';
      case '/resume': return 'cat ./resume.pdf';
      case '/photography': return 'cd ./photography && ls -la';
      case '/blog': return 'cd ./blog && ls -la';
      default: return 'pwd';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="min-h-screen flex items-start justify-center px-4 pt-16 md:pt-20">
        <div className="w-full max-w-7xl mx-auto">
          {/* Terminal Window */}
          <div 
            className={`bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-2xl ${
              isVisible 
                ? terminalOpened
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-70 scale-75 translate-y-6'
                : 'opacity-0 scale-[0.4] translate-y-12'
            }`}
            style={{
              transformOrigin: 'center bottom',
              transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              filter: terminalOpened 
                ? 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))' 
                : 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))',
              willChange: 'transform, opacity, filter'
            }}
          >
            {/* Terminal Header */}
            <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-gray-400 text-sm font-mono">feraldy@portfolio ~ </div>
              <div className="w-4"></div>
            </div>
            
            {/* Terminal Command Bar */}
            <div className="bg-gray-850 px-4 py-2 border-b border-gray-700 font-mono text-sm">
              <div className="flex items-center">
                <span className="text-blue-400 mr-2">$</span>
                <span className="text-gray-300">{getCurrentCommand()}</span>
                <span className="text-green-400 ml-2">✓</span>
              </div>
            </div>
            
            {/* Terminal Content */}
            <div 
              className={`transition-all duration-500 ${
                terminalOpened 
                  ? 'min-h-[600px] opacity-100' 
                  : 'h-0 opacity-0'
              }`}
            >
              <div 
                className={`p-6 transition-all duration-300 ${
                  contentVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
              >
                {/* Page Title */}
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                    {title}
                  </h1>
                  <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded"></div>
                </div>
                
                {/* Page Content */}
                <div className="text-gray-300">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalLayout;