// Script to update teacher resources from PDF links
import fs from 'fs';
import { pool } from '../server/db.ts';

// Resources extracted from the "Linki Do Filmy I Gry.pdf" files and manually added content
const resources = {
  "8": [
    {
      "resourceType": "video",
      "title": "Unit 8 - The Shape Song 1",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/TJhfl5vdxp4?si=6rVtTBbIENScQqy-\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/TJhfl5vdxp4?si=6rVtTBbIENScQqy-",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 8 - The Shape Song 2",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/03pyY9C2Pm8?si=MIf13-bIxze2_vF_\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/03pyY9C2Pm8?si=MIf13-bIxze2_vF_",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 8 - Shapes by Pinkfong",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/0B6Ge0FzHG0?si=pQL9a255hrzGG3Gv\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/0B6Ge0FzHG0?si=pQL9a255hrzGG3Gv",
      "order": 3
    },
    {
      "resourceType": "video",
      "title": "Unit 8 - Shapes Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/FOZLDVnvrZM?si=1qm7XlmfoLJJrH0f\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/FOZLDVnvrZM?si=1qm7XlmfoLJJrH0f",
      "order": 4
    },
    {
      "resourceType": "video",
      "title": "Unit 8 - Shapes by Pinkfong 2",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/lcl8uB2AWM0?si=-SHyNKki0N2YVjkR\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/lcl8uB2AWM0?si=-SHyNKki0N2YVjkR",
      "order": 5
    },
    {
      "resourceType": "video",
      "title": "Unit 8 - What Shape Is It",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/9GFEjNL0XXw?si=FADkhaPtpTyIi7au\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/9GFEjNL0XXw?si=FADkhaPtpTyIi7au",
      "order": 6
    },
    {
      "resourceType": "game",
      "title": "Unit 8 - Shapes Game 1",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/a3dfd9e2aa764904a073828747936488?themeId=21&templateId=46&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/a3dfd9e2aa764904a073828747936488?themeId=21&templateId=46&fontStackId=0",
      "order": 7
    },
    {
      "resourceType": "game",
      "title": "Unit 8 - Shapes Game 2",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/cb6e5a77fb104ff6a1b7d9c0b66582ef?themeId=1&templateId=46&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/cb6e5a77fb104ff6a1b7d9c0b66582ef?themeId=1&templateId=46&fontStackId=0",
      "order": 8
    },
    {
      "resourceType": "game",
      "title": "Unit 8 - Shapes Game 3",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/c8dc456710c3427aa892110f7073b50d?themeId=1&templateId=2&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/c8dc456710c3427aa892110f7073b50d?themeId=1&templateId=2&fontStackId=0",
      "order": 9
    }
  ],
  "9": [
    {
      "resourceType": "video",
      "title": "Unit 9 - Make a Robot Face",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/N6C8QueZdIc?si=6aZJNoGxC67PcSVF\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/N6C8QueZdIc?si=6aZJNoGxC67PcSVF",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 9 - Make a Monster Face",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/YxARpdWQGpo?si=5exwxWN_ncDJEwWW\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/YxARpdWQGpo?si=5exwxWN_ncDJEwWW",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 9 - Eyes Nose Mouth Ears Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/B2pmcJPQW3Q?si=ycr9TZzcHG2UAiga\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/B2pmcJPQW3Q?si=ycr9TZzcHG2UAiga",
      "order": 3
    },
    {
      "resourceType": "video",
      "title": "Unit 9 - Make a Face Animation",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/_QvqsubsAPI?si=9VWxwCq7z-FbErWD\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/_QvqsubsAPI?si=9VWxwCq7z-FbErWD",
      "order": 4
    },
    {
      "resourceType": "game",
      "title": "Unit 9 - My Face Game 1",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/4232fb7566f54ac486525e731f02f4ac?themeId=1&templateId=22&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/4232fb7566f54ac486525e731f02f4ac?themeId=1&templateId=22&fontStackId=0",
      "order": 5
    },
    {
      "resourceType": "game",
      "title": "Unit 9 - My Face Game 2",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/7ab75a0b89ac40718d8978cf71ef910b?themeId=23&templateId=5&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/7ab75a0b89ac40718d8978cf71ef910b?themeId=23&templateId=5&fontStackId=0",
      "order": 6
    }
  ],
  "10": [
    {
      "resourceType": "video",
      "title": "Unit 10 - Hair by Pancake Manor",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/z2ucP1_EmO0?si=9ILvDAnO-4yMbGvw\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/z2ucP1_EmO0?si=9ILvDAnO-4yMbGvw",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 10 - Funny Haircut",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/gEQOtbi7SbI?si=XsIxiKcJJefH0j34\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/gEQOtbi7SbI?si=XsIxiKcJJefH0j34",
      "order": 2
    },
    {
      "resourceType": "game",
      "title": "Unit 10 - My Crazy Hair Game 1",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/0cafad4a8bd34df08bc5c773341708c3?themeId=1&templateId=5&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/0cafad4a8bd34df08bc5c773341708c3?themeId=1&templateId=5&fontStackId=0",
      "order": 3
    },
    {
      "resourceType": "game",
      "title": "Unit 10 - My Crazy Hair Game 2",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/86601794244d4f05896b54f10ea16442?themeId=1&templateId=3&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/86601794244d4f05896b54f10ea16442?themeId=1&templateId=3&fontStackId=0",
      "order": 4
    },
    {
      "resourceType": "game",
      "title": "Unit 10 - My Crazy Hair Game 3",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/16380f32f8d4405baf763ba85cd19368?themeId=1&templateId=3&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/16380f32f8d4405baf763ba85cd19368?themeId=1&templateId=3&fontStackId=0",
      "order": 5
    }
  ],
  "11": [
    {
      "resourceType": "video",
      "title": "Unit 11 - Season Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/EHnO_LpfsIg?si=eTazcOSp-sIefUop\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/EHnO_LpfsIg?si=eTazcOSp-sIefUop",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 11 - Seasons Pete The Cat",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/7OUYAQttqdg?si=NoDvBrTmHrU82zUY\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/7OUYAQttqdg?si=NoDvBrTmHrU82zUY",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 11 - Four Seasons Tree Craft",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/hexM3GaE2J4?si=AujrKZZW6DGd2DnI\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/hexM3GaE2J4?si=AujrKZZW6DGd2DnI",
      "order": 3
    },
    {
      "resourceType": "video",
      "title": "Unit 11 - The Lazy Bear Story",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/sXcs_4ez8-M?si=d3kSuYaFzBJVvZta\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/sXcs_4ez8-M?si=d3kSuYaFzBJVvZta",
      "order": 4
    },
    {
      "resourceType": "video",
      "title": "Unit 11 - The Seasons Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/VS9qBeInJ0U?si=Akux-UwHGYa6jGy5\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/VS9qBeInJ0U?si=Akux-UwHGYa6jGy5",
      "order": 5
    },
    {
      "resourceType": "video",
      "title": "Unit 11 - Four Seasons StoryBots",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/NavWWM2iTEw?si=gOhtjzcuPz668IHa\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/NavWWM2iTEw?si=gOhtjzcuPz668IHa",
      "order": 6
    },
    {
      "resourceType": "video",
      "title": "Unit 11 - Seasons Word Songs",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Wrjqz2GTzzI?si=sNCFUIoBYYOabPHY\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/Wrjqz2GTzzI?si=sNCFUIoBYYOabPHY",
      "order": 7
    },
    {
      "resourceType": "video",
      "title": "Unit 11 - Four Seasons Dream English",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/TBLFMXU8FLI?si=0mIRqgAJHkFAwoVa\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/TBLFMXU8FLI?si=0mIRqgAJHkFAwoVa",
      "order": 8
    },
    {
      "resourceType": "video",
      "title": "Unit 11 - Seasonal Activities Quiz",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/MtA9Ni-wxUI?si=V1NkUc7Uq6yKjgvi\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/MtA9Ni-wxUI?si=V1NkUc7Uq6yKjgvi",
      "order": 9
    },
    {
      "resourceType": "game",
      "title": "Unit 11 - Seasons Game 1",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/7b81d9ee5f4f450fa1f807d3c0caf204?themeId=1&templateId=38&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/7b81d9ee5f4f450fa1f807d3c0caf204?themeId=1&templateId=38&fontStackId=0",
      "order": 10
    },
    {
      "resourceType": "game",
      "title": "Unit 11 - Seasons Game 2",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/c9bf24cc7b5a4ec888974e540da1a160?themeId=1&templateId=46&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/c9bf24cc7b5a4ec888974e540da1a160?themeId=1&templateId=46&fontStackId=0",
      "order": 11
    }
  ],
  "12": [
    {
      "resourceType": "video",
      "title": "Unit 12 - Rooms Of The House Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/168xwPpHF-s?si=thx8KCVtfHFs4fIZ\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/168xwPpHF-s?si=thx8KCVtfHFs4fIZ",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 12 - Rooms in the House Story",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/mV-TnrvUJ9Q?si=_1RwYaFCYbP1Yccb\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/mV-TnrvUJ9Q?si=_1RwYaFCYbP1Yccb",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 12 - Rooms of the House Game",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/kIg__488rCs?si=IIi8t6dHhBKJB8Dq\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/kIg__488rCs?si=IIi8t6dHhBKJB8Dq",
      "order": 3
    },
    {
      "resourceType": "game",
      "title": "Unit 12 - Rooms in the House Game 1",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/64037ab981484c46a7fdd820ecbe0ca1?themeId=1&templateId=38&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/64037ab981484c46a7fdd820ecbe0ca1?themeId=1&templateId=38&fontStackId=0",
      "order": 4
    },
    {
      "resourceType": "game",
      "title": "Unit 12 - Rooms in the House Game 2",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/f80c09de5f2a431ba2eadc93b12cac3c?themeId=1&templateId=22&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/f80c09de5f2a431ba2eadc93b12cac3c?themeId=1&templateId=22&fontStackId=0",
      "order": 5
    },
    {
      "resourceType": "game",
      "title": "Unit 12 - Rooms in the House Game 3",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/a2e9207ad2234b8d8ab2daf8c9e439c5?themeId=1&templateId=38&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/a2e9207ad2234b8d8ab2daf8c9e439c5?themeId=1&templateId=38&fontStackId=0",
      "order": 6
    },
    {
      "resourceType": "game",
      "title": "Unit 12 - Rooms in the House Game 4",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/62517d93002d490d8ede52bb5c748ebc?themeId=23&templateId=46&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/62517d93002d490d8ede52bb5c748ebc?themeId=23&templateId=46&fontStackId=0",
      "order": 7
    }
  ],
  "13": [
    {
      "resourceType": "video",
      "title": "Unit 13 - I Have A Pet Animal Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/pWepfJ-8XU0?si=Bde9_yPHL0p4y952\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/pWepfJ-8XU0?si=Bde9_yPHL0p4y952",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 13 - Pet Song for Kids",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/RAObh4cLDAI?si=XEc245fXNv7KFNX7\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/RAObh4cLDAI?si=XEc245fXNv7KFNX7",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 13 - At The Pet Store",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/6BK49n2UWA0?si=uXo2eGSZ7NT8k7T8\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/6BK49n2UWA0?si=uXo2eGSZ7NT8k7T8",
      "order": 3
    },
    {
      "resourceType": "video",
      "title": "Unit 13 - For the Birds",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/BT39vDpfI5s?si=ZswX9ZmvjCzzVw00\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/BT39vDpfI5s?si=ZswX9ZmvjCzzVw00",
      "order": 4
    },
    {
      "resourceType": "video",
      "title": "Unit 13 - Guess Pet Sounds",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/AkZrk8KL76c?si=y21Wih3Etqg2lVt_\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/AkZrk8KL76c?si=y21Wih3Etqg2lVt_",
      "order": 5
    },
    {
      "resourceType": "video",
      "title": "Unit 13 - Pets Hidden Pictures Game",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/hmVYCS_hJk0?si=djRUyreo7m9rRODx\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/hmVYCS_hJk0?si=djRUyreo7m9rRODx",
      "order": 6
    },
    {
      "resourceType": "game",
      "title": "Unit 13 - Pets Game 1",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/55c7caefb2fe48feb7798940327e0197?themeId=1&templateId=46&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/55c7caefb2fe48feb7798940327e0197?themeId=1&templateId=46&fontStackId=0",
      "order": 7
    },
    {
      "resourceType": "game",
      "title": "Unit 13 - Pets Game 2",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/ef14eb2bd2254ff8b01d8e376ff7165e?themeId=1&templateId=46&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/ef14eb2bd2254ff8b01d8e376ff7165e?themeId=1&templateId=46&fontStackId=0",
      "order": 8
    },
    {
      "resourceType": "game",
      "title": "Unit 13 - PBS Kids Design a Pet House",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://pbskids.org/arthur/games/animal-home-builder\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "PBS Kids",
      "sourceUrl": "https://pbskids.org/arthur/games/animal-home-builder",
      "order": 9
    }
  ],
  "14": [
    {
      "resourceType": "video",
      "title": "Unit 14 - On In Under By Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/DHb4-CCif7U?si=AE38i0me0bPmftZA\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/DHb4-CCif7U?si=AE38i0me0bPmftZA",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 14 - In Front Of, Behind, Between",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/xERTESWbqhU?si=BLasKYQEggRu8nb7\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/xERTESWbqhU?si=BLasKYQEggRu8nb7",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 14 - Where is the Ball",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/ftLIV92ovgk?si=JRdU59bWMrgeXudt\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/ftLIV92ovgk?si=JRdU59bWMrgeXudt",
      "order": 3
    },
    {
      "resourceType": "game",
      "title": "Unit 14 - Where is the Spider Game 1",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/e297e5091ade4d4fab9a92c15491343e?themeId=1&templateId=5&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/e297e5091ade4d4fab9a92c15491343e?themeId=1&templateId=5&fontStackId=0",
      "order": 4
    },
    {
      "resourceType": "game",
      "title": "Unit 14 - Where is the Spider Game 2",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/886c609003c149f1b21d1a89d83700c4?themeId=1&templateId=5&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/886c609003c149f1b21d1a89d83700c4?themeId=1&templateId=5&fontStackId=0",
      "order": 5
    }
  ],
  "15": [
    {
      "resourceType": "video",
      "title": "Unit 15 - Fruit Song for Kids",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/mfReSbQ7jzE?si=fPhoba2ZpENDJRGP\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/mfReSbQ7jzE?si=fPhoba2ZpENDJRGP",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 15 - Fruit Salad",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/q780dw-1QE8?si=dT_3hgy5BSjWGVyX\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/q780dw-1QE8?si=dT_3hgy5BSjWGVyX",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 15 - Apples are Yummy",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/oBF-_ZMkuH8?si=oToH0tA2-9oi4PpM\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/oBF-_ZMkuH8?si=oToH0tA2-9oi4PpM",
      "order": 3
    },
    {
      "resourceType": "video",
      "title": "Unit 15 - Fruit Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/QQZ03_v3K6Y?si=Ib98yH7bpFpYuJOM\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/QQZ03_v3K6Y?si=Ib98yH7bpFpYuJOM",
      "order": 4
    },
    {
      "resourceType": "video",
      "title": "Unit 15 - Fruit Guessing Game",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/mVE9pYdwX-I?si=ySYZmqRnuBIVekbp\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/mVE9pYdwX-I?si=ySYZmqRnuBIVekbp",
      "order": 5
    },
    {
      "resourceType": "video",
      "title": "Unit 15 - I Like Apples",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/wTTz2dL0jb8?si=4hKNHVY0MTdmes-l\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/wTTz2dL0jb8?si=4hKNHVY0MTdmes-l",
      "order": 6
    },
    {
      "resourceType": "game",
      "title": "Unit 15 - Fruit Game",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/bcf4964f6d694547a72d3909fd32d86c?themeId=1&templateId=46&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/bcf4964f6d694547a72d3909fd32d86c?themeId=1&templateId=46&fontStackId=0",
      "order": 7
    }
  ],
  "16": [
    {
      "resourceType": "video",
      "title": "Unit 16 - Vegetable Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/RE5tvaveVak?si=wY7QM0TuJxXvjKTm\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/RE5tvaveVak?si=wY7QM0TuJxXvjKTm",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 16 - Cooking Vegetables",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/cd8HE9HCl-c?si=Nlv4Oqfzv5_eEhfi\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/cd8HE9HCl-c?si=Nlv4Oqfzv5_eEhfi",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 16 - Vegetable Names Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/g2GjP8Heqjw?si=2nHJJaTESd0wOPKG\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/g2GjP8Heqjw?si=2nHJJaTESd0wOPKG",
      "order": 3
    },
    {
      "resourceType": "video",
      "title": "Unit 16 - Guess the Word Vegetables",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/pdIZH2Zk_G0?si=pa6mntZr1xX0G3rg\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/pdIZH2Zk_G0?si=pa6mntZr1xX0G3rg",
      "order": 4
    },
    {
      "resourceType": "video",
      "title": "Unit 16 - Vegetable Guessing Game",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/98dEG7WjF1M?si=ega62rKVe-7R4qVZ\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/98dEG7WjF1M?si=ega62rKVe-7R4qVZ",
      "order": 5
    },
    {
      "resourceType": "game",
      "title": "Unit 16 - Vegetables Game 1",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/4dd9de248dbb4b1e930c461ee3f5a6a5?themeId=1&templateId=46&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/4dd9de248dbb4b1e930c461ee3f5a6a5?themeId=1&templateId=46&fontStackId=0",
      "order": 6
    },
    {
      "resourceType": "game",
      "title": "Unit 16 - Vegetables Game 2",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/295589dd42e442228956c9fa7365aa96?themeId=1&templateId=46&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/295589dd42e442228956c9fa7365aa96?themeId=1&templateId=46&fontStackId=0",
      "order": 7
    }
  ],
  "17": [
    {
      "resourceType": "video",
      "title": "Unit 17 - How's the Weather Simple Skits",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/O2NwvUB41rA?si=JySJcCT_p8wOTCYj\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/O2NwvUB41rA?si=JySJcCT_p8wOTCYj",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 17 - How's the Weather Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/I8GeA3anPdo?si=R4f9ElREGe8Xn4qr\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/I8GeA3anPdo?si=R4f9ElREGe8Xn4qr",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 17 - How's the Weather Skit",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/gpBuaU5OPi8?si=YUXSCnQaN6RLzgcq\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/gpBuaU5OPi8?si=YUXSCnQaN6RLzgcq",
      "order": 3
    },
    {
      "resourceType": "video",
      "title": "Unit 17 - Magic Weather for Kids",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/pd5kLz3jc4o?si=gj5ZvP1kV4kccER7\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/pd5kLz3jc4o?si=gj5ZvP1kV4kccER7",
      "order": 4
    },
    {
      "resourceType": "video",
      "title": "Unit 17 - Rain Rain Go Away 1",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/c3v0rJqyCTM?si=07UxhHal_yXyjek-\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/c3v0rJqyCTM?si=07UxhHal_yXyjek-",
      "order": 5
    },
    {
      "resourceType": "video",
      "title": "Unit 17 - Rain, Rain, Go Away 2",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/KAYZo8a8AHg?si=y1zpsiK8UcMZB4Lh\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/KAYZo8a8AHg?si=y1zpsiK8UcMZB4Lh",
      "order": 6
    },
    {
      "resourceType": "video",
      "title": "Unit 17 - Rain Rain Go Away 3",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/LFrKYjrIDs8?si=_-cNQWIWorqrC4XU\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/LFrKYjrIDs8?si=_-cNQWIWorqrC4XU",
      "order": 7
    },
    {
      "resourceType": "video",
      "title": "Unit 17 - Partly Cloudy",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/PfyJQEIsMt0?si=ppJFnPDjRoAaVOA_\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/PfyJQEIsMt0?si=ppJFnPDjRoAaVOA_",
      "order": 8
    },
    {
      "resourceType": "game",
      "title": "Unit 17 - Weather Game 1",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/0d86e97d1d264023b65d07f200681c1b?themeId=1&templateId=38&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/0d86e97d1d264023b65d07f200681c1b?themeId=1&templateId=38&fontStackId=0",
      "order": 9
    },
    {
      "resourceType": "game",
      "title": "Unit 17 - Weather Game 2",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/17f93ebd3a064bdbb6091669ff5f7318?themeId=1&templateId=38&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/17f93ebd3a064bdbb6091669ff5f7318?themeId=1&templateId=38&fontStackId=0",
      "order": 10
    },
    {
      "resourceType": "game",
      "title": "Unit 17 - Weather Game 3",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/89a170a27647484d8c98c94a5f04f9e7?themeId=1&templateId=46&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/89a170a27647484d8c98c94a5f04f9e7?themeId=1&templateId=46&fontStackId=0",
      "order": 11
    },
    {
      "resourceType": "game",
      "title": "Unit 17 - Seasonal Shuffle",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://www.abcya.com/games/seasonal_shuffle\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "ABCya",
      "sourceUrl": "https://www.abcya.com/games/seasonal_shuffle",
      "order": 12
    }
  ],
  "18": [
    {
      "resourceType": "video",
      "title": "Unit 18 - Yes, I Can!",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/_Ir0Mc6Qilo?si=yZbOkz3BttYRJpW3\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/_Ir0Mc6Qilo?si=yZbOkz3BttYRJpW3",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 18 - I Can Dream Fly Swim Jump",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/opyc2bvtBpo?si=xamI9uQjs__zjY9r\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/opyc2bvtBpo?si=xamI9uQjs__zjY9r",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 18 - What Can You Do",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/qI7nYvVXudo?si=gwb6myCqDcEnnVxp\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/qI7nYvVXudo?si=gwb6myCqDcEnnVxp",
      "order": 3
    },
    {
      "resourceType": "video",
      "title": "Unit 18 - Can Can't Simple Skits",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/hA3ClzoslBo?si=sZCd8KQjwMdLOsiH\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/hA3ClzoslBo?si=sZCd8KQjwMdLOsiH",
      "order": 4
    },
    {
      "resourceType": "video",
      "title": "Unit 18 - What Can You Do Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/radrRGGe-J0?si=CO0bXstO0-wqYbfA\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/radrRGGe-J0?si=CO0bXstO0-wqYbfA",
      "order": 5
    },
    {
      "resourceType": "video",
      "title": "Unit 18 - I Can Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/hft6uJQIF4g?si=YNeeUx4o98FdScCM\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/hft6uJQIF4g?si=YNeeUx4o98FdScCM",
      "order": 6
    },
    {
      "resourceType": "video",
      "title": "Unit 18 - Animals Song Fish Can Swim Birds Can Fly",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/e6J63bCyuwU?si=5gjTFw10ZDc70ZnW\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/e6J63bCyuwU?si=5gjTFw10ZDc70ZnW",
      "order": 7
    },
    {
      "resourceType": "game",
      "title": "Unit 18 - What Can You Do Game 1",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/e4a93912a9784dc6b9171a1c54272864?themeId=1&templateId=5&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/e4a93912a9784dc6b9171a1c54272864?themeId=1&templateId=5&fontStackId=0",
      "order": 8
    },
    {
      "resourceType": "game",
      "title": "Unit 18 - What Can You Do Game 2",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/b712584d5def413aa86cbdcfa8c222dd?themeId=1&templateId=3&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/b712584d5def413aa86cbdcfa8c222dd?themeId=1&templateId=3&fontStackId=0",
      "order": 9
    }
  ],
  "2": [
    {
      "resourceType": "video",
      "title": "Unit 2 - School Objects Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/41cJ0mqWses?si=JlxMgV_GADKfiUFf\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/41cJ0mqWses?si=JlxMgV_GADKfiUFf",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 2 - School Objects Lesson",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Ix4dSjKqwvc?si=eK9P-OvHUpAP2T49\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/Ix4dSjKqwvc?si=eK9P-OvHUpAP2T49",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 2 - What Is It?",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Ct6BUPvE2sM?si=-OWJf3xPmmeHVw_b\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/Ct6BUPvE2sM?si=-OWJf3xPmmeHVw_b",
      "order": 3
    },
    {
      "resourceType": "video",
      "title": "Unit 2 - School Supplies Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/t24dt39WNG0?si=DkWmQWqsVIBtV_sQ\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/t24dt39WNG0?si=DkWmQWqsVIBtV_sQ",
      "order": 4
    },
    {
      "resourceType": "video",
      "title": "Unit 2 - Classroom Objects",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/F9OdB53UGmA?si=dli3ESO3Q-28sZ3q\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/F9OdB53UGmA?si=dli3ESO3Q-28sZ3q",
      "order": 5
    },
    {
      "resourceType": "video",
      "title": "Unit 2 - School Supplies Vocabulary",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/JLMsm-D7kjk?si=hbbam_l55tiPpX5F\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/JLMsm-D7kjk?si=hbbam_l55tiPpX5F",
      "order": 6
    },
    {
      "resourceType": "game",
      "title": "Unit 2 - School Objects Game",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/db3feb02d90048c794504e2a408ef901?themeId=1&templateId=46&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/db3feb02d90048c794504e2a408ef901?themeId=1&templateId=46&fontStackId=0",
      "order": 7
    },
    {
      "resourceType": "game",
      "title": "Unit 2 - School Items Matching",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/5282ddaa503a4c5e9875ee2426934081?themeId=1&templateId=46&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/5282ddaa503a4c5e9875ee2426934081?themeId=1&templateId=46&fontStackId=0",
      "order": 8
    },
    {
      "resourceType": "game",
      "title": "Unit 2 - Vocabulary Practice",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/8fc8c7bbdc504ca0bb4eac9cdaa9c21f?themeId=1&templateId=3&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/8fc8c7bbdc504ca0bb4eac9cdaa9c21f?themeId=1&templateId=3&fontStackId=0",
      "order": 9
    }
  ],
  "3": [
    {
      "resourceType": "video",
      "title": "Unit 3 - Stand Up Sit Down",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/WsiRSWthV1k?si=5qhIghLOyTJLoACs\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/WsiRSWthV1k?si=5qhIghLOyTJLoACs",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 3 - Classroom Rules",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/E_VcSQn73do?si=rqxV1ItW15Gp0biP\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/E_VcSQn73do?si=rqxV1ItW15Gp0biP",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 3 - Classroom Instructions",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/RNUZBHlRH4Y?si=Q5ovKH7UTWy0eTXk\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/RNUZBHlRH4Y?si=Q5ovKH7UTWy0eTXk",
      "order": 3
    },
    {
      "resourceType": "video",
      "title": "Unit 3 - Classroom Language",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/SFE0mMWbA-Y?si=DMWEOIFgkgokf4Bf\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/SFE0mMWbA-Y?si=DMWEOIFgkgokf4Bf",
      "order": 4
    },
    {
      "resourceType": "game",
      "title": "Unit 3 - Classroom Commands",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/94341df31881431a8e6bb5e707557a42?themeId=1&templateId=3&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/94341df31881431a8e6bb5e707557a42?themeId=1&templateId=3&fontStackId=0",
      "order": 5
    },
    {
      "resourceType": "game",
      "title": "Unit 3 - Classroom Rules",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/0ed4ebc039d54a74b1f5d0e7d4b61e2c?themeId=1&templateId=5&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/0ed4ebc039d54a74b1f5d0e7d4b61e2c?themeId=1&templateId=5&fontStackId=0",
      "order": 6
    }
  ],
  "4": [
    {
      "resourceType": "video",
      "title": "Unit 4 - How Are You Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/l4WNrvVjiTw?si=Y5sE2XPbmYC-5jPe\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/l4WNrvVjiTw?si=Y5sE2XPbmYC-5jPe",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 4 - Happy, Sad, Hot, Cold",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/USEUjsQgTNc?si=BVtqA0mNZLtmmLUh\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/USEUjsQgTNc?si=BVtqA0mNZLtmmLUh",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 4 - Feelings and Emotions",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/pXHfyD9CvHw?si=vihXIGWGTxQ8vxZv\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/pXHfyD9CvHw?si=vihXIGWGTxQ8vxZv",
      "order": 3
    },
    {
      "resourceType": "video",
      "title": "Unit 4 - Emotions Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/dR9p73LpVnM?si=S4HN1xgCiDw_zcnO\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/dR9p73LpVnM?si=S4HN1xgCiDw_zcnO",
      "order": 4
    },
    {
      "resourceType": "video",
      "title": "Unit 4 - If You're Happy",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/l4WNrvVjiTw?si=Y5sE2XPbmYC-5jPe\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/l4WNrvVjiTw?si=Y5sE2XPbmYC-5jPe",
      "order": 5
    },
    {
      "resourceType": "game",
      "title": "Unit 4 - Feelings Game",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/33c70a4f2c9c4a1cbe7da60de7c58ea1?themeId=1&templateId=3&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/33c70a4f2c9c4a1cbe7da60de7c58ea1?themeId=1&templateId=3&fontStackId=0",
      "order": 6
    },
    {
      "resourceType": "game",
      "title": "Unit 4 - Emotions Matching",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/b9fbf8c22482493cb2ba02e36c14b81c?themeId=1&templateId=5&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/b9fbf8c22482493cb2ba02e36c14b81c?themeId=1&templateId=5&fontStackId=0",
      "order": 7
    }
  ],
  "5": [
    {
      "resourceType": "video",
      "title": "Unit 5 - Family Song",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/FHaObkHEkHQ?si=mIo-8T6MUOe7aJCK\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/FHaObkHEkHQ?si=mIo-8T6MUOe7aJCK",
      "order": 1
    },
    {
      "resourceType": "video",
      "title": "Unit 5 - The Finger Family",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/VvrG4JguNQk?si=MghyBpQyLCnOTu_H\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/VvrG4JguNQk?si=MghyBpQyLCnOTu_H",
      "order": 2
    },
    {
      "resourceType": "video",
      "title": "Unit 5 - Baby Shark Family",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/XqZsoesa55w?si=QTyqs9ClhhT3iApt\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/XqZsoesa55w?si=QTyqs9ClhhT3iApt",
      "order": 3
    },
    {
      "resourceType": "video",
      "title": "Unit 5 - Family Vocabulary",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/GR2o6k8aPlI?si=tcGAuyQKEkEVZdJr\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/GR2o6k8aPlI?si=tcGAuyQKEkEVZdJr",
      "order": 4
    },
    {
      "resourceType": "video",
      "title": "Unit 5 - Meet My Family",
      "embedCode": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/d_WQEw13TCo?si=caFvmudI0NPkvY-_\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>",
      "provider": "YouTube",
      "sourceUrl": "https://www.youtube.com/embed/d_WQEw13TCo?si=caFvmudI0NPkvY-_",
      "order": 5
    },
    {
      "resourceType": "game",
      "title": "Unit 5 - Family Members",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/e5f62afa86814cc98336327469ce1554?themeId=1&templateId=38&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/e5f62afa86814cc98336327469ce1554?themeId=1&templateId=38&fontStackId=0",
      "order": 6
    },
    {
      "resourceType": "game",
      "title": "Unit 5 - Family Matching",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/d1bc1e8629a445468a696f03f372e5e9?themeId=1&templateId=38&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/d1bc1e8629a445468a696f03f372e5e9?themeId=1&templateId=38&fontStackId=0",
      "order": 7
    },
    {
      "resourceType": "game",
      "title": "Unit 5 - Family Quiz",
      "embedCode": "<iframe style=\"width: 100%; height: 500px\" src=\"https://wordwall.net/embed/1c606c6af00643d692fc0199a60c2b2c?themeId=1&templateId=3&fontStackId=0\" frameborder=\"0\" allowfullscreen></iframe>",
      "provider": "Wordwall",
      "sourceUrl": "https://wordwall.net/embed/1c606c6af00643d692fc0199a60c2b2c?themeId=1&templateId=3&fontStackId=0",
      "order": 8
    }
  ]
};

