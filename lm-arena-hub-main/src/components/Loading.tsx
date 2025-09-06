import { Loader2, Brain, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "dots" | "pulse" | "brain";
  text?: string;
  className?: string;
}

export function Loading({ 
  size = "md", 
  variant = "default", 
  text, 
  className 
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-primary rounded-full loading-dots"></div>
          <div className="w-2 h-2 bg-primary rounded-full loading-dots" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full loading-dots" style={{ animationDelay: "0.2s" }}></div>
        </div>
        {text && (
          <span className={cn("text-muted-foreground", textSizeClasses[size])}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className={cn("bg-primary rounded-full animate-pulse", sizeClasses[size])}></div>
        {text && (
          <span className={cn("text-muted-foreground animate-pulse", textSizeClasses[size])}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === "brain") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Brain className={cn("animate-pulse text-primary", sizeClasses[size])} />
        {text && (
          <span className={cn("text-muted-foreground", textSizeClasses[size])}>
            {text}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && (
        <span className={cn("text-muted-foreground", textSizeClasses[size])}>
          {text}
        </span>
      )}
    </div>
  );
}

// Loading overlay component
interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  children: React.ReactNode;
}

export function LoadingOverlay({ isLoading, text, children }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div className="flex flex-col items-center gap-4">
            <Loading variant="brain" size="lg" />
            {text && (
              <p className="text-muted-foreground text-center max-w-xs">
                {text}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Skeleton loading component
interface SkeletonProps {
  className?: string;
  lines?: number;
}

export function Skeleton({ className, lines = 1 }: SkeletonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-muted rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
}

// Loading states for different components
export const LoadingStates = {
  Battle: () => (
    <Loading 
      variant="brain" 
      size="lg" 
      text="جاري إجراء المعركة بين النماذج..." 
      className="justify-center py-8"
    />
  ),
  
  Chat: () => (
    <Loading 
      variant="dots" 
      text="جاري الكتابة..." 
      className="justify-start"
    />
  ),
  
  Image: () => (
    <Loading 
      variant="pulse" 
      size="lg" 
      text="جاري إنشاء الصورة..." 
      className="justify-center py-12"
    />
  ),
  
  Models: () => (
    <Loading 
      variant="default" 
      text="جاري تحميل النماذج..." 
      className="justify-center"
    />
  )
};