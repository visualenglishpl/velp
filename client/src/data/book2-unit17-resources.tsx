/**
 * Visual English Book 2, Unit 17: WHERE ARE YOU FROM?
 * Resources including videos and games about nationalities
 */

import { TeacherResource } from '@/components/TeacherResources';
import { BOOK2_TITLE, BOOK2_UNIT_TITLES } from './book2-resources-common';

const unitNumber = '17';
const unitTitle = BOOK2_UNIT_TITLES[unitNumber];

// Video resources for this unit
export const book2Unit17VideoResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-video1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - What is your Nationality?`,
    description: 'Song teaching nationality vocabulary and questions',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=LIUWCSD11MM',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/LIUWCSD11MM?si=3qksIYnPU1GvCxhd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Where Are You From? - Song`,
    description: 'Maple Leaf Learning song about countries and nationalities',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=l6A2EFkjXq4',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/l6A2EFkjXq4?si=7HJbUqr3MlyH8lG2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video3`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - Where Are You From? - Flags and Countries`,
    description: 'Maple Leaf Learning song that connects country flags with nationality',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=XfFCaTgsW-I',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XfFCaTgsW-I?si=Y0qhjOvJdN3Vb-iC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-video4`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - What's Your Nationality? - Rap`,
    description: 'ESL Music for Kids presents a fun rap about nationalities',
    resourceType: 'video',
    provider: 'YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=VPvLduIe_lI',
    embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/VPvLduIe_lI?si=fdMqw9P9hkqx2sWp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  }
];

// Game resources for this unit
export const book2Unit17GameResources: TeacherResource[] = [
  {
    id: `book2-unit${unitNumber}-game1`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - Where Are You From? (1)`,
    description: 'Interactive matching game for countries and nationalities',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/714fe36db01541a99a77b717a178223b',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/714fe36db01541a99a77b717a178223b?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  },
  {
    id: `book2-unit${unitNumber}-game2`,
    bookId: '2',
    unitId: unitNumber,
    title: `${BOOK2_TITLE} - UNIT ${unitNumber} - ${unitTitle} - WORDWALL - Countries and Nationalities (2)`,
    description: 'Practice matching countries with their nationalities',
    resourceType: 'game',
    provider: 'Wordwall',
    sourceUrl: 'https://wordwall.net/resource/2342d6382619465d81a2acf23a5ea9d0',
    embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2342d6382619465d81a2acf23a5ea9d0?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
  }
];

// Combined resources
export const book2Unit17Resources: TeacherResource[] = [
  ...book2Unit17VideoResources,
  ...book2Unit17GameResources
];

// Export a function to get all resources for this unit
export const getBook2Unit17Resources = () => book2Unit17Resources;

export default book2Unit17Resources;