import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
          <Card className="max-w-lg w-full">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="w-16 h-16 text-destructive" />
              </div>
              <CardTitle className="text-2xl">حدث خطأ غير متوقع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-center">
                نعتذر، حدث خطأ أثناء تشغيل التطبيق. يرجى المحاولة مرة أخرى.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="bg-muted p-4 rounded-lg text-sm">
                  <summary className="cursor-pointer font-medium mb-2">
                    تفاصيل الخطأ (وضع التطوير)
                  </summary>
                  <pre className="whitespace-pre-wrap text-xs overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={this.handleReset}
                  className="flex-1"
                  variant="default"
                >
                  <RefreshCw className="w-4 h-4 ml-2" />
                  إعادة المحاولة
                </Button>
                
                <Button 
                  onClick={this.handleReload}
                  className="flex-1"
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4 ml-2" />
                  إعادة تحميل الصفحة
                </Button>
                
                <Button 
                  onClick={this.handleGoHome}
                  className="flex-1"
                  variant="outline"
                >
                  <Home className="w-4 h-4 ml-2" />
                  الصفحة الرئيسية
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    // You can integrate with error reporting services here
  };
}

// Simple error display component
interface ErrorDisplayProps {
  error?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorDisplay({ error, onRetry, className }: ErrorDisplayProps) {
  return (
    <div className={`text-center p-6 ${className}`}>
      <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">حدث خطأ</h3>
      <p className="text-muted-foreground mb-4">
        {error || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="w-4 h-4 ml-2" />
          إعادة المحاولة
        </Button>
      )}
    </div>
  );
}