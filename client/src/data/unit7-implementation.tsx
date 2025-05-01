// Unit 7 implementation file for Teacher Resources
import { LessonPlan } from "@/components/LessonPlanTemplate";
import { TeacherResource } from "@/components/TeacherResources";
import { diyToolsLessonPlan, diyProjectsLessonPlan } from "./unit7-resources";

/**
 * Get DIY-themed lesson plans for Unit 7
 */
export const getUnit7LessonPlans = (): LessonPlan[] => {
  return [
    diyToolsLessonPlan as LessonPlan,
    diyProjectsLessonPlan as LessonPlan
  ];
};

/**
 * Get Unit 7 resources for the specified book and unit
 */
export const getUnit7Resources = (bookId: string, unitId: string): TeacherResource[] => {
  // Map directly to TeacherResource interfaces
  return [
    {
      id: "unit7-video-1",
      bookId,
      unitId,
      title: "DIY Tools and Projects",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/l15FoVIHsmU",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/l15FoVIHsmU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      id: "unit7-game-1",
      bookId,
      unitId,
      title: "Tools and DIY Vocabulary Wordwall Game",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/diy-tools-vocabulary",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/fc7da6d5ba1a4f098b53f4bfdc62e62c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit7-pdf-1",
      bookId,
      unitId,
      title: "Book 7 - Unit 7 Overview",
      resourceType: "pdf" as const,
      provider: "Visual English",
      sourceUrl: `https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit7/00%20A%20Book%207%20%E2%80%93%20Unit%207.pdf`,
      embedCode: ""
    }
  ];
};
