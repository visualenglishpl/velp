/**
 * Book 1 Unit 3 PDF resources
 * 
 * PDF materials for Food
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1PdfResource } from './book1-resources-common';

/**
 * PDF resources for Book 1 Unit 3 (Food)
 */
export const book1Unit3PdfResources: TeacherResource[] = [
  createBook1PdfResource(
    '3',
    'pdf-1',
    'Unit 3: Food - PDF',
    'PDF lesson materials for Unit 3',
    'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit3/00 A Visual English 1 – Unit 3 – New Version.pdf'
  ),
];

export default book1Unit3PdfResources;
