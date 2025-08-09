import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import SEO from '../components/SEO';
import NotificationManager from '../components/notifications/NotificationManager';
import ContactModal from '../components/ContactModal';
import TerminalWindow from '../components/terminal/TerminalWindow';
import AnimationSequence from '../components/terminal/AnimationSequence';
import InteractiveTerminal from '../components/terminal/InteractiveTerminal';
import ResumeTabContent from '../components/terminal/tabs/ResumeTabContent';
import ProjectsTabContent from '../components/terminal/tabs/ProjectsTabContent';
import BlogTabContent from '../components/terminal/tabs/BlogTabContent';
import TabLoadingAnimation from '../components/terminal/TabLoadingAnimation';

import { useAnimationSequence } from '../hooks/useAnimationSequence';
import { useTerminalInput } from '../hooks/useTerminalInput';
import { 
  createCommandRegistry, 
  getCommand, 
  getDidYouMeanSuggestions 
} from '../terminal/commands';
import { TerminalContext, CommandHistoryItem, TerminalTab } from '../terminal/types';
import { ANIMATION_PHASES, ANIMATION_TIMINGS } from '../utils/constants';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showContactForm, setShowContactForm] = useState(false);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const [processingCommand, setProcessingCommand] = useState(false);
  const [currentProcessingCommand, setCurrentProcessingCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([]);
  const [currentStoryState, setCurrentStoryState] = useState<string | null>(null);
  const [currentStoryId, setCurrentStoryId] = useState<string | null>(null);
  const [blackjackState, setBlackjackState] = useState<any>(null);
  const [hangmanState, setHangmanState] = useState<any>(null);
  const [selectedBlogStory, setSelectedBlogStory] = useState<string | null>(null);

  // Enhanced features state
  const [commandsTyped, setCommandsTyped] = useState(0);
  const [invalidCommands, setInvalidCommands] = useState(0);
  const [exploredCommands, setExploredCommands] = useState<Set<string>>(new Set());
  const [lastInvalidCommand, setLastInvalidCommand] = useState<string>('');

  // Tab management state
  const [tabs, setTabs] = useState<TerminalTab[]>([
    { id: 'main', title: 'Terminal', type: 'main', isActive: true },
    { id: 'resume-initial', title: 'Resume', type: 'resume', isActive: false, disabled: true },
    { id: 'projects-initial', title: 'Projects', type: 'projects', isActive: false, disabled: true },
    { id: 'blog-initial', title: 'Blog', type: 'blog', isActive: false, disabled: true }
  ]);
  const [activeTabId, setActiveTabId] = useState('main');
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [loadingTabId, setLoadingTabId] = useState<string | null>(null);
  const hasAutoOpenedTabs = useRef(false);

  // Use custom hooks
  const {
    showTypewriter,
    animationPhase,
    appAnimationStage,
    showSkipHint,
    handleTypingComplete
  } = useAnimationSequence();

  const {
    suggestions,
    showSuggestions,
    highlightedSuggestion,
    handleInputChange,
    handleKeyDown: terminalKeyDown,
    handleSuggestionSelect
  } = useTerminalInput();

  // Handle blog story navigation from projects
  const handleBlogStoryClick = (storySlug: string) => {
    setSelectedBlogStory(storySlug);
    setSearchParams({ story: storySlug });
    const blogTab = tabs.find(tab => tab.type === 'blog');
    if (blogTab && !blogTab.disabled) {
      setTabs(tabs.map(tab => ({ ...tab, isActive: tab.id === blogTab.id })));
      setActiveTabId(blogTab.id);
    }
  };

  // Handle URL parameters on load
  useEffect(() => {
    const storyParam = searchParams.get('story');
    if (storyParam) {
      setSelectedBlogStory(storyParam);
      
      // Enable blog tab immediately and switch to it
      setTabs(prevTabs => {
        const updatedTabs = prevTabs.map(tab => ({
          ...tab,
          disabled: tab.type === 'blog' ? false : tab.disabled,
          isActive: tab.type === 'blog'
        }));
        
        // Set active tab to blog
        const blogTab = updatedTabs.find(tab => tab.type === 'blog');
        if (blogTab) {
          setActiveTabId(blogTab.id);
        }
        
        return updatedTabs;
      });
    }
  }, [searchParams]);

  // Auto-scroll terminal to bottom when new command output is added
  useEffect(() => {
    if (terminalContentRef.current && activeTabId === 'main' && commandHistory.length > 0) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        if (terminalContentRef.current) {
          terminalContentRef.current.scrollTo({ 
            top: terminalContentRef.current.scrollHeight, 
            behavior: 'smooth' 
          });
        }
      }, 100);
    }
  }, [commandHistory, activeTabId]);

  // Handle URL hash for terminal tabs
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('terminal-')) {
        const tabType = hash.replace('terminal-', '') as 'resume' | 'projects' | 'blog';
        if (['resume', 'projects', 'blog'].includes(tabType)) {
          const existingTab = tabs.find(tab => tab.type === tabType);
          if (existingTab && !existingTab.disabled) {
            setTabs(prevTabs => 
              prevTabs.map(tab => ({ ...tab, isActive: tab.id === existingTab.id }))
            );
            setActiveTabId(existingTab.id);
          }
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [tabs]);

  // Enable tabs when navigation phase is reached
  useEffect(() => {
    if (animationPhase === ANIMATION_PHASES.NAVIGATION && !hasAutoOpenedTabs.current) {
      hasAutoOpenedTabs.current = true;
      
      // Enable all disabled tabs, but preserve existing active states
      setTabs(prevTabs => 
        prevTabs.map(tab => ({ 
          ...tab, 
          disabled: false 
        }))
      );
    }
  }, [animationPhase]);

  // Handle command execution
  const executeCommand = (commandText: string) => {
    const trimmedCommand = commandText.trim();
    if (!trimmedCommand) return;

    setCommandsTyped(prev => prev + 1);
    setExploredCommands(prev => new Set([...prev, trimmedCommand.split(' ')[0]]));

    const parts = trimmedCommand.split(' ');
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    const updateCommandOutput = (updateId: string, newOutput: string) => {
      setCommandHistory(prev => 
        prev.map(item => 
          item.updateId === updateId 
            ? { ...item, output: newOutput, isUpdating: false }
            : item
        )
      );
    };

    const context: TerminalContext = {
      navigate,
      setShowContactForm,
      commandHistory,
      setCommandHistory,
      currentStoryState,
      setCurrentStoryState,
      currentStoryId,
      setCurrentStoryId,
      blackjackState,
      setBlackjackState,
      hangmanState,
      setHangmanState,
      tabs,
      setTabs,
      activeTabId,
      setActiveTabId,
      updateCommandOutput
    };

    const command = getCommand(createCommandRegistry(), commandName);
    const newHistoryItem: CommandHistoryItem = { command: trimmedCommand, output: '' };

    if (command) {
      try {
        const result = command.execute(args, context);
        newHistoryItem.output = result.output;
        newHistoryItem.isUpdating = result.isUpdating;
        newHistoryItem.updateId = result.updateId;

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
      setInvalidCommands(prev => prev + 1);
      setLastInvalidCommand(commandName);
      const didYouMeanSuggestions = getDidYouMeanSuggestions(commandName);
      
      if (didYouMeanSuggestions.length > 0) {
        newHistoryItem.output = '';
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
    
    setTimeout(() => {
      setProcessingCommand(false);
      navigate(path);
    }, ANIMATION_TIMINGS.COMMAND_PROCESSING_DELAY);
  };

  // Handle "did you mean" suggestion selection
  const handleDidYouMeanSelect = (suggestion: string) => {
    executeCommand(suggestion);
  };

  // Clear screen function for Ctrl+L
  const handleClearScreen = () => {
    setCommandHistory([]);
  };

  // Wrap terminal key down to include command execution
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    terminalKeyDown(e, executeCommand, handleClearScreen);
  };

  // Tab management functions
  const handleOpenTab = (type: 'resume' | 'projects' | 'blog', _title: string) => {
    const existingTab = tabs.find(tab => tab.type === type);
    if (existingTab) {
      setActiveTabId(existingTab.id);
      setTabs(prevTabs => 
        prevTabs.map(tab => ({ ...tab, isActive: tab.id === existingTab.id }))
      );
      
      // Scroll terminal content to top when opening a new tab
      setTimeout(() => {
        if (terminalContentRef.current) {
          terminalContentRef.current.scrollTo({ top: 0, behavior: 'auto' });
        }
      }, 100);
    }
  };

  const handleTabClick = (tabId: string) => {
    if (tabId === activeTabId || isTabLoading) return;

    const targetTab = tabs.find(tab => tab.id === tabId);
    if (!targetTab) return;

    setIsTabLoading(true);
    setLoadingTabId(tabId);

    setTimeout(() => {
      setTabs(prevTabs => 
        prevTabs.map(tab => ({ ...tab, isActive: tab.id === tabId }))
      );
      setActiveTabId(tabId);
      setIsTabLoading(false);
      setLoadingTabId(null);

      if (targetTab.type !== 'main') {
        // Scroll terminal content to top when switching to a content tab
        if (terminalContentRef.current) {
          terminalContentRef.current.scrollTo({ top: 0, behavior: 'auto' });
        }
      } else {
        window.location.hash = '';
      }
    }, ANIMATION_TIMINGS.TAB_LOADING_DELAY);
  };

  const handleTabClose = (tabId: string) => {
    if (tabId === 'main') return;

    setTabs(prevTabs => {
      const filteredTabs = prevTabs.filter(tab => tab.id !== tabId);
      
      if (activeTabId === tabId) {
        const updatedTabs = filteredTabs.map(tab => ({
          ...tab,
          isActive: tab.id === 'main'
        }));
        setActiveTabId('main');
        window.location.hash = '';
        return updatedTabs;
      }
      
      return filteredTabs;
    });
  };

  // Get current tab content
  const getCurrentTabContent = () => {
    const activeTab = tabs.find(tab => tab.isActive);

    if (isTabLoading && loadingTabId) {
      const loadingTab = tabs.find(tab => tab.id === loadingTabId);
      const command = `cd ./${loadingTab?.type || ''} && ls -la`;
      const message = `Changing directory to ${loadingTab?.title || ''}...`;
      return <TabLoadingAnimation command={command} message={message} />;
    }

    if (!activeTab || activeTab.type === 'main') {
      return null;
    }

    switch (activeTab.type) {
      case 'resume':
        return <ResumeTabContent />;
      case 'projects':
        return <ProjectsTabContent onBlogStoryClick={handleBlogStoryClick} />;
      case 'blog':
        return <BlogTabContent selectedStory={selectedBlogStory} />;
      default:
        return null;
    }
  };

  const renderMainTerminalContent = () => {
    if (getCurrentTabContent()) {
      return getCurrentTabContent();
    }

    if (!showTypewriter) {
      return null;
    }

    if (animationPhase !== ANIMATION_PHASES.NAVIGATION) {
      return (
        <AnimationSequence
          animationPhase={animationPhase}
          onTypingComplete={handleTypingComplete}
          showSkipHint={showSkipHint}
        />
      );
    }

    if (processingCommand) {
      return (
        <div className="p-3 sm:p-4 terminal-font text-xs sm:text-sm md:text-base text-gray-300 space-y-2">
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="text-cyan-400">feraldy@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">$</span>
              <span className="text-gray-100 ml-2">{currentProcessingCommand}</span>
              <span className="text-cyan-400 ml-2">↵</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="text-gray-400 font-mono">Processing...</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-3 sm:p-4 terminal-font text-xs sm:text-sm md:text-base text-gray-300 space-y-2">
        <InteractiveTerminal
          commandHistory={commandHistory}
          lastInvalidCommand={lastInvalidCommand}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          highlightedSuggestion={highlightedSuggestion}
          onKeyDown={handleKeyDown}
          onInputChange={handleInputChange}
          onSuggestionSelect={handleSuggestionSelect}
          onDidYouMeanSelect={handleDidYouMeanSelect}
          showHeader={true}
          showAnimationContent={true}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <SEO />

      <NotificationManager
        onExecuteCommand={executeCommand}
        onOpenContact={() => setShowContactForm(true)}
        commandsTyped={commandsTyped}
        invalidCommands={invalidCommands}
        exploredCommands={exploredCommands}
        isTypingAnimationComplete={animationPhase === ANIMATION_PHASES.NAVIGATION}
      />

      <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 py-4">
        <div className="flex items-center justify-center w-full">
          <TerminalWindow
            ref={terminalContentRef}
            appAnimationStage={appAnimationStage}
            tabs={tabs}
            activeTabId={activeTabId}
            isTabLoading={isTabLoading}
            loadingTabId={loadingTabId}
            onTabClick={handleTabClick}
            onTabClose={handleTabClose}
          >
            {renderMainTerminalContent()}
          </TerminalWindow>
        </div>
      </div>

      <ContactModal
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
      />
    </div>
  );
};

export default LandingPage;