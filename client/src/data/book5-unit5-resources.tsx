import { TeacherResource } from '@/components/TeacherResources';

/**
 * Generate resources specific to Book 5 Unit 5 (Winter Fun)
 * This provides all the videos and games for this unit
 */
export function generateBook5Unit5Resources(bookId: string): TeacherResource[] {
  return [
    // Videos
    {
      id: "book5-unit5-video1",
      bookId,
      unitId: "5",
      title: "Winter Activities",
      resourceType: "video",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/hNRAmIY8NRk",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/hNRAmIY8NRk?si=rk-w7VwhSl5ZzJrP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    
    // Games
    {
      id: "book5-unit5-game1",
      bookId,
      unitId: "5",
      title: "Winter Activities",
      resourceType: "game",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/947d2144dc414e66a86aad76d37d8dd8",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/947d2144dc414e66a86aad76d37d8dd8?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "book5-unit5-game2",
      bookId,
      unitId: "5",
      title: "Winter Equipment - Drag and Drop",
      resourceType: "game",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/6c386095e72047989555b630d50a503c",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6c386095e72047989555b630d50a503c?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "book5-unit5-game3",
      bookId,
      unitId: "5",
      title: "Winter Equipment - Match",
      resourceType: "game",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/0bd8d158bcbf4a9696c8ea447ca3fb24",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/0bd8d158bcbf4a9696c8ea447ca3fb24?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "book5-unit5-game4",
      bookId,
      unitId: "5",
      title: "Winter Sports",
      resourceType: "game",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/f389ff77339b4a56af253467ed3356e4",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f389ff77339b4a56af253467ed3356e4?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ];
}