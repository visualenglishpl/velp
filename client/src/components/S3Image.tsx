import React, { useState, useEffect } from 'react';
import { ErrorFallback } from './ui/error-fallback';
import { Skeleton } from './ui/skeleton';

interface S3ImageProps {
  src: string;
  alt: string;
  className?: string;
  blurred?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

const S3Image: React.FC<S3ImageProps> = ({
  src,
  alt,
  className = '',
  blurred = false,
  onLoad,
  onError,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retries, setRetries] = useState(0);
  const maxRetries = 2;

  useEffect(() => {
    // Reset states when src changes
    setLoading(true);
    setError(null);
  }, [src]);

  const handleLoad = () => {
    setLoading(false);
    setError(null);
    if (onLoad) onLoad();
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgError = new Error(`Failed to load image: ${src}`);
    setLoading(false);
    setError(imgError);
    if (onError) onError(imgError);
  };

  const retryLoading = () => {
    if (retries < maxRetries) {
      setLoading(true);
      setError(null);
      setRetries(prev => prev + 1);
    }
  };

  if (error) {
    return (
      <ErrorFallback
        error={error}
        type="image"
        resetErrorBoundary={retries < maxRetries ? retryLoading : undefined}
        className={className}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-contain ${blurred ? 'blur-md' : ''} ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{ transition: 'opacity 0.3s ease-in-out' }}
      />
    </div>
  );
};

export default S3Image;
