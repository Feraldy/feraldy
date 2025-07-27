export interface TerminalTab {
  id: string;
  title: string;
  type: 'main' | 'resume' | 'projects' | 'blog';
  content?: any;
  isActive: boolean;
}

export interface TerminalContext {
  navigate: (path: string) => void;
  setShowContactForm: (show: boolean) => void;
  commandHistory: CommandHistoryItem[];
  setCommandHistory: React.Dispatch<React.SetStateAction<CommandHistoryItem[]>>;
  currentStoryState: string | null;
  setCurrentStoryState: React.Dispatch<React.SetStateAction<string | null>>;
  tabs?: TerminalTab[];
  setTabs?: React.Dispatch<React.SetStateAction<TerminalTab[]>>;
  activeTabId?: string;
  setActiveTabId?: React.Dispatch<React.SetStateAction<string>>;
}

export interface CommandHistoryItem {
  command: string;
  output: string;
}

export interface CommandResult {
  output: string;
  shouldAddToHistory?: boolean;
  shouldNavigate?: string;
  shouldOpenContact?: boolean;
  shouldOpenTab?: {
    type: 'resume' | 'projects' | 'blog';
    title: string;
  };
}

export interface Command {
  name: string;
  description: string;
  category: 'system' | 'fun' | 'navigation' | 'interactive' | 'info';
  execute: (args: string[], context: TerminalContext) => CommandResult;
  aliases?: string[];
  usage?: string;
  examples?: string[];
}

export interface CommandCategory {
  name: string;
  description: string;
  commands: Command[];
}

export type CommandRegistry = Map<string, Command>;

export interface StoryChoice {
  text: string;
  next: string;
}

export interface StoryNode {
  title: string;
  text: string;
  choices: Record<string, StoryChoice>;
}

export type StoryData = Record<string, StoryNode>;