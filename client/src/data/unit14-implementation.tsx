// Unit 14 implementation file for Teacher Resources
import { LessonPlan } from "@/components/LessonPlanTemplate";
import { TeacherResource } from "@/components/TeacherResources";
import { migrationClimateLessonPlan } from "./unit14-resources";

/**
 * Get Migration and Climate Change themed lesson plans for Unit 14
 */
export const getUnit14LessonPlans = (): LessonPlan[] => {
  return [
    migrationClimateLessonPlan as LessonPlan
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
      title: "Climate Change - What can be done?",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/VTfgNFz1DBM",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/VTfgNFz1DBM?si=1zHMvg37xRbqmmJo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    {
      id: "unit14-video-2",
      bookId,
      unitId,
      title: "MIGRANTS - Award-Winning CG Animated Short Film",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/LtWdrDqS_uc",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/LtWdrDqS_uc?si=EyWUNJqFAOkNdEVE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    {
      id: "unit14-game-1",
      bookId,
      unitId,
      title: "Climate Change Vocabulary",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/7f0c2e9ff2e1426f92f9a42c93b3e5ec",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7f0c2e9ff2e1426f92f9a42c93b3e5ec?themeId=1&templateId=50&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit14-game-2",
      bookId,
      unitId,
      title: "Migration Vocabulary",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/3e56b5ac92a646e0afc5ea5c4bb0b82e",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/3e56b5ac92a646e0afc5ea5c4bb0b82e?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
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