async function updateTeacherResources() {
  // Function to add a resource to the database
  async function addResource(bookId, unitId, resource) {
    try {
      // Check if resource already exists to avoid duplicates
      const checkQuery = `
        SELECT id FROM teacher_resources 
        WHERE book_id = $1 AND unit_id = $2 AND resource_type = $3 AND embed_code = $4
      `;
      const checkResult = await pool.query(checkQuery, [bookId, unitId, resource.resourceType, resource.embedCode]);
      
      if (checkResult.rows.length === 0) {
        // Resource doesn't exist, insert it
        const insertQuery = `
          INSERT INTO teacher_resources 
          (book_id, unit_id, title, resource_type, embed_code, provider, source_url, "order") 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING id
        `;
        const values = [
          bookId, 
          unitId, 
          resource.title, 
          resource.resourceType,
          resource.embedCode,
          resource.provider,
          resource.sourceUrl,
          resource.order
        ];
        
        const result = await pool.query(insertQuery, values);
        console.log(`Added resource: ${resource.title} to Book ${bookId}, Unit ${unitId}`);
        return result.rows[0].id;
      } else {
        console.log(`Resource already exists: ${resource.title} in Book ${bookId}, Unit ${unitId}`);
        return checkResult.rows[0].id;
      }
    } catch (error) {
      console.error(`Error adding resource ${resource.title}:`, error);
      return null;
    }
  }

  // Process each unit's resources
  const bookId = "1"; // All resources are for Book 1
  
  for (const [unitId, unitResources] of Object.entries(resources)) {
    console.log(`Processing resources for Book ${bookId}, Unit ${unitId}...`);
    
    for (const resource of unitResources) {
      await addResource(bookId, unitId, resource);
    }
  }
  
  console.log("Finished updating teacher resources");
}

// This code is exported as a module that can be imported and run programmatically
export async function runTeacherResourcesUpdate() {
  try {
    await updateTeacherResources();
    console.log("Teacher resources updated successfully");
  } catch (err) {
    console.error("Error updating teacher resources:", err);
  } finally {
    // Close the database connection when done
    await pool.end();
  }
}

// Run the update function directly if this file is executed directly
// Using the node --experimental-json-modules flag
if (process.argv[1].includes('update_teacher_resources.js')) {
  runTeacherResourcesUpdate();
}