/**
 * Visual English Book 1, Unit 18: WHAT CAN YOU DO?
 * Resources including videos and games
 */

import { TeacherResource } from '@/components/TeacherResources';

export const book1Unit18VideoResources: TeacherResource[] = [
  {
    id: 'book1-unit18-video1',
    bookId: '1',
    unitId: '18',
    title: 'Yes, I Can! - Super Simple Songs',
    description: 'Fun song teaching ability expressions with actions children can do.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=_Ir0Mc6Qilo',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/_Ir0Mc6Qilo?si=yZbOkz3BttYRJpW3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit18-video2',
    bookId: '1',
    unitId: '18',
    title: 'I Can Dream, Fly, Swim, Jump - WATTS ENGLISH',
    description: 'Video showing different abilities with animations and real-life examples.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=opyc2bvtBpo',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/opyc2bvtBpo?si=xamI9uQjs__zjY9r" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit18-video3',
    bookId: '1',
    unitId: '18',
    title: 'What Can You Do? - MAPLE LEAF',
    description: 'Educational video teaching ability expressions with clear examples.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=qI7nYvVXudo',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/qI7nYvVXudo?si=gwb6myCqDcEnnVxp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit18-video4',
    bookId: '1',
    unitId: '18',
    title: 'Can/Can\'t Skit - Simple Skits MAPLE LEAF',
    description: 'Role-play demonstration teaching how to use can/can\'t to express ability.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=hA3ClzoslBo',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/hA3ClzoslBo?si=sZCd8KQjwMdLOsiH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit18-video5',
    bookId: '1',
    unitId: '18',
    title: 'What Can You Do? - Song',
    description: 'Catchy song about abilities with visuals and simple choreography.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=radrRGGe-J0',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/radrRGGe-J0?si=CO0bXstO0-wqYbfA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit18-video6',
    bookId: '1',
    unitId: '18',
    title: 'I Can - The Singing Walrus',
    description: 'Educational song about different abilities with clear visuals and actions.',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=hft6uJQIF4g',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/hft6uJQIF4g?si=YNeeUx4o98FdScCM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

export const book1Unit18GameResources: TeacherResource[] = [
  {
    id: 'book1-unit18-game1',
    bookId: '1',
    unitId: '18',
    title: 'WORDWALL - WHAT CAN YOU DO (1)',
    description: 'Interactive game to practice expressing abilities using can/can\'t.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/e4a93912a9784dc6b9171a1c54272864',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e4a93912a9784dc6b9171a1c54272864?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: 'book1-unit18-game2',
    bookId: '1',
    unitId: '18',
    title: 'WORDWALL - WHAT CAN YOU DO (2)',
    description: 'Another game format to practice ability vocabulary and expressions.',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/b712584d5def413aa86cbdcfa8c222dd',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/b712584d5def413aa86cbdcfa8c222dd?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book1Unit18Resources: TeacherResource[] = [
  ...book1Unit18VideoResources,
  ...book1Unit18GameResources
];

// Export a function to get all resources for this unit
export const getBook1Unit18Resources = () => book1Unit18Resources;

export default book1Unit18Resources;
