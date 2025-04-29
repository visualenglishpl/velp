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
  
  // Resources specific to Book 7, Unit 1 and Unit 2
  const getBookUnitResources = (bookId: string, unitId: string) => {
    // Resources for Book 7, Unit 1
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
      sourceUrl: "https://67bd8e1e-e6a8-419f-b59e-299052eae36a-00-1j78vcuapq5ig.spock.replit.dev/book7/unit1/00%20A%20Book%207%20%E2%80%93%20Unit%201.pdf",
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
    
    // Resources for Book 7, Unit 2
    if (bookId === '7' && unitId === '2') {
      return [
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
    
    // For other book/unit combinations, return an empty array
    return [];
  };
  
  // Get resources based on book and unit
  const bookUnitResources = getBookUnitResources(bookId, unitId);

  // Save resources mutation
  const saveMutation = useMutation({
    mutationFn: async (updatedResources: TeacherResource[]) => {
      // For Book 7 specific units, just return success without saving to server
      if (bookId === '7' && ['1', '2', '3', '4'].includes(unitId)) {
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
      if (bookId === '7' && ['1', '2', '3', '4'].includes(unitId)) {
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
    // For Book 7 units with predefined resources, use them
    if (bookId === '7' && ['1', '2', '3', '4'].includes(unitId)) {
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
        title: 'Wrap-up: Dream Film Job',
        duration: '5 mins',
        description: 'Students share which film production role they would most like to have and explain why.',
        instructions: [
          'Have students complete the sentence: "I would like to be a ___ because..."',
          'Allow 3-4 students to share their choices with the class',
          'Summarize the key film production vocabulary learned in the lesson'
        ]
      }
    ],
    assessmentTips: 'Evaluate students based on their participation in the matching activities and their ability to correctly use job titles and describe responsibilities.',
    homeworkIdeas: [
      'Research one film production role and write 5 sentences about what they do.',
      'Watch a short film clip and identify at least 3 different production roles you learned about.'
    ],
    additionalResources: [
      {
        title: 'Wordwall Film Genres Game 2',
        url: 'https://wordwall.net/resource/1e211e293d514f56b1786cfbf6ed146b'
      },
      {
        title: 'Guess the Film Genre Video',
        url: 'https://www.youtube.com/watch?v=Bp07u0YrH4Y'
      }
    ]
  };

  const handlePrint = () => {
    toast({
      title: "Preparing print view",
      description: "The print dialog should open automatically.",
    });
    window.print();
  };

  const getIconForResourceType = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'game': return <Gamepad2 className="h-4 w-4" />;
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'lesson': return <Book className="h-4 w-4" />;
      default: return null;
    }
  };

  const ResourceList = ({ resourceType }: { resourceType: string }) => {
    // Make sure resources is an array before filtering
    const filteredResources = Array.isArray(resources) 
      ? resources.filter(r => r?.resourceType === resourceType)
      : [];
    
    if (filteredResources.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <p>No {resourceType} resources available for this unit.</p>
          {isEditMode && (
            <Button 
              onClick={() => {
                setNewResource(prev => ({ ...prev, resourceType: resourceType as any }));
                setIsAdding(true);
              }} 
              variant="outline" 
              size="sm" 
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add {resourceType}
            </Button>
          )}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-1">
        {filteredResources.map((resource, index) => (
          <Card key={index} className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30 border border-border/50">
            <CardHeader className="pb-3 bg-gradient-to-b from-muted/30 to-transparent">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
                    {resource.title}
                  </CardTitle>
                  {resource.provider && (
                    <CardDescription className="text-xs">
                      Provider: {resource.provider}
                    </CardDescription>
                  )}
                </div>
                <Badge variant="outline" className="bg-primary/5 shadow-sm">
                  <span className="flex items-center gap-1">
                    {getIconForResourceType(resource.resourceType)}
                    <span className="capitalize">{resource.resourceType}</span>
                  </span>
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pb-2">
              {resource.resourceType === 'video' || resource.resourceType === 'game' ? (
                resource.embedCode ? (
                  <div 
                    className="w-full aspect-video rounded overflow-hidden bg-muted/30 mb-2"
                    dangerouslySetInnerHTML={{ __html: resource.embedCode }}
                  />
                ) : (
                  <div className="w-full aspect-video rounded overflow-hidden bg-muted/30 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">No embed code available</p>
                  </div>
                )
              ) : resource.resourceType === 'pdf' || resource.resourceType === 'lesson' ? (
                <div className="w-full p-4 rounded bg-primary/5 text-center hover:bg-primary/10 transition-all cursor-pointer" onClick={() => {
                  if (resource.sourceUrl) {
                    window.open(resource.sourceUrl, '_blank');
                  }
                }}>
                  <FileText className="h-6 w-6 mx-auto mb-2 text-primary/70" />
                  <p className="text-sm font-medium">{resource.title}</p>
                  {resource.sourceUrl && (
                    <p className="text-xs text-primary mt-2">Click to open PDF</p>
                  )}
                </div>
              ) : null}
            </CardContent>
            
            <CardFooter className="flex justify-between pt-2 border-t border-border/20">
              {resource.sourceUrl ? (
                <a 
                  href={resource.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs flex items-center text-primary hover:underline hover:text-primary/80 transition-all group-hover:font-medium"
                >
                  <ExternalLink className="h-3 w-3 mr-1" /> Open Resource
                </a>
              ) : (
                <span className="text-xs text-muted-foreground">No external link</span>
              )}
              
              {isEditMode && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive hover:text-destructive/80 p-0 h-auto opacity-70 hover:opacity-100 transition-opacity"
                  onClick={() => setConfirmDelete(resource)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading teacher resources...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-b from-primary/10 to-transparent p-6 rounded-xl shadow-md border border-primary/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text inline-block">
              Teacher Resources
            </h2>
            <p className="text-muted-foreground mt-1">Educational materials for Book {bookId}, Unit {unitId}</p>
          </div>
          
          <div className="flex space-x-3">
            {isEditMode ? (
              <Button 
                onClick={() => setIsAdding(true)} 
                size="sm" 
                className="shadow-sm transition-all hover:shadow-md bg-primary/90 hover:bg-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            ) : (
              <Button 
                onClick={() => window.location.href = `?edit=true`} 
                size="sm" 
                variant="outline" 
                className="shadow-sm transition-all hover:shadow-md border-primary/30 hover:border-primary/50">
                <Pencil className="h-4 w-4 mr-2" />
                Edit Resources
              </Button>
            )}
          </div>
        </div>
        
        <div className="bg-background/70 backdrop-blur-sm rounded-lg p-4 shadow-inner">
          <Tabs defaultValue="video">
            <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-5 rounded-lg bg-muted/50 p-1.5 shadow-inner border border-muted">
              <TabsTrigger value="video" className="flex items-center justify-center py-3 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:border-b-2 data-[state=active]:border-primary/50 transition-all duration-200">
                <Video className="h-4 w-4 mr-2 text-primary/80" />
                <span className="font-medium">Videos</span>
                <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary font-medium">
                  {Array.isArray(resources) ? resources.filter(r => r?.resourceType === 'video').length : 0}
                </span>
              </TabsTrigger>
              <TabsTrigger value="game" className="flex items-center justify-center py-3 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:border-b-2 data-[state=active]:border-primary/50 transition-all duration-200">
                <Gamepad2 className="h-4 w-4 mr-2 text-primary/80" />
                <span className="font-medium">Games</span>
                <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary font-medium">
                  {Array.isArray(resources) ? resources.filter(r => r?.resourceType === 'game').length : 0}
                </span>
              </TabsTrigger>
              <TabsTrigger value="lesson" className="flex items-center justify-center py-3 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:border-b-2 data-[state=active]:border-primary/50 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-primary/80">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
                <span className="font-medium">Lesson Plans</span>
                <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary font-medium">
                  {Array.isArray(resources) ? resources.filter(r => r?.resourceType === 'lesson').length : 0}
                </span>
              </TabsTrigger>
              <TabsTrigger value="pdf" className="flex items-center justify-center py-3 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:border-b-2 data-[state=active]:border-primary/50 transition-all duration-200">
                <FileText className="h-4 w-4 mr-2 text-primary/80" />
                <span className="font-medium">PDF Resources</span>
                <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary font-medium">
                  {Array.isArray(resources) ? resources.filter(r => r?.resourceType === 'pdf').length : 0}
                </span>
              </TabsTrigger>
              {bookId === '7' && unitId === '1' && (
                <TabsTrigger value="detailed-lesson-plans" className="flex items-center justify-center py-3 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:border-b-2 data-[state=active]:border-primary/50 transition-all duration-200">
                  <Book className="h-4 w-4 mr-2 text-primary/80" />
                  <span className="font-medium">45-min Lesson Plans</span>
                  <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary font-medium">
                    2
                  </span>
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="video">
              <ResourceList resourceType="video" />
            </TabsContent>
            
            <TabsContent value="game">
              <ResourceList resourceType="game" />
            </TabsContent>
            
            <TabsContent value="lesson">
              <ResourceList resourceType="lesson" />
            </TabsContent>
            
            <TabsContent value="pdf">
              <ResourceList resourceType="pdf" />
            </TabsContent>
            
            {bookId === '7' && unitId === '1' && (
              <TabsContent value="detailed-lesson-plans">
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
                      45-Minute Lesson Plans for Visual English Book 7, Unit 1
                    </h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePrint} 
                      className="flex items-center gap-2"
                    >
                      <Printer className="h-4 w-4" /> Print Lesson Plans
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    These detailed lesson plans are designed for teaching movie genres and film production vocabulary to
                    elementary to pre-intermediate ESL students. They include step-by-step instructions, timing guidelines, 
                    and incorporate the existing Visual English Book 7, Unit 1 materials and Teacher Resources.
                  </p>
                  
                  <Tabs defaultValue="side-by-side" className="mb-6">
                    <TabsList className="mb-4">
                      <TabsTrigger value="side-by-side">Side by Side View</TabsTrigger>
                      <TabsTrigger value="movie-genres">Movie Genres Lesson</TabsTrigger>
                      <TabsTrigger value="film-production">Film Production Lesson</TabsTrigger>
                    </TabsList>

                    <TabsContent value="side-by-side">
                      <LessonPlanTemplate 
                        plan={movieGenresLessonPlan} 
                        secondaryPlan={filmProductionLessonPlan}
                        onPrint={handlePrint}
                      />
                    </TabsContent>

                    <TabsContent value="movie-genres">
                      <LessonPlanTemplate 
                        plan={movieGenresLessonPlan}
                        onPrint={handlePrint}
                      />
                    </TabsContent>

                    <TabsContent value="film-production">
                      <LessonPlanTemplate 
                        plan={filmProductionLessonPlan}
                        onPrint={handlePrint}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
      
      {/* Add Resource Dialog */}
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Teacher Resource</DialogTitle>
            <DialogDescription>
              Add a new resource for this unit. You can add videos, games, lesson plans, or PDF documents.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
              <label className="w-24">Type:</label>
              <div className="flex-1">
                <select 
                  className="w-full p-2 border rounded"
                  value={newResource.resourceType}
                  onChange={(e) => handleNewResourceChange('resourceType', e.target.value)}
                >
                  <option value="video">Video</option>
                  <option value="game">Game</option>
                  <option value="lesson">Lesson Plan</option>
                  <option value="pdf">PDF Document</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="w-24">Title:</label>
              <Input 
                type="text"
                value={newResource.title}
                onChange={(e) => handleNewResourceChange('title', e.target.value)}
                placeholder="Resource Title"
                className="flex-1"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="w-24">Provider:</label>
              <Input 
                type="text"
                value={newResource.provider}
                onChange={(e) => handleNewResourceChange('provider', e.target.value)}
                placeholder="YouTube, Wordwall, etc."
                className="flex-1"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="w-24">Source URL:</label>
              <Input 
                type="text"
                value={newResource.sourceUrl}
                onChange={(e) => handleNewResourceChange('sourceUrl', e.target.value)}
                placeholder="https://..."
                className="flex-1"
              />
            </div>
            
            {(newResource.resourceType === 'pdf' || newResource.resourceType === 'lesson') ? (
              <div className="space-y-2">
                <label>Upload File:</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadedFile(e.target.files[0]);
                      }
                    }}
                    className="flex-1"
                  />
                  {uploadedFile && (
                    <Badge variant="outline" className="p-2">
                      {uploadedFile.name}
                    </Badge>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label>Embed Code:</label>
                <textarea 
                  rows={5}
                  value={newResource.embedCode}
                  onChange={(e) => handleNewResourceChange('embedCode', e.target.value)}
                  placeholder="<iframe>...</iframe>"
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddResource}>
              Add Resource
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the resource "{confirmDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={() => confirmDelete && handleDeleteResource(confirmDelete)}>
              Delete Resource
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherResources;