/**
 * Book 1 PDF resources - provides direct links to PDF files for all units
 */
import { TeacherResource, ResourceType } from '@/types/teacher-resources';

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
 * Generate PDF resources for all Book 1 units (1-18) using a more compact approach
 */
export function getBook1PdfResources(): TeacherResource[] {
  return Array.from({ length: 18 }, (_, i) => {
    const unit = (i + 1).toString();
    const unitNum = i + 1;
    const unitPrefix = unitNum === 16 ? '00 C' : '00 A';
    const unitTitle = unitTitles[unit] || `Unit ${unit}`;
    
    const pdfUrl = `https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit${unit}/${unitPrefix} Visual English 1 – Unit ${unit} – New Version.pdf`;
    
    return {
      id: `book1-unit${unit}-pdf`,
      bookId: '1',
      unitId: unit,
      resourceType: 'pdf' as ResourceType,
      title: `Unit ${unit}: ${unitTitle} - PDF`,
      description: `Visual English Book 1 - Unit ${unit} PDF`,
      provider: 'Visual English',
      sourceUrl: pdfUrl,
      thumbnailUrl: '',
      content: {
        type: 'pdf',
        embedUrl: pdfUrl
      },
      fileUrl: pdfUrl
    };
  });
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