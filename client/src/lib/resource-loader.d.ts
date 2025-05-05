import { TeacherResource } from '@/types/teacher-resources';

export interface ResourceLoaderModule {
  dynamicResourceImport: (book: string, unit: number) => Promise<TeacherResource[]>;
  dynamicLessonPlanImport: (book: string, unit: number) => Promise<TeacherResource[]>;
}

export declare function dynamicResourceImport(book: string, unit: number): Promise<TeacherResource[]>;
export declare function dynamicLessonPlanImport(book: string, unit: number): Promise<TeacherResource[]>;
