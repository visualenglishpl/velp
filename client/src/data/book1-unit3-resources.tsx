/**
 * Visual English Book 1, Unit 3: Classroom Rules
 * Resources including videos and games
 */

import { TeacherResource } from '@/types/resources';
import { UnitId } from '@/types/content';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 3
export const book1Unit3VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '3' as UnitId,
    'video-1',
    'Stand Up Sit Down - FUN KIDS ENGLISH',
    'An educational video teaching classroom instructions through a fun, interactive song.',
    'https://www.youtube.com/watch?v=WsiRSWthV1k',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/WsiRSWthV1k?si=5qhIghLOyTJLoACs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  ),
  createBook1VideoResource(
    '3' as UnitId,
    'video-2',
    'Stand Up - Sit Down - tddongtv',
    'A fun song to teach and practice "stand up" and "sit down" instructions.',
    'https://www.youtube.com/watch?v=DiXMZJi_2NU',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/DiXMZJi_2NU?si=UQ4Gw6Tmux2TgAIG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  ),
  createBook1VideoResource(
    '3' as UnitId,
    'video-3',
    'Open Close! Open Shut Them Song - MAPLE LEAF LEARNING',
    'A catchy song teaching children vocabulary for opening and closing with hand movements.',
    'https://www.youtube.com/watch?v=E_VcSQn73do',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/E_VcSQn73do?si=rqxV1ItW15Gp0biP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  ),
  createBook1VideoResource(
    '3' as UnitId,
    'video-4',
    'Open Close! Open Shut Them Song - SUPER SIMPLE',
    'Another version of the "Open Shut Them" song with clear visuals for young learners.',
    'https://www.youtube.com/watch?v=RNUZBHlRH4Y',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/RNUZBHlRH4Y?si=Q5ovKH7UTWy0eTXk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  ),
  createBook1VideoResource(
    '3' as UnitId,
    'video-5',
    'Clean Up Song - Super Simple Songs',
    'A song that encourages children to clean up the classroom and put things away.',
    'https://www.youtube.com/watch?v=SFE0mMWbA-Y',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/SFE0mMWbA-Y?si=DMWEOIFgkgokf4Bf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  )
];

// Game resources for Unit 3
export const book1Unit3GameResources: TeacherResource[] = [
  createBook1GameResource(
    '3' as UnitId,
    'game-1',
    'WORDWALL - CLASSROOM RULES - Game 1',
    'Interactive game to practice identifying classroom rules and instructions.',
    'https://wordwall.net/resource/94341df31881431a8e6bb5e707557a42',
    '<iframe style="max-width:100%" src="https://wordwall.net/embed/94341df31881431a8e6bb5e707557a42?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  ),
  createBook1GameResource(
    '3' as UnitId,
    'game-2',
    'WORDWALL - CLASSROOM RULES - Game 2',
    'Another fun game to reinforce classroom rules vocabulary.',
    'https://wordwall.net/resource/c95d7edfe0e64b77be765f3289a7c3e3',
    '<iframe style="max-width:100%" src="https://wordwall.net/embed/c95d7edfe0e64b77be765f3289a7c3e3?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  )
];

// Combined resources for Unit 3
export const book1Unit3Resources: TeacherResource[] = [
  ...book1Unit3VideoResources,
  ...book1Unit3GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit3Resources = () => book1Unit3Resources;

export default book1Unit3Resources;