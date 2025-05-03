import { TeacherResource } from '@/components/TeacherResources';

/**
 * Generate resources specific to Book 5 Unit 13 (Irregular Verbs - Past Tense)
 * This provides all the videos and games for this unit
 */
export function generateBook5Unit13Resources(bookId: string): TeacherResource[] {
  return [
    // Games
    {
      id: "book5-unit13-game1",
      bookId,
      unitId: "13",
      title: "Past Tense Verbs - Categories",
      resourceType: "game",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/7c9e288361b14419beac7fc8c66234c8",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/7c9e288361b14419beac7fc8c66234c8?themeId=1&templateId=54&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "book5-unit13-game2",
      bookId,
      unitId: "13",
      title: "Past Tense Verbs - Match",
      resourceType: "game",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/c492d3022c664a79b96b36d9351a5631",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c492d3022c664a79b96b36d9351a5631?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "book5-unit13-worksheet1",
      bookId,
      unitId: "13",
      title: "Irregular Verbs - Video Worksheet",
      resourceType: "game",
      provider: "ISL Collective",
      sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/325326",
      embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/325326" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
    }
  ];
}