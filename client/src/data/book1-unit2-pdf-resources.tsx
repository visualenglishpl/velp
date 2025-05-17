/**
 * Book 1 Unit 2 PDF resources
 * 
 * PDF materials for My School
 */
import { TeacherResource } from '@/types/TeacherResource';
import { createBook1PdfResource } from './book1-resources-common';

/**
 * PDF resources for Book 1 Unit 2 (My School)
 */
export const book1Unit2PdfResources: TeacherResource[] = [
  createBook1PdfResource(
    '2',
    'pdf-1',
    'Unit 2: My School - PDF',
    'PDF lesson materials for Unit 2',
    'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit2/00 A Visual English 1 – Unit 2 – New Version.pdf'
  ),
];

export default book1Unit2PdfResources;
