import { useState } from 'react';
import { getCommandSuggestions } from '../terminal/commands';

export const useTerminalInput = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(0);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, onExecuteCommand: (command: string) => void) => {
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
        onExecuteCommand(command);
        e.currentTarget.value = '';
        setCurrentInput('');
        setShowSuggestions(false);
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