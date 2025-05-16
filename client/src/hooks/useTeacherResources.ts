/**
 * Custom hook for loading teacher resources
 * 
 * This hook provides a simplified interface for loading teacher resources
 * using the resource registry system.
 */

import { useState, useEffect, useCallback } from 'react';
import { loadResourcesForBookUnit, isMultiVersionUnit, getMultiVersionOptions, hasResources } from '@/lib/resourceRegistry';
import type { BookId, UnitId, UnitVersion } from '@/lib/resourceRegistry';
import type { TeacherResource } from '@/components/TeacherResources';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';

interface UseTeacherResourcesProps {
  bookId: BookId;
  unitId: UnitId;
  version?: UnitVersion;
  resourceType?: 'video' | 'game' | 'lesson' | 'pdf' | 'other';
}

interface UseTeacherResourcesResult {
  resources: TeacherResource[];
  filteredResources: TeacherResource[];
  isLoading: boolean;
  error: Error | null;
  hasMultipleVersions: boolean;
  versionOptions: UnitVersion[];
  currentVersion: UnitVersion;
  setVersion: (version: UnitVersion) => void;
  hasResourcesAvailable: boolean;
  refetch: () => Promise<void>;
}

export const useTeacherResources = ({
  bookId,
  unitId,
  version = 'default',
  resourceType
}: UseTeacherResourcesProps): UseTeacherResourcesResult => {
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [isLoadingDynamic, setIsLoadingDynamic] = useState(false);
  const [dynamicError, setDynamicError] = useState<Error | null>(null);
  const [currentVersion, setCurrentVersion] = useState<UnitVersion>(version);
  
  // Check if this unit has multiple versions
  const hasMultipleVersions = isMultiVersionUnit(bookId, unitId);
  const versionOptions = hasMultipleVersions ? getMultiVersionOptions(bookId, unitId) : ['default'];
  const hasResourcesAvailable = hasResources(bookId, unitId);
  
  // Fetch server-stored resources for this book/unit
  const {
    data: serverResources = [],
    isLoading: isLoadingServer,
    error: serverError,
    refetch: refetchServerResources
  } = useQuery<TeacherResource[]>({
    queryKey: [`/api/teacher-resources/${bookId}/${unitId}`],
    queryFn: getQueryFn<TeacherResource[]>({ on401: "returnNull" }),
    enabled: hasResourcesAvailable,
  });
  
  // Combined loading and error states
  const isLoading = isLoadingDynamic || isLoadingServer;
  const error = dynamicError || serverError as Error | null;
  
  // Function to load resources from the registry
  const loadDynamicResources = useCallback(async () => {
    if (!hasResourcesAvailable) return;
    
    console.log(`🔄 useTeacherResources: Loading for Book ${bookId}, Unit ${unitId}, Version ${currentVersion}`);
    setIsLoadingDynamic(true);
    setDynamicError(null);
    
    try {
      const dynamicResources = await loadResourcesForBookUnit(bookId, unitId, currentVersion);
      setResources(prevResources => {
        // Merge server resources with dynamic resources, prioritizing server resources
        const serverIds = new Set(serverResources.map(r => r.id));
        const filteredDynamic = dynamicResources.filter(r => !r.id || !serverIds.has(r.id));
        
        return [...serverResources, ...filteredDynamic];
      });
    } catch (error) {
      console.error('Error loading dynamic resources:', error);
      setDynamicError(error instanceof Error ? error : new Error('Failed to load resources'));
    } finally {
      setIsLoadingDynamic(false);
    }
  }, [bookId, unitId, currentVersion, serverResources, hasResourcesAvailable]);
  
  // Function to refetch all resources
  const refetch = async () => {
    await refetchServerResources();
    await loadDynamicResources();
  };
  
  // Effect to load resources when inputs change
  useEffect(() => {
    loadDynamicResources();
  }, [loadDynamicResources]);
  
  // Effect to update resources when server resources change
  useEffect(() => {
    if (serverResources.length > 0) {
      loadDynamicResources();
    }
  }, [serverResources, loadDynamicResources]);
  
  // Filter resources by type if needed
  const filteredResources = resourceType
    ? resources.filter(r => r.resourceType === resourceType)
    : resources;
  
  return {
    resources,
    filteredResources,
    isLoading,
    error,
    hasMultipleVersions,
    versionOptions,
    currentVersion,
    setVersion: setCurrentVersion,
    hasResourcesAvailable,
    refetch
  };
};