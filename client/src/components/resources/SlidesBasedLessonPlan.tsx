import { useState } from 'react';
import { BookId, UnitId } from '@/types/content';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Layers, Play, Presentation, BookOpen, Clock, Users, CheckCircle2 } from 'lucide-react';

interface SlidesBasedLessonPlanProps {
  bookId: BookId;
  unitId: UnitId;
  title?: string;
}

interface LessonSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string;
  slideRanges: string[];
  timeEstimate: string;
}

export function SlidesBasedLessonPlan({ bookId, unitId, title }: SlidesBasedLessonPlanProps) {
  const [lessonSections] = useState<LessonSection[]>(() => {
    // This would normally come from an API or data source
    // For now, we'll use hardcoded data for demonstration
    return [
      {
        id: 'warm-up',
        title: 'Warm-up Phase',
        icon: <Play className="h-5 w-5 text-orange-500" />,
        content: 'Begin with a brief warm-up activity using Slides 1-5 to engage the students. Ask questions about the images, and encourage students to share their experiences related to the topic.',
        slideRanges: ['Slides 1-5'],
        timeEstimate: '5-8 minutes'
      },
      {
        id: 'presentation',
        title: 'Presentation Phase',
        icon: <Presentation className="h-5 w-5 text-blue-500" />,
        content: 'Introduce new vocabulary and concepts using Slides 6-15. Make sure to point at each item as you name it. Ask students to repeat the key vocabulary 2-3 times. Have students match words to the corresponding images.',
        slideRanges: ['Slides 6-15'],
        timeEstimate: '10-12 minutes'
      },
      {
        id: 'practice',
        title: 'Practice Phase',
        icon: <BookOpen className="h-5 w-5 text-green-500" />,
        content: 'Guide students through controlled practice activities using Slides 16-25. Start with choral repetition, then move to pair practice with the speech bubbles from the slides. Walk around and monitor student performance.',
        slideRanges: ['Slides 16-25'],
        timeEstimate: '12-15 minutes'
      },
      {
        id: 'production',
        title: 'Production Phase',
        icon: <Users className="h-5 w-5 text-purple-500" />,
        content: 'Facilitate student-centered activities using Slides 26-35. Have students work in pairs or small groups to create their own dialogues based on the patterns from the slides. Encourage them to personalize their responses.',
        slideRanges: ['Slides 26-35'],
        timeEstimate: '10-12 minutes'
      },
      {
        id: 'wrap-up',
        title: 'Wrap-up and Assessment',
        icon: <CheckCircle2 className="h-5 w-5 text-red-500" />,
        content: 'Review key learning points using Slides 36-40. Conduct a quick assessment through a game or activity using the vocabulary and structures from the lesson. Provide feedback and praise student efforts.',
        slideRanges: ['Slides 36-40'],
        timeEstimate: '5-8 minutes'
      }
    ];
  });

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-none p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Layers className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">
            {title || `Book ${bookId} Unit ${unitId} Lesson Plan`}
          </h2>
        </div>
        <p className="text-muted-foreground mb-2">
          This slides-based lesson plan emphasizes using the Visual English slides as the backbone of your teaching. 
          Each phase indicates which slides to use and how to implement them effectively.
        </p>
        <div className="bg-blue-100 p-3 rounded-md flex items-start space-x-2 mt-2">
          <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <span className="font-medium">Total Lesson Time:</span> 
            <span className="ml-1">45-55 minutes</span>
          </div>
        </div>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        {lessonSections.map((section) => (
          <AccordionItem key={section.id} value={section.id} className="border border-muted rounded-md mb-2 overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:bg-muted/20 group">
              <div className="flex items-center space-x-2">
                {section.icon}
                <span className="font-medium">{section.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-1">
              <div className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  {section.slideRanges.map((range, idx) => (
                    <div key={idx} className="bg-primary/10 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Layers className="h-4 w-4 mr-1" />
                      {range}
                    </div>
                  ))}
                  <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {section.timeEstimate}
                  </div>
                </div>
                <p className="text-muted-foreground">{section.content}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Card className="bg-blue-50 p-4 border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Layers className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Why Slide-Based Teaching?</h3>
            <p className="text-blue-700 text-sm">
              Visual English is designed around high-quality slides that provide the perfect structure for your lessons.
              By following this approach, you ensure that students receive consistent, visually-rich instruction that
              builds comprehension naturally through carefully sequenced images.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}