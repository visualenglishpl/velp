/**
 * Teacher Resource Types
 * 
 * This file defines types related to teacher resources.
 */

import { BookId, UnitId } from './content';

/**
 * Resource types available in the system
 */
export type ResourceType = 'video' | 'game' | 'pdf' | 'lesson' | 'other';

/**
 * Teacher Resource object definition
 */
export interface TeacherResource {
  id: string;
  title: string;
  description?: string;
  resourceType: ResourceType;
  sourceUrl?: string;
  content?: string;
  provider?: string;
  bookId: string;
  unitId: string;
  
  // Video-specific properties
  isYoutubeVideo?: boolean;
  youtubeVideoId?: string;
  
  // Game-specific properties
  isWordwallGame?: boolean;
  wordwallGameId?: string;
  
  // PDF-specific properties
  pdfUrl?: string;
  
  // ISL Collective specific properties
  isIslCollectiveResource?: boolean;
  islCollectiveId?: string;
  
  // Raw embed code if needed
  embedCode?: string;
}

/**
 * Structure for defining a common resource across multiple units
 */
export interface CommonResource extends Omit<TeacherResource, 'unitId'> {
  // Unit ID is not required for common resources
  unitId?: string;
}