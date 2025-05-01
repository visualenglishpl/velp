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
      title: "Natural Disasters: What to Know",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/v9KU5jxbIeQ",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/v9KU5jxbIeQ?si=mNY5t6Aaq1mFxhXG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    {
      id: "unit11-video-2",
      bookId,
      unitId,
      title: "Natural Disasters for Kids",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/VlEg8MGHVOQ",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/VlEg8MGHVOQ?si=LTDY3ZLIlhLzfajO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    {
      id: "unit11-game-1",
      bookId,
      unitId,
      title: "Wordwall - Natural Disasters Vocabulary",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/a1a4d4ffe0a747e3800e1c0532f48a34",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a1a4d4ffe0a747e3800e1c0532f48a34?themeId=1&templateId=11&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit11-game-2",
      bookId,
      unitId,
      title: "Wordwall - Extreme Weather Terms",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/d1c9dc45c25f4d53bda1e89f3b2c3b9d",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d1c9dc45c25f4d53bda1e89f3b2c3b9d?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
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
