// Unit 10 implementation file for Teacher Resources
import { LessonPlan } from "@/components/LessonPlanTemplate";
import { TeacherResource } from "@/components/TeacherResources";
import { sportsVocabularyLessonPlan, unusualSportsLessonPlan } from "./unit10-resources";

/**
 * Get Sports-themed lesson plans for Unit 10
 */
export const getUnit10LessonPlans = (): LessonPlan[] => {
  return [
    sportsVocabularyLessonPlan as LessonPlan,
    unusualSportsLessonPlan as LessonPlan
  ];
};

/**
 * Get Unit 10 resources for the specified book and unit
 */
export const getUnit10Resources = (bookId: string, unitId: string): TeacherResource[] => {
  // Map directly to TeacherResource interfaces
  return [
    {
      id: "unit10-video-1",
      bookId,
      unitId,
      title: "Top 10 Strangest Sports in The World",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/Lsn8z-AJxFc",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Lsn8z-AJxFc?si=uhd5NViyAbeKM3n3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    {
      id: "unit10-game-1",
      bookId,
      unitId,
      title: "Wordwall - Go, Play, Do Sports",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/29a03787b421456f827094e6b08363cc",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/29a03787b421456f827094e6b08363cc?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit10-game-2",
      bookId,
      unitId,
      title: "Wordwall - Sports Places",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/48a835075ae5459eb3dbb23e211f7019",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/48a835075ae5459eb3dbb23e211f7019?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit10-game-3",
      bookId,
      unitId,
      title: "Wordwall - Sports Equipment",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/2f85e31cefed4733a458f93e9c7352fb",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2f85e31cefed4733a458f93e9c7352fb?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit10-game-4",
      bookId,
      unitId,
      title: "Kahoot - Sport Places and Equipment",
      resourceType: "game" as const,
      provider: "Kahoot",
      sourceUrl: "https://create.kahoot.it/share/sport-places-and-equipment/b2205677-5c0b-43af-aacd-28af5751763e",
      embedCode: ""
    },
    {
      id: "unit10-pdf-1",
      bookId,
      unitId,
      title: "Book 7 - Unit 10 Overview",
      resourceType: "pdf" as const,
      provider: "Visual English",
      sourceUrl: `https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit10/00%20A%20Book%207%20%E2%80%93%20Unit%2010.pdf`,
      embedCode: ""
    }
  ];
};
