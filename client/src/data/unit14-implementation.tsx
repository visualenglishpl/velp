// Unit 14 implementation file for Teacher Resources
import { LessonPlan } from "@/components/LessonPlanTemplate";
import { TeacherResource } from "@/components/TeacherResources";
import { climateChangeLessonPlan } from "./unit14-resources";

/**
 * Get Climate Change themed lesson plans for Unit 14
 */
export const getUnit14LessonPlans = (): LessonPlan[] => {
  return [
    climateChangeLessonPlan as LessonPlan
  ];
};

/**
 * Get Unit 14 resources for the specified book and unit
 */
export const getUnit14Resources = (bookId: string, unitId: string): TeacherResource[] => {
  // Map directly to TeacherResource interfaces
  return [
    {
      id: "unit14-video-1",
      bookId,
      unitId,
      title: "Migrants | Award-Winning CG Animated Short Film about Climate change",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/ugPJi8kMK8Q",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/ugPJi8kMK8Q?si=aj_dlhbAyjFFNf0G" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    {
      id: "unit14-game-1",
      bookId,
      unitId,
      title: "Wordwall - Climate Change Game",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/693f7afb993242929b59236c929717a5",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/693f7afb993242929b59236c929717a5?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit14-pdf-1",
      bookId,
      unitId,
      title: "Book 7 - Unit 14 Overview",
      resourceType: "pdf" as const,
      provider: "Visual English",
      sourceUrl: `https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit14/00%20A%20Book%207.pdf`,
      embedCode: ""
    }
  ];
};
