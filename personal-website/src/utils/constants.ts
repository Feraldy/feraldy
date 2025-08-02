export const ANIMATION_PHASES = {
  INITIAL: 'initial',
  WHOAMI_TYPING: 'whoami-typing',
  WHOAMI_ENTER: 'whoami-enter',
  WHOAMI_RESPONSE: 'whoami-response',
  WELCOME_TEXT: 'welcome-text',
  ABOUT_TYPING: 'about-typing',
  ABOUT_ENTER: 'about-enter',
  ABOUT_RESPONSE: 'about-response',
  NAVIGATION: 'navigation'
} as const;

export type AnimationPhase = typeof ANIMATION_PHASES[keyof typeof ANIMATION_PHASES];

export const APP_ANIMATION_STAGES = {
  TINY: 'tiny',
  OPENED: 'opened'
} as const;

export type AppAnimationStage = typeof APP_ANIMATION_STAGES[keyof typeof APP_ANIMATION_STAGES];

export const ANIMATION_TIMINGS = {
  APP_OPENING_DELAY: 500,
  TYPEWRITER_START_DELAY: 2500,
  SKIP_HINT_DELAY: 1000,
  WHOAMI_START_DELAY: 800,
  WHOAMI_ENTER_DELAY: 1,
  WHOAMI_RESPONSE_DELAY: 1,
  WELCOME_TEXT_DELAY: 1000,
  ABOUT_TYPING_DELAY: 3000,
  ABOUT_ENTER_DELAY: 300,
  ABOUT_RESPONSE_DELAY: 2000,
  COMMAND_PROCESSING_DELAY: 1500,
  TAB_LOADING_DELAY: 1000,
  CONTACT_FORM_SUCCESS_DELAY: 2000,
  AUTO_OPEN_TABS_DELAY: 300
} as const;

export const TYPEWRITER_SETTINGS = {
  DELAY: 80,
  TYPE_ONCE: true
} as const;

export const FORM_ENDPOINT = 'https://formspree.io/f/mldldoqa';

export const CONTACT_FORM_DEFAULTS = {
  name: '',
  email: '',
  message: ''
} as const;

export const LOCAL_STORAGE_KEYS = {
  HAS_SEEN_ANIMATION: 'hasSeenAnimation'
} as const;