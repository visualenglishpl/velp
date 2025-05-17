/**
 * Book 1 PDF resources - provides direct links to PDF files for all units
 * 
 * This file creates PDF resources for each unit in Book 1, with proper organization
 * and unit-specific resource files.
 */
import { TeacherResource, ResourceType } from '@/types/TeacherResource';
import { createBook1PdfResource } from './book1-resources-common';

// Unit titles for Book 1 - used for resource titles
const unitTitles: Record<string, string> = {
  '1': 'Hello',
  '2': 'My School',
  '3': 'Food',
  '4': 'My House',
  '5': 'Pets and Animals',
  '6': 'My Favourite Colour',
  '7': 'Toys',
  '8': 'Numbers',
  '9': 'My Family',
  '10': 'Transport',
  '11': 'Weather',
  '12': 'My Body',
  '13': 'Clothes',
  '14': 'Daily Routine',
  '15': 'Jobs',
  '16': 'Sports',
  '17': 'Hobbies',
  '18': 'Action Verbs'
};

/**
 * Generate PDF resources for all Book 1 units (1-18) using the helper function
 * 
 * These resources are properly organized by unit to ensure they're only shown
 * in the appropriate unit's resource list.
 */
export function getBook1PdfResources(): TeacherResource[] {
  // IMPORTANT: Now only returning PDF for Unit 1 as requested
  return [
    createBook1PdfResource(
      '1' as any,
      'main-pdf',
      'Unit 1: Hello - PDF',
      'Visual English Book 1 - Unit 1 PDF',
      'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit1/00 A Visual English 1 – Unit 1 – New Version.pdf'
    )
  ];
}

/**
 * Get all Book 1 PDF resources
 */
export const book1PdfResources = getBook1PdfResources();

/**
 * Create a map of unit IDs to PDF resources for easier lookup
 */
export const book1PdfResourcesByUnit: Record<string, TeacherResource[]> = book1PdfResources.reduce((acc, resource) => {
  if (resource.unitId) {
    if (!acc[resource.unitId]) {
      acc[resource.unitId] = [];
    }
    acc[resource.unitId].push(resource);
  }
  return acc;
}, {} as Record<string, TeacherResource[]>);