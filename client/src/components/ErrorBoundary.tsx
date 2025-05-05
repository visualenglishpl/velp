import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorFallback } from './ui/error-fallback';

interface Props {
  children: ReactNode;
  fallbackType?: 'image' | 'content' | 'general';
  fallbackMessage?: string;
  className?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallbackType = 'general', fallbackMessage, className = '' } = this.props;

    if (hasError) {
      return (
        <ErrorFallback
          error={error}
          resetErrorBoundary={this.resetErrorBoundary}
          type={fallbackType}
          message={fallbackMessage}
          className={className}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
