export interface NotificationAction {
  label: string;
  type: 'command' | 'route' | 'action';
  value: string;
}

export interface NotificationConfig {
  id: string;
  type: 'welcome' | 'help' | 'portfolio' | 'contact' | 'achievement' | 'mobile';
  title: string;
  message: string;
  actions: NotificationAction[];
  icon: string;
  duration: number;
  priority: 'low' | 'medium' | 'high';
}

export interface NotificationTrigger {
  id: string;
  trigger: string;
  condition: (context: NotificationTriggerContext) => boolean;
  notification: NotificationConfig;
  cooldown?: number; // Minimum time between showing this notification (ms)
  maxShows?: number; // Maximum times to show this notification
}

export interface NotificationTriggerContext {
  timeOnPage: number;
  commandsTyped: number;
  invalidCommands: number;
  lastActivity: number;
  hasSeenWelcome: boolean;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  exploredCommands: Set<string>;
  currentPath: string;
}

export const notificationTriggers: NotificationTrigger[] = [
  {
    id: 'welcome',
    trigger: 'after_terminal_animation',
    condition: (context) => 
      context.timeOnPage > 3000 && 
      !context.hasSeenWelcome && 
      context.commandsTyped === 0,
    notification: {
      id: 'welcome',
      type: 'welcome',
      title: 'Welcome to my portfolio!',
      message: 'New here? Try typing "help" or click below to explore my work',
      actions: [
        { label: 'Show Help', type: 'command', value: 'help' },
        { label: 'View Projects', type: 'command', value: 'projects' }
      ],
      icon: '👋',
      duration: 8000,
      priority: 'high'
    },
    maxShows: 1
  },
  {
    id: 'getting_started',
    trigger: 'first_commands',
    condition: (context) => 
      context.commandsTyped === 0 && 
      context.timeOnPage > 8000 && 
      context.hasSeenWelcome,
    notification: {
      id: 'getting_started',
      type: 'help',
      title: 'Getting Started 🚀',
      message: 'New to the terminal? Try these essential commands: help, ls, whoami',
      actions: [
        { label: 'Show Help', type: 'command', value: 'help' },
        { label: 'List Files', type: 'command', value: 'ls' }
      ],
      icon: '🚀',
      duration: 12000,
      priority: 'medium'
    },
    cooldown: 120000,
    maxShows: 1
  },
  {
    id: 'navigation_help',
    trigger: 'few_commands',
    condition: (context) => 
      context.commandsTyped >= 1 && 
      context.commandsTyped < 3 && 
      !context.exploredCommands.has('projects') &&
      !context.exploredCommands.has('resume'),
    notification: {
      id: 'navigation_help',
      type: 'help',
      title: 'Quick Navigation 🧭',
      message: 'Jump directly to different sections: projects, resume, blog',
      actions: [
        { label: 'View Projects', type: 'command', value: 'projects' },
        { label: 'View Resume', type: 'command', value: 'resume' }
      ],
      icon: '🧭',
      duration: 10000,
      priority: 'medium'
    },
    cooldown: 180000,
    maxShows: 1
  },
  {
    id: 'about_me_help',
    trigger: 'explore_about',
    condition: (context) => 
      context.commandsTyped >= 3 && 
      !context.exploredCommands.has('dy'),
    notification: {
      id: 'about_me_help',
      type: 'help',
      title: 'Learn About Me 👨‍💻',
      message: 'Discover my background: dy, dy --skills, dy --history',
      actions: [
        { label: 'About Me', type: 'command', value: 'dy' },
        { label: 'My Skills', type: 'command', value: 'dy --skills' }
      ],
      icon: '👨‍💻',
      duration: 10000,
      priority: 'medium'
    },
    cooldown: 300000,
    maxShows: 1
  },
  {
    id: 'fun_features',
    trigger: 'try_interactive',
    condition: (context) => 
      context.exploredCommands.has('dy') && 
      !context.exploredCommands.has('story') && 
      !context.exploredCommands.has('joke'),
    notification: {
      id: 'fun_features',
      type: 'help',
      title: 'Interactive Features 🎮',
      message: 'Try these fun commands: story, hack, fortune, joke',
      actions: [
        { label: 'Interactive Story', type: 'command', value: 'story' },
        { label: 'Random Joke', type: 'command', value: 'joke' }
      ],
      icon: '🎮',
      duration: 10000,
      priority: 'medium'
    },
    cooldown: 300000,
    maxShows: 1
  },
  {
    id: 'idle_help',
    trigger: 'idle_30_seconds',
    condition: (context) => 
      Date.now() - context.lastActivity > 30000 && 
      context.commandsTyped < 5,
    notification: {
      id: 'idle_help',
      type: 'help',
      title: 'Still exploring?',
      message: 'Try "projects" for my work, or "story" for an interactive experience',
      actions: [
        { label: 'View Projects', type: 'command', value: 'projects' },
        { label: 'Interactive Story', type: 'command', value: 'story' }
      ],
      icon: '💡',
      duration: 8000,
      priority: 'low'
    },
    cooldown: 60000,
    maxShows: 2
  },
  {
    id: 'command_not_found',
    trigger: 'command_not_found_3x',
    condition: (context) => context.invalidCommands >= 3,
    notification: {
      id: 'command_not_found',
      type: 'help',
      title: 'Command not found',
      message: 'Having trouble? Here are some popular commands to try',
      actions: [
        { label: 'Show All Commands', type: 'command', value: 'help' },
        { label: 'Contact Me', type: 'action', value: 'openContact' }
      ],
      icon: '🤔',
      duration: 12000,
      priority: 'high'
    },
    maxShows: 1
  },
  {
    id: 'terminal_explorer',
    trigger: 'explored_commands',
    condition: (context) => context.exploredCommands.size >= 5,
    notification: {
      id: 'terminal_explorer',
      type: 'achievement',
      title: 'Terminal Explorer! 🎉',
      message: 'You\'ve discovered the terminal! Ready to see my professional work?',
      actions: [
        { label: 'View Projects', type: 'command', value: 'projects' },
        { label: 'Download Resume', type: 'action', value: 'downloadResume' }
      ],
      icon: '🚀',
      duration: 10000,
      priority: 'high'
    },
    maxShows: 1
  },
  {
    id: 'mobile_user',
    trigger: 'mobile_device',
    condition: (context) => 
      context.deviceType === 'mobile' && 
      context.timeOnPage > 5000 && 
      context.commandsTyped === 0,
    notification: {
      id: 'mobile_user',
      type: 'mobile',
      title: 'Mobile user detected',
      message: 'Terminal works on mobile, but you might prefer the quick navigation',
      actions: [
        { label: 'Quick Navigation', type: 'action', value: 'showMobileMenu' },
        { label: 'Continue Terminal', type: 'action', value: 'dismiss' }
      ],
      icon: '📱',
      duration: 15000,
      priority: 'medium'
    },
    maxShows: 1
  },
  {
    id: 'story_completion',
    trigger: 'story_completed',
    condition: (context) => context.exploredCommands.has('story'),
    notification: {
      id: 'story_completion',
      type: 'achievement',
      title: 'Story Explorer!',
      message: 'You completed the interactive story! Want to see my real career journey?',
      actions: [
        { label: 'View Resume', type: 'command', value: 'resume' },
        { label: 'See Projects', type: 'command', value: 'projects' }
      ],
      icon: '📖',
      duration: 10000,
      priority: 'medium'
    },
    cooldown: 300000, // 5 minutes
    maxShows: 1
  }
];

export const getTriggeredNotifications = (context: NotificationTriggerContext): NotificationTrigger[] => {
  return notificationTriggers.filter(trigger => trigger.condition(context));
};