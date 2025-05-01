// Unit 12 implementation file for Teacher Resources
import { LessonPlan } from "@/components/LessonPlanTemplate";
import { TeacherResource } from "@/components/TeacherResources";
import { healthyLifestyleLessonPlan } from "./unit12-resources";

/**
 * Get Healthy Lifestyle themed lesson plans for Unit 12
 */
export const getUnit12LessonPlans = (): LessonPlan[] => {
  return [
    healthyLifestyleLessonPlan as LessonPlan
  ];
};

/**
 * Get Unit 12 resources for the specified book and unit
 */
export const getUnit12Resources = (bookId: string, unitId: string): TeacherResource[] => {
  // Map directly to TeacherResource interfaces
  return [
    {
      id: "unit12-video-1",
      bookId,
      unitId,
      title: "ISL Collective - Burnout Video Lesson",
      resourceType: "video" as const,
      provider: "ISL Collective",
      sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/1102668",
      embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/1102668" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
    },
    {
      id: "unit12-game-1",
      bookId,
      unitId,
      title: "Wordwall - Should vs. Shouldn't Game",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/37bd90b81ab549adab6f3d3c074889ed",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/37bd90b81ab549adab6f3d3c074889ed?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit12-game-2",
      bookId,
      unitId,
      title: "Wordwall - Healthy vs. Unhealthy Game",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/ee74009d2b384b808714e36062a0801a",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ee74009d2b384b808714e36062a0801a?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit12-pdf-1",
      bookId,
      unitId,
      title: "Book 7 - Unit 12 Overview",
      resourceType: "pdf" as const,
      provider: "Visual English",
      sourceUrl: `https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit12/00%20A%20Book%207.pdf`,
      embedCode: ""
    }
  ];
};
