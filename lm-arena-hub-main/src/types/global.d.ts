// Global Type Definitions
// TypeScript declarations for the entire application

declare global {
  interface Window {
    puter?: {
      ai: {
        chat: (prompt: string, imageUrlOrOptions?: string | any, options?: any) => Promise<any>;
        txt2img: (prompt: string, options?: any) => Promise<HTMLImageElement>;
      };
      print: (content: string) => void;
    };
  }
}

// Puter.js API Types
export interface PuterAIResponse {
  message?: {
    content?: Array<{
      text: string;
      type?: string;
    }>;
    role?: string;
    tool_calls?: Array<{
      function: {
        name: string;
        arguments: string;
      };
    }>;
  };
  text?: string;
  error?: string;
  success?: boolean;
}

export interface PuterStreamResponse {
  text?: string;
  delta?: string;
  done?: boolean;
  error?: string;
}

// Application Types
export interface User {
  id: string;
  name?: string;
  email?: string;
  preferences: UserPreferences;
  createdAt: Date;
  lastActive: Date;
}

export interface UserPreferences {
  language: 'ar' | 'en';
  theme: 'light' | 'dark' | 'system';
  defaultModel?: string;
  temperature: number;
  maxTokens: number;
  enableStreaming: boolean;
  enableNotifications: boolean;
}

export interface Model {
  id: string;
  name: string;
  provider: string;
  type: 'text' | 'multimodal' | 'image' | 'reasoning';
  capabilities: string[];
  icon: React.ReactNode;
  isNew?: boolean;
  isAvailable?: boolean;
  description?: string;
  maxTokens?: number;
  supportedLanguages?: string[];
}

export interface BattleResult {
  id?: string;
  modelA: string;
  modelB: string;
  responseA: string;
  responseB: string;
  prompt: string;
  winner?: 'A' | 'B' | 'tie' | 'both_bad';
  timestamp?: Date;
  userId?: string;
  actualModelA?: string;
  actualModelB?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  model?: string;
  metadata?: {
    tokens?: number;
    processingTime?: number;
    temperature?: number;
    isStreaming?: boolean;
  };
}

export interface ChatSession {
  id: string;
  title?: string;
  messages: ChatMessage[];
  model: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
}

export interface ImageGeneration {
  id: string;
  prompt: string;
  imageUrl: string;
  model: string;
  timestamp: Date;
  userId?: string;
  metadata?: {
    width?: number;
    height?: number;
    style?: string;
    processingTime?: number;
  };
}

export interface ModelRanking {
  rank: number;
  modelId: string;
  name: string;
  provider: string;
  elo: number;
  battles: number;
  wins: number;
  losses: number;
  ties: number;
  winRate: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  category: string;
  isNew?: boolean;
  lastUpdated: Date;
}

export interface SystemStats {
  totalBattles: number;
  totalChats: number;
  totalImages: number;
  activeUsers: number;
  modelsCount: number;
  averageResponseTime: number;
  uptime: number;
  errorRate: number;
  lastUpdated: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface AppError {
  id: string;
  type: 'NETWORK' | 'PUTER_API' | 'VALIDATION' | 'SYSTEM' | 'USER_INPUT' | 'UNKNOWN';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  details?: any;
  timestamp: Date;
  userAgent?: string;
  url?: string;
  userId?: string;
  context?: Record<string, any>;
}

export interface SystemCheck {
  isSupported: boolean;
  issues: string[];
  warnings: string[];
  recommendations: string[];
  browserInfo: {
    name: string;
    version: string;
    isSupported: boolean;
  };
  deviceInfo: {
    type: 'mobile' | 'tablet' | 'desktop';
    screenWidth: number;
    screenHeight: number;
    isMobile: boolean;
    isOnline: boolean;
  };
  features: {
    puterJS: boolean;
    localStorage: boolean;
    cookies: boolean;
    javascript: boolean;
  };
}

// Component Props Types
export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'dots' | 'pulse' | 'brain';
  text?: string;
  className?: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Event Types
export interface BattleCompleteEvent {
  result: BattleResult;
  duration: number;
}

export interface MessageSentEvent {
  message: ChatMessage;
  sessionId: string;
}

export interface ImageGeneratedEvent {
  generation: ImageGeneration;
  duration: number;
}

export interface ModelSelectedEvent {
  modelId: string;
  context: 'battle' | 'chat' | 'image';
}

export interface ErrorEvent {
  error: AppError;
  context?: string;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : any;

// Environment Variables
export interface EnvironmentVariables {
  VITE_APP_NAME: string;
  VITE_APP_DESCRIPTION: string;
  VITE_PUTER_API_URL: string;
  VITE_DEMO_MODE: string;
  VITE_DEBUG: string;
}

// Module Augmentation
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

export {};