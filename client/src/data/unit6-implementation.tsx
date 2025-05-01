import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Trash2 } from "lucide-react";
import LessonPlanTemplate from "@/components/LessonPlanTemplate";
import { britishCurrencyLessonPlan, internationalMoneyLessonPlan, spendingSavingLessonPlan } from "./lesson-plans-unit6";
import { unit6Resources } from "./unit6-resources";

// Function to generate Unit 6 lesson plans UI component
export const getUnit6LessonPlans = (bookId: string, unitId: string, isEditMode: boolean, setConfirmDelete: any) => {
  return (
    <div className="mt-6 space-y-8">
      <h3 className="text-lg font-semibold mb-4">Built-in Lesson Plans</h3>
      <div className="lesson-plan-grid">
        <div>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex justify-between text-lg">
                    <span>British Currency and Money</span>
                    <span className="text-sm font-normal ml-2">45 min</span>
                  </CardTitle>
                  <CardDescription></CardDescription>
                </div>
                {isEditMode && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs flex items-center text-destructive" 
                    onClick={() => setConfirmDelete({ id: 'british-currency-1', title: 'British Currency and Money', bookId, unitId, resourceType: 'lesson' })}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto">
              <LessonPlanTemplate plan={britishCurrencyLessonPlan} />
            </CardContent>
            <CardFooter className="bg-muted/20 pt-3 pb-3">
              <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex justify-between text-lg">
                    <span>International Money and Exchange</span>
                    <span className="text-sm font-normal ml-2">45 min</span>
                  </CardTitle>
                  <CardDescription></CardDescription>
                </div>
                {isEditMode && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs flex items-center text-destructive" 
                    onClick={() => setConfirmDelete({ id: 'international-money-1', title: 'International Money and Exchange', bookId, unitId, resourceType: 'lesson' })}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto">
              <LessonPlanTemplate plan={internationalMoneyLessonPlan} />
            </CardContent>
            <CardFooter className="bg-muted/20 pt-3 pb-3">
              <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex justify-between text-lg">
                    <span>Spending and Saving Money</span>
                    <span className="text-sm font-normal ml-2">45 min</span>
                  </CardTitle>
                  <CardDescription></CardDescription>
                </div>
                {isEditMode && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs flex items-center text-destructive" 
                    onClick={() => setConfirmDelete({ id: 'spending-saving-1', title: 'Spending and Saving Money', bookId, unitId, resourceType: 'lesson' })}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto">
              <LessonPlanTemplate plan={spendingSavingLessonPlan} />
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
};

// Function to get Unit 6 predefined resources
export const getUnit6Resources = () => {
  return unit6Resources;
};
