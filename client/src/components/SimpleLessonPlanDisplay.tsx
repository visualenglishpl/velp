import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface SimpleLessonPlan {
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

interface SimpleLessonPlanDisplayProps {
  lessonPlan: SimpleLessonPlan;
}

const SimpleLessonPlanDisplay: React.FC<SimpleLessonPlanDisplayProps> = ({ lessonPlan }) => {
  return (
    <ScrollArea className="max-h-[60vh]">
      <div className="space-y-6 p-2">
        {/* Objectives */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Objectives</CardTitle>
            <CardDescription>
              What students will be able to do by the end of this lesson
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              {lessonPlan.objectives.map((objective, index) => (
                <li key={index} className="text-sm">{objective}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Lesson Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Lesson Structure</CardTitle>
            <CardDescription>
              Step-by-step lesson plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-sm mb-1 flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Warm Up</Badge>
              </h3>
              <p className="text-sm pl-4">{lessonPlan.warmUp}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm mb-1 flex items-center gap-2">
                <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">Presentation</Badge>
              </h3>
              <p className="text-sm pl-4">{lessonPlan.presentation}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm mb-1 flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Practice</Badge>
              </h3>
              <p className="text-sm pl-4">{lessonPlan.practice}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm mb-1 flex items-center gap-2">
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Production</Badge>
              </h3>
              <p className="text-sm pl-4">{lessonPlan.production}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm mb-1 flex items-center gap-2">
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Assessment</Badge>
              </h3>
              <p className="text-sm pl-4">{lessonPlan.assessment}</p>
            </div>
          </CardContent>
        </Card>

        {/* Materials */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Materials</CardTitle>
            <CardDescription>
              Resources needed for this lesson
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-1">
              {lessonPlan.materials.map((material, index) => (
                <li key={index} className="text-sm">{material}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Vocabulary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Vocabulary</CardTitle>
            <CardDescription>
              Key terms and phrases for this lesson
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lessonPlan.vocabulary.map((vocabGroup, index) => (
                <p key={index} className="text-sm">{vocabGroup}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes (if any) */}
        {lessonPlan.additionalNotes && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{lessonPlan.additionalNotes}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
};

export default SimpleLessonPlanDisplay;