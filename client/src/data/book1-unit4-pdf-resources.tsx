/**
 * Book 1 Unit 4 PDF resources
 * 
 * PDF materials for My House
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1PdfResource } from './book1-resources-common';

/**
 * PDF resources for Book 1 Unit 4 (My House)
 */
export const book1Unit4PdfResources: TeacherResource[] = [
  createBook1PdfResource(
    '4',
    'pdf-1',
    'Unit 4: My House - PDF',
    'PDF lesson materials for Unit 4',
    'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit4/00 A Visual English 1 – Unit 4 – New Version.pdf'
  ),
];

export default book1Unit4PdfResources;
