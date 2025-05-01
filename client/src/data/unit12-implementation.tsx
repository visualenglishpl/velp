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
      title: "Healthy Lifestyle | 7 Habits of Happy & Healthy People",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/yFcvSz0AEJw",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/yFcvSz0AEJw?si=iXwK1DzpbsXixSWB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    {
      id: "unit12-video-2",
      bookId,
      unitId,
      title: "Healthy vs Unhealthy Food Challenge",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/_Yt0W3nZ1hc",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/_Yt0W3nZ1hc?si=sQXELz9a95RGe4mK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    {
      id: "unit12-game-1",
      bookId,
      unitId,
      title: "Wordwall - Healthy Lifestyle Vocabulary",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/bf2b1f1c5f784a9f9d0ce5a41ea71a13",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/bf2b1f1c5f784a9f9d0ce5a41ea71a13?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit12-game-2",
      bookId,
      unitId,
      title: "Wordwall - Healthy vs Unhealthy Foods",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/09d64b12bed34c3b9c10b83a5a53c4b4",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/09d64b12bed34c3b9c10b83a5a53c4b4?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
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
