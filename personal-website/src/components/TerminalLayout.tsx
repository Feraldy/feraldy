import React, { useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface TerminalLayoutProps {
  children: ReactNode;
  title: string;
  command?: string;
}

const TerminalLayout: React.FC<TerminalLayoutProps> = ({ children, title, command }) => {
  const [appAnimationStage, setAppAnimationStage] = useState<'tiny' | 'opened'>('tiny');
  const [contentVisible, setContentVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset and restart animation on route change
    setAppAnimationStage('tiny');
    setContentVisible(false);
    
    // Start the smooth opening animation after a brief delay (matching Landing page)
    const timer1 = setTimeout(() => {
      setAppAnimationStage('opened');
    }, 500);
    
    // Content ready, start showing content after animation completes (matching Landing page)
    const timer2 = setTimeout(() => {
      setContentVisible(true);
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
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
    <div className="min-h-screen terminal-bg">
      <div className="min-h-screen flex items-start justify-center px-2 sm:px-4 pt-4 md:pt-5 pb-8">
        <div className="flex items-start justify-center w-full">
          {/* Terminal Window */}
          <div 
            className={`bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-2xl w-full max-w-6xl mx-auto transition-all duration-1000 ease-out ${
              appAnimationStage === 'tiny' 
                ? 'scale-0 opacity-0' 
                : 'scale-100 opacity-100'
            }`}
            style={{
              transformOrigin: 'center center',
              height: 'clamp(600px, 85vh, 1000px)',
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
            
            {/* Terminal Content */}
            {appAnimationStage === 'opened' && (
              <div className="flex flex-col h-full" style={{ height: 'calc(100% - 60px)' }}>
                {contentVisible && (
                  <>
                    {/* Fixed Header Section */}
                    <div className="p-3 sm:p-4 terminal-font text-xs sm:text-sm md:text-base text-gray-300 flex-shrink-0">
                      <div className="space-y-2">
                        {/* Initial welcome header */}
                        <div className="pb-2 border-b border-gray-700">
                           <p className="text-green-400">Welcome to Feraldy's Terminal Portfolio v1.0.0</p>                          <p className="text-gray-400 text-xs mt-1">Type 'help' for available commands</p>
                        </div>
                        
                        {/* Command execution */}
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <span className="text-cyan-400">feraldy@portfolio</span>
                            <span className="text-white">:</span>
                            <span className="text-blue-400">~</span>
                            <span className="text-white">$</span>
                            <span className="text-gray-100 ml-2">{getCurrentCommand()}</span>
                          </div>
                        </div>
                        
                        {/* Page Title */}
                        <div className="mb-4 mt-4">
                          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                            {title}
                          </h1>
                          <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Scrollable Content Section */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar px-3 sm:px-4 pb-4">
                      <div className="text-gray-300 terminal-font text-xs sm:text-sm md:text-base">
                        {children}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalLayout;