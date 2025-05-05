import { useState, useEffect } from 'react';
import { formatS3Url, loadResourceWithRetry } from '@/lib/s3-resource-loader';

interface UseS3ResourceOptions {
  retries?: number;
  retryDelay?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  transformResponse?: (response: Response) => Promise<any>;
  enabled?: boolean;
}

interface UseS3ResourceResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * React hook for loading resources from S3 with error handling
 * @param path The S3 path to load
 * @param options Options for the resource loading
 * @returns Object with data, loading state, error, and refetch function
 */
export function useS3Resource<T>(
  path: string,
  options: UseS3ResourceOptions = {}
): UseS3ResourceResult<T> {
  const {
    retries = 3,
    retryDelay = 1000,
    onSuccess,
    onError,
    transformResponse = (res) => res.json(),
    enabled = true,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!path || !enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const url = formatS3Url(path);
      const response = await loadResourceWithRetry(
        url,
        {},
        0,
        retries,
        retryDelay
      );

      const result = await transformResponse(response);
      setData(result);
      if (onSuccess) onSuccess(result);
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      if (onError) onError(errorObj);
      console.error('Error loading S3 resource:', path, errorObj);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [path, enabled]);

  return { data, isLoading, error, refetch: fetchData };
}

/**
 * Hook for loading an image from S3 with preloading and error handling
 * @param path The S3 path to the image
 * @param options Options for the image loading
 * @returns Object with image URL, loading state, error, and refetch function
 */
export function useS3Image(
  path: string,
  options: UseS3ResourceOptions = {}
): UseS3ResourceResult<string> {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchImage = async () => {
    if (!path || !options.enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const url = formatS3Url(path);
      // Preload the image
      const img = new Image();

      const imagePromise = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (e) => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
      });

      await imagePromise;
      setImageUrl(url);
      if (options.onSuccess) options.onSuccess(url);
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      if (options.onError) options.onError(errorObj);
      console.error('Error loading S3 image:', path, errorObj);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (options.enabled !== false) {
      fetchImage();
    }
  }, [path, options.enabled]);

  return { data: imageUrl, isLoading, error, refetch: fetchImage };
}
