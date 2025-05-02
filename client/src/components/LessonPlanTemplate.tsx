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

  const renderPlan = (lessonPlan: any) => (
    <Card className="shadow-md border-primary/10 h-full overflow-auto">
      <CardHeader className="bg-gradient-to-b from-primary/10 to-transparent pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-primary">{lessonPlan.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-4">
        <div>
          <h3 className="text-md font-semibold mb-2 text-primary/80">Objectives</h3>
          <ul className="list-disc pl-5 space-y-1">
            {lessonPlan.objectives && lessonPlan.objectives.map((objective: string, index: number) => (
              <li key={index} className="text-sm">{objective}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2 text-primary/80">Materials</h3>
          <ul className="list-disc pl-5 space-y-1">
            {lessonPlan.materials && lessonPlan.materials.map((material: string, index: number) => (
              <li key={index} className="text-sm">{material}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2 text-primary/80">Procedure</h3>
          <ul className="list-disc pl-5 space-y-1">
            {lessonPlan.procedure && lessonPlan.procedure.map((step: string, index: number) => (
              <li key={index} className="text-sm">{step}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2 text-primary/80">Assessment</h3>
          <ul className="list-disc pl-5 space-y-1">
            {lessonPlan.assessment && lessonPlan.assessment.map((item: string, index: number) => (
              <li key={index} className="text-sm">{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2 text-primary/80">Extensions</h3>
          <ul className="list-disc pl-5 space-y-1">
            {lessonPlan.extensions && lessonPlan.extensions.map((extension: string, index: number) => (
              <li key={index} className="text-sm">{extension}</li>
            ))}
          </ul>
        </div>
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
