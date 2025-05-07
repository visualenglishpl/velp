import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Helper to try alternative URL formats if standard one fails
const tryAlternativeUrls = async (
  url: string, 
  options: RequestInit = {}
): Promise<Response> => {
  // Try standard URL first
  try {
    console.log(`[API] Attempting standard fetch: ${url}`);
    const response = await fetch(url, { ...options, credentials: 'include' });
    if (response.ok) {
      console.log(`[API] Standard fetch successful for ${url}`);
      return response;
    }
    console.log(`[API] Standard fetch failed for ${url} with status ${response.status}`);
    
    // If it's a 404, we'll try the alternate route
    if (response.status !== 404) {
      // For non-404 errors, still return the response for consistent error handling
      return response;
    }
  } catch (error) {
    console.error(`[API] Error in standard fetch for ${url}:`, error);
  }
  
  // If the URL starts with /api/, try without the /api prefix
  if (url.startsWith('/api/')) {
    const altUrl = url.replace(/^\/api\//, '/');
    try {
      console.log(`[API] Attempting alternative fetch: ${altUrl}`);
      const altResponse = await fetch(altUrl, { ...options, credentials: 'include' });
      console.log(`[API] Alternative fetch for ${altUrl} returned status ${altResponse.status}`);
      return altResponse;
    } catch (altError) {
      console.error(`[API] Error in alternative fetch for ${altUrl}:`, altError);
    }
  }
  
  // If all else fails, create a mock 404 response
  console.error(`[API] All fetch attempts failed for ${url}`);
  return new Response('{"error":"All fetch attempts failed"}', { 
    status: 404, 
    statusText: 'Not Found',
    headers: { 'Content-Type': 'application/json' }
  });
};

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
  options?: { isFormData?: boolean }
): Promise<Response> {
  const isFormData = options?.isFormData || false;
  
  let headers = {};
  let body = undefined;
  
  if (data) {
    if (isFormData) {
      // FormData should be sent without content-type to ensure boundary is set correctly
      body = data as FormData;
    } else {
      headers = { "Content-Type": "application/json" };
      body = JSON.stringify(data);
    }
  }
  
  const requestOptions = {
    method,
    headers,
    body,
    credentials: "include" as RequestCredentials,
  };

  const res = await tryAlternativeUrls(url, requestOptions);
  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options?: {
  on401?: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior = "throw" } = {}) =>
  async ({ queryKey }) => {
    // Try both the standard and alternative URLs
    const res = await tryAlternativeUrls(queryKey[0] as string);

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
