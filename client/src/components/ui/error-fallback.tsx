import React from 'react';
import { AlertCircle, Image, RefreshCw } from 'lucide-react';
import { Button } from './button';

interface ErrorFallbackProps {
  error?: Error | null;
  resetErrorBoundary?: () => void;
  type?: 'image' | 'content' | 'general';
  message?: string;
  className?: string;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
  type = 'general',
  message,
  className = '',
}: ErrorFallbackProps) {
  const defaultMessages = {
    image: 'Failed to load image resource',
    content: 'Failed to load content',
    general: 'Something went wrong',
  };

  const displayMessage = message || (error?.message || defaultMessages[type]);

  return (
    <div
      className={`flex flex-col items-center justify-center p-6 bg-muted/20 border border-muted rounded-md text-center ${className}`}
    >
      {type === 'image' ? (
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted/30 mb-4">
          <Image className="h-12 w-12 text-muted-foreground" />
        </div>
      ) : (
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      )}

      <h3 className="font-semibold text-lg mb-2">
        {type === 'image' ? 'Image could not be loaded' : 'Error'}
      </h3>
      
      <p className="text-muted-foreground text-sm mb-4">{displayMessage}</p>
      
      {resetErrorBoundary && (
        <Button 
          variant="outline" 
          onClick={resetErrorBoundary}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
