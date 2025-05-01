// Unit 16 implementation file for Teacher Resources
import { LessonPlan } from "@/components/LessonPlanTemplate";
import { TeacherResource } from "@/components/TeacherResources";
import { foodAndCuisineLessonPlan } from "./unit16-resources";

/**
 * Get Food and Cuisine themed lesson plans for Unit 16
 */
export const getUnit16LessonPlans = (): LessonPlan[] => {
  return [
    foodAndCuisineLessonPlan as LessonPlan
  ];
};

/**
 * Get Unit 16 resources for the specified book and unit
 */
export const getUnit16Resources = (bookId: string, unitId: string): TeacherResource[] => {
  // Map directly to TeacherResource interfaces
  return [
    {
      id: "unit16-video-1",
      bookId,
      unitId,
      title: "Guess The Fast Food Restaurants Logo | Food Logo Quiz",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/XPJ8sLW9MVs",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XPJ8sLW9MVs?si=rrEv0vqe5wxKRaMi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    {
      id: "unit16-video-2",
      bookId,
      unitId,
      title: "Guess the Country by its Food | Country Quiz",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/OuKo5MVaeWU",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/OuKo5MVaeWU?si=xYZvg7F70fGeNxbZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    {
      id: "unit16-game-1",
      bookId,
      unitId,
      title: "Wordwall - Food Tastes",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/6730885c619848649b96d5fa6bf972c7",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6730885c619848649b96d5fa6bf972c7?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit16-game-2",
      bookId,
      unitId,
      title: "Wordwall - Food Stall / Trucks",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/embed/3828678c606049d0a756fad74eb5819a",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/3828678c606049d0a756fad74eb5819a?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "unit16-pdf-1",
      bookId,
      unitId,
      title: "Book 7 - Unit 16 Overview",
      resourceType: "pdf" as const,
      provider: "Visual English",
      sourceUrl: `https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit16/00%20A%20Book%207.pdf`,
      embedCode: ""
    }
  ];
};
