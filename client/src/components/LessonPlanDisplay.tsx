import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LessonPlan, LessonStep } from './LessonPlanTemplate';

interface LessonPlanDisplayProps {
  lessonPlan: LessonPlan;
}

const LessonPlanDisplay: React.FC<LessonPlanDisplayProps> = ({ lessonPlan }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent pb-2">
        <CardTitle className="text-lg font-bold text-primary">{lessonPlan.title}</CardTitle>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span>{lessonPlan.duration}</span>
          <span>|</span>
          <span>Level: {lessonPlan.level}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <h3 className="font-medium mb-1">Objectives</h3>
          <ul className="list-disc pl-5 space-y-0.5">
            {lessonPlan.objectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-1">Materials</h3>
          <ul className="list-disc pl-5 space-y-0.5">
            {lessonPlan.materials.map((material, index) => (
              <li key={index}>{material}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-1">Steps</h3>
          <div className="space-y-2">
            {lessonPlan.steps.map((step: LessonStep, index) => (
              <div key={index} className="bg-muted/50 p-2 rounded">
                <div className="flex justify-between">
                  <h4 className="font-medium">{step.title}</h4>
                  <span className="text-xs bg-primary/20 px-2 py-0.5 rounded-full">{step.duration}</span>
                </div>
                <p className="text-sm mt-1">{step.description}</p>
                {step.materials && (
                  <div className="mt-1">
                    <span className="text-xs font-medium">Materials:</span>
                    <ul className="list-disc pl-5 text-xs">
                      {step.materials.map((material, idx) => (
                        <li key={idx}>{material}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {step.instructions && (
                  <div className="mt-1">
                    <span className="text-xs font-medium">Instructions:</span>
                    <ol className="list-decimal pl-5 text-xs">
                      {step.instructions.map((instruction, idx) => (
                        <li key={idx}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {lessonPlan.assessmentTips && (
          <div>
            <h3 className="font-medium mb-1">Assessment Tips</h3>
            <p className="text-sm">{lessonPlan.assessmentTips}</p>
          </div>
        )}

        {lessonPlan.homeworkIdeas && lessonPlan.homeworkIdeas.length > 0 && (
          <div>
            <h3 className="font-medium mb-1">Homework Ideas</h3>
            <ul className="list-disc pl-5 space-y-0.5">
              {lessonPlan.homeworkIdeas.map((idea, index) => (
                <li key={index}>{idea}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground bg-muted/30 pb-2">
        Lesson ID: {lessonPlan.id}
      </CardFooter>
    </Card>
  );
};

export default LessonPlanDisplay;