import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { getQueryFn, apiRequest, queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Import sample resources for Book 7, Unit 6
import { unit6Resources, britishCurrencyLessonPlan, internationalMoneyLessonPlan, spendingSavingLessonPlan } from '@/data/unit6-resources';

// Import centralized resources for Books 5 and 6
import { generateBook6UnitResources, generateDefaultBook6UnitLessonPlans, BOOK6_UNIT_TITLES } from '@/data/book6-resources-common';
import { generateBook5UnitResources, generateDefaultBook5UnitLessonPlans, BOOK5_UNIT_TITLES } from '@/data/book5-resources-common';

// Import any specific implementation functions
// Book 6 implementations
import { getBook6Unit5Resources, getBook6Unit5LessonPlans } from '@/data/book6-unit5-implementation';
import { getBook6Unit9Resources, getBook6Unit9LessonPlans } from '@/data/book6-unit9-implementation';
import { getBook6Unit10Resources, getBook6Unit10LessonPlans } from '@/data/book6-unit10-implementation';
import { generateBook6Unit13Content, generateUnit13LessonPlans as generateBook6Unit13LessonPlans } from '@/data/book6-unit13-implementation';
import { generateBook6Unit14Content, generateUnit14LessonPlans as generateBook6Unit14LessonPlans } from '@/data/book6-unit14-implementation';
import { generateBook6Unit15Content, generateUnit15LessonPlans as generateBook6Unit15LessonPlans } from '@/data/book6-unit15-implementation';
import { generateBook6Unit16Content, generateUnit16LessonPlans as generateBook6Unit16LessonPlans } from '@/data/book6-unit16-implementation';

// Book 5 implementations
import { generateBook5Unit1Content, generateUnit1LessonPlans } from '@/data/book5-unit1-implementation';
import { generateBook5Unit5Content, generateUnit5LessonPlans } from '@/data/book5-unit5-implementation';
import { generateBook5Unit9Content, generateUnit9LessonPlans } from '@/data/book5-unit9-implementation';
import { generateBook5Unit13Content, generateUnit13LessonPlans } from '@/data/book5-unit13-implementation';

// Book 2 implementations
import { getBook2Unit5Resources, generateUnit5LessonPlans as generateBook2Unit5LessonPlans } from '@/data/book2-unit5-implementation';
import { getBook2Unit8Resources, generateUnit8LessonPlans as generateBook2Unit8LessonPlans } from '@/data/book2-unit8-implementation';
import { getBook2Unit10Resources, generateUnit10LessonPlans } from '@/data/book2-unit10-implementation';
import { getBook2Unit14Resources, generateUnit14LessonPlans } from '@/data/book2-unit14-implementation';
import { getBook2Unit15Resources, generateUnit15LessonPlans } from '@/data/book2-unit15-implementation';
import { getBook2Unit16Resources, generateUnit16LessonPlans } from '@/data/book2-unit16-implementation';
import { getBook2Unit17Resources, generateUnit17LessonPlans } from '@/data/book2-unit17-implementation';
import { getBook2Unit18Resources, generateUnit18LessonPlans } from '@/data/book2-unit18-implementation';

// Book 1 implementations
import { generateUnit1LessonPlans as generateBook1Unit1LessonPlans } from '@/data/book1-unit1-implementation';
import { generateUnit2LessonPlans as generateBook1Unit2LessonPlans } from '@/data/book1-unit2-implementation';
import { generateUnit3LessonPlans as generateBook1Unit3LessonPlans } from '@/data/book1-unit3-implementation';
import { generateUnit4LessonPlans as generateBook1Unit4LessonPlans } from '@/data/book1-unit4-implementation';
import { generateUnit5LessonPlans as generateBook1Unit5LessonPlans } from '@/data/book1-unit5-implementation';
import { generateUnit6LessonPlans as generateBook1Unit6LessonPlans } from '@/data/book1-unit6-implementation';
import { getBook1Unit6Resources } from '@/data/book1-unit6-implementation';
import { getBook1Unit7Resources, generateUnit7LessonPlans as generateBook1Unit7LessonPlans } from '@/data/book1-unit7-implementation';
import { getBook1Unit8Resources, generateUnit8LessonPlans as generateBook1Unit8LessonPlans } from '@/data/book1-unit8-implementation';
import { getBook1Unit9Resources, generateUnit9LessonPlans as generateBook1Unit9LessonPlans } from '@/data/book1-unit9-implementation';
import { getBook1Unit10Resources, generateUnit10LessonPlans as generateBook1Unit10LessonPlans } from '@/data/book1-unit10-implementation';
import { getBook1Unit11Resources, generateUnit11LessonPlans as generateBook1Unit11LessonPlans } from '@/data/book1-unit11-implementation';
import { getBook1Unit12Resources, generateUnit12LessonPlans as generateBook1Unit12LessonPlans } from '@/data/book1-unit12-implementation';
import { getBook1Unit13Resources, generateUnit13LessonPlans as generateBook1Unit13LessonPlans } from '@/data/book1-unit13-implementation';
import { getBook1Unit14Resources, generateUnit14LessonPlans as generateBook1Unit14LessonPlans } from '@/data/book1-unit14-implementation';
import { getBook1Unit15Resources, generateUnit15LessonPlans as generateBook1Unit15LessonPlans } from '@/data/book1-unit15-implementation';
import { getBook1Unit16Resources, generateUnit16LessonPlans as generateBook1Unit16LessonPlans } from '@/data/book1-unit16-implementation';
import { getBook1Unit17Resources, generateUnit17LessonPlans as generateBook1Unit17LessonPlans } from '@/data/book1-unit17-implementation';
import { getBook1Unit18Resources, generateUnit18LessonPlans as generateBook1Unit18LessonPlans } from '@/data/book1-unit18-implementation';

import { book1Unit1Resources, book1Unit1VideoResources, book1Unit1GameResources } from '@/data/book1-unit1-resources';
import { book1Unit2Resources, book1Unit2VideoResources, book1Unit2GameResources } from '@/data/book1-unit2-resources';
import { book1Unit3Resources, book1Unit3VideoResources, book1Unit3GameResources } from '@/data/book1-unit3-resources';
import { book1Unit4Resources, book1Unit4VideoResources, book1Unit4GameResources } from '@/data/book1-unit4-resources';
import { book1Unit5Resources, book1Unit5VideoResources, book1Unit5GameResources } from '@/data/book1-unit5-resources';
import { book1Unit6Resources } from '@/data/book1-unit6-resources';
import { book1Unit7Resources } from '@/data/book1-unit7-resources';
import { book1Unit8Resources } from '@/data/book1-unit8-resources';
import { book1Unit9Resources } from '@/data/book1-unit9-resources';
import { book1Unit10Resources } from '@/data/book1-unit10-resources';
import { book1Unit11Resources } from '@/data/book1-unit11-resources';
import { book1Unit12Resources } from '@/data/book1-unit12-resources';
import { book1Unit13Resources } from '@/data/book1-unit13-resources';
import { book1Unit14Resources } from '@/data/book1-unit14-resources';
import { book1Unit15Resources } from '@/data/book1-unit15-resources';
import { book1Unit16Resources } from '@/data/book1-unit16-resources';
import { book1Unit17Resources } from '@/data/book1-unit17-resources';
import { book1Unit18Resources } from '@/data/book1-unit18-resources';

// Book 2 resource imports
import { book2Unit5Resources } from '@/data/book2-unit5-resources';
import { book2Unit10Resources } from '@/data/book2-unit10-resources';
import { book2Unit11Resources } from '@/data/book2-unit11-resources';
import { book2Unit12Resources } from '@/data/book2-unit12-resources';
import { book2Unit13Resources } from '@/data/book2-unit13-resources';
import { book2Unit14Resources } from '@/data/book2-unit14-resources';
import { book2Unit15Resources } from '@/data/book2-unit15-resources';
import { book2Unit16Resources } from '@/data/book2-unit16-resources';
import { book2Unit17Resources } from '@/data/book2-unit17-resources';
import { book2Unit18Resources } from '@/data/book2-unit18-resources';

// Define fallback functions for resource getters
// These functions will be used if the dynamic imports fail
const defaultResourceGetter = (bookId: string, unitId: string) => {
  console.log(`Using default resource getter for Book ${bookId}, Unit ${unitId}`);
  return [];
};

const defaultLessonPlanGetter = () => {
  console.log('Using default lesson plan getter');
  return [];
};

// Add CSS for responsive grid layout
import "@/styles/teacher-resources-grid.css";
import { Gamepad2, Video, FileText, Pencil, Trash2, Plus, ExternalLink, Book, Printer, Image, PenLine, CheckCircle, Maximize2 } from 'lucide-react';
import LessonPlanTemplate, { LessonPlan } from '@/components/LessonPlanTemplate';
import PDFViewer from '@/components/PDFViewer';

// Dynamic imports for unit implementations
const dynamicImplImport = async (book: string, unit: number) => {
  try {
    // Book 0A implementations
    if (book === '0a') {
      switch(unit) {
        case 1: return import('@/data/book0a-unit1-implementation');
        case 2: return import('@/data/book0a-unit2-implementation');
        case 3: return import('@/data/book0a-unit3-implementation');
        case 4: return import('@/data/book0a-unit4-implementation');
        case 5: return import('@/data/book0a-unit5-implementation');
        case 6: return import('@/data/book0a-unit6-implementation');
        case 7: return import('@/data/book0a-unit7-implementation');
        case 8: return import('@/data/book0a-unit8-implementation');
        case 9: return import('@/data/book0a-unit9-implementation');
        case 10: return import('@/data/book0a-unit10-implementation');
        case 11: return import('@/data/book0a-unit11-implementation');
        case 12: return import('@/data/book0a-unit12-implementation');
        case 13: return import('@/data/book0a-unit13-implementation');
        case 14: return import('@/data/book0a-unit14-implementation');
        case 15: return import('@/data/book0a-unit15-implementation');
        case 16: return import('@/data/book0a-unit16-implementation');
        case 17: return import('@/data/book0a-unit17-implementation');
        case 18: return import('@/data/book0a-unit18-implementation');
        case 19: return import('@/data/book0a-unit19-implementation');
        case 20: return import('@/data/book0a-unit20-implementation');
        default: return null;
      }
    }
    // Book 0B implementations
    else if (book === '0b') {
      switch(unit) {
        case 1: return import('@/data/book0b-unit1-implementation');
        case 2: return import('@/data/book0b-unit2-implementation');
        case 3: return import('@/data/book0b-unit3-implementation');
        case 4: return import('@/data/book0b-unit4-implementation');
        case 5: return import('@/data/book0b-unit5-implementation');
        case 6: return import('@/data/book0b-unit6-implementation');
        case 7: return import('@/data/book0b-unit7-implementation');
        case 8: return import('@/data/book0b-unit8-implementation');
        case 9: return import('@/data/book0b-unit9-implementation');
        case 10: return import('@/data/book0b-unit10-implementation');
        case 11: return import('@/data/book0b-unit11-implementation');
        case 12: return import('@/data/book0b-unit12-implementation');
        case 13: return import('@/data/book0b-unit13-implementation');
        case 14: return import('@/data/book0b-unit14-implementation');
        case 15: return import('@/data/book0b-unit15-implementation');
        case 16: return import('@/data/book0b-unit16-implementation');
        case 17: return import('@/data/book0b-unit17-implementation');
        case 18: return import('@/data/book0b-unit18-implementation');
        case 19: return import('@/data/book0b-unit19-implementation');
        case 20: return import('@/data/book0b-unit20-implementation');
        default: return null;
      }
    }
    // Book 0C implementations
    else if (book === '0c') {
      switch(unit) {
        case 1: return import('@/data/book0c-unit1-implementation');
        case 2: return import('@/data/book0c-unit2-implementation');
        case 3: return import('@/data/book0c-unit3-implementation');
        case 4: return import('@/data/book0c-unit4-implementation');
        case 5: return import('@/data/book0c-unit5-implementation');
        case 6: return import('@/data/book0c-unit6-implementation');
        case 7: return import('@/data/book0c-unit7-implementation');
        case 8: return import('@/data/book0c-unit8-implementation');
        case 9: return import('@/data/book0c-unit9-implementation');
        case 10: return import('@/data/book0c-unit10-implementation');
        case 11: return import('@/data/book0c-unit11-implementation');
        case 12: return import('@/data/book0c-unit12-implementation');
        case 13: return import('@/data/book0c-unit13-implementation');
        case 14: return import('@/data/book0c-unit14-implementation');
        case 15: return import('@/data/book0c-unit15-implementation');
        case 16: return import('@/data/book0c-unit16-implementation');
        case 17: return import('@/data/book0c-unit17-implementation');
        case 18: return import('@/data/book0c-unit18-implementation');
        case 19: return import('@/data/book0c-unit19-implementation');
        case 20: return import('@/data/book0c-unit20-implementation');
        default: return null;
      }
    }
    // Book 1 implementations
    else if (book === '1') {
      switch(unit) {
        case 1: return import('@/data/book1-unit1-implementation');
        case 2: return import('@/data/book1-unit2-implementation');
        case 3: return import('@/data/book1-unit3-implementation');
        case 4: return import('@/data/book1-unit4-implementation');
        case 5: return import('@/data/book1-unit5-implementation');
        case 6: return import('@/data/book1-unit6-implementation');
        case 7: return import('@/data/book1-unit7-implementation');
        case 8: return import('@/data/book1-unit8-implementation');
        case 9: return import('@/data/book1-unit9-implementation');
        case 10: return import('@/data/book1-unit10-implementation');
        case 11: return import('@/data/book1-unit11-implementation');
        case 12: return import('@/data/book1-unit12-implementation');
        case 13: return import('@/data/book1-unit13-implementation');
        case 14: return import('@/data/book1-unit14-implementation');
        case 15: return import('@/data/book1-unit15-implementation');
        case 16: return import('@/data/book1-unit16-implementation');
        case 17: return import('@/data/book1-unit17-implementation');
        case 18: return import('@/data/book1-unit18-implementation');
        default: return null;
      }
    }
    // Book 2 implementations
    else if (book === '2') {
      switch(unit) {
        case 1: return import('@/data/book2-unit1-implementation');
        case 2: return import('@/data/book2-unit2-implementation');
        case 3: return import('@/data/book2-unit3-implementation');
        case 4: return import('@/data/book2-unit4-implementation');
        case 5: return import('@/data/book2-unit5-implementation');
        case 6: return import('@/data/book2-unit6-implementation');
        case 7: return import('@/data/book2-unit7-implementation');
        case 8: return import('@/data/book2-unit8-implementation');
        case 9: return import('@/data/book2-unit9-implementation');
        case 10: return import('@/data/book2-unit10-implementation');
        case 11: return import('@/data/book2-unit11-implementation');
        case 12: return import('@/data/book2-unit12-implementation');
        case 13: return import('@/data/book2-unit13-implementation');
        case 14: return import('@/data/book2-unit14-implementation');
        case 15: return import('@/data/book2-unit15-implementation');
        case 16: return import('@/data/book2-unit16-implementation');
        case 17: return import('@/data/book2-unit17-implementation');
        case 18: return import('@/data/book2-unit18-implementation');
        default: return null;
      }
    }
    // Book 3 implementations
    else if (book === '3') {
      switch(unit) {
        case 1: return import('@/data/book3-unit1-implementation');
        case 2: return import('@/data/book3-unit2-implementation');
        case 3: return import('@/data/book3-unit3-implementation');
        case 4: return import('@/data/book3-unit4-implementation');
        case 5: return import('@/data/book3-unit5-implementation');
        case 6: return import('@/data/book3-unit6-implementation');
        case 7: return import('@/data/book3-unit7-implementation');
        case 8: return import('@/data/book3-unit8-implementation');
        case 9: return import('@/data/book3-unit9-implementation');
        case 10: return import('@/data/book3-unit10-implementation');
        case 11: return import('@/data/book3-unit11-implementation');
        case 12: return import('@/data/book3-unit12-implementation');
        case 13: return import('@/data/book3-unit13-implementation');
        case 14: return import('@/data/book3-unit14-implementation');
        case 15: return import('@/data/book3-unit15-implementation');
        case 16: return import('@/data/book3-unit16-implementation');
        case 17: return import('@/data/book3-unit17-implementation');
        case 18: return import('@/data/book3-unit18-implementation');
        default: return null;
      }
    }
    // Book 4 implementations
    else if (book === '4') {
      switch(unit) {
        case 1: return import('@/data/book4-unit1-implementation');
        case 2: return import('@/data/book4-unit2-implementation');
        case 3: return import('@/data/book4-unit3-implementation');
        case 4: return import('@/data/book4-unit4-implementation');
        case 5: return import('@/data/book4-unit5-implementation');
        case 6: return import('@/data/book4-unit6-implementation');
        case 7: return import('@/data/book4-unit7-implementation');
        case 8: return import('@/data/book4-unit8-implementation');
        case 9: return import('@/data/book4-unit9-implementation');
        case 10: return import('@/data/book4-unit10-implementation');
        case 11: return import('@/data/book4-unit11-implementation');
        case 12: return import('@/data/book4-unit12-implementation');
        case 13: return import('@/data/book4-unit13-implementation');
        case 14: return import('@/data/book4-unit14-implementation');
        case 15: return import('@/data/book4-unit15-implementation');
        case 16: return import('@/data/book4-unit16-implementation');
        default: return null;
      }
    }
    // Book 5 implementations
    else if (book === '5') {
      switch(unit) {
        case 1: return import('@/data/book5-unit1-implementation');
        case 2: return import('@/data/book5-unit2-implementation');
        case 3: return import('@/data/book5-unit3-implementation');
        case 4: return import('@/data/book5-unit4-implementation');
        case 5: return import('@/data/book5-unit5-implementation');
        case 6: return import('@/data/book5-unit6-implementation');
        case 7: return import('@/data/book5-unit7-implementation');
        case 8: return import('@/data/book5-unit8-implementation');
        case 9: return import('@/data/book5-unit9-implementation');
        case 10: return import('@/data/book5-unit10-implementation');
        case 11: return import('@/data/book5-unit11-implementation');
        case 12: return import('@/data/book5-unit12-implementation');
        case 13: return import('@/data/book5-unit13-implementation');
        case 14: return import('@/data/book5-unit14-implementation');
        case 15: return import('@/data/book5-unit15-implementation');
        case 16: return import('@/data/book5-unit16-implementation');
        default: return null;
      }
    }
    // Book 6 implementations
    else if (book === '6') {
      switch(unit) {
        case 1: return import('@/data/book6-unit1-implementation');
        case 2: return import('@/data/book6-unit2-implementation');
        case 3: return import('@/data/book6-unit3-implementation');
        case 4: return import('@/data/book6-unit4-implementation');
        case 5: return import('@/data/book6-unit5-implementation');
        case 6: return import('@/data/book6-unit6-implementation');
        case 7: return import('@/data/book6-unit7-implementation');
        case 8: return import('@/data/book6-unit8-implementation');
        case 9: return import('@/data/book6-unit9-implementation');
        case 10: return import('@/data/book6-unit10-implementation');
        case 11: return import('@/data/book6-unit11-implementation');
        case 12: return import('@/data/book6-unit12-implementation');
        case 13: return import('@/data/book6-unit13-implementation');
        case 14: return import('@/data/book6-unit14-implementation');
        case 15: return import('@/data/book6-unit15-implementation');
        case 16: return import('@/data/book6-unit16-implementation');
        default: return null;
      }
    }
    // Book 7 implementations - support both with and without prefix for backwards compatibility
    else if (book === '7' || !book) { // Default to book 7 if no book specified
      switch(unit) {
        case 1: return import('@/data/book7-unit1-implementation');
        case 2: return import('@/data/book7-unit2-implementation');
        case 3: return import('@/data/book7-unit3-implementation');
        case 4: return import('@/data/book7-unit4-implementation');
        case 5: return import('@/data/book7-unit5-implementation');
        case 6: 
          try { return import('@/data/book7-unit6-implementation'); } 
          catch { return import('@/data/unit6-implementation'); }
        case 7: 
          try { return import('@/data/book7-unit7-implementation'); } 
          catch { return import('@/data/unit7-implementation'); }
        case 8: 
          try { return import('@/data/book7-unit8-implementation'); } 
          catch { return import('@/data/unit8-implementation'); }
        case 9: 
          try { return import('@/data/book7-unit9-implementation'); } 
          catch { return import('@/data/unit9-implementation'); }
        case 10: 
          try { return import('@/data/book7-unit10-implementation'); } 
          catch { return import('@/data/unit10-implementation'); }
        case 11: 
          try { return import('@/data/book7-unit11-implementation'); } 
          catch { return import('@/data/unit11-implementation'); }
        case 12: 
          try { return import('@/data/book7-unit12-implementation'); } 
          catch { return import('@/data/unit12-implementation'); }
        case 13: 
          try { return import('@/data/book7-unit13-implementation'); } 
          catch { return import('@/data/unit13-implementation'); }
        case 14: 
          try { return import('@/data/book7-unit14-implementation'); } 
          catch { return import('@/data/unit14-implementation'); }
        case 15: 
          try { return import('@/data/book7-unit15-implementation'); } 
          catch { return import('@/data/unit15-implementation'); }
        case 16: 
          try { return import('@/data/book7-unit16-implementation'); } 
          catch { return import('@/data/unit16-implementation'); }
        default: return null;
      }
    }
    return null;
  } catch (error) {
    console.error(`Error loading implementation for Book ${book}, Unit ${unit}:`, error);
    return null;
  }
};

// Resource imports via dynamic loading
const dynamicResourceImport = async (book: string, unit: number) => {
  try {
    // Book 0A resources
    if (book === '0a') {
      switch(unit) {
        case 1: return import('@/data/book0a-unit1-resources');
        case 2: return import('@/data/book0a-unit2-resources');
        case 3: return import('@/data/book0a-unit3-resources');
        case 4: return import('@/data/book0a-unit4-resources');
        case 5: return import('@/data/book0a-unit5-resources');
        case 6: return import('@/data/book0a-unit6-resources');
        case 7: return import('@/data/book0a-unit7-resources');
        case 8: return import('@/data/book0a-unit8-resources');
        case 9: return import('@/data/book0a-unit9-resources');
        case 10: return import('@/data/book0a-unit10-resources');
        case 11: return import('@/data/book0a-unit11-resources');
        case 12: return import('@/data/book0a-unit12-resources');
        case 13: return import('@/data/book0a-unit13-resources');
        case 14: return import('@/data/book0a-unit14-resources');
        case 15: return import('@/data/book0a-unit15-resources');
        case 16: return import('@/data/book0a-unit16-resources');
        case 17: return import('@/data/book0a-unit17-resources');
        case 18: return import('@/data/book0a-unit18-resources');
        case 19: return import('@/data/book0a-unit19-resources');
        case 20: return import('@/data/book0a-unit20-resources');
        default: return null;
      }
    }
    // Book 0B resources
    else if (book === '0b') {
      switch(unit) {
        case 1: return import('@/data/book0b-unit1-resources');
        case 2: return import('@/data/book0b-unit2-resources');
        case 3: return import('@/data/book0b-unit3-resources');
        case 4: return import('@/data/book0b-unit4-resources');
        case 5: return import('@/data/book0b-unit5-resources');
        case 6: return import('@/data/book0b-unit6-resources');
        case 7: return import('@/data/book0b-unit7-resources');
        case 8: return import('@/data/book0b-unit8-resources');
        case 9: return import('@/data/book0b-unit9-resources');
        case 10: return import('@/data/book0b-unit10-resources');
        case 11: return import('@/data/book0b-unit11-resources');
        case 12: return import('@/data/book0b-unit12-resources');
        case 13: return import('@/data/book0b-unit13-resources');
        case 14: return import('@/data/book0b-unit14-resources');
        case 15: return import('@/data/book0b-unit15-resources');
        case 16: return import('@/data/book0b-unit16-resources');
        case 17: return import('@/data/book0b-unit17-resources');
        case 18: return import('@/data/book0b-unit18-resources');
        case 19: return import('@/data/book0b-unit19-resources');
        case 20: return import('@/data/book0b-unit20-resources');
        default: return null;
      }
    }
    // Book 0C resources
    else if (book === '0c') {
      switch(unit) {
        case 1: return import('@/data/book0c-unit1-resources');
        case 2: return import('@/data/book0c-unit2-resources');
        case 3: return import('@/data/book0c-unit3-resources');
        case 4: return import('@/data/book0c-unit4-resources');
        case 5: return import('@/data/book0c-unit5-resources');
        case 6: return import('@/data/book0c-unit6-resources');
        case 7: return import('@/data/book0c-unit7-resources');
        case 8: return import('@/data/book0c-unit8-resources');
        case 9: return import('@/data/book0c-unit9-resources');
        case 10: return import('@/data/book0c-unit10-resources');
        case 11: return import('@/data/book0c-unit11-resources');
        case 12: return import('@/data/book0c-unit12-resources');
        case 13: return import('@/data/book0c-unit13-resources');
        case 14: return import('@/data/book0c-unit14-resources');
        case 15: return import('@/data/book0c-unit15-resources');
        case 16: return import('@/data/book0c-unit16-resources');
        case 17: return import('@/data/book0c-unit17-resources');
        case 18: return import('@/data/book0c-unit18-resources');
        case 19: return import('@/data/book0c-unit19-resources');
        case 20: return import('@/data/book0c-unit20-resources');
        default: return null;
      }
    }
    // Book 1 resources
    else if (book === '1') {
      switch(unit) {
        case 1: return import('@/data/book1-unit1-resources');
        case 2: return import('@/data/book1-unit2-resources');
        case 3: return import('@/data/book1-unit3-resources');
        case 4: return import('@/data/book1-unit4-resources');
        case 5: return import('@/data/book1-unit5-resources');
        case 6: return import('@/data/book1-unit6-resources');
        case 7: return import('@/data/book1-unit7-resources');
        case 8: return import('@/data/book1-unit8-resources');
        case 9: return import('@/data/book1-unit9-resources');
        case 10: return import('@/data/book1-unit10-resources');
        case 11: return import('@/data/book1-unit11-resources');
        case 12: return import('@/data/book1-unit12-resources');
        case 13: return import('@/data/book1-unit13-resources');
        case 14: return import('@/data/book1-unit14-resources');
        case 15: return import('@/data/book1-unit15-resources');
        case 16: return import('@/data/book1-unit16-resources');
        case 17: return import('@/data/book1-unit17-resources');
        case 18: return import('@/data/book1-unit18-resources');
        default: return null;
      }
    }
    // Book 2 resources
    else if (book === '2') {
      switch(unit) {
        case 1: return import('@/data/book2-unit1-resources');
        case 2: return import('@/data/book2-unit2-resources');
        case 3: return import('@/data/book2-unit3-resources');
        case 4: return import('@/data/book2-unit4-resources');
        case 5: return import('@/data/book2-unit5-resources');
        case 6: return import('@/data/book2-unit6-resources');
        case 7: return import('@/data/book2-unit7-resources');
        case 8: return import('@/data/book2-unit8-resources');
        case 9: return import('@/data/book2-unit9-resources');
        case 10: return import('@/data/book2-unit10-resources');
        case 11: return import('@/data/book2-unit11-resources');
        case 12: return import('@/data/book2-unit12-resources');
        case 13: return import('@/data/book2-unit13-resources');
        case 14: return import('@/data/book2-unit14-resources');
        case 15: return import('@/data/book2-unit15-resources');
        case 16: return import('@/data/book2-unit16-resources');
        case 17: return import('@/data/book2-unit17-resources');
        case 18: return import('@/data/book2-unit18-resources');
        default: return null;
      }
    }
    // Book 3 resources
    else if (book === '3') {
      switch(unit) {
        case 1: return import('@/data/book3-unit1-resources');
        case 2: return import('@/data/book3-unit2-resources');
        case 3: return import('@/data/book3-unit3-resources');
        case 4: return import('@/data/book3-unit4-resources');
        case 5: return import('@/data/book3-unit5-resources');
        case 6: return import('@/data/book3-unit6-resources');
        case 7: return import('@/data/book3-unit7-resources');
        case 8: return import('@/data/book3-unit8-resources');
        case 9: return import('@/data/book3-unit9-resources');
        case 10: return import('@/data/book3-unit10-resources');
        case 11: return import('@/data/book3-unit11-resources');
        case 12: return import('@/data/book3-unit12-resources');
        case 13: return import('@/data/book3-unit13-resources');
        case 14: return import('@/data/book3-unit14-resources');
        case 15: return import('@/data/book3-unit15-resources');
        case 16: return import('@/data/book3-unit16-resources');
        case 17: return import('@/data/book3-unit17-resources');
        case 18: return import('@/data/book3-unit18-resources');
        default: return null;
      }
    }
    // Book 4 resources
    else if (book === '4') {
      switch(unit) {
        case 1: return import('@/data/book4-unit1-resources');
        case 2: return import('@/data/book4-unit2-resources');
        case 3: return import('@/data/book4-unit3-resources');
        case 4: return import('@/data/book4-unit4-resources');
        case 5: return import('@/data/book4-unit5-resources');
        case 6: return import('@/data/book4-unit6-resources');
        case 7: return import('@/data/book4-unit7-resources');
        case 8: return import('@/data/book4-unit8-resources');
        case 9: return import('@/data/book4-unit9-resources');
        case 10: return import('@/data/book4-unit10-resources');
        case 11: return import('@/data/book4-unit11-resources');
        case 12: return import('@/data/book4-unit12-resources');
        case 13: return import('@/data/book4-unit13-resources');
        case 14: return import('@/data/book4-unit14-resources');
        case 15: return import('@/data/book4-unit15-resources');
        case 16: return import('@/data/book4-unit16-resources');
        default: return null;
      }
    }
    // Book 5 resources
    else if (book === '5') {
      switch(unit) {
        case 1: return import('@/data/book5-unit1-resources');
        case 2: return import('@/data/book5-unit2-resources');
        case 3: return import('@/data/book5-unit3-resources');
        case 4: return import('@/data/book5-unit4-resources');
        case 5: return import('@/data/book5-unit5-resources');
        case 6: return import('@/data/book5-unit6-resources');
        case 7: return import('@/data/book5-unit7-resources');
        case 8: return import('@/data/book5-unit8-resources');
        case 9: return import('@/data/book5-unit9-resources');
        case 10: return import('@/data/book5-unit10-resources');
        case 11: return import('@/data/book5-unit11-resources');
        case 12: return import('@/data/book5-unit12-resources');
        case 13: return import('@/data/book5-unit13-resources');
        case 14: return import('@/data/book5-unit14-resources');
        case 15: return import('@/data/book5-unit15-resources');
        case 16: return import('@/data/book5-unit16-resources');
        default: return null;
      }
    }
    // Book 6 resources
    else if (book === '6') {
      switch(unit) {
        case 1: return import('@/data/book6-unit1-resources');
        case 2: return import('@/data/book6-unit2-resources');
        case 3: return import('@/data/book6-unit3-resources');
        case 4: return import('@/data/book6-unit4-resources');
        case 5: return import('@/data/book6-unit5-resources');
        case 6: return import('@/data/book6-unit6-resources');
        case 7: return import('@/data/book6-unit7-resources');
        case 8: return import('@/data/book6-unit8-resources');
        case 9: return import('@/data/book6-unit9-resources');
        case 10: return import('@/data/book6-unit10-resources');
        case 11: return import('@/data/book6-unit11-resources');
        case 12: return import('@/data/book6-unit12-resources');
        case 13: return import('@/data/book6-unit13-resources');
        case 14: return import('@/data/book6-unit14-resources');
        case 15: return import('@/data/book6-unit15-resources');
        case 16: return import('@/data/book6-unit16-resources');
        default: return null;
      }
    }
    // Book 7 resources - support both with and without prefix for backwards compatibility
    else if (book === '7' || !book) { // Default to book 7 if no book specified
      switch(unit) {
        case 1: return import('@/data/book7-unit1-resources');
        case 2: return import('@/data/book7-unit2-resources');
        case 3: return import('@/data/book7-unit3-resources');
        case 4: return import('@/data/book7-unit4-resources');
        case 5: return import('@/data/book7-unit5-resources');
        case 6: 
          try { return import('@/data/book7-unit6-resources'); } 
          catch { return import('@/data/unit6-resources'); }
        case 7: 
          try { return import('@/data/book7-unit7-resources'); } 
          catch { return import('@/data/unit7-resources'); }
        case 8: 
          try { return import('@/data/book7-unit8-resources'); } 
          catch { return import('@/data/unit8-resources'); }
        case 9: 
          try { return import('@/data/book7-unit9-resources'); } 
          catch { return import('@/data/unit9-resources'); }
        case 10: 
          try { return import('@/data/book7-unit10-resources'); } 
          catch { return import('@/data/unit10-resources'); }
        case 11: 
          try { return import('@/data/book7-unit11-resources'); } 
          catch { return import('@/data/unit11-resources'); }
        case 12: 
          try { return import('@/data/book7-unit12-resources'); } 
          catch { return import('@/data/unit12-resources'); }
        case 13: 
          try { return import('@/data/book7-unit13-resources'); } 
          catch { return import('@/data/unit13-resources'); }
        case 14: 
          try { return import('@/data/book7-unit14-resources'); } 
          catch { return import('@/data/unit14-resources'); }
        case 15: 
          try { return import('@/data/book7-unit15-resources'); } 
          catch { return import('@/data/unit15-resources'); }
        case 16: 
          try { return import('@/data/book7-unit16-resources'); } 
          catch { return import('@/data/unit16-resources'); }
        default: return null;
      }
    }
    return null;
  } catch (error) {
    console.error(`Error loading resources for Book ${book}, Unit ${unit}:`, error);
    return null;
  }
};

export interface TeacherResource {
  id?: string;
  bookId?: string;
  unitId?: string;
  title: string;
  description?: string;
  resourceType: 'video' | 'game' | 'lesson' | 'pdf' | 'other';
  provider?: string;
  sourceUrl?: string;
  embedCode?: string;
  content?: {
    type: string;
    embedId?: string;
    embedUrl?: string;
  };
  fileUrl?: string;
  lessonPlan?: LessonPlan;
}

interface TeacherResourcesProps {
  bookId: string;
  unitId: string;
}

// Kahoot AI-generated thumbnail component
const KahootThumbnail = ({ title }: { title: string }) => {
  // Generate random pastel background color
  const getRandomPastel = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 80%)`;
  };

  return (
    <div 
      className="aspect-video w-full rounded-md flex flex-col items-center justify-center text-center p-6"
      style={{ background: getRandomPastel() }}
    >
      <div className="bg-white/90 p-4 rounded-lg shadow-md w-full max-w-xs">
        <div className="flex justify-center mb-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-purple-500 rounded-md h-12 w-12"></div>
            <div className="bg-red-500 rounded-md h-12 w-12"></div>
            <div className="bg-blue-500 rounded-md h-12 w-12"></div>
            <div className="bg-yellow-500 rounded-md h-12 w-12"></div>
          </div>
        </div>
        <h3 className="font-bold text-sm mb-1">KAHOOT!</h3>
        <p className="text-xs font-medium text-gray-800">{title}</p>
        <div className="mt-3 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white py-1 px-3 rounded-full inline-block">
          Play Now
        </div>
      </div>
    </div>
  );
};

const TeacherResources = ({ bookId, unitId }: TeacherResourcesProps) => {
  const { toast } = useToast();
  const urlParams = new URLSearchParams(window.location.search);
  const [isEditMode, setIsEditMode] = useState(urlParams.get('edit') === 'true');
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [customResources, setCustomResources] = useState<TeacherResource[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingResource, setEditingResource] = useState<TeacherResource | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<TeacherResource | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [viewingPdf, setViewingPdf] = useState<TeacherResource | null>(null);
  const [newResource, setNewResource] = useState<TeacherResource>({
    bookId,
    unitId,
    title: '',
    resourceType: 'video',
    provider: '',
    sourceUrl: '',
    embedCode: '',
  });
  
  // Check if this is a special book/unit with predefined resources
  // For Book 5, units 2, 3, 4, 6, 7, 8, 10 have no teacher resources
  const noResourcesBook5Units = ['2', '3', '4', '6', '7', '8', '10'];
  const isSpecialBookUnit = 
    (bookId === '7' && ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'].includes(unitId)) ||
    (bookId === '6' && ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'].includes(unitId)) ||
    (bookId === '5' && ['1', '5', '9', '11', '12', '13', '14', '15', '16'].includes(unitId));
    
  // Create custom constants for specific books and units to check for special resources
  const isBook7Unit6 = bookId === '7' && unitId === '6';
  
  // State for dynamically loaded resources and lesson plans
  const [dynamicResources, setDynamicResources] = useState<TeacherResource[]>([]);
  const [dynamicLessonPlans, setDynamicLessonPlans] = useState<LessonPlan[]>([]);
  const [isLoadingDynamic, setIsLoadingDynamic] = useState<boolean>(false);
  
  // Function to load resources and lesson plans dynamically based on current book and unit
  const loadResourcesAndLessonPlans = useCallback(async () => {
    if (!bookId || !unitId) return;
    
    setIsLoadingDynamic(true);
    try {
      // Convert unitId to number for dynamic imports
      const unitNum = parseInt(unitId);
      
      console.log(`Loading Book ${bookId} Unit ${unitNum} resources`);
      
      // Load implementation module
      const implModule = await dynamicImplImport(bookId, unitNum);
      
      // Load resources module
      const resourcesModule = await dynamicResourceImport(bookId, unitNum);
      
      // Set dynamic resources if available
      if (resourcesModule) {
        // Try to extract resources from the module
        let resources: TeacherResource[] = [];
        
        // Function to extract and collect resources using type assertion
        const extractResources = (key: string, type: 'video' | 'game' | 'pdf' | 'lesson' = 'video') => {
          // Use type assertion to avoid TypeScript errors
          const resourcesArray = (resourcesModule as any)[key];
          if (Array.isArray(resourcesArray)) {
            resources.push(...resourcesArray.map(r => ({
              ...r,
              resourceType: r.resourceType || type,
              bookId,
              unitId
            })));
          }
        };
        
        // Try to extract resources by different naming patterns
        // Use type assertion to avoid TypeScript errors
        if ((resourcesModule as any).resources) extractResources('resources');
        if ((resourcesModule as any).videos) extractResources('videos', 'video');
        if ((resourcesModule as any).games) extractResources('games', 'game');
        if ((resourcesModule as any).pdfs) extractResources('pdfs', 'pdf');
        
        // Handle centralized Book 2 resources
        if (bookId === '2') {
          try {
            // Check for specific resource getter functions using type assertion
            const typedResourcesModule = resourcesModule as any;
              
            if (unitNum === 1 && typedResourcesModule.book2Unit1Resources) {
              console.log('Using book2Unit1Resources directly');
              resources = typedResourcesModule.book2Unit1Resources;
            } else if (unitNum === 2 && typedResourcesModule.book2Unit2Resources) {
              console.log('Using book2Unit2Resources directly');
              resources = typedResourcesModule.book2Unit2Resources;
            } else if (unitNum === 3 && typedResourcesModule.book2Unit3Resources) {
              console.log('Using book2Unit3Resources directly');
              resources = typedResourcesModule.book2Unit3Resources;
            } else if (unitNum === 4 && typedResourcesModule.book2Unit4Resources) {
              console.log('Using book2Unit4Resources directly');
              resources = typedResourcesModule.book2Unit4Resources;
            } else if (unitNum === 5 && typedResourcesModule.book2Unit5Resources) {
              console.log('Using book2Unit5Resources directly');
              resources = typedResourcesModule.book2Unit5Resources;
            } else if (unitNum === 6 && typedResourcesModule.book2Unit6Resources) {
              console.log('Using book2Unit6Resources directly');
              resources = typedResourcesModule.book2Unit6Resources;
            } else if (unitNum === 1 && typedResourcesModule.getBook2Unit1Resources) {
              console.log('Using getBook2Unit1Resources function');
              resources = typedResourcesModule.getBook2Unit1Resources();
            } else if (unitNum === 2 && typedResourcesModule.getBook2Unit2Resources) {
              console.log('Using getBook2Unit2Resources function');
              resources = typedResourcesModule.getBook2Unit2Resources();
            } else if (unitNum === 3 && typedResourcesModule.getBook2Unit3Resources) {
              console.log('Using getBook2Unit3Resources function');
              resources = typedResourcesModule.getBook2Unit3Resources();
            } else if (unitNum === 4 && typedResourcesModule.getBook2Unit4Resources) {
              console.log('Using getBook2Unit4Resources function');
              resources = typedResourcesModule.getBook2Unit4Resources();
            } else if (unitNum === 5 && typedResourcesModule.getBook2Unit5Resources) {
              console.log('Using getBook2Unit5Resources function');
              resources = typedResourcesModule.getBook2Unit5Resources();
            } else if (unitNum === 6 && typedResourcesModule.getBook2Unit6Resources) {
              console.log('Using getBook2Unit6Resources function');
              resources = typedResourcesModule.getBook2Unit6Resources();
            } else if (unitNum === 7 && typedResourcesModule.getBook2Unit7Resources) {
              console.log('Using getBook2Unit7Resources function');
              resources = typedResourcesModule.getBook2Unit7Resources();
            } else if (unitNum === 8 && typedResourcesModule.getBook2Unit8Resources) {
              console.log('Using getBook2Unit8Resources function');
              resources = typedResourcesModule.getBook2Unit8Resources();
            } else if (unitNum === 9 && typedResourcesModule.getBook2Unit9Resources) {
              console.log('Using getBook2Unit9Resources function');
              resources = typedResourcesModule.getBook2Unit9Resources();
            } else if (unitNum === 10 && typedResourcesModule.getBook2Unit10Resources) {
              console.log('Using getBook2Unit10Resources function');
              resources = typedResourcesModule.getBook2Unit10Resources();
            } else if (unitNum === 11 && typedResourcesModule.getBook2Unit11Resources) {
              console.log('Using getBook2Unit11Resources function');
              resources = typedResourcesModule.getBook2Unit11Resources();
            } else if (unitNum === 12 && typedResourcesModule.getBook2Unit12Resources) {
              console.log('Using getBook2Unit12Resources function');
              resources = typedResourcesModule.getBook2Unit12Resources();
            } else if (unitNum === 13 && typedResourcesModule.getBook2Unit13Resources) {
              console.log('Using getBook2Unit13Resources function');
              resources = typedResourcesModule.getBook2Unit13Resources();
            } else if (unitNum === 14 && typedResourcesModule.getBook2Unit14Resources) {
              console.log('Using getBook2Unit14Resources function');
              resources = typedResourcesModule.getBook2Unit14Resources();
            } else if (unitNum === 17 && typedResourcesModule.getBook2Unit17Resources) {
              console.log('Using getBook2Unit17Resources function');
              resources = typedResourcesModule.getBook2Unit17Resources();
            } else if (unitNum === 18 && typedResourcesModule.getBook2Unit18Resources) {
              console.log('Using getBook2Unit18Resources function');
              resources = typedResourcesModule.getBook2Unit18Resources();
            }
            
            // Log resources for debugging
            console.log(`Found ${resources.length} resources for Book ${bookId} Unit ${unitNum}`);
          } catch (error) {
            console.error(`Error getting Book 2 Unit ${unitNum} resources:`, error);
          }
        }
        // Handle centralized Book 6 resources
        else if (bookId === '6') {
          // Use our centralized resource generator for Book 6
          const book6Resources = generateBook6UnitResources(bookId, unitId);
          resources.push(...book6Resources);
          
          try {
            // Check for specific resource getter functions using type assertion
            const typedResourcesModule = resourcesModule as any;
              
            if (unitNum === 1 && typedResourcesModule.getBook6Unit1Resources) {
              console.log('Using getBook6Unit1Resources');
              resources = typedResourcesModule.getBook6Unit1Resources(bookId, unitId);
            } else if (unitNum === 5 && typedResourcesModule.getBook6Unit5Resources) {
              console.log('Using getBook6Unit5Resources');
              resources = typedResourcesModule.getBook6Unit5Resources(bookId, unitId);
            } else if (unitNum === 6 && typedResourcesModule.getBook6Unit6Resources) {
              console.log('Using getBook6Unit6Resources');
              resources = typedResourcesModule.getBook6Unit6Resources(bookId, unitId);
            } else if (unitNum === 7 && typedResourcesModule.getBook6Unit7Resources) {
              console.log('Using getBook6Unit7Resources');
              resources = typedResourcesModule.getBook6Unit7Resources(bookId, unitId);
            } else if (unitNum === 8 && typedResourcesModule.getBook6Unit8Resources) {
              console.log('Using getBook6Unit8Resources');
              resources = typedResourcesModule.getBook6Unit8Resources(bookId, unitId);
            } else if (unitNum === 9 && typedResourcesModule.getBook6Unit9Resources) {
              console.log('Using getBook6Unit9Resources');
              resources = typedResourcesModule.getBook6Unit9Resources(bookId, unitId);
            } else if (unitNum === 12 && typedResourcesModule.getBook6Unit12Resources) {
              console.log('Using getBook6Unit12Resources');
              resources = typedResourcesModule.getBook6Unit12Resources(bookId, unitId);
            }
            
            // Log resources for debugging
            console.log(`Found ${resources.length} resources for Book ${bookId} Unit ${unitNum}`);
          } catch (error) {
            console.error(`Error getting Book 6 Unit ${unitNum} resources:`, error);
          }
        }
        
        setDynamicResources(resources);
      }
      
      // Set dynamic lesson plans if available
      if (implModule) {
        // Try to extract lesson plans from the module
        let lessonPlans: LessonPlan[] = [];
        
        // Function to extract and collect lesson plans using type assertion
        const extractLessonPlans = (key: string) => {
          // Use type assertion to avoid TypeScript errors
          const plansArray = (implModule as any)[key];
          if (Array.isArray(plansArray)) {
            lessonPlans.push(...plansArray);
          }
        };
        
        // Try to extract lesson plans by different naming patterns with type assertion
        if ((implModule as any).lessonPlans) extractLessonPlans('lessonPlans');
        if ((implModule as any).unitLessonPlans) extractLessonPlans('unitLessonPlans');
        
        // Handle Book 1 lesson plans
        if (bookId === '1') {
          try {
            // Check for specific lesson plan getter functions using type assertion
            const typedImplModule = implModule as any;
            
            if (unitNum === 1) {
              console.log('Using generateUnit1LessonPlans for Book 1');
              lessonPlans = generateBook1Unit1LessonPlans();
            } else if (unitNum === 2) {
              console.log('Using generateUnit2LessonPlans for Book 1');
              lessonPlans = generateBook1Unit2LessonPlans();
            } else if (unitNum === 3) {
              console.log('Using generateUnit3LessonPlans for Book 1');
              lessonPlans = generateBook1Unit3LessonPlans();
            } else if (unitNum === 4) {
              console.log('Using generateUnit4LessonPlans for Book 1');
              lessonPlans = generateBook1Unit4LessonPlans();
            } else if (unitNum === 5) {
              console.log('Using generateUnit5LessonPlans for Book 1');
              lessonPlans = generateBook1Unit5LessonPlans();
            } else if (unitNum === 6) {
              console.log('Using generateUnit6LessonPlans for Book 1');
              lessonPlans = generateBook1Unit6LessonPlans();
            } else if (unitNum === 7) {
              console.log('Using generateUnit7LessonPlans for Book 1');
              lessonPlans = generateBook1Unit7LessonPlans();
            } else if (unitNum === 8) {
              console.log('Using generateUnit8LessonPlans for Book 1');
              lessonPlans = generateBook1Unit8LessonPlans();
            } else if (unitNum === 9) {
              console.log('Using generateUnit9LessonPlans for Book 1');
              lessonPlans = generateBook1Unit9LessonPlans();
            } else if (unitNum === 10) {
              console.log('Using generateUnit10LessonPlans for Book 1');
              lessonPlans = generateBook1Unit10LessonPlans();
            } else if (unitNum === 11) {
              console.log('Using generateUnit11LessonPlans for Book 1');
              lessonPlans = generateBook1Unit11LessonPlans();
            } else if (unitNum === 12) {
              console.log('Using generateUnit12LessonPlans for Book 1');
              lessonPlans = generateBook1Unit12LessonPlans();
            } else if (unitNum === 13) {
              console.log('Using generateUnit13LessonPlans for Book 1');
              lessonPlans = generateBook1Unit13LessonPlans();
            } else if (unitNum === 14) {
              console.log('Using generateUnit14LessonPlans for Book 1');
              lessonPlans = generateBook1Unit14LessonPlans();
            } else if (unitNum === 15) {
              console.log('Using generateUnit15LessonPlans for Book 1');
              lessonPlans = generateBook1Unit15LessonPlans();
            } else if (unitNum === 16) {
              console.log('Using generateUnit16LessonPlans for Book 1');
              lessonPlans = generateBook1Unit16LessonPlans();
            } else if (unitNum === 17) {
              console.log('Using generateUnit17LessonPlans for Book 1');
              lessonPlans = generateBook1Unit17LessonPlans();
            } else if (unitNum === 18) {
              console.log('Using generateUnit18LessonPlans for Book 1');
              lessonPlans = generateBook1Unit18LessonPlans();
            }
            
            console.log(`Found ${lessonPlans.length} lesson plans for Book ${bookId} Unit ${unitNum}`);
          } catch (error) {
            console.error(`Error getting Book 1 Unit ${unitNum} lesson plans:`, error);
          }
        }
        // Handle Book 2 lesson plans
        else if (bookId === '2') {
          try {
            // Check for specific lesson plan getter functions using type assertion
            const typedImplModule = implModule as any;
            
            if (unitNum === 1 && typedImplModule.generateUnit1LessonPlans) {
              console.log('Using generateUnit1LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit1LessonPlans();
            } else if (unitNum === 2 && typedImplModule.generateUnit2LessonPlans) {
              console.log('Using generateUnit2LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit2LessonPlans();
            } else if (unitNum === 3 && typedImplModule.generateUnit3LessonPlans) {
              console.log('Using generateUnit3LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit3LessonPlans();
            } else if (unitNum === 4 && typedImplModule.generateUnit4LessonPlans) {
              console.log('Using generateUnit4LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit4LessonPlans();
            } else if (unitNum === 5 && typedImplModule.generateUnit5LessonPlans) {
              console.log('Using generateUnit5LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit5LessonPlans();
            } else if (unitNum === 6 && typedImplModule.generateUnit6LessonPlans) {
              console.log('Using generateUnit6LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit6LessonPlans();
            } else if (unitNum === 7 && typedImplModule.generateUnit7LessonPlans) {
              console.log('Using generateUnit7LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit7LessonPlans();
            } else if (unitNum === 8 && typedImplModule.generateUnit8LessonPlans) {
              console.log('Using generateUnit8LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit8LessonPlans();
            } else if (unitNum === 9 && typedImplModule.generateUnit9LessonPlans) {
              console.log('Using generateUnit9LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit9LessonPlans();
            } else if (unitNum === 10 && typedImplModule.generateUnit10LessonPlans) {
              console.log('Using generateUnit10LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit10LessonPlans();
            } else if (unitNum === 11 && typedImplModule.generateUnit11LessonPlans) {
              console.log('Using generateUnit11LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit11LessonPlans();
            } else if (unitNum === 12 && typedImplModule.generateUnit12LessonPlans) {
              console.log('Using generateUnit12LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit12LessonPlans();
            } else if (unitNum === 13 && typedImplModule.generateUnit13LessonPlans) {
              console.log('Using generateUnit13LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit13LessonPlans();
            } else if (unitNum === 14 && typedImplModule.generateUnit14LessonPlans) {
              console.log('Using generateUnit14LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit14LessonPlans();
            } else if (unitNum === 15 && typedImplModule.generateUnit15LessonPlans) {
              console.log('Using generateUnit15LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit15LessonPlans();
            } else if (unitNum === 16 && typedImplModule.generateUnit16LessonPlans) {
              console.log('Using generateUnit16LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit16LessonPlans();
            } else if (unitNum === 17 && typedImplModule.generateUnit17LessonPlans) {
              console.log('Using generateUnit17LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit17LessonPlans();
            } else if (unitNum === 18 && typedImplModule.generateUnit18LessonPlans) {
              console.log('Using generateUnit18LessonPlans for Book 2');
              lessonPlans = typedImplModule.generateUnit18LessonPlans();
            }
            
            console.log(`Found ${lessonPlans.length} lesson plans for Book ${bookId} Unit ${unitNum}`);
          } catch (error) {
            console.error(`Error getting Book 2 Unit ${unitNum} lesson plans:`, error);
          }
        }
        // Handle centralized Book 5 lesson plans
        else if (bookId === '5') {
          try {
            // Use our centralized lesson plan generator for Book 5
            const unitTitle = BOOK5_UNIT_TITLES[unitId] || `Unit ${unitId}`;
            const defaultPlans = generateDefaultBook5UnitLessonPlans(unitId, unitTitle);
            lessonPlans.push(...defaultPlans);
            
            // Check for specific lesson plan getter functions using type assertion
            const typedImplModule = implModule as any;
            
            if (unitNum === 1 && typedImplModule.generateUnit1LessonPlans) {
              console.log('Using generateUnit1LessonPlans for Book 5');
              lessonPlans = typedImplModule.generateUnit1LessonPlans();
            } else if (unitNum === 5 && typedImplModule.generateUnit5LessonPlans) {
              console.log('Using generateUnit5LessonPlans for Book 5');
              lessonPlans = typedImplModule.generateUnit5LessonPlans();
            } else if (unitNum === 9 && typedImplModule.generateUnit9LessonPlans) {
              console.log('Using generateUnit9LessonPlans for Book 5');
              lessonPlans = typedImplModule.generateUnit9LessonPlans();
            } else if (unitNum === 13 && typedImplModule.generateUnit13LessonPlans) {
              console.log('Using generateUnit13LessonPlans for Book 5');
              lessonPlans = typedImplModule.generateUnit13LessonPlans();
            }
            
            console.log(`Found ${lessonPlans.length} lesson plans for Book ${bookId} Unit ${unitNum}`);
          } catch (error) {
            console.error(`Error getting Book 5 Unit ${unitNum} lesson plans:`, error);
          }
        }
        // Handle centralized Book 6 lesson plans
        else if (bookId === '6') {
          try {
            // Use our centralized lesson plan generator for Book 6
            const unitTitle = BOOK6_UNIT_TITLES[unitId] || `Unit ${unitId}`;
            const defaultPlans = generateDefaultBook6UnitLessonPlans(unitId, unitTitle);
            lessonPlans.push(...defaultPlans);
            
            // Check for specific lesson plan getter functions using type assertion
            const typedImplModule = implModule as any;
            
            // Only include the getters we know definitely exist
            if (unitNum === 5 && typedImplModule.getBook6Unit5LessonPlans) {
              console.log('Using getBook6Unit5LessonPlans');
              lessonPlans = typedImplModule.getBook6Unit5LessonPlans();
            }
            
            console.log(`Found ${lessonPlans.length} lesson plans for Book ${bookId} Unit ${unitNum}`);
          } catch (error) {
            console.error(`Error getting Book 6 Unit ${unitNum} lesson plans:`, error);
          }
        }
        
        setDynamicLessonPlans(lessonPlans);
      }
    } catch (error) {
      console.error('Error loading dynamic resources:', error);
    } finally {
      setIsLoadingDynamic(false);
    }
  }, [bookId, unitId]);
  
  // Effect to load resources when book or unit changes
  useEffect(() => {
    loadResourcesAndLessonPlans();
  }, [loadResourcesAndLessonPlans]);
  
  // Handle initial data loading - bookUnitResources, local storage resources
  const { data: bookUnitResources = [], isLoading, error } = useQuery<TeacherResource[]>({
    queryKey: [`/api/teacher-resources/${bookId}/${unitId}`],
    queryFn: getQueryFn<TeacherResource[]>({ on401: "returnNull" }),
  });

  // Mutation to add a new resource
  const addResourceMutation = useMutation({
    mutationFn: async (newResource: TeacherResource) => {
      const formData = new FormData();
      
      // Add file if available
      if (uploadedFile) {
        formData.append('file', uploadedFile);
      }
      
      // Add other resource data
      formData.append('data', JSON.stringify(newResource));
      
      return apiRequest('POST', `/api/teacher-resources/${bookId}/${unitId}`, formData, { isFormData: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/teacher-resources/${bookId}/${unitId}`] });
      setIsAdding(false);
      setEditingResource(null);
      setUploadedFile(null);
      setNewResource({
        bookId,
        unitId,
        title: '',
        resourceType: 'video',
        provider: '',
        sourceUrl: '',
        embedCode: '',
      });
      toast({
        title: 'Success',
        description: 'Resource added successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to add resource: ' + (error as Error).message,
        variant: 'destructive',
      });
    },
  });

  // Mutation to delete a resource
  const deleteResourceMutation = useMutation({
    mutationFn: async (resource: TeacherResource) => {
      if (!resource.id) return;
      return apiRequest('DELETE', `/api/teacher-resources/${bookId}/${unitId}/${resource.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/teacher-resources/${bookId}/${unitId}`] });
      setConfirmDelete(null);
      toast({
        title: 'Success',
        description: 'Resource deleted successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete resource: ' + (error as Error).message,
        variant: 'destructive',
      });
    },
  });

  // Effect to reset form when editing resource changes
  useEffect(() => {
    if (editingResource) {
      setNewResource(editingResource);
    } else {
      setNewResource({
        bookId,
        unitId,
        title: '',
        resourceType: 'video',
        provider: '',
        sourceUrl: '',
        embedCode: '',
      });
    }
  }, [editingResource, bookId, unitId]);

  // Effect to set initial resources from API data only when they change
  useEffect(() => {
    // Use a ref to track if this is the initial render
    const resourcesJSON = JSON.stringify(bookUnitResources);
    const currentResourcesJSON = JSON.stringify(resources);
    
    // Only update if the new resources are different from current resources
    if (resourcesJSON !== currentResourcesJSON) {
      setResources(bookUnitResources || []);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookUnitResources]);  // Intentionally omit resources to prevent infinite loop
  
  // The loadResourcesAndLessonPlans function was defined above and will load all resources correctly
  
  // Ensure we load resources when component mounts or bookId/unitId changes
  useEffect(() => {
    loadResourcesAndLessonPlans();
  }, [loadResourcesAndLessonPlans]);

  // Function to get additional resources for specific book/unit combinations
  const getMoreUnitResources = useCallback((): TeacherResource[] => {
    // Book 1 units
    if (bookId === '1') {
      if (unitId === '1') {
        console.log('Loading Book 1 Unit 1 resources');
        return book1Unit1Resources;
      } else if (unitId === '2') {
        console.log('Loading Book 1 Unit 2 resources');
        return book1Unit2Resources;
      } else if (unitId === '3') {
        console.log('Loading Book 1 Unit 3 resources');
        return book1Unit3Resources;
      } else if (unitId === '4') {
        console.log('Loading Book 1 Unit 4 resources');
        return book1Unit4Resources;
      } else if (unitId === '5') {
        console.log('Loading Book 1 Unit 5 resources');
        return book1Unit5Resources;
      } else if (unitId === '6') {
        console.log('Loading Book 1 Unit 6 resources');
        return book1Unit6Resources;
      } else if (unitId === '7') {
        console.log('Loading Book 1 Unit 7 resources');
        return book1Unit7Resources;
      } else if (unitId === '8') {
        console.log('Loading Book 1 Unit 8 resources');
        return book1Unit8Resources;
      } else if (unitId === '9') {
        console.log('Loading Book 1 Unit 9 resources');
        return book1Unit9Resources;
      } else if (unitId === '10') {
        console.log('Loading Book 1 Unit 10 resources');
        return book1Unit10Resources;
      } else if (unitId === '11') {
        console.log('Loading Book 1 Unit 11 resources');
        return book1Unit11Resources;
      } else if (unitId === '12') {
        console.log('Loading Book 1 Unit 12 resources');
        return book1Unit12Resources;
      } else if (unitId === '13') {
        console.log('Loading Book 1 Unit 13 resources');
        return book1Unit13Resources;
      } else if (unitId === '14') {
        console.log('Loading Book 1 Unit 14 resources');
        return book1Unit14Resources;
      } else if (unitId === '15') {
        console.log('Loading Book 1 Unit 15 resources');
        return book1Unit15Resources;
      } else if (unitId === '16') {
        console.log('Loading Book 1 Unit 16 resources');
        return book1Unit16Resources;
      } else if (unitId === '17') {
        console.log('Loading Book 1 Unit 17 resources');
        return book1Unit17Resources;
      } else if (unitId === '18') {
        console.log('Loading Book 1 Unit 18 resources');
        return book1Unit18Resources;
      }
      // All Book 1 units implemented
      return [];
    }
    // Book 2 units
    else if (bookId === '2') {
      if (unitId === '5') {
        console.log('Loading Book 2 Unit 5 resources');
        return book2Unit5Resources;
      } else if (unitId === '8') {
        console.log('Loading Book 2 Unit 8 resources');
        return getBook2Unit8Resources();
      } else if (unitId === '10') {
        console.log('Loading Book 2 Unit 10 resources');
        return book2Unit10Resources;
      } else if (unitId === '11') {
        console.log('Loading Book 2 Unit 11 resources');
        return book2Unit11Resources;
      } else if (unitId === '12') {
        console.log('Loading Book 2 Unit 12 resources');
        return book2Unit12Resources;
      } else if (unitId === '13') {
        console.log('Loading Book 2 Unit 13 resources');
        return book2Unit13Resources;
      } else if (unitId === '14') {
        console.log('Loading Book 2 Unit 14 resources');
        return book2Unit14Resources;
      } else if (unitId === '15') {
        console.log('Loading Book 2 Unit 15 resources');
        return book2Unit15Resources;
      } else if (unitId === '16') {
        console.log('Loading Book 2 Unit 16 resources');
        return book2Unit16Resources;
      } else if (unitId === '17') {
        console.log('Loading Book 2 Unit 17 resources');
        return book2Unit17Resources;
      } else if (unitId === '18') {
        console.log('Loading Book 2 Unit 18 resources');
        return book2Unit18Resources;
      }
      // For other Book 2 units that don't have specific implementations
      return [];
    }
    // Book 5 units - use centralized resource generator
    else if (bookId === '5') {
      // Special cases for units with their own implementation
      if (unitId === '1') {
        try {
          console.log('Loading Book 5 Unit 1 resources from implementation');
          return generateBook5Unit1Content(bookId);
        } catch (error) {
          console.error('Error getting Book 5 Unit 1 resources, falling back to common resources:', error);
          return generateBook5UnitResources(bookId, unitId);
        }
      } else if (unitId === '5') {
        try {
          console.log('Loading Book 5 Unit 5 resources from implementation');
          return generateBook5Unit5Content(bookId);
        } catch (error) {
          console.error('Error getting Book 5 Unit 5 resources, falling back to common resources:', error);
          return generateBook5UnitResources(bookId, unitId);
        }
      } else if (unitId === '9') {
        try {
          console.log('Loading Book 5 Unit 9 resources from implementation');
          return generateBook5Unit9Content(bookId);
        } catch (error) {
          console.error('Error getting Book 5 Unit 9 resources, falling back to common resources:', error);
          return generateBook5UnitResources(bookId, unitId);
        }
      } else if (unitId === '13') {
        try {
          console.log('Loading Book 5 Unit 13 resources from implementation');
          return generateBook5Unit13Content(bookId);
        } catch (error) {
          console.error('Error getting Book 5 Unit 13 resources, falling back to common resources:', error);
          return generateBook5UnitResources(bookId, unitId);
        }
      } else {
        // For other units, use the centralized resource generator
        const resources = generateBook5UnitResources(bookId, unitId);
        console.log(`Generated ${resources.length} resources for Book 5 Unit ${unitId}`);
        return resources;
      }
    }
    // Book 6 units - use centralized resource generator
    else if (bookId === '6') {
      // Special cases for units 9 and 10 which have their own implementation
      if (unitId === '9') {
        try {
          console.log('Loading Book 6 Unit 9 resources from implementation');
          return getBook6Unit9Resources(bookId, unitId);
        } catch (error) {
          console.error('Error getting Book 6 Unit 9 resources, falling back to common resources:', error);
          return generateBook6UnitResources(bookId, unitId);
        }
      } else if (unitId === '10') {
        try {
          console.log('Loading Book 6 Unit 10 resources from implementation');
          return getBook6Unit10Resources(bookId, unitId);
        } catch (error) {
          console.error('Error getting Book 6 Unit 10 resources, falling back to common resources:', error);
          return generateBook6UnitResources(bookId, unitId);
        }
      } else if (unitId === '13') {
        try {
          console.log('Loading Book 6 Unit 13 resources from implementation');
          return generateBook6Unit13Content(bookId);
        } catch (error) {
          console.error('Error getting Book 6 Unit 13 resources, falling back to common resources:', error);
          return generateBook6UnitResources(bookId, unitId);
        }
      } else if (unitId === '14') {
        try {
          console.log('Loading Book 6 Unit 14 resources from implementation');
          return generateBook6Unit14Content(bookId);
        } catch (error) {
          console.error('Error getting Book 6 Unit 14 resources, falling back to common resources:', error);
          return generateBook6UnitResources(bookId, unitId);
        }
      } else if (unitId === '15') {
        try {
          console.log('Loading Book 6 Unit 15 resources from implementation');
          return generateBook6Unit15Content(bookId);
        } catch (error) {
          console.error('Error getting Book 6 Unit 15 resources, falling back to common resources:', error);
          return generateBook6UnitResources(bookId, unitId);
        }
      } else if (unitId === '16') {
        try {
          console.log('Loading Book 6 Unit 16 resources from implementation');
          return generateBook6Unit16Content(bookId);
        } catch (error) {
          console.error('Error getting Book 6 Unit 16 resources, falling back to common resources:', error);
          return generateBook6UnitResources(bookId, unitId);
        }
      } else {
        // For all other units, use the centralized resource generator
        console.log(`Loading centralized resources for Book 6 Unit ${unitId}`);
        return generateBook6UnitResources(bookId, unitId);
      }
    }
    
    // Resources for Book 7, Unit 4 - Accommodation
    if (bookId === '7' && unitId === '4') {
      return [
        {
          id: "book7-unit4-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 4 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit4/00%20A%20Book%207%20%E2%80%93%20Unit%204.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit4-video1",
          bookId,
          unitId,
          title: "Accommodation Types",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/embed/I2t7h8XZC8A",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/I2t7h8XZC8A?si=zYsHv0JsKf3VnYC4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit4-game1",
          bookId,
          unitId,
          title: "Accommodation Types Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/abe4d3f5a38b4ebfa7b2183c8adfdf1c",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/abe4d3f5a38b4ebfa7b2183c8adfdf1c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit4-game2",
          bookId,
          unitId,
          title: "Hotel Room Features",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/f1d6bb00c7f942d29b1efa5c2f94073f",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f1d6bb00c7f942d29b1efa5c2f94073f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit4-game3",
          bookId,
          unitId,
          title: "Hotel Vocabulary",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/ead2718ebb544050a5077cc541d2e2a2",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ead2718ebb544050a5077cc541d2e2a2?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
    }

    // Resources for Book 7, Unit 6 - Money
    if (isBook7Unit6) {
      // Using resources from unit6-implementation.tsx
      try {
        return getBook1Unit6Resources();
      } catch (error) {
        console.error('Error getting Unit 6 resources:', error);
        return [];
      }
    }

    // Resources for Book 7, Unit 7 - DIY & Tools
    if (bookId === '7' && unitId === '7') {
      // Using resources from unit7-implementation.tsx
      try {
        return getBook1Unit7Resources();
      } catch (error) {
        console.error('Error getting Unit 7 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 7, Unit 8 - Musical Instruments
    if (bookId === '7' && unitId === '8') {
      // Using resources from unit8-implementation.tsx
      try {
        return getBook1Unit8Resources();
      } catch (error) {
        console.error('Error getting Unit 8 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 7, Unit 9 - Jobs
    if (bookId === '7' && unitId === '9') {
      // Using resources from unit9-implementation.tsx
      try {
        return getBook1Unit9Resources();
      } catch (error) {
        console.error('Error getting Unit 9 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 7, Unit 10 - Sports
    if (bookId === '7' && unitId === '10') {
      // Using resources from unit10-implementation.tsx
      try {
        return getBook1Unit10Resources();
      } catch (error) {
        console.error('Error getting Unit 10 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 7, Unit 11 - Natural Disasters
    if (bookId === '7' && unitId === '11') {
      // Using resources from unit11-implementation.tsx
      try {
        return getBook1Unit11Resources();
      } catch (error) {
        console.error('Error getting Unit 11 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 7, Unit 12 - Healthy Lifestyle
    if (bookId === '7' && unitId === '12') {
      // Using resources from unit12-implementation.tsx
      try {
        return getBook1Unit12Resources();
      } catch (error) {
        console.error('Error getting Unit 12 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 7, Unit 13 - City Tour
    if (bookId === '7' && unitId === '13') {
      // Using resources from unit13-implementation.tsx
      try {
        return getBook1Unit13Resources();
      } catch (error) {
        console.error('Error getting Unit 13 resources:', error);
        return [];
      }
    }

    // Resources for Book 7, Unit 14 - Climate Change
    if (bookId === '7' && unitId === '14') {
      // Using resources from unit14-implementation.tsx
      try {
        return getBook1Unit14Resources();
      } catch (error) {
        console.error('Error getting Unit 14 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 7, Unit 15 - Holidays and Festivals
    if (bookId === '7' && unitId === '15') {
      // Using resources from unit15-implementation.tsx
      try {
        return getBook1Unit15Resources();
      } catch (error) {
        console.error('Error getting Unit 15 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 7, Unit 16 - Food and Cuisine
    if (bookId === '7' && unitId === '16') {
      // Using resources from unit16-implementation.tsx
      try {
        return getBook1Unit16Resources();
      } catch (error) {
        console.error('Error getting Unit 16 resources:', error);
        return [];
      }
    }
    
    // Note: Book 6 resources are now handled by the centralized approach at the top of this function
    
    // If no specific resources, return an empty array
    return [];
  }, [bookId, unitId]);

  // Function to render resources based on type
  const renderResources = (resourceType: 'video' | 'game' | 'pdf' | 'lesson') => {
    // Get all resources of the specified type, including dynamically loaded ones
    // Use a Map to ensure uniqueness of resources by ID
    const resourceMap = new Map();
    
    // Combine all resources, using the latest version if there are duplicates
    [...resources, ...getMoreUnitResources(), ...dynamicResources]
      .filter(r => r.resourceType === resourceType)
      .forEach(resource => {
        if (resource.id) {
          resourceMap.set(resource.id, resource);
        } else {
          // For resources without an ID, use a unique temporary identifier
          resourceMap.set(`temp-${Math.random()}`, resource);
        }
      });
      
    const allResources = Array.from(resourceMap.values());

    // Return early if there are no resources
    if (allResources.length === 0) {
      return (
        <div className="py-8 text-center text-muted-foreground">
          No {resourceType === 'pdf' ? 'PDF' : resourceType} resources available for this unit.
          {isEditMode && <div className="mt-2">Click "Add Resource" to add one.</div>}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {allResources.map((resource, index) => {
          if (resourceType === 'video') {
            return (
              <Card key={resource.id || index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{resource.title}</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      <Video className="h-3 w-3 mr-1" />
                      Video
                    </Badge>
                  </div>
                  {resource.provider && (
                    <CardDescription className="text-xs">
                      Provider: {resource.provider}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-2">
                  {resource.embedCode ? (
                    <div 
                      className="aspect-video w-full rounded overflow-hidden bg-muted" 
                      dangerouslySetInnerHTML={{ __html: resource.embedCode }}
                    />
                  ) : (
                    <div className="aspect-video w-full rounded overflow-hidden bg-muted flex items-center justify-center">
                      <div className="text-center p-4">
                        <Video className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Video preview not available</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/20 pt-3 pb-3">
                  {resource.sourceUrl && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => window.open(resource.sourceUrl, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      Watch Source
                    </Button>
                  )}
                  {isEditMode && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="ml-auto text-destructive"
                      onClick={() => setConfirmDelete(resource)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          }
          
          if (resourceType === 'game') {
            return (
              <Card key={resource.id || index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{resource.title}</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      <Gamepad2 className="h-3 w-3 mr-1" />
                      Game
                    </Badge>
                  </div>
                  {resource.provider && (
                    <CardDescription className="text-xs">
                      Provider: {resource.provider}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-2">
                  {resource.embedCode ? (
                    <div 
                      className="w-full rounded overflow-hidden bg-muted" 
                      dangerouslySetInnerHTML={{ __html: resource.embedCode }}
                    />
                  ) : resource.provider?.toLowerCase().includes('kahoot') ? (
                    <KahootThumbnail title={resource.title} />
                  ) : (
                    <div className="aspect-video w-full rounded overflow-hidden bg-muted flex items-center justify-center">
                      <div className="text-center p-4">
                        <Gamepad2 className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Game preview not available</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/20 pt-3 pb-3">
                  {resource.sourceUrl && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => window.open(resource.sourceUrl, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      Play Game
                    </Button>
                  )}
                  {isEditMode && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="ml-auto text-destructive"
                      onClick={() => setConfirmDelete(resource)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          }

          if (resourceType === 'pdf' || resourceType === 'lesson') {
            return (
              <Card key={resource.id || index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{resource.title}</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      <FileText className="h-3 w-3 mr-1" />
                      {resourceType === 'pdf' ? 'PDF' : 'Lesson'}
                    </Badge>
                  </div>
                  {resource.provider && (
                    <CardDescription className="text-xs">
                      Provider: {resource.provider}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="rounded overflow-hidden mb-4 border bg-white hover:shadow-md transition-all cursor-pointer"
                       onClick={() => resource.fileUrl && setViewingPdf(resource)}
                  >
                    <div className="p-4 flex flex-col items-center">
                      <div className="bg-muted/20 w-16 h-24 flex items-center justify-center rounded mb-3 border relative overflow-hidden hover:border-primary/50 transition-all">
                        <FileText className="h-8 w-8 text-primary/60" />
                        <div className="absolute bottom-0 left-0 right-0 bg-primary/10 text-center text-xs py-1 font-medium">PDF</div>
                      </div>
                      <h4 className="text-sm font-medium text-center mb-1">{resource.title}</h4>
                      <p className="text-xs text-muted-foreground text-center">{resource.provider || 'Visual English'}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/20 pt-3 pb-3">
                  {(resource.fileUrl || resource.sourceUrl) && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        if (resource.fileUrl) {
                          setViewingPdf(resource);
                        } else if (resource.sourceUrl) {
                          window.open(resource.sourceUrl, '_blank');
                        }
                      }}
                    >
                      {resource.fileUrl ? (
                        <>
                          <Maximize2 className="h-3 w-3 mr-2" />
                          View PDF
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-3 w-3 mr-2" />
                          View Resource
                        </>
                      )}
                    </Button>
                  )}
                  {isEditMode && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="ml-2 text-destructive"
                      onClick={() => setConfirmDelete(resource)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          }
          
          return null;
        })}
      </div>
    );
  };

  const renderLessonPlans = () => {
    // First, check if there are any lesson plans specifically for this book/unit in the resources list
    const lessonPlansFromResources = resources.filter(r => r.resourceType === 'lesson');
    
    // Add loading indicator when loading dynamic resources
    if (isLoadingDynamic) {
      return (
        <div className="py-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-muted-foreground">Loading lesson plans...</p>
        </div>
      );
    }
    
    // If there are any lesson plans in resources, render them first
    const resourceLessonPlans = lessonPlansFromResources.length > 0 ? (
      <div className="mt-6 mb-10">
        <h3 className="text-lg font-semibold mb-4">Uploaded Lesson Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lessonPlansFromResources.map((resource, index) => (
            <Card key={resource.id || index} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <Badge variant="outline" className="ml-2">
                    <FileText className="h-3 w-3 mr-1" />
                    Lesson Plan
                  </Badge>
                </div>
                {resource.provider && (
                  <CardDescription className="text-xs">
                    Provider: {resource.provider}
                  </CardDescription>
                )}
              </CardHeader>
              
              <CardContent className="pt-0">
                {resource.fileUrl && (
                  <div className="rounded overflow-hidden mb-4 border bg-white hover:shadow-md transition-all">
                    <div className="p-4 flex flex-col items-center">
                      <a 
                        href={resource.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="cursor-pointer"
                      >
                        <div className="bg-muted/20 w-24 h-32 flex items-center justify-center rounded mb-3 border relative overflow-hidden hover:border-primary/50 transition-all">
                          <FileText className="h-12 w-12 text-primary/60" />
                          <div className="absolute bottom-0 left-0 right-0 bg-primary/10 text-center text-xs py-1 font-medium">PDF</div>
                        </div>
                      </a>
                      <h4 className="text-sm font-medium text-center mb-1">{resource.title}</h4>
                      <p className="text-xs text-muted-foreground mb-3 text-center">Provider: {resource.provider || 'Visual English'}</p>
                      <Button 
                        size="sm"
                        variant="default" 
                        className="w-full mt-2 bg-primary/90 hover:bg-primary"
                        onClick={() => window.open(resource.fileUrl, '_blank')}
                      >
                        <FileText className="h-3 w-3 mr-2" />
                        View Lesson Plan
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-muted/20 pt-3 pb-3">
                <div className="w-full flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Created with Visual English</span>
                  {isEditMode && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => setConfirmDelete(resource)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    ) : null;

    // Now render the built-in lesson plans depending on book and unit
    let builtInLessonPlans = null;
    
    // Book 6 Unit 5 - Theme Park Stalls lesson plans
    if (bookId === '6' && unitId === '5') {
      // Get Book 6 Unit 5 lesson plans
      let themeParkPlans: LessonPlan[] = [];
      try {
        themeParkPlans = getBook6Unit5LessonPlans();
      } catch (error) {
        console.error('Error getting Book 6 Unit 5 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Theme Park Themed Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {themeParkPlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `theme-park-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Book 6 Unit 6 - In the Kitchen lesson plans
    if (bookId === '6' && unitId === '6') {
      // Get Book 6 Unit 6 lesson plans
      let kitchenPlans: LessonPlan[] = [];
      try {
        kitchenPlans = getBook6Unit6LessonPlans();
      } catch (error) {
        console.error('Error getting Book 6 Unit 6 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Kitchen Themed Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {kitchenPlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `kitchen-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Book 6 Unit 7 - What Your Body Can Do lesson plans
    if (bookId === '6' && unitId === '7') {
      // Get Book 6 Unit 7 lesson plans
      let bodyPlans: LessonPlan[] = [];
      try {
        bodyPlans = getBook6Unit7LessonPlans();
      } catch (error) {
        console.error('Error getting Book 6 Unit 7 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Body Movement Themed Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {bodyPlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `body-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Book 6 Unit 8 - Free Time - Past Simple lesson plans
    if (bookId === '6' && unitId === '8') {
      // Get Book 6 Unit 8 lesson plans
      let pastSimplePlans: LessonPlan[] = [];
      try {
        pastSimplePlans = getBook6Unit8LessonPlans();
      } catch (error) {
        console.error('Error getting Book 6 Unit 8 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Past Simple & Free Time Activities Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {pastSimplePlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `past-simple-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Book 6 Unit 9 - Present Perfect - What Has Just Happened lesson plans
    if (bookId === '6' && unitId === '9') {
      // Get Book 6 Unit 9 lesson plans
      let presentPerfectPlans: LessonPlan[] = [];
      try {
        presentPerfectPlans = getBook6Unit9LessonPlans();
      } catch (error) {
        console.error('Error getting Book 6 Unit 9 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Present Perfect Tense Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {presentPerfectPlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `present-perfect-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Book 6 Unit 10 - Are You Tech Savvy? lesson plans
    if (bookId === '6' && unitId === '10') {
      // Get Book 6 Unit 10 lesson plans
      let techSavvyPlans: LessonPlan[] = [];
      try {
        // Using directly imported function
        techSavvyPlans = getBook6Unit10LessonPlans();
      } catch (error) {
        console.error('Error getting Book 6 Unit 10 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Technology and Digital Literacy Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {techSavvyPlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `tech-savvy-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Book 6 Unit 11 - Extreme Sports lesson plans
    if (bookId === '6' && unitId === '11') {
      // Get Book 6 Unit 11 lesson plans
      let extremeSportsPlans: LessonPlan[] = [];
      try {
        extremeSportsPlans = getBook6Unit11LessonPlans();
      } catch (error) {
        console.error('Error getting Book 6 Unit 11 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Extreme Sports and Adventure Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {extremeSportsPlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `extreme-sports-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Book 6 Unit 12 - Are You Eco: Environment lesson plans
    if (bookId === '6' && unitId === '12') {
      // Get Book 6 Unit 12 lesson plans
      let environmentLessonPlans: LessonPlan[] = [];
      try {
        environmentLessonPlans = getBook6Unit12LessonPlans();
      } catch (error) {
        console.error('Error getting Book 6 Unit 12 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Environmental Awareness Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {environmentLessonPlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `environment-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Book 6 Unit 13 - At the Airport lesson plans
    if (bookId === '6' && unitId === '13') {
      // Get Book 6 Unit 13 lesson plans
      let airportLessonPlans: LessonPlan[] = [];
      try {
        airportLessonPlans = getBook6Unit13LessonPlans();
      } catch (error) {
        console.error('Error getting Book 6 Unit 13 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Airport and Travel Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {airportLessonPlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `airport-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Book 6 Unit 14 - Are You a Survivor? lesson plans
    if (bookId === '6' && unitId === '14') {
      // Get Book 6 Unit 14 lesson plans
      let survivorLessonPlans: LessonPlan[] = [];
      try {
        survivorLessonPlans = getBook6Unit14LessonPlans();
      } catch (error) {
        console.error('Error getting Book 6 Unit 14 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Survival and Emergency Preparedness Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {survivorLessonPlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2 bg-amber-50/50 border-b border-amber-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `survivor-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-amber-50/30 pt-3 pb-3 border-t border-amber-100">
                    <Button variant="secondary" size="sm" className="w-full border-amber-200 hover:border-amber-300 hover:bg-amber-50" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Book 6 Unit 15 - Fashion Accessories lesson plans
    if (bookId === '6' && unitId === '15') {
      // Get Book 6 Unit 15 lesson plans
      let fashionLessonPlans: LessonPlan[] = [];
      try {
        fashionLessonPlans = getBook6Unit15LessonPlans();
      } catch (error) {
        console.error('Error getting Book 6 Unit 15 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Fashion and Style Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {fashionLessonPlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2 bg-purple-50/50 border-b border-purple-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `fashion-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-purple-50/30 pt-3 pb-3 border-t border-purple-100">
                    <Button variant="secondary" size="sm" className="w-full border-purple-200 hover:border-purple-300 hover:bg-purple-50" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Book 6 Unit 16 - City Life lesson plans
    if (bookId === '6' && unitId === '16') {
      // Get Book 6 Unit 16 lesson plans
      let cityLifeLessonPlans: LessonPlan[] = [];
      try {
        cityLifeLessonPlans = getBook6Unit16LessonPlans();
      } catch (error) {
        console.error('Error getting Book 6 Unit 16 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Urban Life and City Navigation Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {cityLifeLessonPlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2 bg-teal-50/50 border-b border-teal-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `city-life-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-teal-50/30 pt-3 pb-3 border-t border-teal-100">
                    <Button variant="secondary" size="sm" className="w-full border-teal-200 hover:border-teal-300 hover:bg-teal-50" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Book 7 Units specific lesson plans
    // Check if this book/unit combination has built-in lesson plans and render them if available
    if (isBook7Unit6) {
      // Get Unit 6 lesson plans
      let unit6Plans: LessonPlan[] = [];
      try {
        unit6Plans = getUnit6LessonPlans();
      } catch (error) {
        console.error('Error getting Unit 6 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Money-Themed Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {unit6Plans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `money-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Unit 7 - DIY & Tools lesson plans
    if (bookId === '7' && unitId === '7') {
      // Get Unit 7 lesson plans
      let unit7Plans: LessonPlan[] = [];
      try {
        unit7Plans = getUnit7LessonPlans();
      } catch (error) {
        console.error('Error getting Unit 7 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">DIY & Tools Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {unit7Plans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `diy-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Unit 8 - Musical Instruments lesson plans
    if (bookId === '7' && unitId === '8') {
      // Get Unit 8 lesson plans
      let unit8Plans: LessonPlan[] = [];
      try {
        unit8Plans = getUnit8LessonPlans();
      } catch (error) {
        console.error('Error getting Unit 8 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Musical Instruments Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {unit8Plans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `music-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Unit 9 - Jobs lesson plans
    if (bookId === '7' && unitId === '9') {
      // Get Unit 9 lesson plans
      let unit9Plans: LessonPlan[] = [];
      try {
        unit9Plans = getUnit9LessonPlans();
      } catch (error) {
        console.error('Error getting Unit 9 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Jobs & Careers Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {unit9Plans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `jobs-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Unit 10 - Sports lesson plans
    if (bookId === '7' && unitId === '10') {
      // Get Unit 10 lesson plans
      let unit10Plans: LessonPlan[] = [];
      try {
        unit10Plans = getUnit10LessonPlans();
      } catch (error) {
        console.error('Error getting Unit 10 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Sports Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {unit10Plans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `sports-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Unit 11 - Natural Disasters lesson plans
    else if (bookId === '7' && unitId === '11') {
      // Get Unit 11 lesson plans
      let unit11Plans: LessonPlan[] = [];
      try {
        unit11Plans = getUnit11LessonPlans();
      } catch (error) {
        console.error('Error getting Unit 11 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Natural Disasters Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {unit11Plans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `natural-disasters-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Unit 12 - Healthy Lifestyle lesson plans
    else if (bookId === '7' && unitId === '12') {
      // Get Unit 12 lesson plans
      let unit12Plans: LessonPlan[] = [];
      try {
        unit12Plans = getUnit12LessonPlans();
      } catch (error) {
        console.error('Error getting Unit 12 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Healthy Lifestyle Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {unit12Plans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `healthy-lifestyle-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Unit 13 - City Tour lesson plans
    else if (bookId === '7' && unitId === '13') {
      // Get Unit 13 lesson plans
      let unit13Plans: LessonPlan[] = [];
      try {
        unit13Plans = getUnit13LessonPlans();
      } catch (error) {
        console.error('Error getting Unit 13 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">City Tour Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {unit13Plans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `city-tour-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Render dynamically loaded lesson plans
    const dynamicLessonPlansSection = dynamicLessonPlans.length > 0 ? (
      <div className="mt-6 space-y-8">
        <h3 className="text-lg font-semibold mb-4">Dynamically Loaded Lesson Plans</h3>
        <div className="lesson-plan-grid">
          {dynamicLessonPlans.map((plan, index) => (
            <div key={index}>
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg truncate">
                        <span>{plan.title}</span>
                      </CardTitle>
                      <CardDescription className="text-xs mt-1">
                        45-minute lesson plan by Visual English
                      </CardDescription>
                    </div>
                    {isEditMode && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs flex items-center text-destructive" 
                        onClick={() => setConfirmDelete({ id: `dynamic-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="max-h-[500px] overflow-y-auto">
                  <LessonPlanTemplate plan={plan} />
                </CardContent>
                <CardFooter className="bg-muted/20 pt-3 pb-3">
                  <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                    <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    ) : null;
    
    // Return all lesson plan types
    return (
      <div className="space-y-8">
        {resourceLessonPlans}
        {dynamicLessonPlansSection}
        {builtInLessonPlans}
        {!resourceLessonPlans && !dynamicLessonPlansSection && !builtInLessonPlans && (
          <div className="py-8 text-center text-muted-foreground">
            No lesson plans available for this unit.
            {isEditMode && <div className="mt-2">Click "Add Resource" to add one.</div>}
          </div>
        )}
      </div>
    );
  };

  const handleNewResourceChange = (field: keyof TeacherResource, value: string) => {
    setNewResource(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddResource = async () => {
    if (!newResource.title) {
      toast({
        title: 'Missing Information',
        description: 'Please provide at least a title for the resource.',
        variant: 'destructive',
      });
      return;
    }

    addResourceMutation.mutate(newResource);
  };

  const handleDeleteResource = async (resource: TeacherResource) => {
    setConfirmDelete(null);
    deleteResourceMutation.mutate(resource);
  };

  if (isLoading) {
    return <div className="py-8 text-center">Loading resources...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        {/* Main Content Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Teacher Resources for Book {bookId}, Unit {unitId}</h2>
          <div className="flex items-center gap-3 self-end md:self-auto">
            {isEditMode ? (
              <>
                <Button onClick={() => setIsAdding(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" /> Add Resource
                </Button>
                <Button 
                  variant="outline" 
                  className="text-muted-foreground" 
                  onClick={() => setIsEditMode(false)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" /> Done Editing
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => setIsEditMode(true)}
                className="whitespace-nowrap"
              >
                <PenLine className="h-4 w-4 mr-2" /> Manage Resources
              </Button>
            )}
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="videos">
          <TabsList className="mb-4">
            <TabsTrigger value="videos" className="flex items-center">
              <Video className="h-4 w-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center">
              <Gamepad2 className="h-4 w-4 mr-2" />
              Games
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              PDF Lesson
            </TabsTrigger>
            <TabsTrigger value="lessonplans" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              45-min Lesson Plans
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos">
            {renderResources('video')}
          </TabsContent>

          <TabsContent value="games">
            {renderResources('game')}
          </TabsContent>

          <TabsContent value="materials">
            {/* Using the same grid layout for PDFs/Lessons */}
            {renderResources('pdf')}
            {renderResources('lesson')}
          </TabsContent>

          <TabsContent value="lessonplans">
            {renderLessonPlans()}
          </TabsContent>
        </Tabs>

        {/* Add Resource Dialog */}
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingResource ? 'Edit Resource' : 'Add New Resource'}</DialogTitle>
              <DialogDescription>
                Complete the form below to add a new teacher resource for this unit.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Title:</span>
                <Input 
                  className="col-span-3" 
                  value={newResource.title} 
                  onChange={(e) => handleNewResourceChange('title', e.target.value)} 
                  placeholder="Resource title" 
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Type:</span>
                <div className="col-span-3">
                  <select 
                    className="w-full p-2 border rounded-md" 
                    value={newResource.resourceType} 
                    onChange={(e) => handleNewResourceChange('resourceType', e.target.value as any)}
                  >
                    <option value="video">Video</option>
                    <option value="game">Game</option>
                    <option value="lesson">Worksheet/Lesson</option>
                    <option value="pdf">PDF</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Provider:</span>
                <Input 
                  className="col-span-3" 
                  value={newResource.provider || ''} 
                  onChange={(e) => handleNewResourceChange('provider', e.target.value)} 
                  placeholder="e.g., YouTube, Wordwall, etc." 
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">URL:</span>
                <Input 
                  className="col-span-3" 
                  value={newResource.sourceUrl || ''} 
                  onChange={(e) => handleNewResourceChange('sourceUrl', e.target.value)} 
                  placeholder="External link to resource" 
                />
              </div>

              {(newResource.resourceType === 'video' || newResource.resourceType === 'game') && (
                <div className="grid grid-cols-4 items-start gap-4">
                  <span className="text-right font-medium">Embed Code:</span>
                  <textarea 
                    className="col-span-3 p-2 border rounded-md min-h-[100px]" 
                    value={newResource.embedCode || ''} 
                    onChange={(e) => handleNewResourceChange('embedCode', e.target.value)} 
                    placeholder="<iframe ...>" 
                  />
                </div>
              )}

              {(newResource.resourceType === 'pdf' || newResource.resourceType === 'lesson') && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right font-medium">File:</span>
                  <div className="col-span-3">
                    <Input 
                      type="file" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadedFile(e.target.files[0]);
                        }
                      }} 
                    />
                    <p className="text-xs mt-1 text-muted-foreground">
                      {uploadedFile ? `Selected: ${uploadedFile.name}` : 'No file chosen'}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button onClick={handleAddResource}>Save Resource</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirm Delete Dialog */}
        <Dialog open={!!confirmDelete} onOpenChange={(open) => !open && setConfirmDelete(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this resource? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancel</Button>
              <Button 
                variant="destructive" 
                onClick={() => confirmDelete && handleDeleteResource(confirmDelete)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* PDF Viewer Dialog */}
        <Dialog 
          open={!!viewingPdf} 
          onOpenChange={(open) => !open && setViewingPdf(null)}
        >
          <DialogContent className="max-w-3xl w-[90vw] max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-center mb-4">
                {viewingPdf?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-auto flex items-center justify-center">
              {viewingPdf?.fileUrl && (
                <PDFViewer pdfUrl={viewingPdf.fileUrl} />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TeacherResources;