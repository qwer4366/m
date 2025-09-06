// Application Constants
// Centralized configuration and constants

export const APP_CONFIG = {
  name: 'Mu3',
  version: '1.0.0',
  description: 'منصة متقدمة لتقييم النماذج اللغوية مع دعم مجاني لأحدث تقنيات الذكاء الاصطناعي',
  author: 'Mu3 killer piaaz Team',
  website: 'https://mu3-killer-piaaz.com',
  github: 'https://github.com/mu3-killer-piaaz/lm-arena',
  support: 'support@mu3-killer-piaaz.com'
} as const;

export const PUTER_CONFIG = {
  scriptUrl: 'https://js.puter.com/v2/',
  apiUrl: 'https://api.puter.com',
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000 // 1 second
} as const;

export const UI_CONFIG = {
  maxPromptLength: 2000,
  maxImageDescriptionLength: 1000,
  maxChatMessageLength: 2000,
  minPromptLength: 3,
  minImageDescriptionLength: 5,
  defaultTemperature: 0.7,
  defaultMaxTokens: 500,
  animationDuration: 300,
  toastDuration: 5000
} as const;

export const MODEL_CATEGORIES = {
  TEXT: 'text',
  MULTIMODAL: 'multimodal',
  IMAGE: 'image',
  REASONING: 'reasoning'
} as const;

export const MODEL_PROVIDERS = {
  OPENAI: 'OpenAI',
  ANTHROPIC: 'Anthropic',
  GOOGLE: 'Google',
  DEEPSEEK: 'DeepSeek'
} as const;

export const BATTLE_CONFIG = {
  maxBattlesPerDay: 100,
  votingTimeoutMs: 300000, // 5 minutes
  minResponseLength: 10,
  maxResponseLength: 2000
} as const;

export const CHAT_CONFIG = {
  maxMessagesHistory: 50,
  maxMessageLength: 2000,
  typingIndicatorDelay: 500,
  streamingChunkDelay: 50
} as const;

export const IMAGE_CONFIG = {
  maxDescriptionLength: 1000,
  supportedFormats: ['png', 'jpg', 'jpeg', 'webp'],
  maxFileSize: 5 * 1024 * 1024, // 5MB
  defaultWidth: 512,
  defaultHeight: 512
} as const;

export const STORAGE_KEYS = {
  USER_PREFERENCES: 'mu3_user_preferences',
  CHAT_HISTORY: 'mu3_chat_history',
  BATTLE_HISTORY: 'mu3_battle_history',
  ERROR_LOG: 'mu3_error_log',
  SYSTEM_CHECK: 'mu3_system_check',
  LANGUAGE: 'mu3_language',
  THEME: 'mu3_theme'
} as const;

export const API_ENDPOINTS = {
  HEALTH_CHECK: '/health',
  MODELS: '/models',
  CHAT: '/chat',
  IMAGE: '/image',
  BATTLE: '/battle',
  STATS: '/stats'
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'خطأ في الاتصال بالشبكة',
  PUTER_NOT_LOADED: 'Puter.js غير محمل',
  INVALID_INPUT: 'المدخل غير صحيح',
  MODEL_NOT_AVAILABLE: 'النموذج غير متاح حالياً',
  RATE_LIMIT_EXCEEDED: 'تم تجاوز الحد المسموح من الطلبات',
  UNKNOWN_ERROR: 'حدث خطأ غير متوقع'
} as const;

export const SUCCESS_MESSAGES = {
  BATTLE_COMPLETED: 'تمت المعركة بنجاح!',
  MESSAGE_SENT: 'تم إرسال الرسالة',
  IMAGE_GENERATED: 'تم توليد الصورة بنجاح!',
  VOTE_RECORDED: 'تم تسجيل التصويت',
  SETTINGS_SAVED: 'تم حفظ الإعدادات'
} as const;

export const VALIDATION_RULES = {
  PROMPT: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 2000,
    REQUIRED: true
  },
  IMAGE_DESCRIPTION: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 1000,
    REQUIRED: true
  },
  CHAT_MESSAGE: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 2000,
    REQUIRED: true
  }
} as const;

export const THEME_CONFIG = {
  DEFAULT_THEME: 'dark',
  AVAILABLE_THEMES: ['light', 'dark', 'system'],
  CSS_VARIABLES: {
    PRIMARY: '--primary',
    SECONDARY: '--secondary',
    BACKGROUND: '--background',
    FOREGROUND: '--foreground'
  }
} as const;

export const LANGUAGE_CONFIG = {
  DEFAULT_LANGUAGE: 'ar',
  AVAILABLE_LANGUAGES: ['ar', 'en'],
  RTL_LANGUAGES: ['ar'],
  FALLBACK_LANGUAGE: 'en'
} as const;

export const ANALYTICS_CONFIG = {
  TRACK_BATTLES: true,
  TRACK_CHATS: true,
  TRACK_IMAGES: true,
  TRACK_ERRORS: true,
  TRACK_PERFORMANCE: true
} as const;

export const FEATURE_FLAGS = {
  ENABLE_STREAMING: true,
  ENABLE_IMAGE_GENERATION: true,
  ENABLE_VOICE_INPUT: false,
  ENABLE_EXPORT: true,
  ENABLE_SHARING: true,
  ENABLE_OFFLINE_MODE: false
} as const;

export const PERFORMANCE_CONFIG = {
  LAZY_LOAD_IMAGES: true,
  DEBOUNCE_SEARCH: 300,
  THROTTLE_SCROLL: 100,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  MAX_CONCURRENT_REQUESTS: 3
} as const;

export const SECURITY_CONFIG = {
  SANITIZE_INPUT: true,
  VALIDATE_MODELS: true,
  RATE_LIMIT_ENABLED: true,
  CSP_ENABLED: true,
  XSS_PROTECTION: true
} as const;

// Regular expressions
export const REGEX_PATTERNS = {
  ARABIC: /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/,
  ENGLISH: /[a-zA-Z]/,
  HTML_TAGS: /<[^>]*>/g,
  SCRIPT_TAGS: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  SPECIAL_CHARS: /[<>{}[\]\\\/]/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/.+/,
  MODEL_ID: /^[a-zA-Z0-9\-_.]+$/
} as const;

// CSS Classes
export const CSS_CLASSES = {
  LOADING_DOTS: 'loading-dots',
  BATTLE_CARD: 'battle-card',
  ARENA_GLOW: 'arena-glow',
  GRADIENT_TEXT: 'gradient-text',
  GRADIENT_PRIMARY: 'bg-gradient-primary',
  GRADIENT_SUCCESS: 'bg-gradient-success',
  GRADIENT_SUBTLE: 'bg-gradient-subtle'
} as const;

// Animation keyframes
export const ANIMATIONS = {
  FADE_IN: 'fadeIn',
  FADE_OUT: 'fadeOut',
  SLIDE_IN: 'slideIn',
  SLIDE_OUT: 'slideOut',
  BOUNCE: 'bounce',
  PULSE: 'pulse',
  SPIN: 'spin'
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const;

// Z-index layers
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080
} as const;