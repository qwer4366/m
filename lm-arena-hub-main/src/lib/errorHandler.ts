// Error Handler Utilities
// Centralized error handling and logging

export enum ErrorType {
  NETWORK = 'NETWORK',
  PUTER_API = 'PUTER_API',
  VALIDATION = 'VALIDATION',
  SYSTEM = 'SYSTEM',
  USER_INPUT = 'USER_INPUT',
  UNKNOWN = 'UNKNOWN'
}

export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface AppError {
  id: string;
  type: ErrorType;
  severity: ErrorSeverity;
  message: string;
  details?: any;
  timestamp: Date;
  userAgent?: string;
  url?: string;
  userId?: string;
  context?: Record<string, any>;
}

export interface ErrorHandlerOptions {
  showToast?: boolean;
  logToConsole?: boolean;
  reportToService?: boolean;
  fallbackAction?: () => void;
}

class ErrorHandler {
  private static instance: ErrorHandler;
  private errors: AppError[] = [];
  private maxErrors = 100;

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  private constructor() {
    // Set up global error handlers
    this.setupGlobalHandlers();
  }

  private setupGlobalHandlers(): void {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        type: ErrorType.SYSTEM,
        severity: ErrorSeverity.HIGH,
        message: 'Unhandled promise rejection',
        details: event.reason
      });
    });

    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      this.handleError({
        type: ErrorType.SYSTEM,
        severity: ErrorSeverity.HIGH,
        message: event.message || 'JavaScript error',
        details: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          error: event.error
        }
      });
    });
  }

  handleError(
    error: Partial<AppError> & { message: string },
    options: ErrorHandlerOptions = {}
  ): AppError {
    const appError: AppError = {
      id: this.generateErrorId(),
      type: error.type || ErrorType.UNKNOWN,
      severity: error.severity || ErrorSeverity.MEDIUM,
      message: error.message,
      details: error.details,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      context: error.context
    };

    // Store error
    this.storeError(appError);

    // Log to console if enabled
    if (options.logToConsole !== false) {
      this.logToConsole(appError);
    }

    // Show toast notification if enabled
    if (options.showToast) {
      this.showToast(appError);
    }

    // Report to external service if enabled
    if (options.reportToService) {
      this.reportToService(appError);
    }

    // Execute fallback action
    if (options.fallbackAction) {
      try {
        options.fallbackAction();
      } catch (fallbackError) {
        console.error('Fallback action failed:', fallbackError);
      }
    }

    return appError;
  }

  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private storeError(error: AppError): void {
    this.errors.unshift(error);
    
    // Keep only the most recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors);
    }

    // Store in localStorage for persistence
    try {
      const recentErrors = this.errors.slice(0, 10);
      localStorage.setItem('app_errors', JSON.stringify(recentErrors));
    } catch (e) {
      console.warn('Could not store errors in localStorage:', e);
    }
  }

  private logToConsole(error: AppError): void {
    const logMethod = this.getLogMethod(error.severity);
    logMethod(`[${error.type}] ${error.message}`, {
      id: error.id,
      severity: error.severity,
      details: error.details,
      timestamp: error.timestamp
    });
  }

  private getLogMethod(severity: ErrorSeverity): typeof console.log {
    switch (severity) {
      case ErrorSeverity.LOW:
        return console.info;
      case ErrorSeverity.MEDIUM:
        return console.warn;
      case ErrorSeverity.HIGH:
      case ErrorSeverity.CRITICAL:
        return console.error;
      default:
        return console.log;
    }
  }

  private showToast(error: AppError): void {
    // This would integrate with your toast system
    // For now, we'll use a simple alert for critical errors
    if (error.severity === ErrorSeverity.CRITICAL) {
      alert(`خطأ حرج: ${error.message}`);
    }
  }

  private reportToService(error: AppError): void {
    // This would send the error to an external monitoring service
    // For now, we'll just log it
    console.log('Would report to service:', error);
  }

  getErrors(type?: ErrorType, severity?: ErrorSeverity): AppError[] {
    let filteredErrors = [...this.errors];

    if (type) {
      filteredErrors = filteredErrors.filter(error => error.type === type);
    }

    if (severity) {
      filteredErrors = filteredErrors.filter(error => error.severity === severity);
    }

    return filteredErrors;
  }

  clearErrors(): void {
    this.errors = [];
    try {
      localStorage.removeItem('app_errors');
    } catch (e) {
      console.warn('Could not clear errors from localStorage:', e);
    }
  }

  getErrorStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    
    this.errors.forEach(error => {
      const key = `${error.type}_${error.severity}`;
      stats[key] = (stats[key] || 0) + 1;
    });

    return stats;
  }
}

// Singleton instance
export const errorHandler = ErrorHandler.getInstance();

// Convenience functions for different error types
export const handleNetworkError = (message: string, details?: any) => {
  return errorHandler.handleError({
    type: ErrorType.NETWORK,
    severity: ErrorSeverity.MEDIUM,
    message,
    details
  }, { showToast: true });
};

export const handlePuterError = (message: string, details?: any) => {
  return errorHandler.handleError({
    type: ErrorType.PUTER_API,
    severity: ErrorSeverity.MEDIUM,
    message,
    details
  }, { showToast: true });
};

export const handleValidationError = (message: string, details?: any) => {
  return errorHandler.handleError({
    type: ErrorType.VALIDATION,
    severity: ErrorSeverity.LOW,
    message,
    details
  }, { showToast: true });
};

export const handleSystemError = (message: string, details?: any) => {
  return errorHandler.handleError({
    type: ErrorType.SYSTEM,
    severity: ErrorSeverity.HIGH,
    message,
    details
  }, { showToast: true, logToConsole: true });
};

export const handleCriticalError = (message: string, details?: any) => {
  return errorHandler.handleError({
    type: ErrorType.SYSTEM,
    severity: ErrorSeverity.CRITICAL,
    message,
    details
  }, { 
    showToast: true, 
    logToConsole: true, 
    reportToService: true 
  });
};

// Error boundary helper
export const withErrorBoundary = <T extends Record<string, any>>(
  Component: React.ComponentType<T>
) => {
  return (props: T) => {
    try {
      return <Component {...props} />;
    } catch (error) {
      handleSystemError('Component render error', { 
        component: Component.name,
        props,
        error 
      });
      return <div>حدث خطأ في عرض هذا المكون</div>;
    }
  };
};

// Async error wrapper
export const withAsyncErrorHandling = async <T>(
  asyncFn: () => Promise<T>,
  errorMessage: string = 'حدث خطأ غير متوقع'
): Promise<T | null> => {
  try {
    return await asyncFn();
  } catch (error) {
    handleSystemError(errorMessage, { error });
    return null;
  }
};