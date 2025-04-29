import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Download, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface LessonStep {
  title: string;
  duration: string;
  description: string;
  materials?: string[];
  instructions?: string[];
  teacherNotes?: string;
}

export interface LessonPlan {
  id: string;
  title: string;
  duration: string;
  level: string;
  objectives: string[];
  materials: string[];
  steps: LessonStep[];
  assessmentTips?: string;
  homeworkIdeas?: string[];
  additionalResources?: {
    title: string;
    url?: string;
  }[];
}

interface LessonPlanTemplateProps {
  plan: LessonPlan;
  secondaryPlan?: LessonPlan;
  onPrint?: () => void;
  onDownload?: () => void;
}

const LessonPlanTemplate: React.FC<LessonPlanTemplateProps> = ({
  plan,
  secondaryPlan,
  onPrint,
  onDownload
}) => {
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const renderPlan = (lessonPlan: LessonPlan) => (
    <Card className="shadow-md border-primary/10 h-full overflow-auto">
      <CardHeader className="bg-gradient-to-b from-primary/10 to-transparent pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold text-primary">{lessonPlan.title}</CardTitle>
            <CardDescription className="mt-1">
              <span className="font-medium">Duration:</span> {lessonPlan.duration} • <span className="font-medium">Level:</span> {lessonPlan.level}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pb-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary/80">Learning Objectives</h3>
          <ul className="list-disc pl-5 space-y-1">
            {lessonPlan.objectives.map((objective, index) => (
              <li key={index} className="text-sm">{objective}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary/80">Materials Needed</h3>
          <ul className="list-disc pl-5 space-y-1">
            {lessonPlan.materials.map((material, index) => (
              <li key={index} className="text-sm">{material}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary/80">Lesson Procedure</h3>
          <div className="space-y-4">
            {lessonPlan.steps.map((step, index) => (
              <div key={index} className="border-l-2 border-primary/30 pl-4 py-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-primary">{step.title}</h4>
                  <span className="text-xs bg-primary/10 px-2 py-1 rounded-full">{step.duration}</span>
                </div>
                <p className="text-sm mb-2">{step.description}</p>
                
                {step.instructions && step.instructions.length > 0 && (
                  <div className="mb-2">
                    <h5 className="text-xs font-semibold mb-1">Instructions:</h5>
                    <ol className="list-decimal pl-5 text-xs space-y-1">
                      {step.instructions.map((instruction, i) => (
                        <li key={i}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                )}
                
                {step.materials && step.materials.length > 0 && (
                  <div className="mb-2">
                    <h5 className="text-xs font-semibold mb-1">Materials for this step:</h5>
                    <ul className="list-disc pl-5 text-xs space-y-1">
                      {step.materials.map((material, i) => (
                        <li key={i}>{material}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {step.teacherNotes && (
                  <div className="bg-yellow-50 border border-yellow-200 p-2 rounded text-xs mt-2">
                    <h5 className="font-semibold mb-1 text-yellow-700">Teacher Note:</h5>
                    <p className="text-yellow-800">{step.teacherNotes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {lessonPlan.assessmentTips && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary/80">Assessment Tips</h3>
            <p className="text-sm">{lessonPlan.assessmentTips}</p>
          </div>
        )}

        {lessonPlan.homeworkIdeas && lessonPlan.homeworkIdeas.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary/80">Homework Ideas</h3>
            <ul className="list-disc pl-5 space-y-1">
              {lessonPlan.homeworkIdeas.map((homework, index) => (
                <li key={index} className="text-sm">{homework}</li>
              ))}
            </ul>
          </div>
        )}

        {lessonPlan.additionalResources && lessonPlan.additionalResources.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary/80">Additional Resources</h3>
            <ul className="list-disc pl-5 space-y-1">
              {lessonPlan.additionalResources.map((resource, index) => (
                <li key={index} className="text-sm">
                  {resource.url ? (
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center">
                      {resource.title} <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  ) : (
                    resource.title
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="print:p-0 print:m-0">
      <div className="flex justify-end gap-2 mb-4 print:hidden">
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
        </Button>
        {onDownload && (
          <Button variant="outline" size="sm" onClick={onDownload}>
            <Download className="h-4 w-4 mr-2" /> Download PDF
          </Button>
        )}
      </div>

      {secondaryPlan ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderPlan(plan)}
          {renderPlan(secondaryPlan)}
        </div>
      ) : (
        renderPlan(plan)
      )}
    </div>
  );
};

export default LessonPlanTemplate;
