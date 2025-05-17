/**
 * Book 1 Unit 7 PDF resources
 * 
 * PDF materials for Toys
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1PdfResource } from './book1-resources-common';

/**
 * PDF resources for Book 1 Unit 7 (Toys)
 */
export const book1Unit7PdfResources: TeacherResource[] = [
  createBook1PdfResource(
    '7',
    'pdf-1',
    'Unit 7: My Body - PDF',
    'PDF lesson materials for Unit 7',
    'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit7/00 A Visual English 1 – Unit 7 – New Version.pdf'
  ),
];

export default book1Unit7PdfResources;
