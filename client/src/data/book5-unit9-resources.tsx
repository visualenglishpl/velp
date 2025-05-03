import { TeacherResource } from '@/components/TeacherResources';

/**
 * Generate resources specific to Book 5 Unit 9 (Emotions)
 * This provides all the videos and games for this unit
 */
export function generateBook5Unit9Resources(bookId: string): TeacherResource[] {
  return [
    // Games
    {
      id: "book5-unit9-game1",
      bookId,
      unitId: "9",
      title: "Emotions - Quiz",
      resourceType: "game",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/634707da2b274fe5b687a0eb0498317a",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/634707da2b274fe5b687a0eb0498317a?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "book5-unit9-game2",
      bookId,
      unitId: "9",
      title: "Emotions - Match",
      resourceType: "game",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/4f267a1441db4c939aefed479d23ffac",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4f267a1441db4c939aefed479d23ffac?themeId=21&templateId=69&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "book5-unit9-worksheet1",
      bookId,
      unitId: "9",
      title: "Emotions - Video Worksheet",
      resourceType: "game",
      provider: "ISL Collective",
      sourceUrl: "https://en.islcollective.com/english-esl-video-lessons/embed/8881",
      embedCode: `<iframe src="https://en.islcollective.com/english-esl-video-lessons/embed/8881" width="800" height="600" frameborder="0" allowfullscreen="" style="max-width: inherit !important; max-height: inherit !important;"></iframe>`
    }
  ];
}