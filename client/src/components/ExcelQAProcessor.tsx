import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileSpreadsheet, Check, RefreshCcw } from "lucide-react";

const ExcelQAProcessor: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [processResult, setProcessResult] = useState<{
    success: boolean;
    message: string;
    mappingCount?: number;
    error?: string;
  } | null>(null);
  const { toast } = useToast();

  const processExcelFile = async () => {
    setIsLoading(true);
    setProcessResult(null);

    try {
      const response = await apiRequest('GET', '/api/direct/process-qa-excel');
      const result = await response.json();

      if (result.success) {
        setProcessResult({
          success: true,
          message: result.message,
          mappingCount: result.mappingCount
        });
        
        toast({
          title: "Success!",
          description: `Processed Excel file and extracted ${result.mappingCount} Q&A mappings.`,
          variant: "default"
        });
      } else {
        setProcessResult({
          success: false,
          message: "Failed to process Excel file",
          error: result.error
        });
        
        toast({
          title: "Error",
          description: result.error || "Failed to process Excel file",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error processing Excel file:", error);
      setProcessResult({
        success: false,
        message: "Error processing Excel file",
        error: error instanceof Error ? error.message : String(error)
      });
      
      toast({
        title: "Error",
        description: "Failed to connect to the server",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Excel Q&A Processor
        </CardTitle>
        <CardDescription>
          Download and process Excel file from S3 to extract questions and answers for slides
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">
          This process will download the Excel file "VISUAL 1 QUESTIONS.xlsx" from S3,
          parse the question and answer mappings, and generate a TypeScript file that
          can be used to automatically match slide filenames with their corresponding
          questions and answers.
        </p>
        
        {processResult && (
          <div className={`my-4 p-3 rounded-md ${processResult.success ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-900'}`}>
            <div className="flex items-start gap-2">
              {processResult.success ? (
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              )}
              <div>
                <h4 className="font-medium">{processResult.message}</h4>
                {processResult.success && processResult.mappingCount && (
                  <p className="text-sm">Successfully mapped {processResult.mappingCount} questions and answers.</p>
                )}
                {!processResult.success && processResult.error && (
                  <p className="text-sm text-red-700">{processResult.error}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={processExcelFile} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Process Excel File'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExcelQAProcessor;