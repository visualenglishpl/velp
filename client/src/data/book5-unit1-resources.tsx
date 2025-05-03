import { TeacherResource } from '@/components/TeacherResources';

/**
 * Generate resources specific to Book 5 Unit 1 (Schools in the UK and USA)
 * This provides all the videos and games for this unit
 */
export function generateBook5Unit1Resources(bookId: string): TeacherResource[] {
  return [
    // Videos
    {
      id: "book5-unit1-video1",
      bookId,
      unitId: "1",
      title: "Schools in the UK and USA (1)",
      resourceType: "video",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/fAAFO44pJlU",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/fAAFO44pJlU?si=SOgbD4Upe_Tj_SQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      id: "book5-unit1-video2",
      bookId,
      unitId: "1",
      title: "Schools in the UK and USA (2)",
      resourceType: "video",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/-_nbbEahq8k",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/-_nbbEahq8k?si=u_MW45TfECHX7tyo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      id: "book5-unit1-video3",
      bookId,
      unitId: "1",
      title: "After School Clubs",
      resourceType: "video",
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/embed/l1xgc0aTnLU",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/l1xgc0aTnLU?si=yVTDuxfnuhbh_heW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    
    // Games
    {
      id: "book5-unit1-game1",
      bookId,
      unitId: "1",
      title: "Afterschool Clubs",
      resourceType: "game",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/4d43ce661a25430eb84b3fe4e94a20ab",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4d43ce661a25430eb84b3fe4e94a20ab?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "book5-unit1-game2",
      bookId,
      unitId: "1",
      title: "Places in School",
      resourceType: "game",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/f72c3b6631a649f0b68952153fbc6441",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f72c3b6631a649f0b68952153fbc6441?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "book5-unit1-game3",
      bookId,
      unitId: "1",
      title: "School Subjects",
      resourceType: "game",
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/c19107c08fe04affb6610d874284df4a",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c19107c08fe04affb6610d874284df4a?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    }
  ];
}