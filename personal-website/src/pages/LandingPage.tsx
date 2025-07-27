import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TypewriterText from '../components/TypewriterText';

import SEO from '../components/SEO';
import NotificationManager from '../components/notifications/NotificationManager';
import CommandSuggestions from '../components/terminal/CommandSuggestions';
import DidYouMean from '../components/terminal/DidYouMean';
import TabManager from '../components/terminal/TabManager';
import ResumeTabContent from '../components/terminal/tabs/ResumeTabContent';
import ProjectsTabContent from '../components/terminal/tabs/ProjectsTabContent';
import BlogTabContent from '../components/terminal/tabs/BlogTabContent';
// import HelpHints from '../components/terminal/HelpHints'; // Disabled to reduce UI clutter
import { 
  createCommandRegistry, 
  getCommand, 
  getCommandSuggestions, 
  getDidYouMeanSuggestions 
} from '../terminal/commands';
import { TerminalContext, CommandHistoryItem, TerminalTab } from '../terminal/types';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>('');
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'whoami-typing' | 'whoami-enter' | 'whoami-response' | 'welcome-text' | 'about-typing' | 'about-enter' | 'about-response' | 'navigation'>('initial');
  const [appAnimationStage, setAppAnimationStage] = useState<'tiny' | 'opened'>('tiny');
  const [processingCommand, setProcessingCommand] = useState(false);
  const [currentProcessingCommand, setCurrentProcessingCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([]);
  const [animationSkipped, setAnimationSkipped] = useState(false);
  const [showSkipHint, setShowSkipHint] = useState(false);
  const [currentStoryState, setCurrentStoryState] = useState<string | null>(null);
  
  // New state for enhanced features
  const [commandRegistry] = useState(() => createCommandRegistry());
  const [_currentInput, setCurrentInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(0);
  const [commandsTyped, setCommandsTyped] = useState(0);
  const [invalidCommands, setInvalidCommands] = useState(0);
  const [exploredCommands, setExploredCommands] = useState<Set<string>>(new Set());
  const [lastInvalidCommand, setLastInvalidCommand] = useState<string>('');

  // Tab management state
  const [tabs, setTabs] = useState<TerminalTab[]>([
    { id: 'main', title: 'Terminal', type: 'main', isActive: true }
  ]);
  const [activeTabId, setActiveTabId] = useState('main');
  const hasAutoOpenedTabs = useRef(false);

  useEffect(() => {
    // Check if user has seen animation before
    const hasSeenAnimation = localStorage.getItem('hasSeenAnimation') === 'true';
    
    // Start the smooth opening animation after a brief delay
    setTimeout(() => {
      setAppAnimationStage('opened');
    }, 500);
    
    // Content ready, start typing after animation completes
    setTimeout(() => {
      setShowTypewriter(true);
      
      // If user has seen animation before, skip directly to navigation
      if (hasSeenAnimation) {
        setAnimationPhase('navigation');
        setAnimationSkipped(true);
      } else {
        // Show skip hint after a brief delay
        setTimeout(() => {
          setShowSkipHint(true);
        }, 1000);
      }
    }, 2500);

    // Handle URL hash for terminal tabs
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove #
      if (hash.startsWith('terminal-')) {
        const tabType = hash.replace('terminal-', '') as 'resume' | 'projects' | 'blog';
        if (['resume', 'projects', 'blog'].includes(tabType)) {
          // Check if we already have a tab of this type and just switch to it
          const existingTab = tabs.find(tab => tab.type === tabType);
          if (existingTab) {
            // Just switch to existing tab without creating new one
            setTabs(prevTabs => 
              prevTabs.map(tab => ({ ...tab, isActive: tab.id === existingTab.id }))
            );
            setActiveTabId(existingTab.id);
          } else {
            // Only create new tab if it doesn't exist
            handleOpenTab(tabType, tabType.charAt(0).toUpperCase() + tabType.slice(1));
          }
        }
      }
    };

    // Check initial hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Welcome text lines
  const welcomeLines = [
    "Hi, I'm Feraldy Nathanael!",
    "Welcome to My Terminal Portfolio v1.0.0",
    "Thanks for visiting and let's connect!"
  ];

  // Skip animation function
  const skipAnimation = () => {
    if (animationPhase !== 'navigation') {
      setAnimationPhase('navigation');
      setAnimationSkipped(true);
      setShowSkipHint(false);
      // Remember user preference
      localStorage.setItem('hasSeenAnimation', 'true');
    }
  };

  // Handle keyboard events for skipping
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && animationPhase !== 'navigation') {
        skipAnimation();
      }
    };

    const handleClick = () => {
      if (animationPhase !== 'navigation') {
        skipAnimation();
      }
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick);
    };
  }, [animationPhase]);

  // Handle animation sequence
  useEffect(() => {
    if (!showTypewriter || animationSkipped) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Start with whoami command
    if (animationPhase === 'initial') {
      const timer = setTimeout(() => {
        setAnimationPhase('whoami-typing');
      }, 800);
      timers.push(timer);
    }

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [showTypewriter, animationPhase, animationSkipped]);

  // Handle typewriter completion
  const handleTypingComplete = () => {
    if (animationPhase === 'whoami-typing') {
      // Show Enter key press after typing completes
      setTimeout(() => {
        setAnimationPhase('whoami-enter');
      }, 1);
    } else if (animationPhase === 'about-typing') {
      // Show Enter key press after typing completes
      setTimeout(() => {
        setAnimationPhase('about-enter');
      }, 1);
    }
  };

  // Handle phase transitions
  useEffect(() => {
    if (animationSkipped) return;

    if (animationPhase === 'whoami-enter') {
      // Show response after Enter key press
      const timer = setTimeout(() => {
        setAnimationPhase('whoami-response');
      }, 1);
      return () => clearTimeout(timer);
    } else if (animationPhase === 'whoami-response') {
      // Show welcome text after whoami response
      const timer = setTimeout(() => {
        setAnimationPhase('welcome-text');
      }, 1000);
      return () => clearTimeout(timer);
    } else if (animationPhase === 'welcome-text') {
      // Continue to about.txt command after welcome text
      const timer = setTimeout(() => {
        setAnimationPhase('about-typing');
      }, 3000);
      return () => clearTimeout(timer);
    } else if (animationPhase === 'about-enter') {
      // Show response after Enter key press
      const timer = setTimeout(() => {
        setAnimationPhase('about-response');
      }, 300);
      return () => clearTimeout(timer);
    } else if (animationPhase === 'about-response') {
      // Show navigation after about response
      const timer = setTimeout(() => {
        setAnimationPhase('navigation');
        setShowSkipHint(false);
        // Mark animation as seen when it completes naturally
        localStorage.setItem('hasSeenAnimation', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [animationPhase, animationSkipped]);

  // Auto-open tabs when navigation phase is reached
  useEffect(() => {
    if (animationPhase === 'navigation' && !hasAutoOpenedTabs.current) {
      // Check if we already have tabs other than main or if there's a hash in URL
      const hasOtherTabs = tabs.some(tab => tab.type !== 'main');
      const hasHashInUrl = window.location.hash.startsWith('#terminal-');
      
      if (!hasOtherTabs && !hasHashInUrl) {
        hasAutoOpenedTabs.current = true;
        
        // Only auto-open if we just have the main tab and no hash-based navigation
        const autoOpenTabs = [
          { type: 'resume' as const, title: 'Resume' },
          { type: 'projects' as const, title: 'Projects' },
          { type: 'blog' as const, title: 'Blog' }
        ];

        // Create all tabs at once to avoid race conditions
        setTimeout(() => {
          setTabs(prevTabs => {
            const newTabs = autoOpenTabs.map((tabInfo, index) => ({
              id: `${tabInfo.type}-${Date.now()}-${index}`,
              title: tabInfo.title,
              type: tabInfo.type,
              isActive: false
            }));

            return [
              ...prevTabs.map(tab => ({ ...tab, isActive: tab.id === 'main' })),
              ...newTabs
            ];
          });
          
          // Clear hash after creating tabs
          window.location.hash = '';
        }, 300);
      }
    }
  }, [animationPhase]);

  // Handle input changes for autocomplete
  const handleInputChange = (value: string) => {
    setCurrentInput(value);
    
    if (value.trim().length > 0) {
      const newSuggestions = getCommandSuggestions(value.trim());
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
      setHighlightedSuggestion(0);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  // Handle command execution
  const executeCommand = (commandText: string) => {
    const trimmedCommand = commandText.trim();
    if (!trimmedCommand) return;

    setCommandsTyped(prev => prev + 1);
    setExploredCommands(prev => new Set([...prev, trimmedCommand.split(' ')[0]]));

    // Parse command and arguments
    const parts = trimmedCommand.split(' ');
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Create terminal context
    const context: TerminalContext = {
      navigate,
      setShowContactForm,
      commandHistory,
      setCommandHistory,
      currentStoryState,
      setCurrentStoryState,
      tabs,
      setTabs,
      activeTabId,
      setActiveTabId
    };

    // Find and execute command
    const command = getCommand(commandRegistry, commandName);
    const newHistoryItem: CommandHistoryItem = { command: trimmedCommand, output: '' };

    if (command) {
      try {
        const result = command.execute(args, context);
        newHistoryItem.output = result.output;

        // Handle special command results
        if (result.shouldNavigate) {
          handleCommandClick(trimmedCommand, result.shouldNavigate);
          return;
        }
        if (result.shouldOpenContact) {
          setShowContactForm(true);
        }
        if (result.shouldOpenTab) {
          handleOpenTab(result.shouldOpenTab.type, result.shouldOpenTab.title);
        }
      } catch (error) {
        newHistoryItem.output = `Error executing command: ${error}`;
      }
    } else {
      // Command not found - show "did you mean" suggestions
      setInvalidCommands(prev => prev + 1);
      setLastInvalidCommand(commandName);
      const didYouMeanSuggestions = getDidYouMeanSuggestions(commandName);
      
      if (didYouMeanSuggestions.length > 0) {
        newHistoryItem.output = ''; // Will be handled by DidYouMean component
      } else {
        newHistoryItem.output = `Command not found: ${commandName}. Type 'help' for available commands.`;
      }
    }

    setCommandHistory(prev => [...prev, newHistoryItem]);
  };

  // Handle command processing animation
  const handleCommandClick = (command: string, path: string) => {
    setProcessingCommand(true);
    setCurrentProcessingCommand(command);
    
    // Simulate command processing
    setTimeout(() => {
      setProcessingCommand(false);
      navigate(path);
    }, 1500);
  };

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedSuggestion(prev => (prev + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedSuggestion(prev => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === 'Tab') {
        e.preventDefault();
        setCurrentInput(suggestions[highlightedSuggestion]);
        setShowSuggestions(false);
      }
    }

    if (e.key === 'Enter') {
      // If suggestions are showing, select the highlighted suggestion
      if (showSuggestions && suggestions.length > 0) {
        e.preventDefault();
        setCurrentInput(suggestions[highlightedSuggestion]);
        setShowSuggestions(false);
        // Update the input field value
        e.currentTarget.value = suggestions[highlightedSuggestion];
        return;
      }
      
      // Otherwise execute the command
      const command = e.currentTarget.value.trim();
      if (command) {
        executeCommand(command);
        e.currentTarget.value = '';
        setCurrentInput('');
        setShowSuggestions(false);
      }
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    setCurrentInput(suggestion);
    setShowSuggestions(false);
    // Focus back on input
    const input = document.querySelector('.terminal-input') as HTMLInputElement;
    if (input) {
      input.value = suggestion;
      input.focus();
    }
  };

  // Handle "did you mean" suggestion selection
  const handleDidYouMeanSelect = (suggestion: string) => {
    executeCommand(suggestion);
  };

  // Tab management functions
  const handleOpenTab = (type: 'resume' | 'projects' | 'blog', title: string) => {
    setTabs(prevTabs => {
      // Check if tab already exists using the current state
      const existingTab = prevTabs.find(tab => tab.type === type);
      if (existingTab) {
        // Switch to existing tab
        setActiveTabId(existingTab.id);
        window.location.hash = `terminal-${type}`;
        return prevTabs.map(tab => ({ ...tab, isActive: tab.id === existingTab.id }));
      }

      // Create new tab only if it doesn't exist
      const tabId = `${type}-${Date.now()}`;
      const newTab: TerminalTab = {
        id: tabId,
        title,
        type,
        isActive: true
      };

      setActiveTabId(tabId);
      window.location.hash = `terminal-${type}`;
      
      // Return new tabs array with existing tabs inactive and new tab active
      return [
        ...prevTabs.map(tab => ({ ...tab, isActive: false })),
        newTab
      ];
    });
  };

  const handleTabClick = (tabId: string) => {
    const targetTab = tabs.find(tab => tab.id === tabId);
    setTabs(prevTabs => 
      prevTabs.map(tab => ({ ...tab, isActive: tab.id === tabId }))
    );
    setActiveTabId(tabId);
    
    // Update URL hash
    if (targetTab && targetTab.type !== 'main') {
      window.location.hash = `terminal-${targetTab.type}`;
    } else {
      window.location.hash = '';
    }
  };

  const handleTabClose = (tabId: string) => {
    if (tabId === 'main') return; // Can't close main tab

    setTabs(prevTabs => {
      const filteredTabs = prevTabs.filter(tab => tab.id !== tabId);
      
      // If we're closing the active tab, switch to main
      if (activeTabId === tabId) {
        const updatedTabs = filteredTabs.map(tab => ({
          ...tab,
          isActive: tab.id === 'main'
        }));
        setActiveTabId('main');
        window.location.hash = ''; // Clear hash when returning to main
        return updatedTabs;
      }
      
      return filteredTabs;
    });
  };

  // Get current tab content
  const getCurrentTabContent = () => {
    const activeTab = tabs.find(tab => tab.isActive);
    if (!activeTab || activeTab.type === 'main') {
      return null;
    }

    switch (activeTab.type) {
      case 'resume':
        return <ResumeTabContent />;
      case 'projects':
        return <ProjectsTabContent />;
      case 'blog':
        return <BlogTabContent />;
      default:
        return null;
    }
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Using Formspree for form handling (free service)
      const response = await fetch('https://formspree.io/f/mldldoqa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New contact from ${formData.name} - Portfolio Website`,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setShowContactForm(false);
          setSubmitStatus('');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <SEO />

      {/* Notification Manager */}
      <NotificationManager
        onExecuteCommand={executeCommand}
        onOpenContact={() => setShowContactForm(true)}
        commandsTyped={commandsTyped}
        invalidCommands={invalidCommands}
        exploredCommands={exploredCommands}
        isTypingAnimationComplete={animationPhase === 'navigation'}
      />

      {/* Help Hints - Disabled to reduce UI clutter, functionality moved to NotificationManager */}
      {/* <HelpHints
        commandsTyped={commandsTyped}
        exploredCommands={exploredCommands}
        isVisible={animationPhase === 'navigation'}
      /> */}

      <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 py-4">
        <div className="flex items-center justify-center w-full">
          {/* Terminal Window */}
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
                onTabClick={handleTabClick}
                onTabClose={handleTabClose}
              />
            )}
            
            {/* Terminal Content */}
            {appAnimationStage === 'opened' && (
              <div className="flex flex-col h-full" style={{ height: tabs.length > 1 ? 'calc(100% - 100px)' : 'calc(100% - 60px)' }}>
                {getCurrentTabContent() ? (
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {getCurrentTabContent()}
                  </div>
                ) : showTypewriter && (
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-3 sm:p-4 terminal-font text-xs sm:text-sm md:text-base text-gray-300 space-y-2">
                      {/* Initial welcome header */}
                      <div className="pb-2 border-b border-gray-700">
                        <p className="text-green-400">Welcome to Feraldy's Terminal Portfolio v1.0.0</p>
                        <p className="text-gray-400 text-xs mt-1">Type 'help' for available commands</p>
                      </div>
                      
                      {/* Initial prompt with blinking cursor */}
                      {animationPhase === 'initial' && (
                        <div className="flex items-center">
                          <span className="text-cyan-400">feraldy@portfolio</span>
                          <span className="text-white">:</span>
                          <span className="text-blue-400">~</span>
                          <span className="text-white">$</span>
                          <span className="terminal-cursor text-yellow-400 font-bold ml-2">|</span>
                        </div>
                      )}
                      
                      {/* whoami command */}
                      {(animationPhase === 'whoami-typing' || animationPhase === 'whoami-enter' || animationPhase === 'whoami-response' || animationPhase === 'welcome-text' || animationPhase === 'about-typing' || animationPhase === 'about-enter' || animationPhase === 'about-response' || animationPhase === 'navigation') && (
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <span className="text-cyan-400">feraldy@portfolio</span>
                            <span className="text-white">:</span>
                            <span className="text-blue-400">~</span>
                            <span className="text-white">$</span>
                            <span className="ml-2">
                              {animationPhase === 'whoami-typing' ? (
                                <TypewriterText 
                                  texts={['whoami']}
                                  delay={80}
                                  typeOnce={true}
                                  onComplete={handleTypingComplete}
                                />
                              ) : (
                                <span className="text-gray-100">whoami</span>
                              )}
                              {animationPhase === 'whoami-enter' && (
                                <span className="text-green-400 ml-2 animate-pulse">↵</span>
                              )}
                            </span>
                          </div>
                          
                          {/* whoami response */}
                          {(animationPhase === 'whoami-response' || animationPhase === 'welcome-text' || animationPhase === 'about-typing' || animationPhase === 'about-enter' || animationPhase === 'about-response' || animationPhase === 'navigation') && (
                            <div className="-mt-1 space-y-1 text-gray-200">feraldy - Test Engineer & Project Manager</div>
                          )}
                        </div>
                      )}
                      
                      {/* Welcome text display */}
                      {(animationPhase === 'welcome-text' || animationPhase === 'about-typing' || animationPhase === 'about-enter' || animationPhase === 'about-response' || animationPhase === 'navigation') && (
                        <div className="-mt-1 space-y-1 pl-3 sm:pl-4 border-l-2 border-yellow-400">
                          {welcomeLines.map((line, index) => (
                            <p key={index} className="text-yellow-300">
                              {line}
                            </p>
                          ))}
                        </div>
                      )}
                      
                      {/* cat about.txt command */}
                      {(animationPhase === 'about-typing' || animationPhase === 'about-enter' || animationPhase === 'about-response' || animationPhase === 'navigation') && (
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <span className="text-cyan-400">feraldy@portfolio</span>
                            <span className="text-white">:</span>
                            <span className="text-blue-400">~</span>
                            <span className="text-white">$</span>
                            <span className="ml-2">
                              {animationPhase === 'about-typing' ? (
                                <TypewriterText 
                                  texts={['cat about.txt']}
                                  delay={80}
                                  typeOnce={true}
                                  onComplete={handleTypingComplete}
                                />
                              ) : (
                                <span className="text-gray-100">cat about.txt</span>
                              )}
                              {animationPhase === 'about-enter' && (
                                <span className="text-green-400 ml-2 animate-pulse">↵</span>
                              )}
                            </span>
                          </div>
                          
                          {/* about.txt response */}
                          {(animationPhase === 'about-response' || animationPhase === 'navigation') && (
                            <div className="ml-0 font-mono text-gray-200">
                              Hi, I am a passionate Test Engineer and Project Manager with over 3 years of experience in quality assurance and product development. I specialize in implementing effective QA processes, maintaining comprehensive test coverage with tools like Playwright and Qase.io, and managing product documentation to bridge the gap between technical and product teams.
                            </div>
                          )}
                        </div>
                      )}
                      
                       {/* Skip Animation Hint */}
                       {showSkipHint && animationPhase !== 'navigation' && (
                         <div className="fixed bottom-4 right-4 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 shadow-lg animate-pulse">
                           <p className="text-yellow-400 text-sm font-mono">
                             Press <span className="bg-gray-700 px-2 py-1 rounded text-white">Enter</span> or <span className="bg-gray-700 px-2 py-1 rounded text-white">Click</span> to skip
                           </p>
                         </div>
                       )}

                       {/* Interactive Terminal */}
                       {animationPhase === 'navigation' && !processingCommand && (
                         <div>
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
                                 </div>
                               )}
                               {/* Show "Did You Mean" for invalid commands */}
                               {!item.output && item.command.split(' ')[0] === lastInvalidCommand && (
                                 <DidYouMean
                                   suggestions={getDidYouMeanSuggestions(lastInvalidCommand)}
                                   originalCommand={lastInvalidCommand}
                                   onSelectSuggestion={handleDidYouMeanSelect}
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
                                 onKeyDown={handleKeyDown}
                                 onChange={(e) => handleInputChange(e.target.value)}
                               />
                             </div>
                             
                             {/* Command Suggestions */}
                             <CommandSuggestions
                               suggestions={suggestions}
                               onSelectSuggestion={handleSuggestionSelect}
                               isVisible={showSuggestions}
                               highlightedIndex={highlightedSuggestion}
                             />
                           </div>
                         </div>
                       )}
                      
                      {/* Command processing animation */}
                      {processingCommand && (
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <span className="text-cyan-400">feraldy@portfolio</span>
                            <span className="text-white">:</span>
                            <span className="text-blue-400">~</span>
                            <span className="text-white">$</span>
                            <span className="text-gray-100 ml-2">{currentProcessingCommand}</span>
                            <span className="text-cyan-400 ml-2">↵</span>
                          </div>
                          <div className=" flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                            <span className="text-gray-400 font-mono">Processing...</span>
                          </div>
                        </div>
                      )}
                     </div>
                   </div>
                 )}
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div id="contact" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
            {/* Close button */}
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Form header */}
            <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>

            {/* Contact form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Your message..."
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-md hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <div className="text-green-400 text-sm text-center">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="text-red-400 text-sm text-center">
                  Failed to send message. Please try again or email me directly at fn.archived@gmail.com
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;