import { TeacherResource } from '@/components/TeacherResources';

// Movies & Films - Unit 18 Resources
export const book3Unit18Resources: TeacherResource[] = [
  {
    id: "book3-unit18-game1",
    bookId: "3",
    unitId: "18",
    title: "Movie Genres Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/15431416/movie-genres",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/15431416/movie-genres?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: "book3-unit18-game2",
    bookId: "3",
    unitId: "18",
    title: "Film Vocabulary Game",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/96124/film-vocabulary",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/96124/film-vocabulary?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: "book3-unit18-game3",
    bookId: "3",
    unitId: "18",
    title: "Jobs in Film Industry",
    resourceType: "game" as const,
    provider: "Wordwall",
    sourceUrl: "https://wordwall.net/resource/4787236/jobs-film-industry",
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4787236/jobs-film-industry?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: "book3-unit18-video1",
    bookId: "3",
    unitId: "18",
    title: "Movie Genres for Kids",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=XZxvmzwxmtk",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XZxvmzwxmtk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: "book3-unit18-video2",
    bookId: "3",
    unitId: "18",
    title: "Types of Movies Vocabulary",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=t8dI2FUetk8",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/t8dI2FUetk8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: "book3-unit18-video3",
    bookId: "3",
    unitId: "18",
    title: "Jobs in Film Making",
    resourceType: "video" as const,
    provider: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=sZA2oQ5anSA",
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/sZA2oQ5anSA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Create the implementation function to expose the resources
export function getBook3Unit18Resources(): TeacherResource[] {
  return book3Unit18Resources.map(resource => ({
    ...resource,
    bookId: '3',
    unitId: '18',
    showBlankIfUnmapped: true
  }));
}
