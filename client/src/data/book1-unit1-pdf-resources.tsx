/**
 * Book 1 Unit 1 PDF resources
 * 
 * PDF materials for Hello
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1PdfResource } from './book1-resources-common.ts';

/**
 * PDF resources for Book 1 Unit 1 (Hello)
 */
export const book1Unit1PdfResources: TeacherResource[] = [
  createBook1PdfResource(
    '1',
    'pdf-1',
    'Unit 1: Hello - PDF',
    'PDF lesson materials for Unit 1',
    'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit1/00 A Visual English 1 – Unit 1 – New Version.pdf'
  ),
];

export default book1Unit1PdfResources;
