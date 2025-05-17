/**
 * Book 1 Unit 12 PDF resources
 * 
 * PDF materials for My Body
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1PdfResource } from './book1-resources-common';

/**
 * PDF resources for Book 1 Unit 12 (My Body)
 */
export const book1Unit12PdfResources: TeacherResource[] = [
  createBook1PdfResource(
    '12',
    'pdf-1',
    'Unit 12: Months of the Year - PDF',
    'PDF lesson materials for Unit 12',
    'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit12/00 A Visual English 1 – Unit 12 – New Version.pdf'
  ),
];

export default book1Unit12PdfResources;
