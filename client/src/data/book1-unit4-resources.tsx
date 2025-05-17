/**
 * Visual English Book 1, Unit 4: How Are You?
 * Resources including videos and games
 */

import { TeacherResource } from '@/types/resources';
import { UnitId } from '@/types/content';
import { createBook1VideoResource, createBook1GameResource } from './book1-resources-common';

// Video resources for Unit 4
export const book1Unit4VideoResources: TeacherResource[] = [
  // The embedCode is made optional in the function definition
  {
    ...createBook1VideoResource(
      '4' as UnitId,
      'video-1',
      'Are You Happy Sad Hot Cold - WATTS ENGLISH',
      'A fun video teaching emotions and feelings vocabulary with engaging animations.',
      'https://www.youtube.com/watch?v=5su1M6NdG-I'
    ),
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/5su1M6NdG-I?si=VDPLCxtaD7jlbp6l" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    ...createBook1VideoResource(
      '4' as UnitId,
      'video-2',
      'Are you Thirsty Hungry and Sick - WATTS ENGLISH',
      'A helpful video teaching feelings and physical states vocabulary with clear examples.',
      'https://www.youtube.com/watch?v=iztRyiYIwUs'
    ),
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/iztRyiYIwUs?si=fVLZihbWVRUgpwXt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    ...createBook1VideoResource(
      '4' as UnitId,
      'video-3',
      'Are You Hungry Kids - SUPER SIMPLE SONGS',
      'A catchy song teaching vocabulary related to hunger and needs through music.',
      'https://www.youtube.com/watch?v=ykTR0uFGwE0'
    ),
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ykTR0uFGwE0?si=Y5Ty39bwGYrdD-W6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    ...createBook1VideoResource(
      '4' as UnitId,
      'video-4',
      'How Are You Today - MAPLE LEAF',
      'A simple song for practicing asking and responding to "How are you today?"',
      'https://www.youtube.com/watch?v=teMU8dHLqSI'
    ),
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/teMU8dHLqSI?si=QuGLh_wOKnY8LR2k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  },
  {
    ...createBook1VideoResource(
      '4' as UnitId,
      'video-5',
      'How Are You Today SKIT - MAPLE LEAF',
      'A conversational roleplay demonstrating how to ask and answer "How are you today?"',
      'https://www.youtube.com/watch?v=kR6Qcqx2fJE'
    ),
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/kR6Qcqx2fJE?si=ZhzOtIlzF8guQFDx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  }
];

// Game resources for Unit 4
export const book1Unit4GameResources: TeacherResource[] = [
  // For game resources, we'll use spread operator to handle additional properties
  {
    ...createBook1GameResource(
      '4' as UnitId,
      'game-1',
      'WORDWALL - HOW ARE YOU - HOW IS THE DOG',
      'Interactive matching game to practice identifying feelings and emotions for people and animals.',
      'https://wordwall.net/resource/cc9df848c6a94c99b8dcf9c9b65caeb4'
    ),
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/cc9df848c6a94c99b8dcf9c9b65caeb4?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  },
  {
    ...createBook1GameResource(
      '4' as UnitId,
      'game-2',
      'WORDWALL - HOW ARE YOU',
      'Fun game to practice recognizing and naming different emotions and feelings.',
      'https://wordwall.net/resource/61576e9315e949fd9a89477f5807ce46'
    ),
    embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/61576e9315e949fd9a89477f5807ce46?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>'
  }
];

// Combined resources for Unit 4
export const book1Unit4Resources: TeacherResource[] = [
  ...book1Unit4VideoResources,
  ...book1Unit4GameResources
];

// Export a getter function to match the pattern used elsewhere
export const getBook1Unit4Resources = () => book1Unit4Resources;

export default book1Unit4Resources;