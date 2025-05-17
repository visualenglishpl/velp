/**
 * Book 1 Unit 8 PDF resources
 * 
 * PDF materials for Numbers
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1PdfResource } from './book1-resources-common';

/**
 * PDF resources for Book 1 Unit 8 (Numbers)
 */
export const book1Unit8PdfResources: TeacherResource[] = [
  createBook1PdfResource(
    '8',
    'pdf-1',
    'Unit 8: My Clothes - PDF',
    'PDF lesson materials for Unit 8',
    'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit8/00 A Visual English 1 – Unit 8 – New Version.pdf'
  ),
];

export default book1Unit8PdfResources;
