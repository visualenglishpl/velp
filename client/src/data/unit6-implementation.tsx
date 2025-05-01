// Unit 6 implementation file for Teacher Resources
import { LessonPlan } from "@/components/LessonPlanTemplate";
import { TeacherResource } from "@/components/TeacherResources";
import { britishCurrencyLessonPlan, internationalMoneyLessonPlan, spendingSavingLessonPlan } from "./unit6-resources";

/**
 * Get money-themed lesson plans for Unit 6
 */
export const getUnit6LessonPlans = (): LessonPlan[] => {
  return [
    britishCurrencyLessonPlan,
    internationalMoneyLessonPlan,
    spendingSavingLessonPlan
  ];
};

/**
 * Get resources specifically for Unit 6 (Money theme)
 */
export const getUnit6Resources = (bookId: string, unitId: string): TeacherResource[] => {
  return [
    {
      id: "book7-unit6-pdf1",
      bookId,
      unitId,
      title: "Book 7 - Unit 6 Overview",
      resourceType: "pdf" as const,
      provider: "Visual English",
      sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit6/00%20A%20Book%207%20%E2%80%93%20Unit%206.pdf",
      fileUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit6/00%20A%20Book%207%20%E2%80%93%20Unit%206.pdf",
    },
    {
      id: "book7-unit6-video1",
      bookId,
      unitId,
      title: "Learn English Money from 1p to 50 Pounds",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/Vcoi6l0D6ak",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Vcoi6l0D6ak?si=cYTh99UmUthwy1yO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      id: "book7-unit6-lesson1",
      bookId,
      unitId,
      title: "British Currency Worksheet to Print",
      resourceType: "lesson" as const,
      provider: "ISL Collective",
      sourceUrl: "https://en.islcollective.com/english-esl-worksheets/general-topic/countries/british-currency/18577",
      embedCode: ""
    },
    {
      id: "book7-unit6-game1",
      bookId,
      unitId,
      title: "Money Kahoot Game",
      resourceType: "game" as const,
      provider: "Kahoot",
      sourceUrl: "https://create.kahoot.it/share/currency/f87e8719-291e-440a-a340-22344175fedb",
      embedCode: ""
    },
    {
      id: "book7-unit6-game2",
      bookId,
      unitId,
      title: "Money Wordwall Game 1",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/463ad4520fbb4edd9ea903446f182971",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/463ad4520fbb4edd9ea903446f182971?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "book7-unit6-game3",
      bookId,
      unitId,
      title: "Money Wordwall Game 2",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/2108e23e264b487b9f5c8022145d22d8",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2108e23e264b487b9f5c8022145d22d8?themeId=41&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ];
};
