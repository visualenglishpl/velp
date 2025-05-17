/**
 * Book 1 Unit 5 PDF resources
 * 
 * PDF materials for Pets and Animals
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1PdfResource } from './book1-resources-common';

/**
 * PDF resources for Book 1 Unit 5 (Pets and Animals)
 */
export const book1Unit5PdfResources: TeacherResource[] = [
  createBook1PdfResource(
    '5',
    'pdf-1',
    'Unit 5: Pets and Animals - PDF',
    'PDF lesson materials for Unit 5',
    'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit5/00 A Visual English 1 – Unit 5 – New Version.pdf'
  ),
];

export default book1Unit5PdfResources;
