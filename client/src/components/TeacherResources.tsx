import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { getQueryFn, apiRequest, queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Video, FileText, Pencil, Trash2, Plus, ExternalLink, Book, Printer } from 'lucide-react';
import LessonPlanTemplate, { LessonPlan } from '@/components/LessonPlanTemplate';

export interface TeacherResource {
  id?: string;
  bookId: string;
  unitId: string;
  title: string;
  resourceType: 'video' | 'game' | 'lesson' | 'pdf' | 'other';
  provider?: string;
  sourceUrl?: string;
  embedCode?: string;
  fileUrl?: string;
}

interface TeacherResourcesProps {
  bookId: string;
  unitId: string;
}

const TeacherResources = ({ bookId, unitId }: TeacherResourcesProps) => {
  const { toast } = useToast();
  const urlParams = new URLSearchParams(window.location.search);
  const isEditMode = urlParams.get('edit') === 'true';
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingResource, setEditingResource] = useState<TeacherResource | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<TeacherResource | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [newResource, setNewResource] = useState<TeacherResource>({
    bookId,
    unitId,
    title: '',
    resourceType: 'video',
    provider: '',
    sourceUrl: '',
    embedCode: '',
  });

  // Fetch teacher resources
  const { data, isLoading, refetch } = useQuery<TeacherResource[]>({
    queryKey: [`/api/direct/${bookId}/${unitId}/resources`],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  // Resources for various book units
  const getBookUnitResources = (bookId: string, unitId: string): TeacherResource[] => {
    // Resources for Book 7, Unit 1 - Film genres
    if (bookId === '7' && unitId === '1') {
      return [
        {
          id: "book7-unit1-video1",
          bookId,
          unitId,
          title: "Movie Genres Vocabulary Epic ESL Guessing Game",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/watch?v=FTuQIwl7j3k",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/FTuQIwl7j3k?si=wh3So_Qj8Hqk6TL3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit1-video2",
          bookId,
          unitId,
          title: "Guess the soundtrack of the films",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://youtu.be/p57KyLojoHU?si=ydbr2xbJxAgeN7_u",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/p57KyLojoHU?si=g_6AyW2jlsRI9DgC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit1-video3",
          bookId,
          unitId,
          title: "Guess the Film Genre",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/watch?v=Bp07u0YrH4Y",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Bp07u0YrH4Y?si=ufzMpcalPer6eRCn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit1-game1",
          bookId,
          unitId,
          title: "Film Genres Game 1",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/dcc6034981ea455d9bfa88f6740c720f",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/dcc6034981ea455d9bfa88f6740c720f?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit1-game2",
          bookId,
          unitId,
          title: "Film Genres Game 2",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/1e211e293d514f56b1786cfbf6ed146b",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1e211e293d514f56b1786cfbf6ed146b?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit1-game3",
          bookId,
          unitId,
          title: "Film Genres Game 3",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/de72c3ff49e54609b845500c1bf34432",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/de72c3ff49e54609b845500c1bf34432?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit1-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 1 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit1/00%20A%20Book%207%20%E2%80%93%20Unit%201.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit1-pdf2",
          bookId,
          unitId,
          title: "Links to Online Games and Films",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://67bd8e1e-e6a8-419f-b59e-299052eae36a-00-1j78vcuapq5ig.spock.replit.dev/book7/unit1/22%20D%20Links%20to%20Online%20Games%20and%20Films.pdf",
          embedCode: ""
        }
      ];
    }

    // Resources for Book 7, Unit 2 - Piercings & Tattoos
    if (bookId === '7' && unitId === '2') {
      return [
        {
          id: "book7-unit2-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 2 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit2/00%20A%20Book%207%20%E2%80%93%20Unit%202.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit2-video1",
          bookId,
          unitId,
          title: "Short Movie on Afro Hair",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/watch?v=kNw8V_Fkw28",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/kNw8V_Fkw28?si=9Zl2x1mjJ3wRpYZ8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit2-resource1",
          bookId,
          unitId,
          title: "Tattoos & Piercings - Worksheet Online",
          resourceType: "lesson" as const,
          provider: "British Council",
          sourceUrl: "https://learnenglishteens.britishcouncil.org/study-break/youtubers/tattoos-piercings",
          embedCode: ""
        },
        {
          id: "book7-unit2-game1",
          bookId,
          unitId,
          title: "Piercings & Tattoos Game 1",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/d05c71b310af42f59922123edb75c96e",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/d05c71b310af42f59922123edb75c96e?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit2-game2",
          bookId,
          unitId,
          title: "Piercings & Tattoos Game 2",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/0cd285bfcf87423e9d5a7ed1a3935d22",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/0cd285bfcf87423e9d5a7ed1a3935d22?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
    }

    // Resources for Book 7, Unit 3 - Crime
    if (bookId === '7' && unitId === '3') {
      return [
        {
          id: "book7-unit3-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 3 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit3/00%20A%20Book%207%20%E2%80%93%20Unit%203.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit3-video1",
          bookId,
          unitId,
          title: "Where do you see robbers - in shops - banks",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://youtu.be/uikPlL-AOzw?si=nlokxIhxX173GPzk",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/uikPlL-AOzw?si=nlokxIhxX173GPzk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit3-video2",
          bookId,
          unitId,
          title: "What crime are they commiting - smuggling",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://youtu.be/0FRKITalAz4?si=U7S67_uDmlD6PBwW",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/0FRKITalAz4?si=Kkb15NP2MqOUjvvS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit3-game1",
          bookId,
          unitId,
          title: "Crime Vocabulary Game 1",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/ecc57a3b73f14f5faf7d6c0ae1d3beba",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ecc57a3b73f14f5faf7d6c0ae1d3beba?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit3-game2",
          bookId,
          unitId,
          title: "Crime Vocabulary Game 2",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/8f09e7c155fb4932aed9903332ca20cf",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/8f09e7c155fb4932aed9903332ca20cf?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
    }

    // Resources for Book 7, Unit 4
    if (bookId === '7' && unitId === '4') {
      return [
        {
          id: "book7-unit4-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 4 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit4/00%20A%20Book%207%20%E2%80%93%20Unit%204.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit4-game1",
          bookId,
          unitId,
          title: "Vocabulary Game 1",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/ead2718ebb544050a5077cc541d2e2a2",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ead2718ebb544050a5077cc541d2e2a2?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit4-game2",
          bookId,
          unitId,
          title: "Vocabulary Game 2",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/8a41f00f851f4c63b560c5a8e3b0622c",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/8a41f00f851f4c63b560c5a8e3b0622c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit4-game3",
          bookId,
          unitId,
          title: "Vocabulary Game 3",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/4d43ce661a25430eb84b3fe4e94a20ab",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4d43ce661a25430eb84b3fe4e94a20ab?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
    }

    // Resources for Book 7, Unit 5 - School
    if (bookId === '7' && unitId === '5') {
      return [
        {
          id: "book7-unit5-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 5 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit5/00%20A%20Book%207%20%E2%80%93%20Unit%205.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit5-video1",
          bookId,
          unitId,
          title: "Schools in the UK/USA 1",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/embed/fAAFO44pJlU",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/fAAFO44pJlU?si=SOgbD4Upe_Tj_SQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit5-video2",
          bookId,
          unitId,
          title: "Schools in the UK/USA 2",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/embed/-_nbbEahq8k",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/-_nbbEahq8k?si=u_MW45TfECHX7tyo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit5-video3",
          bookId,
          unitId,
          title: "After School Clubs",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/embed/l1xgc0aTnLU",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/l1xgc0aTnLU?si=yVTDuxfnuhbh_heW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit5-video4",
          bookId,
          unitId,
          title: "School Rules in Japan",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/embed/7D1hebI6QdI",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/7D1hebI6QdI?si=dkyk-1SxRwDunjjt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit5-video5",
          bookId,
          unitId,
          title: "School Rules",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/embed/Z3y_RrLdYtE",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Z3y_RrLdYtE?si=AVmtcXIwd4uBFpqk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit5-game1",
          bookId,
          unitId,
          title: "After School Clubs Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/4d43ce661a25430eb84b3fe4e94a20ab",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4d43ce661a25430eb84b3fe4e94a20ab?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit5-game2",
          bookId,
          unitId,
          title: "Places in School Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/f72c3b6631a649f0b68952153fbc6441",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f72c3b6631a649f0b68952153fbc6441?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit5-game3",
          bookId,
          unitId,
          title: "School Subjects Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/c19107c08fe04affb6610d874284df4a",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c19107c08fe04affb6610d874284df4a?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
    }

    // Resources for Book 7, Unit 6 - Money
    if (bookId === '7' && unitId === '6') {
      return [
        {
          id: "book7-unit6-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 6 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit6/00%20A%20Book%207%20%E2%80%93%20Unit%206.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit6-video1",
          bookId,
          unitId,
          title: "Learn English Money from 1p to 50 Pounds",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/embed/Vcoi6l0D6ak",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Vcoi6l0D6ak?si=cYTh99UmUthwy1yO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit6-lesson1",
          bookId,
          unitId,
          title: "British Currency Worksheet to Print",
          resourceType: "lesson" as const,
          provider: "ISL Collective",
          sourceUrl: "https://en.islcollective.com/english-esl-worksheets/general-topic/countries/british-currency/18577",
          embedCode: ""
        },
        {
          id: "book7-unit6-game1",
          bookId,
          unitId,
          title: "Money Kahoot Game",
          resourceType: "game" as const,
          provider: "Kahoot",
          sourceUrl: "https://create.kahoot.it/share/currency/f87e8719-291e-440a-a340-22344175fedb",
          embedCode: ""
        },
        {
          id: "book7-unit6-game2",
          bookId,
          unitId,
          title: "Money Wordwall Game 1",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/463ad4520fbb4edd9ea903446f182971",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/463ad4520fbb4edd9ea903446f182971?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit6-game3",
          bookId,
          unitId,
          title: "Money Wordwall Game 2",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/2108e23e264b487b9f5c8022145d22d8",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2108e23e264b487b9f5c8022145d22d8?themeId=41&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
    }

    // Resources for Book 7, Unit 7
    if (bookId === '7' && unitId === '7') {
      return [
        {
          id: "book7-unit7-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 7 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit7/00%20A%20Book%207%20%E2%80%93%20Unit%207.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit7-game1",
          bookId,
          unitId,
          title: "Wordwall Game 1",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/f371ca1c30ca40a8a9b0428f9c00c31f",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f371ca1c30ca40a8a9b0428f9c00c31f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit7-game2",
          bookId,
          unitId,
          title: "Wordwall Game 2",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/46e5304dce5040f5bca2005877e48058",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/46e5304dce5040f5bca2005877e48058?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
    }

    // Resources for Book 7, Unit 8 - Musical Instruments
    if (bookId === '7' && unitId === '8') {
      return [
        {
          id: "book7-unit8-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 8 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit8/00%20A%20Book%207%20%E2%80%93%20Unit%208.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit8-video1",
          bookId,
          unitId,
          title: "Musical Instruments Quiz",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/embed/WV63aVMnyMA",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/WV63aVMnyMA?si=iicLZ4_-HXXjnJiF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit8-video2",
          bookId,
          unitId,
          title: "Guess the Sound - Musical Instruments Quiz",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/embed/tb0gHAzpQPE",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/tb0gHAzpQPE?si=01WXGLlOnyEFfrXy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit8-game1",
          bookId,
          unitId,
          title: "Kahoot - Musical Instruments",
          resourceType: "game" as const,
          provider: "Kahoot",
          sourceUrl: "https://create.kahoot.it/share/music-instruments/60a322c4-b3a8-4c2d-9078-e877ca66ac23",
          embedCode: ""
        },
        {
          id: "book7-unit8-game2",
          bookId,
          unitId,
          title: "Places of Entertainment",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/9e1962f07e5b4f6ab60abe28003ad348",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/9e1962f07e5b4f6ab60abe28003ad348?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit8-game3",
          bookId,
          unitId,
          title: "Music Instruments",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/a399888cbe8943ec97dabfb51b788af5",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/a399888cbe8943ec97dabfb51b788af5?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit8-game4",
          bookId,
          unitId,
          title: "Artists and Musicians",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/4e38eb1bea364cef87a813ce0c7d0482",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/4e38eb1bea364cef87a813ce0c7d0482?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit8-game5",
          bookId,
          unitId,
          title: "Types of Books",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/77bf2cabcab44344a2080c033914d8be",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/77bf2cabcab44344a2080c033914d8be?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
    }

    // Resources for Book 7, Unit 9 - Jobs
    if (bookId === '7' && unitId === '9') {
      return [
        {
          id: "book7-unit9-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 9 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit9/00%20A%20Book%207%20%E2%80%93%20Unit%209.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit9-game1",
          bookId,
          unitId,
          title: "Types of Jobs Game 1",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/51d5ddacedd84b80a1a641af60f9abb3",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/51d5ddacedd84b80a1a641af60f9abb3?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit9-game2",
          bookId,
          unitId,
          title: "Types of Jobs Game 2",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/0100b9837b4f46c0b56a01caab8e459a",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/0100b9837b4f46c0b56a01caab8e459a?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit9-game3",
          bookId,
          unitId,
          title: "Jobs Kahoot",
          resourceType: "game" as const,
          provider: "Kahoot",
          sourceUrl: "https://create.kahoot.it/share/visual-7-unit-9-jobs/07fa5381-b0a3-4da8-996f-e34a9232145b",
          embedCode: ""
        },
        {
          id: "book7-unit9-video1",
          bookId,
          unitId,
          title: "What Do You Want To Be?",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/embed/nfzYoNTcAn8",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nfzYoNTcAn8?si=ePvFy6TfZVtNh1gZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        }
      ];
    }

    // Resources for Book 7, Unit 10 - Sports
    if (bookId === '7' && unitId === '10') {
      return [
        {
          id: "book7-unit10-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 10 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit10/00%20A%20Book%207%20%E2%80%93%20Unit%2010.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit10-game1",
          bookId,
          unitId,
          title: "Go-Play-Do Sports Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/29a03787b421456f827094e6b08363cc",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/29a03787b421456f827094e6b08363cc?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit10-game2",
          bookId,
          unitId,
          title: "Sports Places Game 1",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/48a835075ae5459eb3dbb23e211f7019",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/48a835075ae5459eb3dbb23e211f7019?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit10-game3",
          bookId,
          unitId,
          title: "Sports Equipment Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/2f85e31cefed4733a458f93e9c7352fb",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/2f85e31cefed4733a458f93e9c7352fb?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit10-game4",
          bookId,
          unitId,
          title: "Sports Places Game 2",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/29de738cb6964006b5a15c86def52c2b",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/29de738cb6964006b5a15c86def52c2b?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit10-game5",
          bookId,
          unitId,
          title: "Sports Places and Equipment Kahoot",
          resourceType: "game" as const,
          provider: "Kahoot",
          sourceUrl: "https://create.kahoot.it/share/sport-places-and-equipment/b2205677-5c0b-43af-aacd-28af5751763e",
          embedCode: ""
        }
      ];
    }

    // Resources for Book 7, Unit 11 - Natural Disasters
    if (bookId === '7' && unitId === '11') {
      return [
        {
          id: "book7-unit11-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 11 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit11/00%20A%20Book%207%20%E2%80%93%20Unit%2011.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit11-game1",
          bookId,
          unitId,
          title: "Natural Disaster Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/e2fdc9e3360e49aaa27816818a1179d6",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/e2fdc9e3360e49aaa27816818a1179d6?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit11-game2",
          bookId,
          unitId,
          title: "Natural Disasters Kahoot",
          resourceType: "game" as const,
          provider: "Kahoot",
          sourceUrl: "https://create.kahoot.it/share/visual-english-7-unit-11-natural-disasters/49b6cfd8-e8b3-479c-bda3-e2192412a301",
          embedCode: ""
        }
      ];
    }

    // Resources for Book 7, Unit 12 - Healthy Lifestyle
    if (bookId === '7' && unitId === '12') {
      return [
        {
          id: "book7-unit12-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 12 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit12/00%20A%20Book%207.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit12-game1",
          bookId,
          unitId,
          title: "Should - Shouldn't Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/37bd90b81ab549adab6f3d3c074889ed",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/37bd90b81ab549adab6f3d3c074889ed?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit12-game2",
          bookId,
          unitId,
          title: "Healthy - Unhealthy Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/ee74009d2b384b808714e36062a0801a",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ee74009d2b384b808714e36062a0801a?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
    }

    // Resources for Book 7, Unit 13 - Shops
    if (bookId === '7' && unitId === '13') {
      return [
        {
          id: "book7-unit13-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 13 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit13/00%20A%20Book%207%20%E2%80%93%20Unit%2013.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit13-game1",
          bookId,
          unitId,
          title: "Shops Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/411d9dcb9eb041b8b1be990c120d6931",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/411d9dcb9eb041b8b1be990c120d6931?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit13-game2",
          bookId,
          unitId,
          title: "Places in the City Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/1b0157e89e6442009e1385bda1661fbf",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1b0157e89e6442009e1385bda1661fbf?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
    }

    // Resources for Book 7, Unit 14 - Celebrations
    if (bookId === '7' && unitId === '14') {
      return [
        {
          id: "book7-unit14-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 14 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit14/00%20A%20Book%207.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit14-game1",
          bookId,
          unitId,
          title: "Months of the Year Game 1",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/1c0632327e4d4c33abf969014a371645",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1c0632327e4d4c33abf969014a371645?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit14-game2",
          bookId,
          unitId,
          title: "Months of the Year Game 2",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/c52506eabcd4406cbd3681a0d184060e",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c52506eabcd4406cbd3681a0d184060e?themeId=1&templateId=50&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit14-game3",
          bookId,
          unitId,
          title: "World Celebrations Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/143919e90a414397ba99e8744fcbf7a3",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/143919e90a414397ba99e8744fcbf7a3?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit14-game4",
          bookId,
          unitId,
          title: "Family Celebrations Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/ab22249eb83043d8940f69a78058f725",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ab22249eb83043d8940f69a78058f725?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
    }

    // Resources for Book 7, Unit 15 - Celebrations (Same as Unit 14)
    if (bookId === '7' && unitId === '15') {
      return [
        {
          id: "book7-unit15-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 15 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit15/00%20A%20Book%207.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit15-game1",
          bookId,
          unitId,
          title: "Months of the Year Game 1",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/1c0632327e4d4c33abf969014a371645",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1c0632327e4d4c33abf969014a371645?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit15-game2",
          bookId,
          unitId,
          title: "Months of the Year Game 2",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/c52506eabcd4406cbd3681a0d184060e",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/c52506eabcd4406cbd3681a0d184060e?themeId=1&templateId=50&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit15-game3",
          bookId,
          unitId,
          title: "World Celebrations Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/143919e90a414397ba99e8744fcbf7a3",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/143919e90a414397ba99e8744fcbf7a3?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit15-game4",
          bookId,
          unitId,
          title: "Family Celebrations Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/ab22249eb83043d8940f69a78058f725",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ab22249eb83043d8940f69a78058f725?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
    }
    
    // Resources for Book 7, Unit 16 - Food Tastes
    if (bookId === '7' && unitId === '16') {
      return [
        {
          id: "book7-unit16-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 16 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit16/00%20A%20Book%207.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit16-game1",
          bookId,
          unitId,
          title: "Food Tastes Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/6730885c619848649b96d5fa6bf972c7",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/6730885c619848649b96d5fa6bf972c7?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit16-game2",
          bookId,
          unitId,
          title: "Food Stall / Trucks Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/3828678c606049d0a756fad74eb5819a",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/3828678c606049d0a756fad74eb5819a?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
    }

    // Resources for Book 6, Unit 1
    if (bookId === '6' && unitId === '1') {
      return [
        {
          id: "book6-unit1-pdf1",
          bookId,
          unitId,
          title: "Book 6 - Unit 1 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book6/unit1/00%20A%20Book%206%20%E2%80%93%20Unit%201.pdf",
          embedCode: ""
        }
      ];
    }

    // Resources for Book 6, Unit 2
    if (bookId === '6' && unitId === '2') {
      return [
        {
          id: "book6-unit2-pdf1",
          bookId,
          unitId,
          title: "Book 6 - Unit 2 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book6/unit2/00%20A%20Book%206%20%E2%80%93%20Unit%202.pdf",
          embedCode: ""
        }
      ];
    }

    // Resources for Book 6, Unit 3
    if (bookId === '6' && unitId === '3') {
      return [
        {
          id: "book6-unit3-pdf1",
          bookId,
          unitId,
          title: "Book 6 - Unit 3 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book6/unit3/00%20A%20Book%206%20%E2%80%93%20Unit%203.pdf",
          embedCode: ""
        }
      ];
    }

    // Resources for Book 6, Unit 4
    if (bookId === '6' && unitId === '4') {
      return [
        {
          id: "book6-unit4-pdf1",
          bookId,
          unitId,
          title: "Book 6 - Unit 4 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book6/unit4/00%20A%20Book%206%20%E2%80%93%20Unit%204.pdf",
          embedCode: ""
        }
      ];
    }
    
    // Resources for Book 6, Unit 5
    if (bookId === '6' && unitId === '5') {
      return [
        {
          id: "book6-unit5-pdf1",
          bookId,
          unitId,
          title: "Book 6 - Unit 5 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book6/unit5/00%20A%20Book%206%20%E2%80%93%20Unit%205.pdf",
          embedCode: ""
        }
      ];
    }
    
    // Resources for Book 6, Unit 6
    if (bookId === '6' && unitId === '6') {
      return [
        {
          id: "book6-unit6-pdf1",
          bookId,
          unitId,
          title: "Book 6 - Unit 6 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book6/unit6/00%20A%20Book%206%20%E2%80%93%20Unit%206.pdf",
          embedCode: ""
        }
      ];
    }
    
    // Resources for Book 6, Unit 7
    if (bookId === '6' && unitId === '7') {
      return [
        {
          id: "book6-unit7-pdf1",
          bookId,
          unitId,
          title: "Book 6 - Unit 7 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book6/unit7/00%20A%20Book%206%20%E2%80%93%20Unit%207.pdf",
          embedCode: ""
        }
      ];
    }
    
    // Resources for Book 6, Unit 8
    if (bookId === '6' && unitId === '8') {
      return [
        {
          id: "book6-unit8-pdf1",
          bookId,
          unitId,
          title: "Book 6 - Unit 8 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book6/unit8/00%20A%20Book%206%20%E2%80%93%20Unit%208.pdf",
          embedCode: ""
        }
      ];
    }
    
    // Resources for Book 6, Unit 9
    if (bookId === '6' && unitId === '9') {
      return [
        {
          id: "book6-unit9-pdf1",
          bookId,
          unitId,
          title: "Book 6 - Unit 9 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book6/unit9/00%20A%20Book%206%20%E2%80%93%20Unit%209.pdf",
          embedCode: ""
        }
      ];
    }
    
    // Resources for Book 6, Unit 10
    if (bookId === '6' && unitId === '10') {
      return [
        {
          id: "book6-unit10-pdf1",
          bookId,
          unitId,
          title: "Book 6 - Unit 10 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book6/unit10/00%20A%20Book%206%20%E2%80%93%20Unit%2010.pdf",
          embedCode: ""
        }
      ];
    }
    
    // Resources for Book 6, Unit 11
    if (bookId === '6' && unitId === '11') {
      return [
        {
          id: "book6-unit11-pdf1",
          bookId,
          unitId,
          title: "Book 6 - Unit 11 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book6/unit11/00%20A%20Book%206%20%E2%80%93%20Unit%2011.pdf",
          embedCode: ""
        }
      ];
    }
    
    // Resources for Book 6, Unit 12
    if (bookId === '6' && unitId === '12') {
      return [
        {
          id: "book6-unit12-pdf1",
          bookId,
          unitId,
          title: "Book 6 - Unit 12 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book6/unit12/00%20A%20Book%206%20%E2%80%93%20Unit%2012.pdf",
          embedCode: ""
        }
      ];
    }
    
    // Resources for Book 6, Unit 13
    if (bookId === '6' && unitId === '13') {
      return [
        {
          id: "book6-unit13-pdf1",
          bookId,
          unitId,
          title: "Book 6 - Unit 13 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book6/unit13/00%20A%20Book%206%20%E2%80%93%20Unit%2013.pdf",
          embedCode: ""
        }
      ];
    }
    
    // Resources for Book 6, Unit 14
    if (bookId === '6' && unitId === '14') {
      return [
        {
          id: "book6-unit14-pdf1",
          bookId,
          unitId,
          title: "Book 6 - Unit 14 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book6/unit14/00%20A%20Book%206%20%E2%80%93%20Unit%2014.pdf",
          embedCode: ""
        }
      ];
    }
    
    // Resources for Book 6, Unit 15
    if (bookId === '6' && unitId === '15') {
      return [
        {
          id: "book6-unit15-pdf1",
          bookId,
          unitId,
          title: "Book 6 - Unit 15 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book6/unit15/00%20A%20Book%206%20%E2%80%93%20Unit%2015.pdf",
          embedCode: ""
        }
      ];
    }
    
    // Resources for Book 6, Unit 16
    if (bookId === '6' && unitId === '16') {
      return [
        {
          id: "book6-unit16-pdf1",
          bookId,
          unitId,
          title: "Book 6 - Unit 16 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book6/unit16/00%20A%20Book%206%20%E2%80%93%20Unit%2016.pdf",
          embedCode: ""
        }
      ];
    }

    // For other book/unit combinations, return an empty array
    return [];
  };

  // Get resources based on book and unit
  const bookUnitResources = getBookUnitResources(bookId, unitId);

  // Save resources mutation
  const saveMutation = useMutation({
    mutationFn: async (updatedResources: TeacherResource[]) => {
      // For Book 6 and 7 specific units, just return success without saving to server
      if ((bookId === '7' && ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'].includes(unitId)) ||
          (bookId === '6' && ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'].includes(unitId))) {
        return { success: true };
      }
      
      // For other books/units, save to server
      await apiRequest(
        'POST', 
        `/api/direct/${bookId}/${unitId}/resources`, 
        { resources: updatedResources }
      );
    },
    onSuccess: () => {
      if ((bookId === '7' && ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'].includes(unitId)) ||
          (bookId === '6' && ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'].includes(unitId))) {
        setResources(bookUnitResources);
      } else {
        refetch();
      }
      
      toast({
        title: "Resources Saved",
        description: "Teacher resources have been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Save Failed",
        description: error.message || "Could not save resources. Please try again.",
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    // For Book 6 and 7 units with predefined resources, use them
    if ((bookId === '7' && ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'].includes(unitId)) ||
        (bookId === '6' && ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'].includes(unitId))) {
      setResources(bookUnitResources);
    } else if (data && Array.isArray(data)) {
      setResources(data);
    } else if (data) {
      // Handle case where data is not an array
      console.warn('Resources data is not an array:', data);
      setResources([]);
    }
  }, [data, bookId, unitId, bookUnitResources]);

  const handleNewResourceChange = (field: keyof TeacherResource, value: string) => {
    setNewResource(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddResource = async () => {
    // Basic validation
    if (!newResource.title) {
      toast({
        title: "Validation Error",
        description: "Please enter a title for the resource.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create a copy of the resource to add
      const resourceToAdd: TeacherResource = { ...newResource };
      
      // If a file was uploaded, handle it
      if (uploadedFile && (newResource.resourceType === 'pdf' || newResource.resourceType === 'lesson')) {
        // In a real implementation, you would upload the file to S3 or your server
        console.log('File to upload:', uploadedFile);
        resourceToAdd.fileUrl = URL.createObjectURL(uploadedFile);
      }

      // Add the new resource to the list
      const updatedResources = [...resources, resourceToAdd];
      
      // Save to the server
      await saveMutation.mutateAsync(updatedResources);
      
      // Reset form
      setNewResource({
        bookId,
        unitId,
        title: '',
        resourceType: 'video',
        provider: '',
        sourceUrl: '',
        embedCode: '',
      });
      setUploadedFile(null);
      setIsAdding(false);
      
    } catch (error) {
      console.error('Error adding resource:', error);
      toast({
        title: "Error",
        description: "Failed to add resource. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteResource = async (resource: TeacherResource) => {
    try {
      const updatedResources = resources.filter(r => r !== resource);
      await saveMutation.mutateAsync(updatedResources);
      setConfirmDelete(null);
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast({
        title: "Error",
        description: "Failed to delete resource. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Movie Genres Vocabulary Lesson Plan
  const movieGenresLessonPlan: LessonPlan = {
    id: 'film-genres-1',
    title: 'Movie Genres Vocabulary - Part 1',
    duration: '45 minutes',
    level: 'Elementary to Pre-Intermediate (A1-A2)',
    objectives: [
      'Identify and name common film genres in English',
      'Match film genres with their characteristics',
      'Express preferences about different movie genres using simple structures',
      'Practice listening comprehension with authentic examples of film genre vocabulary'
    ],
    materials: [
      'Visual English Book 7, Unit 1 slides (01 A - 05 D)',
      'Wordwall interactive game - Film Genres matching',
      'YouTube video: "Movie Genres Vocabulary Epic ESL Guessing Game"',
      'Film genre flashcards',
      'Handout with movie posters from different genres'
    ],
    steps: [
      {
        title: 'Warm-up: Film Preferences',
        duration: '5 mins',
        description: 'Start by asking students about their favorite films and what types of movies they enjoy watching.',
        instructions: [
          "Ask students: 'What was the last film you watched?'",
          "Follow up with: 'Did you enjoy it? Why or why not?'",
          "Use the opportunity to pre-teach some basic vocabulary that might come up in their responses."
        ],
        teacherNotes: 'This activity helps assess prior knowledge and creates context for the lesson.'
      },
      {
        title: 'Presentation: Film Genres Introduction',
        duration: '10 mins',
        description: 'Introduce key film genres using Visual English Book 7 slides and flashcards.',
        materials: [
          'Book 7, Unit 1 slides (01 A - 03 C)',
          'Film genre flashcards'
        ],
        instructions: [
          'Display Book 7, Unit 1 slides showing different film genres',
          'For each genre, ask: "What kind of film is this?"',
          'Drill pronunciation of each genre name',
          'Briefly explain the characteristics of each genre using simple language'
        ]
      },
      {
        title: 'Vocabulary Development: Movie Genres Video',
        duration: '10 mins',
        description: 'Watch the "Movie Genres Vocabulary Epic ESL Guessing Game" video to reinforce genre vocabulary.',
        materials: [
          'YouTube video from Teacher Resources',
          'Simple worksheet with movie genres listed'
        ],
        instructions: [
          'Play the video once all the way through',
          'Play again, pausing after each section to discuss the genres shown',
          'Have students mark on their worksheets which genres they recognize'
        ],
        teacherNotes: 'This video provides authentic examples and pronunciation of genre vocabulary.'
      },
      {
        title: 'Guided Practice: Genre Matching Activity',
        duration: '15 mins',
        description: 'Students match movie descriptions or images to the correct genre.',
        materials: [
          'Handout with movie posters and descriptions',
          'Book 7, Unit 1 slides (04 A - 05 D)'
        ],
        instructions: [
          'Distribute handouts with movie posters from different genres',
          'Students work in pairs to match each poster to the correct genre',
          'Review the answers as a class using the Book 7 slides',
          'For each answer, ask students to explain how they knew the genre'
        ]
      },
      {
        title: 'Wrap-up: Personal Preferences',
        duration: '5 mins',
        description: 'Students share their favorite film genres and explain why they like them.',
        instructions: [
          'Have students complete the sentence: "I like ___ films because..."',
          'Allow 3-4 students to share their preferences with the class',
          'Summarize the key genre vocabulary learned in the lesson'
        ]
      }
    ],
    assessmentTips: 'Assess students through their participation in the matching activity and their ability to identify genres correctly during the video activity.',
    homeworkIdeas: [
      'Write 3-5 sentences about your favorite movie, including its genre and why you like it.',
      'Find and bring a movie poster to the next class (can be digital or printed).'
    ],
    additionalResources: [
      {
        title: 'Wordwall Film Genres Game 1',
        url: 'https://wordwall.net/resource/dcc6034981ea455d9bfa88f6740c720f'
      },
      {
        title: 'Movie Genres Vocabulary Video',
        url: 'https://www.youtube.com/watch?v=FTuQIwl7j3k'
      }
    ]
  };

  // Film Production Roles Lesson Plan
  const filmProductionLessonPlan: LessonPlan = {
    id: 'film-production-1',
    title: 'Film Production Roles - Part 1',
    duration: '45 minutes',
    level: 'Elementary to Pre-Intermediate (A1-A2)',
    objectives: [
      'Identify key roles in film production (director, actor, stuntman, etc.)',
      'Describe job responsibilities using simple present tense',
      'Use question forms to ask about film production jobs',
      'Develop vocabulary related to filmmaking process'
    ],
    materials: [
      'Visual English Book 7, Unit 1 slides (15 A - 17 E)',
      'Wordwall interactive game - Film Production Roles',
      'YouTube video: "Guess the Film Genre"',
      'Role cards with job descriptions',
      'Simple scripts for role-playing'
    ],
    steps: [
      {
        title: 'Warm-up: Behind the Scenes',
        duration: '5 mins',
        description: 'Show images from behind the scenes of popular movies and ask students what they know about making films.',
        instructions: [
          "Ask students: 'What happens behind the camera when making a film?'",
          "Follow up with: 'What jobs do people have in making movies?'",
          "Note down student responses on the board to reference later"
        ]
      },
      {
        title: 'Presentation: Film Production Roles',
        duration: '12 mins',
        description: 'Introduce key film production roles using Visual English Book 7 slides.',
        materials: [
          'Book 7, Unit 1 slides (15 A - 16 F)',
          'Role cards'
        ],
        instructions: [
          'Display slides showing different film production roles',
          'For each role, ask: "Who is this? What do they do?"',
          'Teach key vocabulary for each role (director, actor, costume designer, etc.)',
          'Practice job responsibility phrases: "A director directs the film"'
        ],
        teacherNotes: 'Use simple language to explain each role. Focus on the action each person performs.'
      },
      {
        title: 'Guided Practice: Job Description Matching',
        duration: '10 mins',
        description: 'Students match job titles with their responsibilities in film production.',
        materials: [
          'Handout with job titles and descriptions',
          'Book 7, Unit 1 slides (16 A - 17 B)'
        ],
        instructions: [
          'Distribute handouts with film roles and descriptions',
          'Students work individually to match jobs with responsibilities',
          'Check answers as a class using the slides',
          'Practice the question form: "What does a [role] do?" and answer "A [role] [action]"'
        ]
      },
      {
        title: 'Interactive Activity: Wordwall Game',
        duration: '13 mins',
        description: 'Use the Wordwall game to reinforce vocabulary and job responsibilities in a fun, interactive format.',
        materials: [
          'Wordwall game from Teacher Resources',
          'Projector or interactive whiteboard'
        ],
        instructions: [
          'Play the Wordwall game as a whole class activity',
          'Have students take turns coming to the board to match items',
          'After each correct match, have students create a sentence about that role',
          'Keep track of points for additional motivation'
        ],
        teacherNotes: 'If technology is not available, you can recreate this activity using printed cards for a physical matching game.'
      },
      {
        title: 'Wrap-up: Role-Play Activity',
        duration: '5 mins',
        description: 'Students demonstrate understanding by role-playing simple film production scenarios.',
        materials: [
          'Simple scenario cards'
        ],
        instructions: [
          'Assign roles to different students (director, actor, camera operator, etc.)',
          'Give a simple scene to act out (e.g., filming someone walking into a room)',
          'Have students use phrases learned during the lesson as they perform their roles',
          'Discuss the roles and responsibilities after the role-play'
        ]
      }
    ],
    assessmentTips: 'Evaluate students based on their participation in the matching activity and their use of vocabulary during the role-play.',
    homeworkIdeas: [
      'Write 5 sentences about different film production roles and what they do.',
      'If possible, watch a "behind the scenes" video clip and note down 3 jobs you observe.'
    ],
    additionalResources: [
      {
        title: 'Wordwall Film Production Game',
        url: 'https://wordwall.net/resource/1e211e293d514f56b1786cfbf6ed146b'
      },
      {
        title: 'Behind the Scenes of a Movie',
        url: 'https://www.youtube.com/watch?v=p57KyLojoHU'
      }
    ]
  };

  // View more resources handler
  const handleViewMore = (resource: TeacherResource) => {
    // Based on resource type, perform different actions
    if (resource.sourceUrl) {
      window.open(resource.sourceUrl, '_blank');
    } else if (resource.fileUrl) {
      window.open(resource.fileUrl, '_blank');
    } else {
      toast({
        title: "Resource Unavailable",
        description: "No external link or file is available for this resource.",
        variant: "destructive",
      });
    }
  };

  // UI for rendering resources
  const renderResources = (type: string | null = null) => {
    let filteredResources = resources;
    
    if (type) {
      filteredResources = resources.filter(r => r.resourceType === type);
    }

    if (filteredResources.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          {isEditMode ? (
            <p>No resources found. Click the "Add Resource" button to add some.</p>
          ) : (
            <p>No resources available for this unit yet.</p>
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredResources.map((resource, index) => (
          <Card key={resource.id || index} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <Badge variant="outline" className="ml-2">
                  {resource.resourceType === 'video' && <Video className="h-3 w-3 mr-1" />}
                  {resource.resourceType === 'game' && <Gamepad2 className="h-3 w-3 mr-1" />}
                  {(resource.resourceType === 'lesson' || resource.resourceType === 'pdf') && <FileText className="h-3 w-3 mr-1" />}
                  {resource.resourceType.charAt(0).toUpperCase() + resource.resourceType.slice(1)}
                </Badge>
              </div>
              {resource.provider && (
                <CardDescription className="text-xs">
                  Provider: {resource.provider}
                </CardDescription>
              )}
            </CardHeader>
            
            <CardContent className="pt-0">
              {resource.embedCode && resource.resourceType === 'video' && (
                <div className="aspect-video relative mb-4 rounded overflow-hidden" 
                     dangerouslySetInnerHTML={{ __html: resource.embedCode }} />
              )}
              
              {resource.embedCode && resource.resourceType === 'game' && (
                <div className="max-h-[380px] mb-4 rounded overflow-hidden" 
                     dangerouslySetInnerHTML={{ __html: resource.embedCode }} />
              )}

              {(!resource.embedCode && resource.resourceType === 'video') && (
                <div className="bg-muted aspect-video flex items-center justify-center rounded mb-4">
                  <Video className="h-12 w-12 text-muted-foreground" />
                </div>
              )}

              {(!resource.embedCode && resource.resourceType === 'game') && (
                <div className="bg-muted h-[200px] flex items-center justify-center rounded mb-4">
                  <Gamepad2 className="h-12 w-12 text-muted-foreground" />
                </div>
              )}

              {(['lesson', 'pdf', 'other'].includes(resource.resourceType) && !resource.embedCode) && (
                <div className="bg-muted h-[100px] flex items-center justify-center rounded mb-4">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </CardContent>
            
            <CardFooter className="bg-muted/30 pt-2 pb-2">
              <div className="flex justify-between w-full">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs flex items-center" 
                  onClick={() => handleViewMore(resource)}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View More
                </Button>

                {isEditMode && (
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs flex items-center" 
                      onClick={() => {
                        setNewResource({ ...resource });
                        setIsAdding(true);
                      }}
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs flex items-center text-destructive" 
                      onClick={() => setConfirmDelete(resource)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  const renderLessonPlans = () => {
    if (bookId === '7' && unitId === '1') {
      return (
        <div className="mt-6 space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Movie Genres Vocabulary</span>
                    <span className="text-sm font-normal">45 min</span>
                  </CardTitle>
                  <CardDescription>Elementary to Pre-Intermediate (A1-A2)</CardDescription>
                </CardHeader>
                <CardContent className="max-h-[500px] overflow-y-auto">
                  <LessonPlanTemplate lessonPlan={movieGenresLessonPlan} />
                </CardContent>
                <CardFooter className="bg-muted/20 pt-3 pb-3">
                  <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                    <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Film Production Roles</span>
                    <span className="text-sm font-normal">45 min</span>
                  </CardTitle>
                  <CardDescription>Elementary to Pre-Intermediate (A1-A2)</CardDescription>
                </CardHeader>
                <CardContent className="max-h-[500px] overflow-y-auto">
                  <LessonPlanTemplate lessonPlan={filmProductionLessonPlan} />
                </CardContent>
                <CardFooter className="bg-muted/20 pt-3 pb-3">
                  <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                    <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No lesson plans available for this unit yet.</p>
      </div>
    );
  };

  if (isLoading) {
    return <div className="py-8 text-center">Loading resources...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Teacher Resources for Book {bookId}, Unit {unitId}</h2>
        {isEditMode && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add Resource
          </Button>
        )}
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="flex items-center">
            <Book className="h-4 w-4 mr-2" />
            All Resources
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center">
            <Video className="h-4 w-4 mr-2" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="games" className="flex items-center">
            <Gamepad2 className="h-4 w-4 mr-2" />
            Games
          </TabsTrigger>
          <TabsTrigger value="materials" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Worksheets & PDFs
          </TabsTrigger>
          <TabsTrigger value="lessonplans" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            45-min Lesson Plans
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {renderResources()}
        </TabsContent>

        <TabsContent value="videos">
          {renderResources('video')}
        </TabsContent>

        <TabsContent value="games">
          {renderResources('game')}
        </TabsContent>

        <TabsContent value="materials">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {renderResources('pdf')}
            {renderResources('lesson')}
          </div>
        </TabsContent>

        <TabsContent value="lessonplans">
          {renderLessonPlans()}
        </TabsContent>
      </Tabs>

      {/* Add Resource Dialog */}
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingResource ? 'Edit Resource' : 'Add New Resource'}</DialogTitle>
            <DialogDescription>
              Complete the form below to add a new teacher resource for this unit.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right font-medium">Title:</span>
              <Input 
                className="col-span-3" 
                value={newResource.title} 
                onChange={(e) => handleNewResourceChange('title', e.target.value)} 
                placeholder="Resource title" 
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right font-medium">Type:</span>
              <div className="col-span-3">
                <select 
                  className="w-full p-2 border rounded-md" 
                  value={newResource.resourceType} 
                  onChange={(e) => handleNewResourceChange('resourceType', e.target.value as any)}
                >
                  <option value="video">Video</option>
                  <option value="game">Game</option>
                  <option value="lesson">Worksheet/Lesson</option>
                  <option value="pdf">PDF</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right font-medium">Provider:</span>
              <Input 
                className="col-span-3" 
                value={newResource.provider || ''} 
                onChange={(e) => handleNewResourceChange('provider', e.target.value)} 
                placeholder="e.g., YouTube, Wordwall, etc." 
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right font-medium">URL:</span>
              <Input 
                className="col-span-3" 
                value={newResource.sourceUrl || ''} 
                onChange={(e) => handleNewResourceChange('sourceUrl', e.target.value)} 
                placeholder="External link to resource" 
              />
            </div>

            {(newResource.resourceType === 'video' || newResource.resourceType === 'game') && (
              <div className="grid grid-cols-4 items-start gap-4">
                <span className="text-right font-medium">Embed Code:</span>
                <textarea 
                  className="col-span-3 p-2 border rounded-md min-h-[100px]" 
                  value={newResource.embedCode || ''} 
                  onChange={(e) => handleNewResourceChange('embedCode', e.target.value)} 
                  placeholder="<iframe ...>" 
                />
              </div>
            )}

            {(newResource.resourceType === 'pdf' || newResource.resourceType === 'lesson') && (
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">File:</span>
                <div className="col-span-3">
                  <Input 
                    type="file" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadedFile(e.target.files[0]);
                      }
                    }} 
                  />
                  <p className="text-xs mt-1 text-muted-foreground">
                    {uploadedFile ? `Selected: ${uploadedFile.name}` : 'No file chosen'}
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            <Button onClick={handleAddResource}>Save Resource</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={!!confirmDelete} onOpenChange={(open) => !open && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this resource? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={() => confirmDelete && handleDeleteResource(confirmDelete)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherResources;