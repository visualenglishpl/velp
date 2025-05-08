import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";

interface Step {
  title: string;
  description: string;
  content: ReactNode;
}

interface CheckoutWizardProps {
  steps: Step[];
  onComplete: () => void;
}

export function CheckoutWizard({ steps, onComplete }: CheckoutWizardProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const goToNextStep = () => {
    if (!isLastStep) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStepIndex)) {
        setCompletedSteps([...completedSteps, currentStepIndex]);
      }
      // Go to next step
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onComplete();
    }
  };

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToStep = (index: number) => {
    // Only allow going to completed steps or the current step + 1
    if (completedSteps.includes(index) || index === currentStepIndex || index === currentStepIndex + 1) {
      setCurrentStepIndex(index);
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center"
            onClick={() => goToStep(index)}
          >
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStepIndex === index 
                  ? "bg-blue-600 text-white" 
                  : completedSteps.includes(index)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
              } ${(completedSteps.includes(index) || index === currentStepIndex || index === currentStepIndex + 1) ? "cursor-pointer" : "opacity-50"}`}
            >
              {completedSteps.includes(index) ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="text-xs mt-1 text-center max-w-[80px]">{step.title}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar Connector */}
      <div className="relative mt-2">
        <div className="absolute top-0 left-5 right-5 h-1 bg-gray-200"></div>
        <div 
          className="absolute top-0 left-5 h-1 bg-blue-600 transition-all duration-300"
          style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>

      {/* Current Step Content */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold">{currentStep.title}</h2>
          <p className="text-gray-600">{currentStep.description}</p>
        </div>
        <div className="mb-8">{currentStep.content}</div>
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={goToPreviousStep}
            disabled={isFirstStep}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={goToNextStep}
          >
            {isLastStep ? 'Complete' : 'Next'}
            {!isLastStep && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </Card>
    </div>
  );
}