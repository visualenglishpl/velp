// Unit 9 implementation file for Teacher Resources
import { LessonPlan } from "@/components/LessonPlanTemplate";
import { TeacherResource } from "@/components/TeacherResources";
import { jobsVocabularyLessonPlan, workplaceCommunicationLessonPlan } from "./unit9-resources";

/**
 * Get Jobs and Careers themed lesson plans for Unit 9
 */
export const getUnit9LessonPlans = (): LessonPlan[] => {
  return [
    jobsVocabularyLessonPlan as LessonPlan,
    workplaceCommunicationLessonPlan as LessonPlan
  ];
};

/**
 * Get Unit 9 resources for the specified book and unit
 */
export const getUnit9Resources = (bookId: string, unitId: string): TeacherResource[] => {
  // Map directly to TeacherResource interfaces
  return [
    {
      id: "unit9-game-1",
      bookId,
      unitId,
      title: "Wordwall - Types of Jobs (Multiple Choice)",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/51d5ddacedd84b80a1a641af60f9abb3",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/51d5ddacedd84b80a1a641af60f9abb3?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit9-game-2",
      bookId,
      unitId,
      title: "Wordwall - Types of Jobs (Match Up)",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/0100b9837b4f46c0b56a01caab8e459a",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/0100b9837b4f46c0b56a01caab8e459a?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit9-game-3",
      bookId,
      unitId,
      title: "Kahoot - Visual 7 Unit 9 Jobs",
      resourceType: "game" as const,
      provider: "Kahoot",
      sourceUrl: "https://create.kahoot.it/share/visual-7-unit-9-jobs/07fa5381-b0a3-4da8-996f-e34a9232145b",
      embedCode: ""
    },
    {
      id: "unit9-video-1",
      bookId,
      unitId,
      title: "Song - What Do You Want To Be?",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/nfzYoNTcAn8",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nfzYoNTcAn8?si=ePvFy6TfZVtNh1gZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      id: "unit9-pdf-1",
      bookId,
      unitId,
      title: "Book 7 - Unit 9 Overview",
      resourceType: "pdf" as const,
      provider: "Visual English",
      sourceUrl: `https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit9/00%20A%20Book%207%20%E2%80%93%20Unit%209.pdf`,
      embedCode: ""
    }
  ];
};
