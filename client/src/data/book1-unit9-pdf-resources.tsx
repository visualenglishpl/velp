/**
 * Book 1 Unit 9 PDF resources
 * 
 * PDF materials for My Family
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1PdfResource } from './book1-resources-common';

/**
 * PDF resources for Book 1 Unit 9 (My Family)
 */
export const book1Unit9PdfResources: TeacherResource[] = [
  createBook1PdfResource(
    '9',
    'pdf-1',
    'Unit 9: My Family - PDF',
    'PDF lesson materials for Unit 9',
    'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit9/00 A Visual English 1 – Unit 9 – New Version.pdf'
  ),
];

export default book1Unit9PdfResources;
