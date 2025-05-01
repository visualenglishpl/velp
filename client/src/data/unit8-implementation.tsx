// Unit 8 implementation file for Teacher Resources
import { LessonPlan } from "@/components/LessonPlanTemplate";
import { TeacherResource } from "@/components/TeacherResources";
import { musicalInstrumentsLessonPlan, musicEntertainmentLessonPlan } from "./unit8-resources";

/**
 * Get Musical Instruments themed lesson plans for Unit 8
 */
export const getUnit8LessonPlans = (): LessonPlan[] => {
  return [
    musicalInstrumentsLessonPlan as LessonPlan,
    musicEntertainmentLessonPlan as LessonPlan
  ];
};

/**
 * Get Unit 8 resources for the specified book and unit
 */
export const getUnit8Resources = (bookId: string, unitId: string): TeacherResource[] => {
  // Map directly to TeacherResource interfaces
  return [
    {
      id: "unit8-video-1",
      bookId,
      unitId,
      title: "Musical Instruments Quiz",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/WV63aVMnyMA",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/WV63aVMnyMA?si=iicLZ4_-HXXjnJiF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      id: "unit8-video-2",
      bookId,
      unitId,
      title: "Guess the Sound - Musical Instruments Quiz",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/tb0gHAzpQPE",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/tb0gHAzpQPE?si=01WXGLlOnyEFfrXy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      id: "unit8-game-1",
      bookId,
      unitId,
      title: "Kahoot - Musical Instruments",
      resourceType: "game" as const,
      provider: "Kahoot",
      sourceUrl: "https://create.kahoot.it/share/music-instruments/60a322c4-b3a8-4c2d-9078-e877ca66ac23",
      embedCode: ""
    },
    {
      id: "unit8-game-2",
      bookId,
      unitId,
      title: "Wordwall - Places of Entertainment",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/9e1962f07e5b4f6ab60abe28003ad348",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/9e1962f07e5b4f6ab60abe28003ad348?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit8-game-3",
      bookId,
      unitId,
      title: "Wordwall - Music Instruments",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/a399888cbe8943ec97dabfb51b788af5",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a399888cbe8943ec97dabfb51b788af5?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit8-pdf-1",
      bookId,
      unitId,
      title: "Book 7 - Unit 8 Overview",
      resourceType: "pdf" as const,
      provider: "Visual English",
      sourceUrl: `https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit8/00%20A%20Book%207%20%E2%80%93%20Unit%208.pdf`,
      embedCode: ""
    }
  ];
};
