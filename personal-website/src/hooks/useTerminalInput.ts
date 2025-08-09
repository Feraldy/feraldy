import { useState, useEffect } from 'react';
import { getCommandSuggestions } from '../terminal/commands';

export const useTerminalInput = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(0);
  
  // Command history state
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tempInput, setTempInput] = useState('');
  
  // Load command history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('terminal-command-history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          setCommandHistory(parsedHistory);
        }
      } catch (error) {
        console.warn('Failed to parse command history from localStorage');
      }
    }
  }, []);

  // Save command to history
  const saveCommandToHistory = (command: string) => {
    if (!command.trim()) return;
    
    setCommandHistory(prev => {
      // Remove duplicate if it exists and add to front
      const filtered = prev.filter(cmd => cmd !== command.trim());
      const newHistory = [command.trim(), ...filtered].slice(0, 50); // Keep last 50 commands
      
      // Save to localStorage
      localStorage.setItem('terminal-command-history', JSON.stringify(newHistory));
      return newHistory;
    });
    
    // Reset history navigation
    setHistoryIndex(-1);
    setTempInput('');
  };

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, onExecuteCommand: (command: string) => void, onClearScreen?: () => void) => {
    const input = e.currentTarget;
    const { selectionStart, selectionEnd } = input;
    
    // Handle Ctrl key combinations first
    if (e.ctrlKey) {
      switch (e.key) {
        case 'a':
        case 'A':
          e.preventDefault();
          input.setSelectionRange(0, 0);
          return;
        case 'e':
        case 'E':
          e.preventDefault();
          input.setSelectionRange(input.value.length, input.value.length);
          return;
        case 'u':
        case 'U':
          e.preventDefault();
          const afterCursor = input.value.substring(selectionEnd || 0);
          input.value = afterCursor;
          setCurrentInput(afterCursor);
          input.setSelectionRange(0, 0);
          return;
        case 'k':
        case 'K':
          e.preventDefault();
          const beforeCursorK = input.value.substring(0, selectionStart || 0);
          input.value = beforeCursorK;
          setCurrentInput(beforeCursorK);
          input.setSelectionRange(beforeCursorK.length, beforeCursorK.length);
          return;
        case 'w':
        case 'W':
          e.preventDefault();
          const value = input.value;
          const cursorPos = selectionStart || 0;
          let wordStart = cursorPos;
          
          // Find start of current word (skip whitespace first)
          while (wordStart > 0 && /\s/.test(value[wordStart - 1])) {
            wordStart--;
          }
          while (wordStart > 0 && !/\s/.test(value[wordStart - 1])) {
            wordStart--;
          }
          
          const newValue = value.substring(0, wordStart) + value.substring(cursorPos);
          input.value = newValue;
          setCurrentInput(newValue);
          input.setSelectionRange(wordStart, wordStart);
          return;
        case 'l':
        case 'L':
          e.preventDefault();
          if (onClearScreen) {
            onClearScreen();
          }
          return;
        case 'c':
        case 'C':
          e.preventDefault();
          input.value = '';
          setCurrentInput('');
          setShowSuggestions(false);
          setHistoryIndex(-1);
          setTempInput('');
          return;
      }
    }

    // Handle suggestions navigation
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedSuggestion(prev => (prev + 1) % suggestions.length);
        return;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedSuggestion(prev => (prev - 1 + suggestions.length) % suggestions.length);
        return;
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const selectedSuggestion = suggestions[highlightedSuggestion];
        input.value = selectedSuggestion;
        setCurrentInput(selectedSuggestion);
        setShowSuggestions(false);
        return;
      }
    }

    // Handle command history navigation (when no suggestions are showing)
    if (!showSuggestions) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length === 0) return;
        
        // Save current input if we're starting to navigate history
        if (historyIndex === -1) {
          setTempInput(input.value);
        }
        
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        const historyCommand = commandHistory[newIndex];
        input.value = historyCommand;
        setCurrentInput(historyCommand);
        return;
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex === -1) return;
        
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        
        if (newIndex === -1) {
          // Return to the original input
          input.value = tempInput;
          setCurrentInput(tempInput);
        } else {
          const historyCommand = commandHistory[newIndex];
          input.value = historyCommand;
          setCurrentInput(historyCommand);
        }
        return;
      }
    }

    // Handle tab completion (when no suggestions are showing)
    if (e.key === 'Tab' && !showSuggestions) {
      e.preventDefault();
      const currentValue = input.value.trim();
      if (currentValue) {
        const newSuggestions = getCommandSuggestions(currentValue);
        if (newSuggestions.length === 1) {
          // Complete with the single match
          input.value = newSuggestions[0];
          setCurrentInput(newSuggestions[0]);
        } else if (newSuggestions.length > 1) {
          // Show suggestions
          setSuggestions(newSuggestions);
          setShowSuggestions(true);
          setHighlightedSuggestion(0);
        }
      }
      return;
    }

    // Handle Enter key
    if (e.key === 'Enter') {
      // If suggestions are showing, select the highlighted suggestion
      if (showSuggestions && suggestions.length > 0) {
        e.preventDefault();
        const selectedSuggestion = suggestions[highlightedSuggestion];
        input.value = selectedSuggestion;
        setCurrentInput(selectedSuggestion);
        setShowSuggestions(false);
        return;
      }
      
      // Otherwise execute the command
      const command = input.value.trim();
      if (command) {
        saveCommandToHistory(command);
        onExecuteCommand(command);
        input.value = '';
        setCurrentInput('');
        setShowSuggestions(false);
        setHistoryIndex(-1);
        setTempInput('');
      }
    }

    // Reset history navigation when typing
    if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') {
      if (historyIndex !== -1) {
        setHistoryIndex(-1);
        setTempInput('');
      }
    }
  };

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

  return {
    currentInput,
    suggestions,
    showSuggestions,
    highlightedSuggestion,
    handleInputChange,
    handleKeyDown,
    handleSuggestionSelect
  };
};