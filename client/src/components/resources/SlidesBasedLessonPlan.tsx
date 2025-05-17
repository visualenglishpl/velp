import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlarmClock,
  BookOpen,
  FileText,
  ListChecks,
  Layers,
  Timer,
  Users,
  Video,
  Gamepad2,
  ExternalLink,
  HomeIcon,
  ImageIcon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export interface LessonStep {
  title: string;
  duration: string;
  description: string;
  instructions: string[];
  materials?: string[];
  teacherNotes?: string;
}

export interface LessonPlan {
  id: string;
  title: string;
  duration: string;
  objectives: string[];
  materials: string[];
  steps: LessonStep[];
  assessmentTips: string;
  homeworkIdeas: string[];
  additionalResources?: { title: string; url: string }[];
}

interface SlidesBasedLessonPlanProps {
  bookId: string;
  unitId: string;
  title?: string;
  className?: string;
}

export function SlidesBasedLessonPlan({
  bookId,
  unitId,
  title = "Slides-Based 45-Minute Lesson Plan",
  className = "",
}: SlidesBasedLessonPlanProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample lesson plan that emphasizes slides as the core teaching method
  const sampleLessonPlan: LessonPlan = {
    id: `book${bookId}-unit${unitId}-lesson`,
    title: `Book ${bookId} Unit ${unitId}: Topic Title`,
    duration: "45 minutes",
    objectives: [
      "Learn key vocabulary through visual slides",
      "Practice pronunciation guided by slide visuals",
      "Complete interactive activities based on slide prompts",
      "Develop speaking skills using slide-based conversation models"
    ],
    materials: [
      "⚠️ Visual English Slides – this is the core of the lesson",
      "Flashcards (as supplementary material)",
      "Handouts aligned with slide content",
      "YouTube or Wordwall resources (support material)"
    ],
    steps: [
      {
        title: "Warm-up (Slide-based Introduction)",
        duration: "5 mins",
        description: "Activate prior knowledge and introduce the theme using the first slides.",
        instructions: [
          "Display introductory slides from the Visual English set",
          "Ask students discussion questions shown on slides",
          "Introduce key vocabulary directly from the slide prompts"
        ],
        teacherNotes: "Ensure every student visually engages with the opening slides."
      },
      {
        title: "Presentation (Slides = Main Teaching Tool)",
        duration: "10 mins",
        description: "Teach the topic using slides to present content clearly and visually.",
        materials: [
          "⚠️ Visual English Slides – full screen mode recommended"
        ],
        instructions: [
          "Go through each slide explaining the content",
          "Use embedded visuals or audio to support explanations",
          "Pause for comprehension checks or pronunciation drills as guided on the slides"
        ]
      },
      {
        title: "Practice Activity (Slide-guided Interaction)",
        duration: "15 mins",
        description: "Students interact based on prompts and visuals from the slides.",
        materials: [
          "Slides with task prompts",
          "Pairwork/handouts if listed on the slides"
        ],
        instructions: [
          "Let students complete the task as shown on the slide (e.g. match, speak, write)",
          "Monitor and assist as they complete the task from the slide",
          "Have pairs present or answer based on what was practiced"
        ]
      },
      {
        title: "Wrap-up (Slide Summary & Game)",
        duration: "10 mins",
        description: "Use closing slides to review key content and end with a game or review.",
        instructions: [
          "Display recap or summary slide",
          "Ask exit questions shown on slide",
          "Run a quick review game directly from the slide if available"
        ]
      }
    ],
    assessmentTips: "Focus on student responses during slide-based activities and accuracy of language use shown or modeled on slides.",
    homeworkIdeas: [
      "Review the lesson slides at home and summarize 3 key points",
      "Complete a worksheet or online quiz linked in the final slide"
    ],
    additionalResources: [
      {
        title: "Support Worksheet",
        url: "https://visualenglish.com/worksheets"
      },
      {
        title: "Wordwall Game",
        url: "https://wordwall.net/resource/12345"
      }
    ]
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      <div className="px-4 py-3 border-b bg-primary/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold flex items-center">
              <Layers className="h-5 w-5 mr-2 text-primary" />
              {title}
            </h2>
            <p className="text-sm text-muted-foreground">
              Book {bookId} • Unit {unitId} • Visual English
            </p>
          </div>
          
          <Badge variant="outline" className="px-3 py-1 bg-primary/10 border-primary/20 text-primary">
            <Timer className="h-4 w-4 mr-1.5" />
            {sampleLessonPlan.duration}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex items-center">
              <FileText className="h-4 w-4 mr-1.5" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="warmup" className="flex items-center">
              <AlarmClock className="h-4 w-4 mr-1.5" />
              <span>Warm-up</span>
            </TabsTrigger>
            <TabsTrigger value="mainActivities" className="flex items-center">
              <ImageIcon className="h-4 w-4 mr-1.5" />
              <span>Slide Activities</span>
            </TabsTrigger>
            <TabsTrigger value="assessment" className="flex items-center">
              <ListChecks className="h-4 w-4 mr-1.5" />
              <span>Assessment</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-4">
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center">
                  <ListChecks className="h-5 w-5 mr-2" />
                  Learning Objectives
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {sampleLessonPlan.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-primary/10 text-primary font-medium rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Materials (Visual Slides First)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {sampleLessonPlan.materials.map((material, index) => (
                    <li key={index} className={`flex items-start ${material.includes('⚠️') ? 'text-primary font-medium' : ''}`}>
                      <span className="mr-2 mt-0.5">•</span>
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Warm-up Tab */}
          <TabsContent value="warmup" className="space-y-4">
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center">
                  <AlarmClock className="h-5 w-5 mr-2" />
                  {sampleLessonPlan.steps[0].title} ({sampleLessonPlan.steps[0].duration})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm">{sampleLessonPlan.steps[0].description}</p>
                  </div>
                  
                  <div className="border-l-4 border-primary/30 pl-4 py-2">
                    <h3 className="font-medium">Instructions:</h3>
                    <ul className="mt-2 space-y-2">
                      {sampleLessonPlan.steps[0].instructions.map((instruction, i) => (
                        <li key={i} className="text-sm flex items-start">
                          <span className="text-primary mr-2">→</span>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {sampleLessonPlan.steps[0].teacherNotes && (
                    <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-md">
                      <h3 className="font-medium text-amber-800 text-sm">Teacher Note:</h3>
                      <p className="text-sm text-amber-700 mt-1">{sampleLessonPlan.steps[0].teacherNotes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Main Activities Tab */}
          <TabsContent value="mainActivities" className="space-y-4">
            {/* Presentation */}
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  {sampleLessonPlan.steps[1].title} ({sampleLessonPlan.steps[1].duration})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <p className="text-sm">{sampleLessonPlan.steps[1].description}</p>
                  
                  {sampleLessonPlan.steps[1].materials && (
                    <div className="bg-primary/5 p-3 rounded-md">
                      <h3 className="font-medium text-sm">Required Materials:</h3>
                      <ul className="mt-1 space-y-1">
                        {sampleLessonPlan.steps[1].materials.map((material, i) => (
                          <li key={i} className="text-sm flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span className="font-medium">{material}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-medium text-sm">Instructions:</h3>
                    <ul className="mt-1 space-y-1">
                      {sampleLessonPlan.steps[1].instructions.map((instruction, i) => (
                        <li key={i} className="text-sm flex items-start">
                          <span className="text-primary mr-2">{i+1}.</span>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Practice Activity */}
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  {sampleLessonPlan.steps[2].title} ({sampleLessonPlan.steps[2].duration})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <p className="text-sm">{sampleLessonPlan.steps[2].description}</p>
                  
                  {sampleLessonPlan.steps[2].materials && (
                    <div className="bg-primary/5 p-3 rounded-md">
                      <h3 className="font-medium text-sm">Materials:</h3>
                      <ul className="mt-1 space-y-1">
                        {sampleLessonPlan.steps[2].materials.map((material, i) => (
                          <li key={i} className="text-sm flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {material}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-medium text-sm">Student Activity Instructions:</h3>
                    <ul className="mt-1 space-y-1">
                      {sampleLessonPlan.steps[2].instructions.map((instruction, i) => (
                        <li key={i} className="text-sm flex items-start">
                          <span className="text-primary mr-2">{i+1}.</span>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Wrap-up */}
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center">
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  {sampleLessonPlan.steps[3].title} ({sampleLessonPlan.steps[3].duration})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <p className="text-sm">{sampleLessonPlan.steps[3].description}</p>
                  
                  <div>
                    <h3 className="font-medium text-sm">Closing Activity:</h3>
                    <ul className="mt-1 space-y-1">
                      {sampleLessonPlan.steps[3].instructions.map((instruction, i) => (
                        <li key={i} className="text-sm flex items-start">
                          <span className="text-primary mr-2">{i+1}.</span>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Assessment Tab */}
          <TabsContent value="assessment" className="space-y-4">
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center">
                  <ListChecks className="h-5 w-5 mr-2" />
                  Assessment Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm">{sampleLessonPlan.assessmentTips}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center">
                  <HomeIcon className="h-5 w-5 mr-2" />
                  Homework Ideas
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {sampleLessonPlan.homeworkIdeas.map((idea, index) => (
                    <li key={index} className="text-sm flex items-start">
                      <span className="font-medium text-primary mr-2">{index + 1}.</span>
                      {idea}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {sampleLessonPlan.additionalResources && (
              <Card>
                <CardHeader className="bg-primary/5 pb-3">
                  <CardTitle className="flex items-center">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Additional Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2">
                    {sampleLessonPlan.additionalResources.map((resource, index) => (
                      <li key={index} className="text-sm flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="font-medium">{resource.title}</span>
                        <span className="mx-2 text-muted-foreground">-</span>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          View
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}