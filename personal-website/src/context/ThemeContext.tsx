import React, { createContext, useContext } from 'react';

// Define theme types
export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  backgroundSecondary: string;
  text: string;
  textSecondary: string;
  border: string;
};

// Define theme options
export type ThemeOption = 'blue' | 'purple' | 'green' | 'orange';

// Define theme color schemes
const themeColors: Record<ThemeOption, ThemeColors> = {
  blue: {
    primary: 'from-blue-400 to-blue-500',
    secondary: 'from-yellow-400 to-yellow-500',
    accent: 'blue-400',
    background: 'from-neutral-900 via-neutral-800 to-neutral-900',
    backgroundSecondary: 'neutral-800',
    text: 'white',
    textSecondary: 'gray-400',
    border: 'neutral-700'
  },
  purple: {
    primary: 'from-purple-400 to-purple-500',
    secondary: 'from-pink-400 to-pink-500',
    accent: 'purple-400',
    background: 'from-neutral-900 via-neutral-800 to-neutral-900',
    backgroundSecondary: 'neutral-800',
    text: 'white',
    textSecondary: 'gray-400',
    border: 'neutral-700'
  },
  green: {
    primary: 'from-emerald-400 to-emerald-500',
    secondary: 'from-yellow-400 to-yellow-500',
    accent: 'emerald-400',
    background: 'from-neutral-900 via-neutral-800 to-neutral-900',
    backgroundSecondary: 'neutral-800',
    text: 'white',
    textSecondary: 'gray-400',
    border: 'neutral-700'
  },
  orange: {
    primary: 'from-orange-400 to-orange-500',
    secondary: 'from-yellow-400 to-yellow-500',
    accent: 'orange-400',
    background: 'from-neutral-900 via-neutral-800 to-neutral-900',
    backgroundSecondary: 'neutral-800',
    text: 'white',
    textSecondary: 'gray-400',
    border: 'neutral-700'
  }
};

// Define theme context type
type ThemeContextType = {
  colors: ThemeColors;
};

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// To change the theme, modify the CURRENT_THEME constant below
const CURRENT_THEME: ThemeOption = 'blue';

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get current theme colors
  const colors = themeColors[CURRENT_THEME];

  return (
    <ThemeContext.Provider value={{ colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Helper function to get theme class
export const getThemeClass = (baseClass: string, colorKey: keyof ThemeColors): string => {
  const { colors } = useTheme();
  return `${baseClass}-${colors[colorKey]}`;
};

// Helper function to get gradient class
export const getGradientClass = (type: 'primary' | 'secondary'): string => {
  const { colors } = useTheme();
  return `bg-gradient-to-r ${colors[type]}`;
};

// Helper function to get text gradient class
export const getTextGradientClass = (type: 'primary' | 'secondary'): string => {
  const { colors } = useTheme();
  return `bg-gradient-to-r ${colors[type]} bg-clip-text text-transparent`;
};

// Helper function to get border class
export const getBorderClass = (): string => {
  const { colors } = useTheme();
  return `border-${colors.border}`;
};

// Helper function to get background class
export const getBackgroundClass = (secondary: boolean = false): string => {
  const { colors } = useTheme();
  return secondary 
    ? `bg-${colors.backgroundSecondary}` 
    : `bg-gradient-to-br ${colors.background}`;
};

// Helper function to get text class
export const getTextClass = (secondary: boolean = false): string => {
  const { colors } = useTheme();
  return `text-${secondary ? colors.textSecondary : colors.text}`;
};

