// Unit 13 implementation file for Teacher Resources
import { LessonPlan } from "@/components/LessonPlanTemplate";
import { TeacherResource } from "@/components/TeacherResources";
import { cityTourLessonPlan } from "./unit13-resources";

/**
 * Get City Tour themed lesson plans for Unit 13
 */
export const getUnit13LessonPlans = (): LessonPlan[] => {
  return [
    cityTourLessonPlan as LessonPlan
  ];
};

/**
 * Get Unit 13 resources for the specified book and unit
 */
export const getUnit13Resources = (bookId: string, unitId: string): TeacherResource[] => {
  // Map directly to TeacherResource interfaces
  return [
    {
      id: "unit13-video-1",
      bookId,
      unitId,
      title: "10 Things to do in NEW YORK CITY WITH KIDS",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/Ceib2bv7BlA",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Ceib2bv7BlA?si=g7i3HSCPRzdhdsFx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    {
      id: "unit13-game-1",
      bookId,
      unitId,
      title: "Wordwall - Shops Game",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/411d9dcb9eb041b8b1be990c120d6931",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/411d9dcb9eb041b8b1be990c120d6931?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit13-game-2",
      bookId,
      unitId,
      title: "Wordwall - Places in the City",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/1b0157e89e6442009e1385bda1661fbf",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1b0157e89e6442009e1385bda1661fbf?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit13-pdf-1",
      bookId,
      unitId,
      title: "Book 7 - Unit 13 Overview",
      resourceType: "pdf" as const,
      provider: "Visual English",
      sourceUrl: `https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit13/00%20A%20Book%207%20%E2%80%93%20Unit%2013.pdf`,
      embedCode: ""
    }
  ];
};
