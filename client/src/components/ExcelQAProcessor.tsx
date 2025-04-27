import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileSpreadsheet, Check, RefreshCcw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ExcelQAProcessor: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState('1');
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
      // Pass the selected book ID as a query parameter
      const response = await apiRequest('GET', `/api/direct/process-qa-excel?bookId=${selectedBook}`);
      const result = await response.json();

      if (result.success) {
        setProcessResult({
          success: true,
          message: result.message,
          mappingCount: result.mappingCount
        });
        
        toast({
          title: "Success!",
          description: `Processed Excel file for Book ${selectedBook} and extracted ${result.mappingCount} Q&A mappings.`,
          variant: "default"
        });
      } else {
        setProcessResult({
          success: false,
          message: `Failed to process Excel file for Book ${selectedBook}`,
          error: result.error
        });
        
        toast({
          title: "Error",
          description: result.error || `Failed to process Excel file for Book ${selectedBook}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error(`Error processing Excel file for Book ${selectedBook}:`, error);
      setProcessResult({
        success: false,
        message: `Error processing Excel file for Book ${selectedBook}`,
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
          This process will download the Excel file containing questions and answers for the selected book,
          parse the mappings, and generate a TypeScript file that can be used to automatically match
          slide filenames with their corresponding questions and answers.
        </p>
        
        <div className="mb-4 space-y-2">
          <Label htmlFor="book-select">Select Book</Label>
          <Select 
            value={selectedBook} 
            onValueChange={setSelectedBook}
            disabled={isLoading}
          >
            <SelectTrigger id="book-select" className="w-full">
              <SelectValue placeholder="Select book">Book {selectedBook}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Book 1</SelectItem>
              <SelectItem value="2">Book 2</SelectItem>
              <SelectItem value="3">Book 3</SelectItem>
              <SelectItem value="4">Book 4</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Will process "VISUAL {selectedBook} QUESTIONS.xlsx" from S3 bucket
          </p>
        </div>
        
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
              Processing Book {selectedBook}...
            </>
          ) : (
            `Process Book ${selectedBook} Excel File`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExcelQAProcessor;