// Unit 11 implementation file for Teacher Resources
import { LessonPlan } from "@/components/LessonPlanTemplate";
import { TeacherResource } from "@/components/TeacherResources";
import { naturalDisastersLessonPlan } from "./unit11-resources";

/**
 * Get Natural Disasters themed lesson plans for Unit 11
 */
export const getUnit11LessonPlans = (): LessonPlan[] => {
  return [
    naturalDisastersLessonPlan as LessonPlan
  ];
};

/**
 * Get Unit 11 resources for the specified book and unit
 */
export const getUnit11Resources = (bookId: string, unitId: string): TeacherResource[] => {
  // Map directly to TeacherResource interfaces
  return [
    {
      id: "unit11-video-1",
      bookId,
      unitId,
      title: "ISL Collective - Natural Disasters Video Lesson",
      resourceType: "video" as const,
      provider: "ISL Collective",
      sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/718198",
      embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/718198" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
    },
    {
      id: "unit11-game-1",
      bookId,
      unitId,
      title: "Wordwall - Natural Disaster",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/e2fdc9e3360e49aaa27816818a1179d6",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e2fdc9e3360e49aaa27816818a1179d6?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit11-game-2",
      bookId,
      unitId,
      title: "Kahoot - Visual English 7 Unit 11 Natural Disasters",
      resourceType: "game" as const,
      provider: "Kahoot",
      sourceUrl: "https://create.kahoot.it/share/visual-english-7-unit-11-natural-disasters/49b6cfd8-e8b3-479c-bda3-e2192412a301",
      embedCode: ""
    },
    {
      id: "unit11-pdf-1",
      bookId,
      unitId,
      title: "Book 7 - Unit 11 Overview",
      resourceType: "pdf" as const,
      provider: "Visual English",
      sourceUrl: `https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit11/00%20A%20Book%207%20%E2%80%93%20Unit%2011.pdf`,
      embedCode: ""
    }
  ];
};
