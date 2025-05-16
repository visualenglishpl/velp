/**
 * Visual English Book 1, Unit 2: School Objects
 * Resources including videos and games
 */

import { TeacherResource } from '@/types/resources';
import { UnitId } from '@/types/content';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 2
export const book1Unit2VideoResources: TeacherResource[] = [
  createBook1VideoResource(
    '2' as UnitId,
    'video-1',
    'School Objects - ENGLISH TREE',
    'An educational video teaching children basic school objects vocabulary.',
    'https://www.youtube.com/watch?v=41cJ0mqWses',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/41cJ0mqWses?si=JlxMgV_GADKfiUFf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  ),
  createBook1VideoResource(
    '2' as UnitId,
    'video-2',
    'Magic Crayons - WATTS ENGLISH',
    'A fun story about magic crayons that introduces colors and school supplies.',
    'https://www.youtube.com/watch?v=Ix4dSjKqwvc',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/Ix4dSjKqwvc?si=eK9P-OvHUpAP2T49" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  ),
  createBook1VideoResource(
    '2' as UnitId,
    'video-3',
    'PPAP Pen Pineapple Apple Pen Long Version - PIKOTARO',
    'A catchy and humorous song that reinforces vocabulary for "pen", "apple", and "pineapple".',
    'https://www.youtube.com/watch?v=Ct6BUPvE2sM',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/Ct6BUPvE2sM?si=-OWJf3xPmmeHVw_b" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  ),
  createBook1VideoResource(
    '2' as UnitId,
    'video-4',
    'PPAP PenPineappleApplePen - Short Version',
    'A shorter version of the PPAP song, perfect for quick vocabulary reinforcement.',
    'https://www.youtube.com/watch?v=t24dt39WNG0',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/t24dt39WNG0?si=DkWmQWqsVIBtV_sQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  ),
  createBook1VideoResource(
    '2' as UnitId,
    'video-5',
    'Back to School MIX - WATTS ENGLISH',
    'A fun mix of back-to-school activities and vocabulary.',
    'https://www.youtube.com/watch?v=F9OdB53UGmA',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/F9OdB53UGmA?si=dli3ESO3Q-28sZ3q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  ),
  createBook1VideoResource(
    '2' as UnitId,
    'video-6',
    'What is In Your Bag Song - DREAM ENGLISH',
    'A catchy song that helps children learn vocabulary related to school supplies.',
    'https://www.youtube.com/watch?v=JLMsm-D7kjk',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/JLMsm-D7kjk?si=hbbam_l55tiPpX5F" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  )
];

// Game resources for Unit 2
export const book1Unit2GameResources: TeacherResource[] = [
  createBook1GameResource(
    '2' as UnitId,
    'game-1',
    'WORDWALL - SCHOOL OBJECTS - Game 1',
    'An interactive game to practice identifying school objects.',
    'https://wordwall.net/resource/db3feb02d90048c794504e2a408ef901',
    '<iframe style="max-width:100%" src="https://wordwall.net/embed/db3feb02d90048c794504e2a408ef901?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  ),
  createBook1GameResource(
    '2' as UnitId,
    'game-2',
    'WORDWALL - SCHOOL OBJECTS - Game 2',
    'Another fun game to practice school objects vocabulary.',
    'https://wordwall.net/resource/5282ddaa503a4c5e9875ee2426934081',
    '<iframe style="max-width:100%" src="https://wordwall.net/embed/5282ddaa503a4c5e9875ee2426934081?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  ),
  createBook1GameResource(
    '2' as UnitId,
    'game-3',
    'WORDWALL - SCHOOL OBJECTS - Game 3',
    'A third interactive game for reinforcing school objects vocabulary.',
    'https://wordwall.net/resource/5ce51d4acf1e41058c70f1b6d1951f8a',
    '<iframe style="max-width:100%" src="https://wordwall.net/embed/5ce51d4acf1e41058c70f1b6d1951f8a?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  )
];

// Combined resources for Unit 2
export const book1Unit2Resources: TeacherResource[] = [
  ...book1Unit2VideoResources,
  ...book1Unit2GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit2Resources = () => book1Unit2Resources;

export default book1Unit2Resources;