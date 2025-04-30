import React, { useCallback, useEffect, useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  BookOpen, 
  GamepadIcon, 
  Video, 
  FileText, 
  Package, 
  Globe, 
  Trash2, 
  Pencil, 
  ExternalLink
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import LessonPlanTemplate from "./LessonPlanTemplate";

export interface LessonPlan {
  objectives: string[];
  warmUp: string;
  presentation: string;
  practice: string;
  production: string;
  assessment: string;
  materials: string[];
  vocabulary: string[];
  additionalNotes?: string;
}

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
  lessonPlan?: LessonPlan;
}

interface HardcodedTeacherResourcesProps {
  bookId?: string;
  unitId?: string;
  isEditMode?: boolean;
}

const HardcodedTeacherResources: React.FC<HardcodedTeacherResourcesProps> = ({ 
  bookId = '', 
  unitId = '', 
  isEditMode = false 
}) => {
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [selectedResource, setSelectedResource] = useState<TeacherResource | null>(null);
  const [showViewMore, setShowViewMore] = useState(false);
  
  const movieGenresLessonPlan: LessonPlan = {
    objectives: [
      "Students will be able to identify and describe different movie genres",
      "Students will practice vocabulary related to types of films and entertainment",
      "Students will express preferences about movie genres using like/dislike expressions"
    ],
    warmUp: "Start by showing movie posters from different genres. Ask students to guess what type of movie each one is. Write their suggestions on the board.",
    presentation: "Present the main movie genres with example films, key vocabulary, and typical features of each genre. Use visual aids and short clips if possible.",
    practice: "Have students work in pairs to match movie descriptions with the correct genres. Then have them complete sentences about different genres using appropriate vocabulary.",
    production: "In small groups, students discuss their favorite movies and explain why they like them, using genre-specific vocabulary. Each group presents one favorite movie to the class.",
    assessment: "Students create a movie recommendation for a partner based on genre preferences. Evaluate use of correct genre terminology and descriptive language.",
    materials: [
      "Movie posters from different genres",
      "Handouts with genre descriptions",
      "Short film clips (optional)",
      "Vocabulary worksheets"
    ],
    vocabulary: [
      "Action, adventure, animation, comedy, documentary, drama, fantasy, horror, musical, romance, science fiction, thriller, western",
      "Plot, special effects, soundtrack, sequel, prequel, adaptation, audience, director, cast, review"
    ],
    additionalNotes: "This lesson works well with teenage and adult learners who have some familiarity with popular films."
  };

  const naturalDisastersLessonPlan: LessonPlan = {
    objectives: [
      "Students will be able to identify and describe different types of natural disasters",
      "Students will learn vocabulary related to extreme weather events and their impacts",
      "Students will discuss causes and effects of natural disasters using appropriate terms"
    ],
    warmUp: "Show images of recent natural disasters from news sources. Ask students if they recognize what happened and discuss their reactions.",
    presentation: "Present a slideshow of major natural disasters (earthquake, hurricane, tsunami, flood, etc.) with key vocabulary for each. Explain causes, effects, and safety measures.",
    practice: "Students complete a vocabulary matching activity connecting disaster types with their definitions. Then practice using terms in gap-fill sentences about historical disasters.",
    production: "In pairs, students create a short news report about a fictional natural disaster. They should describe what happened, the impact, and relief efforts.",
    assessment: "Students write a paragraph about the most common natural disasters in their country/region and the preventive measures that are taken.",
    materials: [
      "Photos and news clippings of natural disasters",
      "World map to identify disaster-prone regions",
      "Vocabulary worksheets",
      "Video clips of natural disasters (if appropriate)"
    ],
    vocabulary: [
      "Earthquake, hurricane, tornado, tsunami, flood, drought, wildfire, landslide, volcanic eruption",
      "Evacuate, disaster relief, emergency services, warning system, shelter, aftermath, recovery, destruction"
    ],
    additionalNotes: "Be sensitive to students who may have experienced natural disasters personally. Focus on safety and preparedness rather than sensationalizing the destruction."
  };

  const moneyLessonPlan: LessonPlan = {
    objectives: [
      "Students will be able to identify and name different currencies and denominations",
      "Students will practice vocabulary related to money, banking, and financial transactions",
      "Students will role-play common money-related conversations and transactions"
    ],
    warmUp: "Show images of various currencies from around the world. Ask students if they can identify which countries they're from.",
    presentation: "Present key vocabulary related to money, banking, and financial transactions. Show real examples or images of different denominations.",
    practice: "Students practice conversations about exchanging currency, asking about prices, or making purchases. Then complete worksheet matching financial terms with definitions.",
    production: "In small groups, students role-play scenarios like shopping, banking, or discussing budgets using the target vocabulary.",
    assessment: "Students create a dialogue that includes at least 10 terms related to money and finance, then perform it for the class.",
    materials: [
      "Images or real examples of different currencies",
      "Handouts with financial vocabulary",
      "Role-play scenario cards",
      "Worksheets with money-related activities"
    ],
    vocabulary: [
      "Currency, exchange rate, denomination, coins, notes/bills, wallet, bank account, credit card, debit card, cash, check/cheque",
      "Deposit, withdraw, transfer, borrow, lend, interest, savings, loan, budget, expense, income, investment"
    ],
    additionalNotes: "This lesson can be adapted for different levels by adjusting the complexity of the role-play scenarios and vocabulary."
  };

  // Load hardcoded resources based on bookId and unitId
  useEffect(() => {
    console.log(`Loading hardcoded resources for Book ${bookId}, Unit ${unitId}`);
    let hardcodedResources: TeacherResource[] = [];
    
    // Book 7, Unit 1 - Film genres
    if (bookId === '7' && unitId === '1') {
      hardcodedResources = [
        {
          id: "book7-unit1-video1",
          bookId: '7',
          unitId: '1',
          title: "Movie Genres Vocabulary Epic ESL Guessing Game",
          resourceType: "video",
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/watch?v=FTuQIwl7j3k",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/FTuQIwl7j3k?si=wh3So_Qj8Hqk6TL3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit1-video2",
          bookId: '7',
          unitId: '1',
          title: "Describing and Rating Films - Oxford Online English",
          resourceType: "video",
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/watch?v=S5XkM_6j4p4",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/S5XkM_6j4p4?si=QvzMkxQl5FUYVwxJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit1-game1",
          bookId: '7',
          unitId: '1',
          title: "Movie & Film Genres - Wordwall Game",
          resourceType: "game",
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/17566456/movies-film-genres",
          embedCode: `<iframe style="max-width: 100%" src="https://wordwall.net/embed/0e3ddce1b4b54f92a65a0c702db44271?themeId=23&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit1-lesson1",
          bookId: '7',
          unitId: '1',
          title: "Movie Genres Lesson Plan",
          resourceType: "lesson",
          provider: "Visual English",
          lessonPlan: movieGenresLessonPlan
        }
      ];
    }
    
    // Book 7, Unit 11 - Natural Disasters
    if (bookId === '7' && unitId === '11') {
      hardcodedResources = [
        {
          id: "book7-unit11-video1",
          bookId: '7',
          unitId: '11',
          title: "CG Animated Short Film about Climate change",
          resourceType: "video",
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/watch?v=dKP08GCh4d4",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/dKP08GCh4d4?si=NYAjQpwGFz-VsDxH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit11-game1",
          bookId: '7',
          unitId: '11',
          title: "Natural Disasters Vocabulary Game",
          resourceType: "game",
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/8518517/natural-disasters",
          embedCode: `<iframe style="max-width: 100%" src="https://wordwall.net/embed/f71ec9e2c30d4499b9e0fb0ba5c91a70?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit11-lesson1",
          bookId: '7',
          unitId: '11',
          title: "Natural Disasters Lesson Plan",
          resourceType: "lesson",
          provider: "Visual English",
          lessonPlan: naturalDisastersLessonPlan
        }
      ];
    }
    
    // Book 7, Unit 9 - Jobs
    if (bookId === '7' && unitId === '9') {
      hardcodedResources = [
        {
          id: "book7-unit9-video1",
          bookId: '7',
          unitId: '9',
          title: "Types of Jobs - Wordwall Game",
          resourceType: "game",
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/10037807/types-jobs",
          embedCode: `<iframe style="max-width: 100%" src="https://wordwall.net/embed/97b3979a70a54b17a193a2d9c85f1d40?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
    }
    
    // Book 7, Unit 6 - Money
    if (bookId === '7' && unitId === '6') {
      hardcodedResources = [
        {
          id: "book7-unit6-video1",
          bookId: '7',
          unitId: '6',
          title: "Learn English: Money from 1p to 50 Pounds",
          resourceType: "video",
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/watch?v=RrXNezFLWSI",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/RrXNezFLWSI?si=CJsKkDLw0TpfUfm7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit6-lesson1",
          bookId: '7',
          unitId: '6',
          title: "Money and Currency Lesson Plan",
          resourceType: "lesson",
          provider: "Visual English",
          lessonPlan: moneyLessonPlan
        },
        {
          id: "book7-unit6-game1",
          bookId: '7',
          unitId: '6',
          title: "Currency and Money Terms - Vocabulary Quiz",
          resourceType: "game",
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/38051887/currency-and-money-terms",
          embedCode: `<iframe style="max-width: 100%" src="https://wordwall.net/embed/bfcb61f5f6cf4493a2c879aba9b12b9a?themeId=48&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
    }
    
    // Set resources immediately without waiting for API
    if (hardcodedResources.length > 0) {
      console.log(`Loaded ${hardcodedResources.length} hardcoded resources for Book ${bookId}, Unit ${unitId}`);
      setResources(hardcodedResources);
    } else {
      console.log(`No hardcoded resources available for Book ${bookId}, Unit ${unitId}.`);
      setResources([]);
    }
  }, [bookId, unitId]);
  
  const handleViewMore = (resource: TeacherResource) => {
    setSelectedResource(resource);
    setShowViewMore(true);
  };
  
  const renderResourceIcon = (resourceType: string) => {
    switch (resourceType) {
      case 'video':
        return <Video className="h-5 w-5 text-blue-500" />;
      case 'game':
        return <GamepadIcon className="h-5 w-5 text-green-500" />;
      case 'lesson':
        return <BookOpen className="h-5 w-5 text-amber-500" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // If no resources and not in edit mode, don't render anything
  if (resources.length === 0 && !isEditMode) {
    return null;
  }
  
  return (
    <div className="mt-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-blue-700">Teacher Resources</h2>
      </div>
      
      {resources.length === 0 ? (
        <Alert className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
          <AlertTitle>No resources yet</AlertTitle>
          <AlertDescription>
            There are no teacher resources available for this unit yet.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {resources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden h-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {renderResourceIcon(resource.resourceType)}
                    <CardTitle className="text-base font-medium text-gray-800 line-clamp-1">
                      {resource.title}
                    </CardTitle>
                  </div>
                </div>
                <div className="flex mt-1 gap-2">
                  <Badge variant="outline" className="bg-white/50 text-xs font-normal">
                    {resource.resourceType}
                  </Badge>
                  {resource.provider && (
                    <Badge variant="outline" className="bg-white/50 text-xs font-normal">
                      {resource.provider}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-4 min-h-[100px] flex flex-col">
                {resource.resourceType === 'lesson' && resource.lessonPlan ? (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="overview" className="border-b-0">
                      <AccordionTrigger className="text-sm py-2 hover:no-underline">
                        <span>Lesson Plan Overview</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-xs text-gray-600 space-y-2">
                          <h4 className="font-medium">Objectives:</h4>
                          <ul className="list-disc pl-4 space-y-1">
                            {resource.lessonPlan.objectives.slice(0, 2).map((obj, i) => (
                              <li key={i}>{obj}</li>
                            ))}
                            {resource.lessonPlan.objectives.length > 2 && (
                              <li>...and more</li>
                            )}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : resource.resourceType === 'video' || resource.resourceType === 'game' ? (
                  <div className="text-sm text-gray-600 flex-1 flex items-center justify-center">
                    <div className="italic">Interactive content available</div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 flex-1 flex items-center justify-center">
                    <div className="italic">Click to view resource</div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="p-2 bg-gray-50 flex justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  onClick={() => handleViewMore(resource)}
                >
                  View Details
                </Button>
                
                {resource.sourceUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    onClick={() => window.open(resource.sourceUrl, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Source
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {showViewMore && selectedResource && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-2">
                {renderResourceIcon(selectedResource.resourceType)}
                <h3 className="text-lg font-medium">{selectedResource.title}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowViewMore(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </Button>
            </div>
            
            <ScrollArea className="flex-1 p-6 overflow-auto">
              {selectedResource.resourceType === 'lesson' && selectedResource.lessonPlan ? (
                <LessonPlanTemplate lessonPlan={selectedResource.lessonPlan} />
              ) : selectedResource.embedCode ? (
                <div 
                  className="w-full" 
                  dangerouslySetInnerHTML={{ __html: selectedResource.embedCode }}
                />
              ) : selectedResource.fileUrl ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <FileText className="h-16 w-16 text-blue-500 mb-4" />
                  <p className="mb-4">Download the resource file:</p>
                  <a
                    href={selectedResource.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Download File
                  </a>
                </div>
              ) : (
                <div className="text-center p-8 text-gray-500">
                  <p>No preview available for this resource.</p>
                  {selectedResource.sourceUrl && (
                    <a
                      href={selectedResource.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline block mt-4"
                    >
                      Visit Source Website
                    </a>
                  )}
                </div>
              )}
            </ScrollArea>
            
            <div className="p-4 border-t bg-gray-50 flex justify-between">
              {selectedResource.provider && (
                <Badge variant="outline" className="bg-white">
                  Provided by: {selectedResource.provider}
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowViewMore(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HardcodedTeacherResources;