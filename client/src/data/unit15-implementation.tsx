// Unit 15 implementation file for Teacher Resources
import { LessonPlan } from "@/components/LessonPlanTemplate";
import { TeacherResource } from "@/components/TeacherResources";
import { holidaysAndFestivalsLessonPlan } from "./unit15-resources";

/**
 * Get Holidays and Festivals themed lesson plans for Unit 15
 */
export const getUnit15LessonPlans = (): LessonPlan[] => {
  return [
    holidaysAndFestivalsLessonPlan as LessonPlan
  ];
};

/**
 * Get Unit 15 resources for the specified book and unit
 */
export const getUnit15Resources = (bookId: string, unitId: string): TeacherResource[] => {
  // Map directly to TeacherResource interfaces
  return [
    {
      id: "unit15-video-1",
      bookId,
      unitId,
      title: "Weird Holidays Celebrated Around the World || Unique Festivals",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/dk9-dNvApng",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/dk9-dNvApng?si=I1CWY8crgQoGcabR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    {
      id: "unit15-video-2",
      bookId,
      unitId,
      title: "Guess the festival | Top 10 most famous festivals",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/Gn3qEebFMLc",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Gn3qEebFMLc?si=xHSA-RlnQ_npy3ck" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    {
      id: "unit15-game-1",
      bookId,
      unitId,
      title: "Wordwall - Months of the Year",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/1c0632327e4d4c33abf969014a371645",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1c0632327e4d4c33abf969014a371645?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit15-game-2",
      bookId,
      unitId,
      title: "Wordwall - Months Matching Game",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/c52506eabcd4406cbd3681a0d184060e",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c52506eabcd4406cbd3681a0d184060e?themeId=1&templateId=50&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit15-game-3",
      bookId,
      unitId,
      title: "Wordwall - World Celebrations",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/143919e90a414397ba99e8744fcbf7a3",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/143919e90a414397ba99e8744fcbf7a3?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit15-game-4",
      bookId,
      unitId,
      title: "Wordwall - Family Celebrations",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/ab22249eb83043d8940f69a78058f725",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ab22249eb83043d8940f69a78058f725?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit15-pdf-1",
      bookId,
      unitId,
      title: "Book 7 - Unit 15 Overview",
      resourceType: "pdf" as const,
      provider: "Visual English",
      sourceUrl: `https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit15/00%20A%20Book%207.pdf`,
      embedCode: ""
    }
  ];
};
