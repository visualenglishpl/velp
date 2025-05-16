/**
 * Resource Types
 * 
 * This module contains type definitions for teacher resources
 */

import { BookId, UnitId } from './content';

/**
 * Resource types available in the system
 */
export type ResourceType = 'video' | 'game' | 'pdf' | 'lessonPlan' | 'worksheet' | 'flashcard' | 'other' | 'lesson';

/**
 * Base interface for all teacher resources
 */
export interface TeacherResource {
  id?: string; // Made optional to work with legacy code
  title: string;
  description: string;
  resourceType: ResourceType;
  bookId: BookId;
  unitId: UnitId;
  provider?: string;
  createdAt?: Date;
  updatedAt?: Date;
  
  // Video-specific properties
  youtubeVideoId?: string;
  isYoutubeVideo?: boolean;
  
  // Game-specific properties
  wordwallGameId?: string;
  isWordwallGame?: boolean;
  islCollectiveId?: string;
  isIslCollective?: boolean;
  
  // PDF-specific properties
  pdfUrl?: string;
  
  // Content for lesson plans, etc.
  content?: string | {
    type: string;
    embedId?: string;
    embedUrl?: string;
  };
  
  // General source URL
  sourceUrl?: string;
  
  // Embed code for videos, games, etc.
  embedCode?: string;
  
  // Legacy support
  fileUrl?: string;
  lessonPlan?: any;
}

/**
 * Resource filter type that includes 'all' option
 */
export type ResourceFilterType = ResourceType | 'all';

/**
 * Filter options for resources
 */
export interface ResourceFilter {
  resourceType?: ResourceFilterType;
  searchQuery?: string;
  provider?: string;
}

/**
 * Resource listing with filtering and sorting
 */
export interface ResourceListing {
  resources: TeacherResource[];
  totalCount: number;
  filter: ResourceFilter;
}

/**
 * Resource type display information
 */
export interface ResourceTypeInfo {
  type: ResourceType;
  label: string;
  description: string;
  icon: string;
  color: string;
}

/**
 * Resource creation/update form data
 */
export interface ResourceFormData {
  title: string;
  description: string;
  resourceType: ResourceType;
  youtubeVideoId?: string;
  wordwallGameId?: string;
  islCollectiveId?: string;
  pdfUrl?: string;
  content?: string;
  sourceUrl?: string;
  provider?: string;
}