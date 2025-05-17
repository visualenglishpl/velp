import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlarmClock,
  Book,
  Brush,
  FileText,
  Flag,
  Gamepad2,
  ListChecks,
  RotateCw,
  Users,
  Video
} from 'lucide-react';

interface LessonPlanTemplateProps {
  bookId: string;
  unitId: string;
  title?: string;
  className?: string;
}

export function LessonPlanTemplate({
  bookId,
  unitId,
  title = "45-Minute Detailed Lesson Plan",
  className = "",
}: LessonPlanTemplateProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className={`space-y-6 ${className}`}>
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="warmup">Warm-up (5m)</TabsTrigger>
          <TabsTrigger value="presentation">Presentation (15m)</TabsTrigger>
          <TabsTrigger value="practice">Practice (15m)</TabsTrigger>
          <TabsTrigger value="production">Production (10m)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center text-lg">
                  <FileText className="h-5 w-5 mr-2" />
                  Lesson Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">Book:</span>
                    <span className="text-sm">Visual English Book {bookId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">Unit:</span>
                    <span className="text-sm">Unit {unitId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">Duration:</span>
                    <span className="text-sm">45 minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">Age Group:</span>
                    <span className="text-sm">Elementary (7-10 years)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">Level:</span>
                    <span className="text-sm">Beginner to Elementary</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Flag className="h-5 w-5 mr-2" />
                  Objectives
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">By the end of the lesson, students will be able to:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Recognize and correctly identify key vocabulary</li>
                    <li>Respond to simple questions using target structures</li>
                    <li>Participate in interactive activities using learned expressions</li>
                    <li>Demonstrate understanding through games and craft activities</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center text-lg">
                  <ListChecks className="h-5 w-5 mr-2" />
                  Materials Needed
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Visual English Book {bookId}, Unit {unitId}</li>
                  <li>Projector or digital display for videos</li>
                  <li>Printed worksheets (see resources)</li>
                  <li>Craft supplies (colored paper, scissors, glue)</li>
                  <li>Small prizes for games (optional)</li>
                  <li>Audio equipment for songs/videos</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Video className="h-5 w-5 mr-2" />
                  Suggested Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Video className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Introductory Video</p>
                      <p className="text-xs text-muted-foreground">Use the Unit {unitId} video resources</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Gamepad2 className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Interactive Games</p>
                      <p className="text-xs text-muted-foreground">Wordwall games from resources section</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Book className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Printable Worksheets</p>
                      <p className="text-xs text-muted-foreground">Book {bookId} Unit {unitId} PDFs</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="warmup" className="space-y-4">
          <Card>
            <CardHeader className="bg-primary/5 pb-3">
              <CardTitle className="flex items-center text-lg">
                <AlarmClock className="h-5 w-5 mr-2" />
                Warm-up Activities (5 minutes)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="border-l-4 border-primary/30 pl-4 py-2">
                  <h3 className="font-medium text-base">Greeting Song (2 minutes)</h3>
                  <p className="text-sm">Start with an energetic greeting song from the video resources to engage students immediately.</p>
                  <div className="mt-2 flex items-center text-sm text-primary">
                    <Video className="h-4 w-4 mr-1" />
                    <span>Use "Good Morning" or "Hello Song" from resources</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-primary/30 pl-4 py-2">
                  <h3 className="font-medium text-base">Quick Review (3 minutes)</h3>
                  <p className="text-sm">Brief review of previous lesson vocabulary with quick flashcard activities.</p>
                  <div className="mt-2">
                    <p className="text-sm"><span className="font-medium">Instructions:</span> Hold up flashcards or display digital images and have students call out the vocabulary.</p>
                    <p className="text-sm mt-1"><span className="font-medium">Questions:</span> "What's this?" "Do you remember this?"</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="presentation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Video className="h-5 w-5 mr-2" />
                  Video Introduction (5 minutes)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <p className="text-sm">Show one of the unit videos to introduce the key vocabulary and structures.</p>
                  
                  <div className="bg-muted/30 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Teacher Notes:</h4>
                    <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                      <li>Pause video at key moments to highlight vocabulary</li>
                      <li>Ask simple comprehension questions</li>
                      <li>Have students repeat phrases from the video</li>
                    </ul>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-primary">
                    <Video className="h-4 w-4 mr-1" />
                    <span>See Book {bookId} Unit {unitId} video resources</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Book className="h-5 w-5 mr-2" />
                  Teacher Presentation (10 minutes)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="border-l-4 border-primary/30 pl-4 py-2">
                    <h3 className="font-medium text-base">Vocabulary Introduction</h3>
                    <p className="text-sm">Present the key vocabulary items using the content viewer with clear visuals.</p>
                    <p className="text-sm mt-1"><span className="font-medium">Method:</span> Show image → Say word → Students repeat → Ask question → Elicit answer</p>
                  </div>
                  
                  <div className="border-l-4 border-primary/30 pl-4 py-2">
                    <h3 className="font-medium text-base">Structure Practice</h3>
                    <p className="text-sm">Introduce the target question-answer patterns with demonstrations.</p>
                    <p className="text-sm mt-1"><span className="font-medium">Example:</span> "What is this? It is a [vocabulary item]"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="practice" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  Interactive Games (7 minutes)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <p className="text-sm">Use the Wordwall games from the resources section to reinforce vocabulary and structures.</p>
                  
                  <div className="bg-muted/30 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Game Options:</h4>
                    <ul className="list-disc pl-5 text-sm mt-1">
                      <li>Matching game (match words to pictures)</li>
                      <li>Quiz game (answer questions about vocabulary)</li>
                      <li>Random wheel (students answer question based on wheel selection)</li>
                    </ul>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-primary">
                    <Gamepad2 className="h-4 w-4 mr-1" />
                    <span>Use the "Wordwall games" from Unit {unitId} resources</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Users className="h-5 w-5 mr-2" />
                  Pair Practice (8 minutes)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="border-l-4 border-primary/30 pl-4 py-2">
                    <h3 className="font-medium text-base">Structured Dialogue</h3>
                    <p className="text-sm">Students practice the Q&A patterns in pairs using flashcards or worksheets.</p>
                    <p className="text-sm mt-1"><span className="font-medium">Pattern:</span> Student A asks questions, Student B answers, then they switch roles.</p>
                  </div>
                  
                  <div className="bg-muted/30 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Monitoring Points:</h4>
                    <ul className="list-disc pl-5 text-sm mt-1">
                      <li>Correct pronunciation</li>
                      <li>Proper question formation</li>
                      <li>Appropriate answers</li>
                      <li>Turn-taking and interaction</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="production" className="space-y-4">
          <Card>
            <CardHeader className="bg-primary/5 pb-3">
              <CardTitle className="flex items-center text-lg">
                <Brush className="h-5 w-5 mr-2" />
                Creative Activity (10 minutes)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-primary/30 pl-4 py-2">
                  <h3 className="font-medium text-base">Hands-on Craft Project</h3>
                  <p className="text-sm">Students create a simple craft related to the unit's theme while practicing vocabulary.</p>
                  
                  <div className="mt-3 space-y-2">
                    <h4 className="text-sm font-medium">Materials:</h4>
                    <ul className="list-disc pl-5 text-xs">
                      <li>Colored paper</li>
                      <li>Scissors (child-safe)</li>
                      <li>Glue sticks</li>
                      <li>Markers or crayons</li>
                      <li>Templates (print from PDF resources)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-muted/30 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Instructions:</h4>
                    <ol className="list-decimal pl-5 text-xs mt-1 space-y-1">
                      <li>Distribute craft materials to each student</li>
                      <li>Demonstrate the craft step by step</li>
                      <li>Use target language during instructions</li>
                      <li>Have students describe their work using learned vocabulary</li>
                      <li>Display finished crafts or have mini-presentations</li>
                    </ol>
                  </div>
                  
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Language Focus:</h4>
                    <p className="text-xs">While creating, encourage students to name items, describe colors, and answer questions about their craft using the target structures.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-primary/5 pb-3">
              <CardTitle className="flex items-center text-lg">
                <RotateCw className="h-5 w-5 mr-2" />
                Lesson Wrap-up
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm">Quick Review</h3>
                  <ul className="list-disc pl-5 text-xs mt-1 space-y-1">
                    <li>Briefly recap key vocabulary and structures</li>
                    <li>Ask random students questions using target language</li>
                    <li>Show flashcards for quick identification</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm">Preview Next Lesson</h3>
                  <p className="text-xs mt-1">Give a short preview of the next lesson to build anticipation.</p>
                  
                  <div className="mt-3">
                    <h4 className="text-xs font-medium">Homework (optional):</h4>
                    <p className="text-xs">Complete one of the worksheet activities from the PDF resources.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}