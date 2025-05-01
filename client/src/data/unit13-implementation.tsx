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
      title: "City Tour of London",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/P9D2kkUMClE",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/P9D2kkUMClE?si=RCZLXGQFf3KAD9Jz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    {
      id: "unit13-video-2",
      bookId,
      unitId,
      title: "City Buildings and Places Vocabulary",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/dEB7_XH8K5o",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/dEB7_XH8K5o?si=NrVWR2Qf9aw2ysPL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    {
      id: "unit13-game-1",
      bookId,
      unitId,
      title: "Wordwall - Places in the City",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/20c14a4f7eca49a58c75a4e5bc9e3141",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/20c14a4f7eca49a58c75a4e5bc9e3141?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit13-game-2",
      bookId,
      unitId,
      title: "Wordwall - City Facilities Matching",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/e4df8a8d99e54721afcdafedaa90badf",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e4df8a8d99e54721afcdafedaa90badf?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
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
