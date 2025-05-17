import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { getQueryFn, apiRequest, queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import EmbeddedContentModal from './EmbeddedContentModal';

// Import sample resources for Book 7, Unit 6
import { unit6Resources, britishCurrencyLessonPlan, internationalMoneyLessonPlan, spendingSavingLessonPlan } from '@/data/unit6-resources';

// Import centralized resources for Books 5, 6, and 7
import { generateBook6UnitResources, generateDefaultBook6UnitLessonPlans, BOOK6_UNIT_TITLES } from '@/data/book6-resources-common';
import { generateBook5UnitResources, generateDefaultBook5UnitLessonPlans, BOOK5_UNIT_TITLES } from '@/data/book5-resources-common';
import { generateBook7UnitResources, generateDefaultBook7UnitLessonPlans, BOOK7_UNIT_TITLES } from '@/data/book7-resources-common';
import { generateBook4UnitResources, generateDefaultBook4UnitLessonPlans, BOOK4_TITLE, BOOK4_UNIT_TITLES } from '@/data/book4-resources-common';

// Import Book 4 implementations
import { getBook4Unit1Resources, getBook4Unit1LessonPlans } from '../data/book4-unit1-implementation';
import { getTeacherResources as getBook4Unit2Resources, getLessonPlans as getBook4Unit2LessonPlans, convertLegacyLessonPlan as convertLegacyLessonPlanUnit2 } from '../data/book4-unit2-implementation';
import { getTeacherResources as getBook4Unit3Resources, getLessonPlans as getBook4Unit3LessonPlans, convertLegacyLessonPlan as convertLegacyLessonPlanUnit3 } from '../data/book4-unit3-implementation';
import { getTeacherResources as getBook4Unit4Resources, getLessonPlans as getBook4Unit4LessonPlans, convertLegacyLessonPlan as convertLegacyLessonPlanUnit4 } from '../data/book4-unit4-implementation';
import { getTeacherResources as getBook4Unit5Resources, getLessonPlans as getBook4Unit5LessonPlans, convertLegacyLessonPlan as convertLegacyLessonPlanUnit5 } from '../data/book4-unit5-implementation';
import { getTeacherResources as getBook4Unit6Resources, getLessonPlans as getBook4Unit6LessonPlans, convertLegacyLessonPlan as convertLegacyLessonPlanUnit6 } from '../data/book4-unit6-implementation';
import { getTeacherResources as getBook4Unit7Resources, getLessonPlans as getBook4Unit7LessonPlans, convertLegacyLessonPlan as convertLegacyLessonPlanUnit7 } from '../data/book4-unit7-implementation';
import { getTeacherResources as getBook4Unit8Resources, getLessonPlans as getBook4Unit8LessonPlans, convertLegacyLessonPlan as convertLegacyLessonPlanUnit8 } from '../data/book4-unit8-implementation';
import { getTeacherResources as getBook4Unit9Resources, getUnitLessonPlans as getBook4Unit9LessonPlans, convertLegacyLessonPlan as convertLegacyLessonPlanUnit9 } from '../data/book4-unit9-implementation';
import { getTeacherResources as getBook4Unit10Resources, getUnitLessonPlans as getBook4Unit10LessonPlans, convertLegacyLessonPlan as convertLegacyLessonPlanUnit10 } from '../data/book4-unit10-implementation';
import { getTeacherResources as getBook4Unit11Resources, getUnitLessonPlans as getBook4Unit11LessonPlans, convertLegacyLessonPlan as convertLegacyLessonPlanUnit11 } from '../data/book4-unit11-implementation';
import { getTeacherResources as getBook4Unit12Resources, getUnitLessonPlans as getBook4Unit12LessonPlans, convertLegacyLessonPlan as convertLegacyLessonPlanUnit12 } from '../data/book4-unit12-implementation';
import { getTeacherResources as getBook4Unit13Resources, getUnitLessonPlans as getBook4Unit13LessonPlans, convertLegacyLessonPlan as convertLegacyLessonPlanUnit13 } from '../data/book4-unit13-implementation';
import { getTeacherResources as getBook4Unit14Resources, getUnitLessonPlans as getBook4Unit14LessonPlans, convertLegacyLessonPlan as convertLegacyLessonPlanUnit14 } from '../data/book4-unit14-implementation';
import { getTeacherResources as getBook4Unit15Resources, getUnitLessonPlans as getBook4Unit15LessonPlans, convertLegacyLessonPlan as convertLegacyLessonPlanUnit15 } from '../data/book4-unit15-implementation';
import { getTeacherResources as getBook4Unit16Resources, getUnitLessonPlans as getBook4Unit16LessonPlans, convertLegacyLessonPlan as convertLegacyLessonPlanUnit16 } from '../data/book4-unit16-implementation';

// Import any specific implementation functions
// Book 6 implementations
import { getBook6Unit5Resources, getBook6Unit5LessonPlans } from '@/data/book6-unit5-implementation';
import { getBook6Unit6Resources, getBook6Unit6LessonPlans } from '@/data/book6-unit6-implementation';
import { getBook6Unit7Resources, getBook6Unit7LessonPlans } from '@/data/book6-unit7-implementation';
import { getBook6Unit8Resources, getBook6Unit8LessonPlans } from '@/data/book6-unit8-implementation';
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
import { generateUnit4LessonPlans } from '@/data/book2-unit4-implementation';

// Book 3 implementations
import { book3Unit1Resources } from '@/data/book3-unit1-resources';
import { book3Unit2Resources } from '@/data/book3-unit2-resources';
import { book3Unit3Resources } from '@/data/book3-unit3-resources';
import { book3Unit4Resources } from '@/data/book3-unit4-resources';
import { getBook3Unit4Resources, generateBook3Unit4LessonPlans } from '@/data/book3-unit4-implementation';
import { book3Unit5Resources } from '@/data/book3-unit5-resources';
import { book3Unit6Resources } from '@/data/book3-unit6-resources';
import { book3Unit9Resources } from '@/data/book3-unit9-resources';
import { getBook3Unit5Resources } from '@/data/book3-unit5-implementation';
import { getBook3Unit6Resources } from '@/data/book3-unit6-implementation';
import { getBook3Unit7Resources, generateBook3Unit7LessonPlans } from '@/data/book3-unit7-implementation';
import { getBook3Unit7ShoppingResources, generateBook3Unit7ShoppingLessonPlans } from '@/data/book3-unit7-shopping-implementation';
import { getBook3Unit9Resources } from '@/data/book3-unit9-implementation';
import { getBook3Unit8Resources, generateBook3Unit8LessonPlans } from '@/data/book3-unit8-implementation';
import { getBook3Unit10Resources, generateBook3Unit10LessonPlans } from '@/data/book3-unit10-implementation';
import { getBook3Unit11Resources, generateBook3Unit11LessonPlans } from '@/data/book3-unit11-implementation';
import { getBook3Unit12Resources, generateBook3Unit12LessonPlans } from '@/data/book3-unit12-implementation';
import { getBook3Unit13Resources, generateBook3Unit13LessonPlans } from '@/data/book3-unit13-implementation';
import { getBook3Unit14Resources, generateBook3Unit14LessonPlans } from '@/data/book3-unit14-implementation';
import { getBook3Unit15Resources, generateBook3Unit15LessonPlans } from '@/data/book3-unit15-implementation';
// Import the sports version of Unit 16 resources and lesson plans
import { getBook3Unit16SportsResources, generateBook3Unit16LessonPlans } from '@/data/book3-unit16-sports-implementation';
import { book3Unit16SportsResources } from '@/data/book3-unit16-sports-resources';
import { getBook3Unit17Resources, generateBook3Unit17LessonPlans } from '@/data/book3-unit17-implementation';
import { book3Unit17Resources } from '@/data/book3-unit17-resources';
import { getBook3Unit18Resources, generateBook3Unit18LessonPlans } from '@/data/book3-unit18-implementation';
import { BOOK3_TITLE, BOOK3_UNIT_TITLES, generateDefaultBook3UnitLessonPlans } from '@/data/book3-resources-common';

// Book 1 implementations
import { generateUnit1LessonPlans as generateBook1Unit1LessonPlans } from '@/data/book1-unit1-implementation';
import { book1Unit5Implementations } from '@/data/book1-unit5-implementation';
import { generateBook1Unit2LessonPlans } from '@/data/book1-unit2-implementation';
import { generateUnit3LessonPlans as generateBook1Unit3LessonPlans } from '@/data/book1-unit3-implementation';
import { generateUnit4LessonPlans as generateBook1Unit4LessonPlans } from '@/data/book1-unit4-implementation';
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
import { book2Unit8Resources } from '@/data/book2-unit8-resources';
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
import "../styles/teacher-resources-grid.css";
import { Gamepad2, Video, FileText, Pencil, Trash2, Plus, ExternalLink, Book, Printer, Image, PenLine, CheckCircle, Maximize2, Play } from 'lucide-react';
import LessonPlanTemplate, { LessonPlan } from './LessonPlanTemplate';
import PDFViewer from './PDFViewer';

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
        case 7: 
          // Default to Solar System implementation unless explicitly requesting shopping
          const useShopping = window.location.pathname.includes('shopping');
          if (useShopping) {
            console.log('Loading Shopping implementation for Unit 7');
            return import('@/data/book3-unit7-shopping-implementation');
          } else {
            console.log('Loading Solar System implementation for Unit 7');
            return import('@/data/book3-unit7-implementation');
          }
        case 8: return import('@/data/book3-unit8-implementation');
        case 9: return import('@/data/book3-unit9-implementation');
        case 10: return import('@/data/book3-unit10-implementation');
        case 11: return import('@/data/book3-unit11-implementation');
        case 12: return import('@/data/book3-unit12-implementation');
        case 13: return import('@/data/book3-unit13-implementation');
        case 14: return import('@/data/book3-unit14-implementation');
        case 15: return import('@/data/book3-unit15-implementation');
        case 16: 
          const unit16Type = window.location.pathname.includes('sports') ? 'sports' : 'house-chores';
          if (unit16Type === 'sports') {
            console.log('Loading Sports implementation for Unit 16');
            return import('@/data/book3-unit16-sports-implementation');
          } else {
            console.log('Loading House Chores implementation for Unit 16');
            return import('@/data/book3-unit16-implementation');
          }
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
        case 7: 
          // Default to Solar System resources
          console.log('Loading resources for Unit 7');
          return import('@/data/book3-unit7-resources');
        case 8: return import('@/data/book3-unit8-resources');
        case 9: return import('@/data/book3-unit9-resources');
        case 10: return import('@/data/book3-unit10-resources');
        case 11: return import('@/data/book3-unit11-resources');
        case 12: return import('@/data/book3-unit12-resources');
        case 13: return import('@/data/book3-unit13-resources');
        case 14: return import('@/data/book3-unit14-resources');
        case 15: return import('@/data/book3-unit15-resources');
        case 16: 
          // Check if we should load Sports or House Chores based on URL parameter
          const urlParams = new URLSearchParams(window.location.search);
          const unitType = urlParams.get('type');
          const useSports = unitType === 'sports';
          
          if (useSports) {
            console.log('Loading Sports resources for Unit 16');
            return import('@/data/book3-unit16-sports-resources');
          } else {
            console.log('Loading House Chores resources for Unit 16');
            return import('@/data/book3-unit16-resources');
          }
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

// Importing the canonical TeacherResource interface from types
import { TeacherResource as StandardTeacherResource, ResourceType } from '@/types/resources';

// Use the standard interface directly - we've updated it to support all the properties
export type TeacherResource = StandardTeacherResource;

interface TeacherResourcesProps {
  bookId: string;
  unitId: string;
  isEditMode?: boolean;
  resourceType?: 'video' | 'game' | 'pdf' | 'lesson';
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

const TeacherResources = ({ bookId, unitId, isEditMode: propIsEditMode, resourceType }: TeacherResourcesProps) => {
  const { toast } = useToast();
  const urlParams = new URLSearchParams(window.location.search);
  const [isEditMode, setIsEditMode] = useState(propIsEditMode || urlParams.get('edit') === 'true');
  
  // For Book 3 Unit 16 which has two versions: House Chores and Sports
  const initialUnitType = urlParams.get('type') === 'sports' ? 'sports' : 'housechores';
  const [unit16Type, setUnit16Type] = useState<string>(initialUnitType);
  const isUnit16 = bookId === '3' && unitId === '16';
  
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [customResources, setCustomResources] = useState<TeacherResource[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingResource, setEditingResource] = useState<TeacherResource | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<TeacherResource | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [viewingPdf, setViewingPdf] = useState<TeacherResource | null>(null);
  const [viewingEmbed, setViewingEmbed] = useState<TeacherResource | null>(null);
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
    if (!bookId || !unitId) {
      console.warn('TeacherResources: Missing bookId or unitId, cannot load resources');
      return;
    }
    
    console.log(`🔄 TeacherResources.loadResourcesAndLessonPlans - Loading for Book ${bookId}, Unit ${unitId}`);
    console.log(`   - Input types: bookId (${typeof bookId}), unitId (${typeof unitId})`);
    console.log(`   - Input values: bookId (${bookId}), unitId (${unitId})`);
    
    
    console.log(`📚 TeacherResources: Starting load for Book ${bookId} Unit ${unitId}`);
    setIsLoadingDynamic(true);
    try {
      // Convert unitId to number for dynamic imports
      const unitNum = parseInt(unitId);
      
      console.log(`🔄 TeacherResources: Loading Book ${bookId} Unit ${unitNum} resources`);
      
      // Load implementation module
      const implModule = await dynamicImplImport(bookId, unitNum);
      console.log('✅ Implementation module loaded:', implModule ? 'Success' : 'Not found');
      
      // Load resources module
      const resourcesModule = await dynamicResourceImport(bookId, unitNum);
      console.log('✅ Resources module loaded:', resourcesModule ? 'Success' : 'Not found');
      
      // Set dynamic resources if available
      if (resourcesModule) {
        // Try to extract resources from the module
        let resources: TeacherResource[] = [];
        
        // Function to extract and collect resources using type assertion
        const extractResources = (key: string, type: 'video' | 'game' | 'pdf' | 'lesson' = 'video') => {
          // Use type assertion to avoid TypeScript errors
          const resourcesArray = (resourcesModule as any)[key];
          if (Array.isArray(resourcesArray)) {
            console.log(`✅ Found ${resourcesArray.length} resources in key "${key}"`);
            resources.push(...resourcesArray.map(r => ({
              ...r,
              resourceType: r.resourceType || type,
              bookId,
              unitId
            })));
          } else {
            console.warn(`⚠️ Key "${key}" is not an array or doesn't exist`);
          }
        };
        
        // Try to extract resources by different naming patterns
        // Use type assertion to avoid TypeScript errors
        console.log(`📋 Resource keys for Book ${bookId} Unit ${unitNum}:`, Object.keys(resourcesModule));
        
        if ((resourcesModule as any).resources) {
          console.log(`Found 'resources' array with ${(resourcesModule as any).resources.length} items`);
          extractResources('resources');
        }
        if ((resourcesModule as any).videos) {
          console.log(`Found 'videos' array with ${(resourcesModule as any).videos.length} items`);
          extractResources('videos', 'video');
        }
        if ((resourcesModule as any).games) {
          console.log(`Found 'games' array with ${(resourcesModule as any).games.length} items`);
          extractResources('games', 'game');
        }
        if ((resourcesModule as any).pdfs) {
          console.log(`Found 'pdfs' array with ${(resourcesModule as any).pdfs.length} items`);
          extractResources('pdfs', 'pdf');
        }
        
        // Book1 specific units implementation for all units
        if (bookId === '1') {
          console.log(`Checking for Book 1 Unit ${unitNum} specific resources in module`);
          
          try {
            let unitResources: TeacherResource[] = [];
            
            // Handle all unit types with a consistent approach
            const resourceVarName = `book1Unit${unitNum}Resources`;
            console.log(`Looking for ${resourceVarName}`);
            
            if ((resourcesModule as any)[resourceVarName]) {
              console.log(`Using ${resourceVarName} directly`);
              unitResources = (resourcesModule as any)[resourceVarName];
              
              // Push the unit resources into the combined resources
              resources.push(...unitResources.map(r => ({
                ...r,
                resourceType: r.resourceType || 'video',
                bookId,
                unitId
              })));
            }
            
            // Also check for video and game resources with specific naming patterns
            const videoResourceVarName = `book1Unit${unitNum}VideoResources`;
            const gameResourceVarName = `book1Unit${unitNum}GameResources`;
            
            if ((resourcesModule as any)[videoResourceVarName]) {
              console.log(`Using ${videoResourceVarName} directly`);
              const videoResources = (resourcesModule as any)[videoResourceVarName];
              resources.push(...videoResources.map((r: TeacherResource) => ({
                ...r,
                resourceType: 'video',
                bookId,
                unitId
              })));
            }
            
            if ((resourcesModule as any)[gameResourceVarName]) {
              console.log(`Using ${gameResourceVarName} directly`);
              const gameResources = (resourcesModule as any)[gameResourceVarName];
              resources.push(...gameResources.map((r: TeacherResource) => ({
                ...r,
                resourceType: 'game',
                bookId,
                unitId
              })));
            }
          } catch (error) {
            console.error(`Error handling Book 1 Unit ${unitNum} resources:`, error);
          }
        }
        
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
        // Handle Book 3 resources
        else if (bookId === '3') {
          try {
            // Check for specific resource getter functions using type assertion
            const typedResourcesModule = resourcesModule as any;
              
            if (unitNum === 1 && typedResourcesModule.book3Unit1Resources) {
              console.log('Using book3Unit1Resources directly');
              resources = typedResourcesModule.book3Unit1Resources;
            } else if (unitNum === 2 && typedResourcesModule.book3Unit2Resources) {
              console.log('Using book3Unit2Resources directly');
              resources = typedResourcesModule.book3Unit2Resources;
            } else if (unitNum === 3 && typedResourcesModule.book3Unit3Resources) {
              console.log('Using book3Unit3Resources directly');
              resources = typedResourcesModule.book3Unit3Resources;
            } else if (unitNum === 4 && typedResourcesModule.book3Unit4Resources) {
              console.log('Using book3Unit4Resources directly');
              resources = typedResourcesModule.book3Unit4Resources;
              
              // Also try getting resources from implementation module
              try {
                if (typedResourcesModule.getBook3Unit4Resources) {
                  console.log('Using getBook3Unit4Resources function');
                  resources = typedResourcesModule.getBook3Unit4Resources();
                }
              } catch (error) {
                console.error('Error using getBook3Unit4Resources:', error);
              }
            } else if (unitNum === 5 && typedResourcesModule.getBook3Unit5Resources) {
              console.log('Using getBook3Unit5Resources function');
              resources = typedResourcesModule.getBook3Unit5Resources();
            } else if (unitNum === 6 && typedResourcesModule.getBook3Unit6Resources) {
              console.log('Using getBook3Unit6Resources function');
              resources = typedResourcesModule.getBook3Unit6Resources();
            } else if (unitNum === 7) {
              // Special handling for Unit 7 which has two versions (Solar System and Shopping)
              // Try to determine the right one based on title or requested content
              if (typedResourcesModule.getBook3Unit7ShoppingResources) {
                console.log('Using getBook3Unit7ShoppingResources function');
                resources = typedResourcesModule.getBook3Unit7ShoppingResources();
              } else if (typedResourcesModule.getBook3Unit7Resources) {
                console.log('Using getBook3Unit7Resources function');
                resources = typedResourcesModule.getBook3Unit7Resources();
              }
            } else if (unitNum === 9 && typedResourcesModule.getBook3Unit9Resources) {
              console.log('Using getBook3Unit9Resources function');
              resources = typedResourcesModule.getBook3Unit9Resources();
            } else if (unitNum === 1 && typedResourcesModule.getBook3Unit1Resources) {
              console.log('Using getBook3Unit1Resources function');
              resources = typedResourcesModule.getBook3Unit1Resources();
            } else if (unitNum === 2 && typedResourcesModule.getBook3Unit2Resources) {
              console.log('Using getBook3Unit2Resources function');
              resources = typedResourcesModule.getBook3Unit2Resources();
            } else if (unitNum === 3 && typedResourcesModule.getBook3Unit3Resources) {
              console.log('Using getBook3Unit3Resources function');
              resources = typedResourcesModule.getBook3Unit3Resources();
            } else if (unitNum === 4 && typedResourcesModule.getBook3Unit4Resources) {
              console.log('Using getBook3Unit4Resources function');
              resources = typedResourcesModule.getBook3Unit4Resources();
            } else if (unitNum === 5 && typedResourcesModule.getBook3Unit5Resources) {
              console.log('Using getBook3Unit5Resources function');
              resources = typedResourcesModule.getBook3Unit5Resources();
            } else if (unitNum === 6 && typedResourcesModule.getBook3Unit6Resources) {
              console.log('Using getBook3Unit6Resources function');
              resources = typedResourcesModule.getBook3Unit6Resources();
            } else if (unitNum === 7) {
              // Special handling for Unit 7 getter functions
              if (typedResourcesModule.getBook3Unit7SolarResources) {
                console.log('Using getBook3Unit7SolarResources function');
                resources = typedResourcesModule.getBook3Unit7SolarResources();
              } else if (typedResourcesModule.getBook3Unit7ShoppingResources) {
                console.log('Using getBook3Unit7ShoppingResources function');
                resources = typedResourcesModule.getBook3Unit7ShoppingResources();
              } else if (typedResourcesModule.getBook3Unit7Resources) {
                console.log('Using getBook3Unit7Resources function');
                resources = typedResourcesModule.getBook3Unit7Resources();
              }
            } else if (unitNum === 9 && typedResourcesModule.getBook3Unit9Resources) {
              console.log('Using getBook3Unit9Resources function');
              resources = typedResourcesModule.getBook3Unit9Resources();
            } else if (unitNum === 8) {
              if (typedResourcesModule.getBook3Unit8Resources) {
                console.log('Using getBook3Unit8Resources function');
                resources = typedResourcesModule.getBook3Unit8Resources();
              } else if (typedResourcesModule.book3Unit8Resources) {
                console.log('Using book3Unit8Resources directly');
                resources = typedResourcesModule.book3Unit8Resources;
              } else {
                console.log('Using unit8Resources from import');
                // Import from the centralized resources file
                import('@/data/book3-resources')
                  .then(module => {
                    if (module.unit8Resources) {
                      resources = module.unit8Resources;
                      setDynamicResources(resources);
                    }
                  })
                  .catch(err => console.error('Error importing unit8Resources:', err));
              }
            } else if (unitNum === 10 && typedResourcesModule.getBook3Unit10Resources) {
              console.log('Using getBook3Unit10Resources function');
              resources = typedResourcesModule.getBook3Unit10Resources();
            } else if (unitNum === 12 && typedResourcesModule.getBook3Unit12Resources) {
              console.log('Using getBook3Unit12Resources function');
              resources = typedResourcesModule.getBook3Unit12Resources();
            } else if (unitNum === 13 && typedResourcesModule.getBook3Unit13Resources) {
              console.log('Using getBook3Unit13Resources function');
              resources = typedResourcesModule.getBook3Unit13Resources();
            } else if (unitNum === 14 && typedResourcesModule.getBook3Unit14Resources) {
              console.log('Using getBook3Unit14Resources function');
              resources = typedResourcesModule.getBook3Unit14Resources();
            } else if (unitNum === 15 && typedResourcesModule.getBook3Unit15Resources) {
              console.log('Using getBook3Unit15Resources function');
              resources = typedResourcesModule.getBook3Unit15Resources();
            } else if (unitNum === 16 && typedResourcesModule.getBook3Unit16Resources) {
              console.log('Using getBook3Unit16Resources function');
              resources = typedResourcesModule.getBook3Unit16Resources();
            } else if (unitNum === 17 && typedResourcesModule.getBook3Unit17Resources) {
              console.log('Using getBook3Unit17Resources function');
              resources = typedResourcesModule.getBook3Unit17Resources();
            } else if (unitNum === 18 && typedResourcesModule.getBook3Unit18Resources) {
              console.log('Using getBook3Unit18Resources function');
              resources = typedResourcesModule.getBook3Unit18Resources();
            }
            
            // Log resources for debugging
            console.log(`Found ${resources.length} resources for Book ${bookId} Unit ${unitNum}`);
          } catch (error) {
            console.error(`Error getting Book 3 Unit ${unitNum} resources:`, error);
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
              console.log('Using book1Unit5Implementations directly');
              lessonPlans = book1Unit5Implementations;
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
        // Handle Book 3 lesson plans
        else if (bookId === '3') {
          try {
            // Check for specific lesson plan getter functions using type assertion
            const typedImplModule = implModule as any;
            
            // Book 3 lesson plans
            if (unitNum === 1 && typedImplModule.generateUnit1LessonPlans) {
              console.log('Using generateUnit1LessonPlans for Book 3');
              lessonPlans = typedImplModule.generateUnit1LessonPlans();
            } else if (unitNum === 2 && typedImplModule.generateUnit2LessonPlans) {
              console.log('Using generateUnit2LessonPlans for Book 3');
              lessonPlans = typedImplModule.generateUnit2LessonPlans();
            } else if (unitNum === 3 && typedImplModule.generateUnit3LessonPlans) {
              console.log('Using generateUnit3LessonPlans for Book 3');
              lessonPlans = typedImplModule.generateUnit3LessonPlans();
            } else if (unitNum === 4 && typedImplModule.generateBook3Unit4LessonPlans) {
              console.log('Using generateBook3Unit4LessonPlans for Book 3');
              lessonPlans = typedImplModule.generateBook3Unit4LessonPlans();
            } else if (unitNum === 5 && typedImplModule.generateUnit5LessonPlans) {
              console.log('Using generateUnit5LessonPlans for Book 3');
              lessonPlans = typedImplModule.generateUnit5LessonPlans();
            } else if (unitNum === 6 && typedImplModule.generateUnit6LessonPlans) {
              console.log('Using generateUnit6LessonPlans for Book 3');
              lessonPlans = typedImplModule.generateUnit6LessonPlans();
            } else if (unitNum === 7) {
              // Using Solar System lesson plans for Unit 7
              if (typedImplModule.generateBook3Unit7SolarLessonPlans) {
                console.log('Using generateBook3Unit7SolarLessonPlans for Book 3');
                lessonPlans = typedImplModule.generateBook3Unit7SolarLessonPlans();
              } else if (typedImplModule.generateUnit7LessonPlans) {
                console.log('Using generateUnit7LessonPlans for Book 3');
                lessonPlans = typedImplModule.generateUnit7LessonPlans();
              }
            } else if (unitNum === 9 && typedImplModule.generateBook3Unit9LessonPlans) {
              console.log('Using generateBook3Unit9LessonPlans for Book 3');
              lessonPlans = typedImplModule.generateBook3Unit9LessonPlans();
            } else if (unitNum === 8) {
              if (typedImplModule.generateBook3Unit8LessonPlans) {
                console.log('Using generateBook3Unit8LessonPlans for Book 3');
                lessonPlans = typedImplModule.generateBook3Unit8LessonPlans();
              } else {
                console.log('Using fallback to import lesson plans for Book 3 Unit 8');
                // Import from the implementation file directly
                import('@/data/book3-unit8-implementation')
                  .then(module => {
                    if (module.generateBook3Unit8LessonPlans) {
                      lessonPlans = module.generateBook3Unit8LessonPlans();
                      setDynamicLessonPlans(lessonPlans);
                    }
                  })
                  .catch(err => console.error('Error importing Book 3 Unit 8 lesson plans:', err));
              }
            } else if (unitNum === 10 && typedImplModule.generateBook3Unit10LessonPlans) {
              console.log('Using generateBook3Unit10LessonPlans for Book 3');
              lessonPlans = typedImplModule.generateBook3Unit10LessonPlans();
            } else if (unitNum === 11 && typedImplModule.generateBook3Unit11LessonPlans) {
              console.log('Using generateBook3Unit11LessonPlans for Book 3');
              lessonPlans = typedImplModule.generateBook3Unit11LessonPlans();
            } else if (unitNum === 12 && typedImplModule.generateBook3Unit12LessonPlans) {
              console.log('Using generateBook3Unit12LessonPlans for Book 3');
              lessonPlans = typedImplModule.generateBook3Unit12LessonPlans();
            } else if (unitNum === 13 && typedImplModule.generateBook3Unit13LessonPlans) {
              console.log('Using generateBook3Unit13LessonPlans for Book 3');
              lessonPlans = typedImplModule.generateBook3Unit13LessonPlans();
            } else if (unitNum === 14 && typedImplModule.generateBook3Unit14LessonPlans) {
              console.log('Using generateBook3Unit14LessonPlans for Book 3');
              lessonPlans = typedImplModule.generateBook3Unit14LessonPlans();
            } else if (unitNum === 15 && typedImplModule.generateBook3Unit15LessonPlans) {
              console.log('Using generateBook3Unit15LessonPlans for Book 3');
              lessonPlans = typedImplModule.generateBook3Unit15LessonPlans();
            } else if (unitNum === 16) {
              // Special handling for Unit 16 which has two versions: House Chores and Sports
              // Check if we should show Sports or House Chores based on URL
              const urlParams = new URLSearchParams(window.location.search);
              const unitType = urlParams.get('type');
              const useSports = unitType === 'sports';
              
              if (useSports && typedImplModule.generateBook3Unit16SportsLessonPlans) {
                console.log('Using generateBook3Unit16SportsLessonPlans for Book 3');
                lessonPlans = typedImplModule.generateBook3Unit16SportsLessonPlans();
              } else if (typedImplModule.generateBook3Unit16LessonPlans) {
                console.log('Using generateBook3Unit16LessonPlans for Book 3');
                lessonPlans = typedImplModule.generateBook3Unit16LessonPlans();
              }
            } else if (unitNum === 18 && typedImplModule.generateBook3Unit18LessonPlans) {
              console.log('Using generateBook3Unit18LessonPlans for Book 3');
              lessonPlans = typedImplModule.generateBook3Unit18LessonPlans();
            }
            
            console.log(`Found ${lessonPlans.length} lesson plans for Book ${bookId} Unit ${unitNum}`);
          } catch (error) {
            console.error(`Error getting Book 3 Unit ${unitNum} lesson plans:`, error);
          }
        }
        // Handle Book 4 lesson plans
        else if (bookId === '4') {
          try {
            // Use our centralized lesson plan generator for Book 4
            const unitTitle = BOOK4_UNIT_TITLES[unitId] || `Unit ${unitId}`;
            const defaultPlans = generateDefaultBook4UnitLessonPlans(unitId, unitTitle);
            lessonPlans.push(...defaultPlans);
            
            // Check for specific lesson plan getter functions using type assertion
            const typedImplModule = implModule as any;
            
            if (unitNum === 1 && typedImplModule.getBook4Unit1LessonPlans) {
              console.log('Using getBook4Unit1LessonPlans for Book 4');
              lessonPlans = typedImplModule.getBook4Unit1LessonPlans();
            } else if (unitNum === 3 && typedImplModule.getBook4Unit3LessonPlans) {
              console.log('Using getBook4Unit3LessonPlans for Book 4');
              lessonPlans = typedImplModule.getBook4Unit3LessonPlans();
            }
            
            console.log(`Found ${lessonPlans.length} lesson plans for Book ${bookId} Unit ${unitNum}`);
          } catch (error) {
            console.error(`Error getting Book 4 Unit ${unitNum} lesson plans:`, error);
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
  // This ensures resources get loaded when the component mounts or when dependencies change
  // The primary hook is below with more debugging
  
  // Debug monitoring for dynamicLessonPlans changes
  useEffect(() => {
    console.log(`📋 TeacherResources: Dynamic lesson plans updated. Count: ${dynamicLessonPlans.length}`);
    if (dynamicLessonPlans.length > 0) {
      console.log(`📋 First lesson plan title: "${dynamicLessonPlans[0].title}"`);
    }
  }, [dynamicLessonPlans]);
  
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
    console.log(`🚀 TeacherResources mounted for Book ${bookId}, Unit ${unitId}`);
    loadResourcesAndLessonPlans();
    
    // For Book 1 Unit 2 specifically, we'll do extra logging to debug
    if (bookId === '1' && unitId === '2') {
      console.log('🔍 DEBUGGING BOOK 1 UNIT 2 RESOURCES:');
      console.log('- generateBook1Unit2LessonPlans imported correctly?', typeof generateBook1Unit2LessonPlans === 'function');
      console.log('- book1Unit2Resources available?', Array.isArray(book1Unit2Resources));
      if (Array.isArray(book1Unit2Resources)) {
        console.log(`- book1Unit2Resources length: ${book1Unit2Resources.length}`);
      }
      console.log('- book1Unit2VideoResources available?', Array.isArray(book1Unit2VideoResources));
      if (Array.isArray(book1Unit2VideoResources)) {
        console.log(`- book1Unit2VideoResources length: ${book1Unit2VideoResources.length}`);
      }
      console.log('- book1Unit2GameResources available?', Array.isArray(book1Unit2GameResources));
      if (Array.isArray(book1Unit2GameResources)) {
        console.log(`- book1Unit2GameResources length: ${book1Unit2GameResources.length}`);
      }
    }
  }, [loadResourcesAndLessonPlans, bookId, unitId]);

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
        // Use setDynamicLessonPlans to load the lesson plans too
        setDynamicLessonPlans(book1Unit5Implementations);
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
        return book2Unit8Resources;
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
    // Book 3 units
    else if (bookId === '3') {
      if (unitId === '1') {
        console.log('Loading Book 3 Unit 1 resources');
        return book3Unit1Resources || [];
      } else if (unitId === '2') {
        console.log('Loading Book 3 Unit 2 resources');
        return book3Unit2Resources || [];
      } else if (unitId === '3') {
        console.log('Loading Book 3 Unit 3 resources');
        return book3Unit3Resources || [];
      } else if (unitId === '4') {
        console.log('Loading Book 3 Unit 4 resources');
        return book3Unit4Resources || [];
      } else if (unitId === '5') {
        console.log('Loading Book 3 Unit 5 resources');
        return book3Unit5Resources || [];
      } else if (unitId === '6') {
        console.log('Loading Book 3 Unit 6 resources');
        return book3Unit6Resources || [];
      } else if (unitId === '7') {
        console.log('Loading Book 3 Unit 7 resources (Solar)');
        return getBook3Unit7Resources();
      } else if (unitId === '8') {
        console.log('Loading Book 3 Unit 8 resources');
        return getBook3Unit8Resources();
      } else if (unitId === '9') {
        console.log('Loading Book 3 Unit 9 resources');
        return getBook3Unit9Resources();
      } else if (unitId === '10') {
        console.log('Loading Book 3 Unit 10 resources');
        return getBook3Unit10Resources();
      } else if (unitId === '11') {
        console.log('Loading Book 3 Unit 11 resources');
        return getBook3Unit11Resources();
      } else if (unitId === '12') {
        console.log('Loading Book 3 Unit 12 resources');
        return getBook3Unit12Resources();
      } else if (unitId === '13') {
        console.log('Loading Book 3 Unit 13 resources');
        return getBook3Unit13Resources();
      } else if (unitId === '14') {
        console.log('Loading Book 3 Unit 14 resources');
        return getBook3Unit14Resources();
      } else if (unitId === '15') {
        console.log('Loading Book 3 Unit 15 resources');
        return getBook3Unit15Resources();
      } else if (unitId === '16') {
        console.log('Loading Book 3 Unit 16 Sports resources');
        return getBook3Unit16SportsResources();
      } else if (unitId === '17') {
        console.log('Loading Book 3 Unit 17 House Chores resources');
        return getBook3Unit17Resources();
      }
      // For other Book 3 units that don't have specific implementations
      return [];
    }
    // Book 4 units
    else if (bookId === '4') {
      // Special cases for units with their own implementation
      if (unitId === '1') {
        try {
          console.log('Loading Book 4 Unit 1 resources from implementation');
          return getBook4Unit1Resources();
        } catch (error) {
          console.error('Error getting Book 4 Unit 1 resources, falling back to common resources:', error);
          return generateBook4UnitResources(unitId);
        }
      } else if (unitId === '2') {
        try {
          console.log('Loading Book 4 Unit 2 resources from implementation');
          return getBook4Unit2Resources();
        } catch (error) {
          console.error('Error getting Book 4 Unit 2 resources, falling back to common resources:', error);
          return generateBook4UnitResources(unitId);
        }
      } else if (unitId === '3') {
        try {
          console.log('Loading Book 4 Unit 3 resources from implementation');
          return getBook4Unit3Resources();
        } catch (error) {
          console.error('Error getting Book 4 Unit 3 resources, falling back to common resources:', error);
          return generateBook4UnitResources(unitId);
        }
      } else if (unitId === '4') {
        try {
          console.log('Loading Book 4 Unit 4 resources from implementation');
          return getBook4Unit4Resources();
        } catch (error) {
          console.error('Error getting Book 4 Unit 4 resources, falling back to common resources:', error);
          return generateBook4UnitResources(unitId);
        }
      } else if (unitId === '5') {
        try {
          console.log('Loading Book 4 Unit 5 resources from implementation');
          return getBook4Unit5Resources();
        } catch (error) {
          console.error('Error getting Book 4 Unit 5 resources, falling back to common resources:', error);
          return generateBook4UnitResources(unitId);
        }
      } else if (unitId === '6') {
        try {
          console.log('Loading Book 4 Unit 6 resources from implementation');
          return getBook4Unit6Resources();
        } catch (error) {
          console.error('Error getting Book 4 Unit 6 resources, falling back to common resources:', error);
          return generateBook4UnitResources(unitId);
        }
      } else if (unitId === '7') {
        try {
          console.log('Loading Book 4 Unit 7 resources from implementation');
          return getBook4Unit7Resources();
        } catch (error) {
          console.error('Error getting Book 4 Unit 7 resources, falling back to common resources:', error);
          return generateBook4UnitResources(unitId);
        }
      } else if (unitId === '8') {
        try {
          console.log('Loading Book 4 Unit 8 resources from implementation');
          return getBook4Unit8Resources();
        } catch (error) {
          console.error('Error getting Book 4 Unit 8 resources, falling back to common resources:', error);
          return generateBook4UnitResources(unitId);
        }
      } else if (unitId === '9') {
        try {
          console.log('Loading Book 4 Unit 9 resources from implementation');
          return getBook4Unit9Resources();
        } catch (error) {
          console.error('Error getting Book 4 Unit 9 resources, falling back to common resources:', error);
          return generateBook4UnitResources(unitId);
        }
      } else if (unitId === '10') {
        try {
          console.log('Loading Book 4 Unit 10 resources from implementation');
          return getBook4Unit10Resources();
        } catch (error) {
          console.error('Error getting Book 4 Unit 10 resources, falling back to common resources:', error);
          return generateBook4UnitResources(unitId);
        }
      } else if (unitId === '11') {
        try {
          console.log('Loading Book 4 Unit 11 resources from implementation');
          return getBook4Unit11Resources();
        } catch (error) {
          console.error('Error getting Book 4 Unit 11 resources, falling back to common resources:', error);
          return generateBook4UnitResources(unitId);
        }
      }
      // For other Book 4 units, use the centralized resource generator
      console.log(`Loading centralized resources for Book 4 Unit ${unitId}`);
      return generateBook4UnitResources(unitId);
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
          return getBook6Unit10Resources();
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
              <Card 
                key={resource.id || index} 
                className="overflow-hidden rounded-xl hover:shadow-lg transition-all border border-gray-100 bg-gradient-to-b from-white to-gray-50"
              >
                <CardHeader className="pb-2 bg-gradient-to-r from-primary/5 to-primary/10">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                      {resource.title}
                    </CardTitle>
                    <Badge variant="outline" className="ml-2 rounded-full bg-white shadow-sm border-primary/20">
                      <Video className="h-3 w-3 mr-1 text-primary" />
                      Video
                    </Badge>
                  </div>
                  {resource.provider && (
                    <CardDescription className="text-xs font-medium text-gray-500">
                      Provider: {resource.provider}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-2">
                  {resource.embedCode ? (
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted shadow-inner">
                      {(() => {
                        // Extract YouTube video ID from embed code
                        const youtubeMatch = resource.embedCode.match(/youtube\.com\/embed\/([^"&?\/\s]+)/);
                        // Extract Wordwall game ID from embed code
                        const wordwallMatch = resource.embedCode.match(/wordwall\.net\/embed\/([^"&?\/\s]+)/);
                        // Extract ISL Collective video ID
                        const islCollectiveMatch = resource.embedCode.match(/islcollective\.com\/video-lessons\/embed\/([^"&?\/\s]+)/);
                        
                        if (youtubeMatch && youtubeMatch[1]) {
                          const videoId = youtubeMatch[1];
                          return (
                            <div className="relative w-full h-full">
                              <img 
                                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                                alt={resource.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center">
                                  <Play className="h-8 w-8 text-white fill-white" />
                                </div>
                              </div>
                            </div>
                          );
                        } else if (wordwallMatch && wordwallMatch[1]) {
                          return (
                            <div className="flex items-center justify-center h-full bg-gradient-to-r from-purple-100 to-indigo-100">
                              <div className="text-center p-4">
                                <svg width="120" height="40" viewBox="0 0 120 40" className="mx-auto mb-2">
                                  <path d="M25 0H95C108.807 0 120 11.1929 120 25V35C120 37.7614 117.761 40 115 40H25C11.1929 40 0 28.8071 0 15V15C0 6.71573 6.71573 0 15 0H25Z" fill="#8854C0"/>
                                  <path d="M57.1 28H59.42V21.68H66.28V19.64H59.42V14.2H66.88V12.16H57.1V28ZM74.0678 28.24C76.9878 28.24 79.1478 26.54 79.1478 23.94V23.9C79.1478 21.42 77.0678 20.06 74.4078 20.06C73.2478 20.06 72.2478 20.28 71.4478 20.64C71.1078 20.78 70.6878 20.98 70.6878 21.46C70.6878 21.96 71.0878 22.36 71.5878 22.36C71.7678 22.36 71.9078 22.32 72.0678 22.24C72.7278 21.92 73.4878 21.74 74.3678 21.74C76.0278 21.74 77.1678 22.62 77.1678 23.96V24.08C76.5078 23.76 75.5278 23.48 74.2278 23.48C71.8078 23.48 69.9678 24.54 69.9678 26.82V26.86C69.9678 28.94 71.7078 30.08 73.7478 30.08C75.3278 30.08 76.4278 29.48 77.1878 28.48V28.8C77.1878 29.32 77.6278 29.76 78.2678 29.76C78.9078 29.76 79.3478 29.32 79.3478 28.7V23.82C79.3478 22.9 79.1078 22.12 78.6078 21.52C77.9478 20.72 76.8678 20.28 75.3478 20.28C73.6878 20.28 72.3678 20.64 71.1478 21.32C70.7878 21.5 70.5478 21.82 70.5478 22.24C70.5478 22.72 70.9478 23.12 71.4278 23.12C71.6278 23.12 71.8078 23.06 71.9878 22.96C72.9878 22.42 73.9878 22.16 75.0478 22.16C76.3678 22.16 77.1878 22.68 77.1878 23.62V25.1C76.4278 24.38 75.3878 23.9 74.0678 23.9C72.4678 23.9 71.3878 24.6 71.3878 25.92V25.96C71.3878 27.32 72.4878 28.24 74.0678 28.24ZM77.1878 26.46C76.4878 27.42 75.4678 28.06 74.2278 28.06C73.1678 28.06 72.4078 27.62 72.4078 26.82V26.78C72.4078 25.86 73.2278 25.28 74.4878 25.28C75.4478 25.28 76.4478 25.52 77.1878 25.96V26.46ZM88.2947 30.08C91.3147 30.08 93.7347 27.88 93.7347 25.12V25.08C93.7347 22.32 91.3347 20.16 88.2947 20.16C85.2547 20.16 82.8547 22.36 82.8547 25.12V25.16C82.8547 27.9 85.2547 30.08 88.2947 30.08ZM88.2947 28.38C86.2547 28.38 84.7547 26.92 84.7547 25.12V25.08C84.7547 23.28 86.2347 21.86 88.2947 21.86C90.3547 21.86 91.8347 23.32 91.8347 25.12V25.16C91.8347 26.94 90.3547 28.38 88.2947 28.38ZM98.0859 28H100.026V24.22C100.026 23.26 100.246 22.54 100.666 22.04C101.046 21.6 101.566 21.36 102.226 21.36C103.546 21.36 104.206 22.16 104.206 23.64V28H106.146V23.24C106.146 21.84 105.806 20.92 105.146 20.28C104.506 19.66 103.606 19.32 102.486 19.32C101.066 19.32 100.046 19.9 99.4063 20.86V19.66C99.4063 19.14 98.9863 18.72 98.3663 18.72C97.7463 18.72 97.3263 19.14 97.3263 19.72V28C97.3263 28.56 97.7263 29 98.3463 29C98.9663 29 99.4063 28.56 99.4063 28H100.026H98.0859ZM112.821 28H114.761V24.06C114.761 21.58 113.201 20.06 110.941 20.06C109.761 20.06 108.741 20.4 107.961 20.98C107.641 21.22 107.421 21.54 107.421 21.92C107.421 22.42 107.821 22.82 108.321 22.82C108.561 22.82 108.761 22.74 108.921 22.62C109.501 22.2 110.181 21.98 110.881 21.98C112.321 21.98 113.141 22.8 113.141 24.26V24.94C112.421 24.26 111.381 23.78 110.001 23.78C108.041 23.78 106.441 24.86 106.441 26.92V26.96C106.441 29.02 108.061 30.08 110.061 30.08C111.461 30.08 112.501 29.52 113.221 28.68V28.82C113.221 29.34 113.661 29.78 114.281 29.78C114.901 29.78 115.341 29.34 115.341 28.74V24.2C115.341 22.12 114.361 20.06 110.941 20.06C110.941 20.06 114.361 20.06 110.941 20.06ZM113.141 26.7C112.421 27.68 111.381 28.32 110.081 28.32C108.961 28.32 108.001 27.8 108.001 26.82V26.78C108.001 25.72 108.961 25.06 110.301 25.06C111.401 25.06 112.461 25.4 113.141 25.98V26.7Z" fill="white"/>
                                  <path d="M33.632 14.104C32.944 14.104 32.384 14.344 31.952 14.824C31.528 15.304 31.316 15.96 31.316 16.792C31.316 17.624 31.528 18.28 31.952 18.76C32.384 19.24 32.944 19.48 33.632 19.48C34.32 19.48 35.048 19.152 35.816 18.496L36.8 19.648C35.768 20.624 34.688 21.112 33.56 21.112C32.224 21.112 31.164 20.704 30.38 19.888C29.604 19.064 29.216 18.032 29.216 16.792C29.216 15.552 29.608 14.52 30.392 13.696C31.176 12.872 32.224 12.46 33.536 12.46C34.296 12.46 34.972 12.608 35.564 12.904C36.164 13.2 36.692 13.616 37.148 14.152L36.08 15.304C35.784 14.944 35.444 14.656 35.06 14.44C34.684 14.216 34.192 14.104 33.632 14.104ZM43.267 12.46C44.419 12.46 45.319 12.872 45.967 13.696C46.615 14.512 46.939 15.536 46.939 16.768C46.939 18 46.615 19.028 45.967 19.852C45.319 20.668 44.419 21.076 43.267 21.076C42.115 21.076 41.211 20.664 40.555 19.84C39.899 19.016 39.571 17.992 39.571 16.768C39.571 15.536 39.899 14.512 40.555 13.696C41.211 12.872 42.115 12.46 43.267 12.46ZM43.267 14.128C42.643 14.128 42.163 14.348 41.827 14.788C41.491 15.22 41.323 15.872 41.323 16.744C41.323 17.608 41.491 18.264 41.827 18.712C42.163 19.16 42.643 19.384 43.267 19.384C43.891 19.384 44.363 19.164 44.683 18.724C45.011 18.276 45.175 17.616 45.175 16.744C45.175 15.872 45.011 15.216 44.683 14.776C44.363 14.344 43.891 14.128 43.267 14.128ZM52.3741 21.088C51.5181 21.088 50.8261 20.836 50.2981 20.332C49.7781 19.828 49.5181 19.116 49.5181 18.196V14.512H48.1501V13.072H49.5181V11.332L51.2261 10.672V13.072H53.3341V14.512H51.2261V18.052C51.2261 18.524 51.3181 18.864 51.5021 19.072C51.6861 19.28 51.9541 19.384 52.3061 19.384C52.7141 19.384 53.0501 19.244 53.3141 18.964L54.0501 20.152C53.5141 20.776 52.9781 21.088 52.3741 21.088Z" fill="white"/>
                                </svg>
                                <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                                  Wordwall Interactive Exercise
                                </p>
                              </div>
                            </div>
                          );
                        } else if (islCollectiveMatch && islCollectiveMatch[1]) {
                          return (
                            <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-100 to-green-100">
                              <div className="text-center p-4">
                                <svg width="140" height="40" viewBox="0 0 140 40" className="mx-auto mb-2">
                                  <rect width="140" height="40" rx="8" fill="#2D8CFF"/>
                                  <path d="M24.7822 11.2H30.4622V28H28.4222V13.24H24.7822V11.2ZM37.3313 28.24C40.2513 28.24 42.4113 26.54 42.4113 23.94V23.9C42.4113 21.42 40.3313 20.06 37.6713 20.06C36.5113 20.06 35.5113 20.28 34.7113 20.64C34.3713 20.78 33.9513 20.98 33.9513 21.46C33.9513 21.96 34.3513 22.36 34.8513 22.36C35.0313 22.36 35.1713 22.32 35.3313 22.24C35.9913 21.92 36.7513 21.74 37.6313 21.74C39.2913 21.74 40.4313 22.62 40.4313 23.96V24.08C39.7713 23.76 38.7913 23.48 37.4913 23.48C35.0713 23.48 33.2313 24.54 33.2313 26.82V26.86C33.2313 28.94 34.9713 30.08 37.0113 30.08C38.5913 30.08 39.6913 29.48 40.4513 28.48V28.8C40.4513 29.32 40.8913 29.76 41.5313 29.76C42.1713 29.76 42.6113 29.32 42.6113 28.7V23.82C42.6113 22.9 42.3713 22.12 41.8713 21.52C41.2113 20.72 40.1313 20.28 38.6113 20.28C36.9513 20.28 35.6313 20.64 34.4113 21.32C34.0513 21.5 33.8113 21.82 33.8113 22.24C33.8113 22.72 34.2113 23.12 34.6913 23.12C34.8913 23.12 35.0713 23.06 35.2513 22.96C36.2513 22.42 37.2513 22.16 38.3113 22.16C39.6313 22.16 40.4513 22.68 40.4513 23.62V25.1C39.6913 24.38 38.6513 23.9 37.3313 23.9C35.7313 23.9 34.6513 24.6 34.6513 25.92V25.96C34.6513 27.32 35.7513 28.24 37.3313 28.24ZM40.4513 26.46C39.7513 27.42 38.7313 28.06 37.4913 28.06C36.4313 28.06 35.6713 27.62 35.6713 26.82V26.78C35.6713 25.86 36.4913 25.28 37.7513 25.28C38.7113 25.28 39.7113 25.52 40.4513 25.96V26.46ZM50.8691 20.06C48.6691 20.06 46.8291 21.74 46.8291 24.92V28C46.8291 28.58 47.2891 29 47.9091 29C48.5291 29 48.9691 28.58 48.9691 28V25.1C48.9691 22.8 49.7891 21.78 51.3691 21.78C51.8091 21.78 52.2091 21.82 52.5891 21.92C52.7091 21.96 52.8491 21.98 52.9691 21.98C53.4291 21.98 53.8091 21.62 53.8091 21.16C53.8091 20.76 53.5491 20.46 53.1691 20.34C52.6091 20.16 51.8491 20.06 50.8691 20.06ZM58.7269 28.2H60.7869V15.08H58.7269V28.2ZM57.5669 17.06C57.5669 17.8 58.1469 18.38 58.9069 18.38C59.6669 18.38 60.2469 17.8 60.2469 17.06C60.2469 16.32 59.6669 15.72 58.9069 15.72C58.1469 15.72 57.5669 16.32 57.5669 17.06ZM65.5397 28.08C66.9797 28.08 67.9997 27.5 68.6397 26.54V28C68.6397 28.56 69.0597 29 69.6797 29C70.2997 29 70.7197 28.56 70.7197 28V21.24C70.7197 20.68 70.3197 20.24 69.6997 20.24C69.0797 20.24 68.6397 20.68 68.6397 21.24V24.82C68.6397 26.2 67.9797 26.42 66.6797 26.42C65.3397 26.42 64.6597 25.62 64.6597 24.14V21.24C64.6597 20.68 64.2197 20.24 63.5997 20.24C62.9797 20.24 62.5397 20.68 62.5397 21.24V24.74C62.5397 26.94 63.6397 28.08 65.5397 28.08ZM72.3714 25.16V25.12C72.3714 28.18 73.9914 30.08 76.8114 30.08C78.4714 30.08 79.9714 29.34 80.8514 28.08L79.6114 27.34C78.9514 28.24 78.0514 28.7 76.9514 28.7C75.2714 28.7 74.2714 27.54 74.0914 25.74H81.1714C81.2114 25.6 81.2314 25.42 81.2314 25.18C81.2314 22.36 79.6514 20.06 76.5514 20.06C73.7514 20.06 72.3714 22.28 72.3714 25.16ZM76.5514 21.44C78.0514 21.44 79.1114 22.52 79.2714 24.38H74.0914C74.3114 22.58 75.2914 21.44 76.5514 21.44ZM88.9052 21.38V20.16H87.2652V17.6C87.2652 17.04 86.8452 16.6 86.2252 16.6C85.6052 16.6 85.1852 17.04 85.1852 17.6V20.16H83.9252V21.38H85.1852V28H87.2652V21.38H88.9052ZM96.4831 28.2H98.5431V15.08H96.4831V28.2ZM95.3231 17.06C95.3231 17.8 95.9031 18.38 96.6631 18.38C97.4231 18.38 98.0031 17.8 98.0031 17.06C98.0031 16.32 97.4231 15.72 96.6631 15.72C95.9031 15.72 95.3231 16.32 95.3231 17.06ZM104.056 28.24C106.976 28.24 109.136 26.54 109.136 23.94V23.9C109.136 21.42 107.056 20.06 104.396 20.06C103.236 20.06 102.236 20.28 101.436 20.64C101.096 20.78 100.676 20.98 100.676 21.46C100.676 21.96 101.076 22.36 101.576 22.36C101.756 22.36 101.896 22.32 102.056 22.24C102.716 21.92 103.476 21.74 104.356 21.74C106.016 21.74 107.156 22.62 107.156 23.96V24.08C106.496 23.76 105.516 23.48 104.216 23.48C101.796 23.48 99.9557 24.54 99.9557 26.82V26.86C99.9557 28.94 101.696 30.08 103.736 30.08C105.316 30.08 106.416 29.48 107.176 28.48V28.8C107.176 29.32 107.616 29.76 108.256 29.76C108.896 29.76 109.336 29.32 109.336 28.7V23.82C109.336 22.9 109.096 22.12 108.596 21.52C107.936 20.72 106.856 20.28 105.336 20.28C103.676 20.28 102.356 20.64 101.136 21.32C100.776 21.5 100.536 21.82 100.536 22.24C100.536 22.72 100.936 23.12 101.416 23.12C101.616 23.12 101.796 23.06 101.976 22.96C102.976 22.42 103.976 22.16 105.036 22.16C106.356 22.16 107.176 22.68 107.176 23.62V25.1C106.416 24.38 105.376 23.9 104.056 23.9C102.456 23.9 101.376 24.6 101.376 25.92V25.96C101.376 27.32 102.476 28.24 104.056 28.24ZM107.176 26.46C106.476 27.42 105.456 28.06 104.216 28.06C103.156 28.06 102.396 27.62 102.396 26.82V26.78C102.396 25.86 103.216 25.28 104.476 25.28C105.436 25.28 106.436 25.52 107.176 25.96V26.46ZM116.03 20.06C113.83 20.06 111.99 21.74 111.99 24.92V28C111.99 28.58 112.45 29 113.07 29C113.69 29 114.13 28.58 114.13 28V25.1C114.13 22.8 114.95 21.78 116.53 21.78C116.97 21.78 117.37 21.82 117.75 21.92C117.87 21.96 118.01 21.98 118.13 21.98C118.59 21.98 118.97 21.62 118.97 21.16C118.97 20.76 118.71 20.46 118.33 20.34C117.77 20.16 117.01 20.06 116.03 20.06Z" fill="white"/>
                                </svg>
                                <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                                  ISL Collective Interactive Video Lesson
                                </p>
                              </div>
                            </div>
                          );
                        } else {
                          // No recognizable video ID, display the embed directly
                          return <div dangerouslySetInnerHTML={{ __html: resource.embedCode }} />;
                        }
                      })()}
                    </div>
                  ) : (
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center shadow-inner">
                      <div className="text-center p-4">
                        <Video className="h-10 w-10 mx-auto mb-2 text-primary/50" />
                        <p className="text-sm text-gray-500 font-medium">Video preview not available</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between bg-gradient-to-b from-gray-50/50 to-gray-100/50 pt-3 pb-3 rounded-b-xl">
                  {resource.sourceUrl && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="rounded-full bg-white hover:bg-primary/10 text-primary hover:text-primary shadow-sm border border-primary/20"
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
              <Card 
                key={resource.id || index} 
                className="overflow-hidden rounded-xl hover:shadow-lg transition-all border border-gray-100 bg-gradient-to-b from-white to-gray-50"
              >
                <CardHeader className="pb-2 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                      {resource.title}
                    </CardTitle>
                    <Badge variant="outline" className="ml-2 rounded-full bg-white shadow-sm border-indigo-200">
                      <Gamepad2 className="h-3 w-3 mr-1 text-indigo-500" />
                      Game
                    </Badge>
                  </div>
                  {resource.provider && (
                    <CardDescription className="text-xs font-medium text-gray-500">
                      Provider: {resource.provider}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-2">
                  {resource.embedCode ? (
                    <div className="w-full rounded-lg overflow-hidden bg-muted shadow-inner">
                      {(() => {
                        // Extract Wordwall game ID from embed code
                        const wordwallMatch = resource.embedCode.match(/wordwall\.net\/(?:resource|embed)\/([^"&?\/\s]+)/);
                        // Extract ISL Collective interactive exercise ID
                        const islCollectiveMatch = resource.embedCode.match(/islcollective\.com\/(?:english-esl-worksheets|video-lessons|grammar-worksheets)\/(?:[^\/]+)\/([^"&?\/\s]+)/);
                        
                        if (wordwallMatch && wordwallMatch[1]) {
                          return (
                            <div className="aspect-video flex items-center justify-center h-full bg-gradient-to-r from-purple-100 to-indigo-100">
                              <div className="text-center p-4">
                                <svg width="120" height="40" viewBox="0 0 120 40" className="mx-auto mb-2">
                                  <path d="M25 0H95C108.807 0 120 11.1929 120 25V35C120 37.7614 117.761 40 115 40H25C11.1929 40 0 28.8071 0 15V15C0 6.71573 6.71573 0 15 0H25Z" fill="#8854C0"/>
                                  <path d="M57.1 28H59.42V21.68H66.28V19.64H59.42V14.2H66.88V12.16H57.1V28ZM74.0678 28.24C76.9878 28.24 79.1478 26.54 79.1478 23.94V23.9C79.1478 21.42 77.0678 20.06 74.4078 20.06C73.2478 20.06 72.2478 20.28 71.4478 20.64C71.1078 20.78 70.6878 20.98 70.6878 21.46C70.6878 21.96 71.0878 22.36 71.5878 22.36C71.7678 22.36 71.9078 22.32 72.0678 22.24C72.7278 21.92 73.4878 21.74 74.3678 21.74C76.0278 21.74 77.1678 22.62 77.1678 23.96V24.08C76.5078 23.76 75.5278 23.48 74.2278 23.48C71.8078 23.48 69.9678 24.54 69.9678 26.82V26.86C69.9678 28.94 71.7078 30.08 73.7478 30.08C75.3278 30.08 76.4278 29.48 77.1878 28.48V28.8C77.1878 29.32 77.6278 29.76 78.2678 29.76C78.9078 29.76 79.3478 29.32 79.3478 28.7V23.82C79.3478 22.9 79.1078 22.12 78.6078 21.52C77.9478 20.72 76.8678 20.28 75.3478 20.28C73.6878 20.28 72.3678 20.64 71.1478 21.32C70.7878 21.5 70.5478 21.82 70.5478 22.24C70.5478 22.72 70.9478 23.12 71.4278 23.12C71.6278 23.12 71.8078 23.06 71.9878 22.96C72.9878 22.42 73.9878 22.16 75.0478 22.16C76.3678 22.16 77.1878 22.68 77.1878 23.62V25.1C76.4278 24.38 75.3878 23.9 74.0678 23.9C72.4678 23.9 71.3878 24.6 71.3878 25.92V25.96C71.3878 27.32 72.4878 28.24 74.0678 28.24ZM77.1878 26.46C76.4878 27.42 75.4678 28.06 74.2278 28.06C73.1678 28.06 72.4078 27.62 72.4078 26.82V26.78C72.4078 25.86 73.2278 25.28 74.4878 25.28C75.4478 25.28 76.4478 25.52 77.1878 25.96V26.46ZM88.2947 30.08C91.3147 30.08 93.7347 27.88 93.7347 25.12V25.08C93.7347 22.32 91.3347 20.16 88.2947 20.16C85.2547 20.16 82.8547 22.36 82.8547 25.12V25.16C82.8547 27.9 85.2547 30.08 88.2947 30.08ZM88.2947 28.38C86.2547 28.38 84.7547 26.92 84.7547 25.12V25.08C84.7547 23.28 86.2347 21.86 88.2947 21.86C90.3547 21.86 91.8347 23.32 91.8347 25.12V25.16C91.8347 26.94 90.3547 28.38 88.2947 28.38ZM98.0859 28H100.026V24.22C100.026 23.26 100.246 22.54 100.666 22.04C101.046 21.6 101.566 21.36 102.226 21.36C103.546 21.36 104.206 22.16 104.206 23.64V28H106.146V23.24C106.146 21.84 105.806 20.92 105.146 20.28C104.506 19.66 103.606 19.32 102.486 19.32C101.066 19.32 100.046 19.9 99.4063 20.86V19.66C99.4063 19.14 98.9863 18.72 98.3663 18.72C97.7463 18.72 97.3263 19.14 97.3263 19.72V28C97.3263 28.56 97.7263 29 98.3463 29C98.9663 29 99.4063 28.56 99.4063 28H100.026H98.0859ZM112.821 28H114.761V24.06C114.761 21.58 113.201 20.06 110.941 20.06C109.761 20.06 108.741 20.4 107.961 20.98C107.641 21.22 107.421 21.54 107.421 21.92C107.421 22.42 107.821 22.82 108.321 22.82C108.561 22.82 108.761 22.74 108.921 22.62C109.501 22.2 110.181 21.98 110.881 21.98C112.321 21.98 113.141 22.8 113.141 24.26V24.94C112.421 24.26 111.381 23.78 110.001 23.78C108.041 23.78 106.441 24.86 106.441 26.92V26.96C106.441 29.02 108.061 30.08 110.061 30.08C111.461 30.08 112.501 29.52 113.221 28.68V28.82C113.221 29.34 113.661 29.78 114.281 29.78C114.901 29.78 115.341 29.34 115.341 28.74V24.2C115.341 22.12 114.361 20.06 110.941 20.06C110.941 20.06 114.361 20.06 110.941 20.06ZM113.141 26.7C112.421 27.68 111.381 28.32 110.081 28.32C108.961 28.32 108.001 27.8 108.001 26.82V26.78C108.001 25.72 108.961 25.06 110.301 25.06C111.401 25.06 112.461 25.4 113.141 25.98V26.7Z" fill="white"/>
                                  <path d="M33.632 14.104C32.944 14.104 32.384 14.344 31.952 14.824C31.528 15.304 31.316 15.96 31.316 16.792C31.316 17.624 31.528 18.28 31.952 18.76C32.384 19.24 32.944 19.48 33.632 19.48C34.32 19.48 35.048 19.152 35.816 18.496L36.8 19.648C35.768 20.624 34.688 21.112 33.56 21.112C32.224 21.112 31.164 20.704 30.38 19.888C29.604 19.064 29.216 18.032 29.216 16.792C29.216 15.552 29.608 14.52 30.392 13.696C31.176 12.872 32.224 12.46 33.536 12.46C34.296 12.46 34.972 12.608 35.564 12.904C36.164 13.2 36.692 13.616 37.148 14.152L36.08 15.304C35.784 14.944 35.444 14.656 35.06 14.44C34.684 14.216 34.192 14.104 33.632 14.104ZM43.267 12.46C44.419 12.46 45.319 12.872 45.967 13.696C46.615 14.512 46.939 15.536 46.939 16.768C46.939 18 46.615 19.028 45.967 19.852C45.319 20.668 44.419 21.076 43.267 21.076C42.115 21.076 41.211 20.664 40.555 19.84C39.899 19.016 39.571 17.992 39.571 16.768C39.571 15.536 39.899 14.512 40.555 13.696C41.211 12.872 42.115 12.46 43.267 12.46ZM43.267 14.128C42.643 14.128 42.163 14.348 41.827 14.788C41.491 15.22 41.323 15.872 41.323 16.744C41.323 17.608 41.491 18.264 41.827 18.712C42.163 19.16 42.643 19.384 43.267 19.384C43.891 19.384 44.363 19.164 44.683 18.724C45.011 18.276 45.175 17.616 45.175 16.744C45.175 15.872 45.011 15.216 44.683 14.776C44.363 14.344 43.891 14.128 43.267 14.128ZM52.3741 21.088C51.5181 21.088 50.8261 20.836 50.2981 20.332C49.7781 19.828 49.5181 19.116 49.5181 18.196V14.512H48.1501V13.072H49.5181V11.332L51.2261 10.672V13.072H53.3341V14.512H51.2261V18.052C51.2261 18.524 51.3181 18.864 51.5021 19.072C51.6861 19.28 51.9541 19.384 52.3061 19.384C52.7141 19.384 53.0501 19.244 53.3141 18.964L54.0501 20.152C53.5141 20.776 52.9781 21.088 52.3741 21.088Z" fill="white"/>
                                </svg>
                                <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                                  Wordwall Interactive Exercise
                                </p>
                              </div>
                            </div>
                          );
                        } else if (islCollectiveMatch && islCollectiveMatch[1]) {
                          return (
                            <div className="aspect-video flex items-center justify-center h-full bg-gradient-to-r from-blue-100 to-green-100">
                              <div className="text-center p-4">
                                <svg width="140" height="40" viewBox="0 0 140 40" className="mx-auto mb-2">
                                  <rect width="140" height="40" rx="8" fill="#2D8CFF"/>
                                  <path d="M24.7822 11.2H30.4622V28H28.4222V13.24H24.7822V11.2ZM37.3313 28.24C40.2513 28.24 42.4113 26.54 42.4113 23.94V23.9C42.4113 21.42 40.3313 20.06 37.6713 20.06C36.5113 20.06 35.5113 20.28 34.7113 20.64C34.3713 20.78 33.9513 20.98 33.9513 21.46C33.9513 21.96 34.3513 22.36 34.8513 22.36C35.0313 22.36 35.1713 22.32 35.3313 22.24C35.9913 21.92 36.7513 21.74 37.6313 21.74C39.2913 21.74 40.4313 22.62 40.4313 23.96V24.08C39.7713 23.76 38.7913 23.48 37.4913 23.48C35.0713 23.48 33.2313 24.54 33.2313 26.82V26.86C33.2313 28.94 34.9713 30.08 37.0113 30.08C38.5913 30.08 39.6913 29.48 40.4513 28.48V28.8C40.4513 29.32 40.8913 29.76 41.5313 29.76C42.1713 29.76 42.6113 29.32 42.6113 28.7V23.82C42.6113 22.9 42.3713 22.12 41.8713 21.52C41.2113 20.72 40.1313 20.28 38.6113 20.28C36.9513 20.28 35.6313 20.64 34.4113 21.32C34.0513 21.5 33.8113 21.82 33.8113 22.24C33.8113 22.72 34.2113 23.12 34.6913 23.12C34.8913 23.12 35.0713 23.06 35.2513 22.96C36.2513 22.42 37.2513 22.16 38.3113 22.16C39.6313 22.16 40.4513 22.68 40.4513 23.62V25.1C39.6913 24.38 38.6513 23.9 37.3313 23.9C35.7313 23.9 34.6513 24.6 34.6513 25.92V25.96C34.6513 27.32 35.7513 28.24 37.3313 28.24ZM40.4513 26.46C39.7513 27.42 38.7313 28.06 37.4913 28.06C36.4313 28.06 35.6713 27.62 35.6713 26.82V26.78C35.6713 25.86 36.4913 25.28 37.7513 25.28C38.7113 25.28 39.7113 25.52 40.4513 25.96V26.46ZM50.8691 20.06C48.6691 20.06 46.8291 21.74 46.8291 24.92V28C46.8291 28.58 47.2891 29 47.9091 29C48.5291 29 48.9691 28.58 48.9691 28V25.1C48.9691 22.8 49.7891 21.78 51.3691 21.78C51.8091 21.78 52.2091 21.82 52.5891 21.92C52.7091 21.96 52.8491 21.98 52.9691 21.98C53.4291 21.98 53.8091 21.62 53.8091 21.16C53.8091 20.76 53.5491 20.46 53.1691 20.34C52.6091 20.16 51.8491 20.06 50.8691 20.06ZM58.7269 28.2H60.7869V15.08H58.7269V28.2ZM57.5669 17.06C57.5669 17.8 58.1469 18.38 58.9069 18.38C59.6669 18.38 60.2469 17.8 60.2469 17.06C60.2469 16.32 59.6669 15.72 58.9069 15.72C58.1469 15.72 57.5669 16.32 57.5669 17.06ZM65.5397 28.08C66.9797 28.08 67.9997 27.5 68.6397 26.54V28C68.6397 28.56 69.0597 29 69.6797 29C70.2997 29 70.7197 28.56 70.7197 28V21.24C70.7197 20.68 70.3197 20.24 69.6997 20.24C69.0797 20.24 68.6397 20.68 68.6397 21.24V24.82C68.6397 26.2 67.9797 26.42 66.6797 26.42C65.3397 26.42 64.6597 25.62 64.6597 24.14V21.24C64.6597 20.68 64.2197 20.24 63.5997 20.24C62.9797 20.24 62.5397 20.68 62.5397 21.24V24.74C62.5397 26.94 63.6397 28.08 65.5397 28.08ZM72.3714 25.16V25.12C72.3714 28.18 73.9914 30.08 76.8114 30.08C78.4714 30.08 79.9714 29.34 80.8514 28.08L79.6114 27.34C78.9514 28.24 78.0514 28.7 76.9514 28.7C75.2714 28.7 74.2714 27.54 74.0914 25.74H81.1714C81.2114 25.6 81.2314 25.42 81.2314 25.18C81.2314 22.36 79.6514 20.06 76.5514 20.06C73.7514 20.06 72.3714 22.28 72.3714 25.16ZM76.5514 21.44C78.0514 21.44 79.1114 22.52 79.2714 24.38H74.0914C74.3114 22.58 75.2914 21.44 76.5514 21.44ZM88.9052 21.38V20.16H87.2652V17.6C87.2652 17.04 86.8452 16.6 86.2252 16.6C85.6052 16.6 85.1852 17.04 85.1852 17.6V20.16H83.9252V21.38H85.1852V28H87.2652V21.38H88.9052ZM96.4831 28.2H98.5431V15.08H96.4831V28.2ZM95.3231 17.06C95.3231 17.8 95.9031 18.38 96.6631 18.38C97.4231 18.38 98.0031 17.8 98.0031 17.06C98.0031 16.32 97.4231 15.72 96.6631 15.72C95.9031 15.72 95.3231 16.32 95.3231 17.06ZM104.056 28.24C106.976 28.24 109.136 26.54 109.136 23.94V23.9C109.136 21.42 107.056 20.06 104.396 20.06C103.236 20.06 102.236 20.28 101.436 20.64C101.096 20.78 100.676 20.98 100.676 21.46C100.676 21.96 101.076 22.36 101.576 22.36C101.756 22.36 101.896 22.32 102.056 22.24C102.716 21.92 103.476 21.74 104.356 21.74C106.016 21.74 107.156 22.62 107.156 23.96V24.08C106.496 23.76 105.516 23.48 104.216 23.48C101.796 23.48 99.9557 24.54 99.9557 26.82V26.86C99.9557 28.94 101.696 30.08 103.736 30.08C105.316 30.08 106.416 29.48 107.176 28.48V28.8C107.176 29.32 107.616 29.76 108.256 29.76C108.896 29.76 109.336 29.32 109.336 28.7V23.82C109.336 22.9 109.096 22.12 108.596 21.52C107.936 20.72 106.856 20.28 105.336 20.28C103.676 20.28 102.356 20.64 101.136 21.32C100.776 21.5 100.536 21.82 100.536 22.24C100.536 22.72 100.936 23.12 101.416 23.12C101.616 23.12 101.796 23.06 101.976 22.96C102.976 22.42 103.976 22.16 105.036 22.16C106.356 22.16 107.176 22.68 107.176 23.62V25.1C106.416 24.38 105.376 23.9 104.056 23.9C102.456 23.9 101.376 24.6 101.376 25.92V25.96C101.376 27.32 102.476 28.24 104.056 28.24ZM107.176 26.46C106.476 27.42 105.456 28.06 104.216 28.06C103.156 28.06 102.396 27.62 102.396 26.82V26.78C102.396 25.86 103.216 25.28 104.476 25.28C105.436 25.28 106.436 25.52 107.176 25.96V26.46ZM116.03 20.06C113.83 20.06 111.99 21.74 111.99 24.92V28C111.99 28.58 112.45 29 113.07 29C113.69 29 114.13 28.58 114.13 28V25.1C114.13 22.8 114.95 21.78 116.53 21.78C116.97 21.78 117.37 21.82 117.75 21.92C117.87 21.96 118.01 21.98 118.13 21.98C118.59 21.98 118.97 21.62 118.97 21.16C118.97 20.76 118.71 20.46 118.33 20.34C117.77 20.16 117.01 20.06 116.03 20.06Z" fill="white"/>
                                </svg>
                                <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                                  ISL Collective Interactive Exercise
                                </p>
                              </div>
                            </div>
                          );
                        } else if (resource.provider?.toLowerCase().includes('kahoot')) {
                          return (
                            <div className="aspect-video rounded-lg overflow-hidden shadow-inner">
                              <KahootThumbnail title={resource.title} />
                            </div>
                          );
                        } else {
                          // No recognizable video ID, display the embed directly
                          return <div dangerouslySetInnerHTML={{ __html: resource.embedCode }} />;
                        }
                      })()}
                    </div>
                  ) : resource.provider?.toLowerCase().includes('kahoot') ? (
                    <div className="rounded-lg overflow-hidden shadow-inner">
                      <KahootThumbnail title={resource.title} />
                    </div>
                  ) : (
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-gradient-to-b from-indigo-50 to-purple-50 flex items-center justify-center shadow-inner">
                      <div className="text-center p-4">
                        <Gamepad2 className="h-10 w-10 mx-auto mb-2 text-indigo-300" />
                        <p className="text-sm text-gray-500 font-medium">Game preview not available</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between bg-gradient-to-b from-gray-50/50 to-gray-100/50 pt-3 pb-3 rounded-b-xl">
                  {resource.sourceUrl && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="rounded-full bg-white hover:bg-indigo-50 text-indigo-500 hover:text-indigo-600 shadow-sm border border-indigo-200"
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
        try {
          kitchenPlans = getBook6Unit6LessonPlans();
        } catch (error) {
          console.error('Error loading Book 6 Unit 6 lesson plans:', error);
          kitchenPlans = generateDefaultBook6UnitLessonPlans('6', '6');
        }
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
        try {
          bodyPlans = getBook6Unit7LessonPlans();
        } catch (error) {
          console.error('Error loading Book 6 Unit 7 lesson plans:', error);
          bodyPlans = generateDefaultBook6UnitLessonPlans('6', '7');
        }
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
        try {
          pastSimplePlans = getBook6Unit8LessonPlans();
        } catch (error) {
          console.error('Error loading Book 6 Unit 8 lesson plans:', error);
          pastSimplePlans = generateDefaultBook6UnitLessonPlans('6', '8');
        }
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
    
    // Book 4 Unit 1 - Nationalities lesson plans
    if (bookId === '4' && unitId === '1') {
      // Get Book 4 Unit 1 lesson plans
      let nationalitiesLessonPlans: LessonPlan[] = [];
      try {
        // Using directly imported function
        nationalitiesLessonPlans = getBook4Unit1LessonPlans() as LessonPlan[];
      } catch (error) {
        console.error('Error getting Book 4 Unit 1 lesson plans:', error);
        // Fallback to default lesson plans
        nationalitiesLessonPlans = generateDefaultBook4UnitLessonPlans('1', BOOK4_UNIT_TITLES['1'] || 'Nationalities');
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Nationalities and Countries Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {nationalitiesLessonPlans.map((plan, index) => (
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
                          onClick={() => setConfirmDelete({ id: `nationalities-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
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
    
    // Book 4 Unit 2 - Gadgets lesson plans
    if (bookId === '4' && unitId === '2') {
      // Get Book 4 Unit 2 lesson plans
      let gadgetsLessonPlans: LessonPlan[] = [];
      try {
        // Using teacher resources with lesson plans
        const resources = getBook4Unit2LessonPlans();
        // Extract and convert lesson plans
        gadgetsLessonPlans = resources
          .filter(resource => resource.lessonPlan)
          .map(resource => convertLegacyLessonPlanUnit2(resource));
      } catch (error) {
        console.error('Error getting Book 4 Unit 2 lesson plans:', error);
        // Fallback to default lesson plans
        gadgetsLessonPlans = generateDefaultBook4UnitLessonPlans('2', BOOK4_UNIT_TITLES['2'] || 'Gadgets');
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Gadgets and Technology Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {gadgetsLessonPlans.map((plan, index) => (
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
                          onClick={() => setConfirmDelete({ id: `gadgets-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
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
    
    // Book 4 Unit 3 - Home Sweet Home lesson plans
    if (bookId === '4' && unitId === '3') {
      // Get Book 4 Unit 3 lesson plans
      let homeLessonPlans: LessonPlan[] = [];
      try {
        // Using teacher resources with lesson plans
        const resources = getBook4Unit3LessonPlans();
        // Extract and convert lesson plans
        homeLessonPlans = resources
          .filter(resource => resource.lessonPlan)
          .map(resource => convertLegacyLessonPlanUnit3(resource));
      } catch (error) {
        console.error('Error getting Book 4 Unit 3 lesson plans:', error);
        // Fallback to default lesson plans
        homeLessonPlans = generateDefaultBook4UnitLessonPlans('3', BOOK4_UNIT_TITLES['3'] || 'Home Sweet Home');
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Home and Housing Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {homeLessonPlans.map((plan, index) => (
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
                          onClick={() => setConfirmDelete({ id: `home-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
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

    // Book 4 Unit 4 - Family: Describing People lesson plans
    if (bookId === '4' && unitId === '4') {
      // Get Book 4 Unit 4 lesson plans
      let familyLessonPlans: LessonPlan[] = [];
      try {
        // Using teacher resources with lesson plans
        const resources = getBook4Unit4LessonPlans();
        // Extract and convert lesson plans
        familyLessonPlans = resources
          .filter(resource => resource.lessonPlan)
          .map(resource => convertLegacyLessonPlanUnit4(resource));
      } catch (error) {
        console.error('Error getting Book 4 Unit 4 lesson plans:', error);
        // Fallback to default lesson plans
        familyLessonPlans = generateDefaultBook4UnitLessonPlans('4', BOOK4_UNIT_TITLES['4'] || 'Family: Describing People');
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Family and Appearance Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {familyLessonPlans.map((plan, index) => (
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
                          onClick={() => setConfirmDelete({ id: `family-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
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

    // Book 4 Unit 5 - Personality lesson plans
    if (bookId === '4' && unitId === '5') {
      // Get Book 4 Unit 5 lesson plans
      let personalityLessonPlans: LessonPlan[] = [];
      try {
        // Using teacher resources with lesson plans
        const resources = getBook4Unit5LessonPlans();
        // Extract and convert lesson plans
        personalityLessonPlans = resources
          .filter(resource => resource.lessonPlan)
          .map(resource => convertLegacyLessonPlanUnit5(resource));
      } catch (error) {
        console.error('Error getting Book 4 Unit 5 lesson plans:', error);
        // Fallback to default lesson plans
        personalityLessonPlans = generateDefaultBook4UnitLessonPlans('5', BOOK4_UNIT_TITLES['5'] || 'Personality');
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Personality Traits Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {personalityLessonPlans.map((plan, index) => (
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
                          onClick={() => setConfirmDelete({ id: `personality-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
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

    // Book 4 Unit 6 - Collections lesson plans
    if (bookId === '4' && unitId === '6') {
      // Get Book 4 Unit 6 lesson plans
      let collectionsLessonPlans: LessonPlan[] = [];
      try {
        // Using directly imported function with conversion
        const resources = getBook4Unit6LessonPlans();
        // Extract and convert lesson plans
        collectionsLessonPlans = resources
          .filter(resource => resource.lessonPlan)
          .map(resource => convertLegacyLessonPlanUnit6(resource));
      } catch (error) {
        console.error('Error getting Book 4 Unit 6 lesson plans:', error);
        // Fallback to default lesson plans
        collectionsLessonPlans = generateDefaultBook4UnitLessonPlans('6', BOOK4_UNIT_TITLES['6'] || 'Collections');
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Collections and Hobbies Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {collectionsLessonPlans.map((plan, index) => (
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
                          onClick={() => setConfirmDelete({ id: `collections-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
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
    
    // Book 6 Unit 11 - Transportation and Travel lesson plans
    if (bookId === '6' && unitId === '11') {
      // Get Book 6 Unit 11 lesson plans
      let extremeSportsPlans: LessonPlan[] = [];
      try {
        // Use the generateDefaultBook6UnitLessonPlans function as a fallback
        extremeSportsPlans = generateDefaultBook6UnitLessonPlans('11', BOOK6_UNIT_TITLES['11'] || 'Transportation and Travel');
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
        // Use the generateDefaultBook6UnitLessonPlans function as a fallback
        environmentLessonPlans = generateDefaultBook6UnitLessonPlans('12', BOOK6_UNIT_TITLES['12'] || 'Are You Eco? Environment');
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
        // First try to use the imported generator function if available
        if (typeof generateBook6Unit13LessonPlans === 'function') {
          airportLessonPlans = generateBook6Unit13LessonPlans();
        } else {
          // Use default generator as fallback
          airportLessonPlans = generateDefaultBook6UnitLessonPlans('13', BOOK6_UNIT_TITLES['13'] || 'At the Airport');
        }
      } catch (error) {
        console.error('Error getting Book 6 Unit 13 lesson plans:', error);
        // Fallback to default lesson plans
        airportLessonPlans = generateDefaultBook6UnitLessonPlans('13', BOOK6_UNIT_TITLES['13'] || 'At the Airport');
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
        // First try to use the imported generator function if available
        if (typeof generateBook6Unit14LessonPlans === 'function') {
          survivorLessonPlans = generateBook6Unit14LessonPlans();
        } else {
          // Use default generator as fallback
          survivorLessonPlans = generateDefaultBook6UnitLessonPlans('14', BOOK6_UNIT_TITLES['14'] || 'Are You a Survivor?');
        }
      } catch (error) {
        console.error('Error getting Book 6 Unit 14 lesson plans:', error);
        // Fallback to default lesson plans
        survivorLessonPlans = generateDefaultBook6UnitLessonPlans('14', BOOK6_UNIT_TITLES['14'] || 'Are You a Survivor?');
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
        // First try to use the imported generator function if available
        if (typeof generateBook6Unit15LessonPlans === 'function') {
          fashionLessonPlans = generateBook6Unit15LessonPlans();
        } else {
          // Use default generator as fallback
          fashionLessonPlans = generateDefaultBook6UnitLessonPlans('15', BOOK6_UNIT_TITLES['15'] || 'Fashion Accessories');
        }
      } catch (error) {
        console.error('Error getting Book 6 Unit 15 lesson plans:', error);
        // Fallback to default lesson plans
        fashionLessonPlans = generateDefaultBook6UnitLessonPlans('15', BOOK6_UNIT_TITLES['15'] || 'Fashion Accessories');
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
        // First try to use the imported generator function if available
        if (typeof generateBook6Unit16LessonPlans === 'function') {
          cityLifeLessonPlans = generateBook6Unit16LessonPlans();
        } else {
          // Use default generator as fallback
          cityLifeLessonPlans = generateDefaultBook6UnitLessonPlans('16', BOOK6_UNIT_TITLES['16'] || 'City Life');
        }
      } catch (error) {
        console.error('Error getting Book 6 Unit 16 lesson plans:', error);
        // Fallback to default lesson plans
        cityLifeLessonPlans = generateDefaultBook6UnitLessonPlans('16', BOOK6_UNIT_TITLES['16'] || 'City Life');
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
    
    // Book 3 Unit 16 - Sports lesson plans
    if (bookId === '3' && unitId === '16') {
      // Get Book 3 Unit 16 Sports lesson plans
      let sportsPlans: LessonPlan[] = [];
      try {
        try {
          console.log('Loading Book 3 Unit 16 Sports lesson plans');
          sportsPlans = generateBook3Unit16LessonPlans();
        } catch (error) {
          console.error('Error loading Book 3 Unit 16 Sports lesson plans:', error);
          sportsPlans = generateDefaultBook3UnitLessonPlans('16', 'Sports');
        }
      } catch (error) {
        console.error('Error getting Book 3 Unit 16 Sports lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Sports Themed Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {sportsPlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2 bg-blue-50/50 border-b border-blue-100">
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
                  <CardFooter className="bg-blue-50/30 pt-3 pb-3 border-t border-blue-100">
                    <Button variant="secondary" size="sm" className="w-full border-blue-200 hover:border-blue-300 hover:bg-blue-50" onClick={() => window.print()}>
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
    
    // Book 3 Unit 17 - House Chores lesson plans
    if (bookId === '3' && unitId === '17') {
      // Get Book 3 Unit 17 House Chores lesson plans
      let housePlans: LessonPlan[] = [];
      try {
        try {
          console.log('Loading Book 3 Unit 17 House Chores lesson plans');
          housePlans = generateBook3Unit17LessonPlans();
        } catch (error) {
          console.error('Error loading Book 3 Unit 17 House Chores lesson plans:', error);
          housePlans = generateDefaultBook3UnitLessonPlans('17', 'House Chores');
        }
      } catch (error) {
        console.error('Error getting Book 3 Unit 17 House Chores lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">House Chores Themed Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {housePlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2 bg-green-50/50 border-b border-green-100">
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
                          onClick={() => setConfirmDelete({ id: `house-chores-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
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
                  <CardFooter className="bg-green-50/30 pt-3 pb-3 border-t border-green-100">
                    <Button variant="secondary" size="sm" className="w-full border-green-200 hover:border-green-300 hover:bg-green-50" onClick={() => window.print()}>
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
        // First try to use the imported generator function if available
        if (typeof generateBook1Unit6LessonPlans === 'function') {
          unit6Plans = generateBook1Unit6LessonPlans();
        } else {
          // Use default generator as fallback
          unit6Plans = generateDefaultBook7UnitLessonPlans('6', 'Money Matters');
        }
      } catch (error) {
        console.error('Error getting Unit 6 lesson plans:', error);
        // Fallback to default lesson plans
        unit6Plans = generateDefaultBook7UnitLessonPlans('6', 'Money Matters');
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
        // First try to use the imported generator function if available
        if (typeof generateBook1Unit7LessonPlans === 'function') {
          unit7Plans = generateBook1Unit7LessonPlans();
        } else {
          // Use default generator as fallback
          unit7Plans = generateDefaultBook7UnitLessonPlans('7', BOOK7_UNIT_TITLES['7'] || 'DIY & Tools');
        }
      } catch (error) {
        console.error('Error getting Unit 7 lesson plans:', error);
        // Fallback to default lesson plans
        unit7Plans = generateDefaultBook7UnitLessonPlans('7', BOOK7_UNIT_TITLES['7'] || 'DIY & Tools');
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
        // First try to use the imported generator function if available
        if (typeof generateBook2Unit8LessonPlans === 'function') {
          unit8Plans = generateBook2Unit8LessonPlans();
        } else {
          // Use default generator as fallback
          unit8Plans = generateDefaultBook7UnitLessonPlans('8', BOOK7_UNIT_TITLES['8'] || 'Musical Instruments');
        }
      } catch (error) {
        console.error('Error getting Unit 8 lesson plans:', error);
        // Fallback to default lesson plans
        unit8Plans = generateDefaultBook7UnitLessonPlans('8', BOOK7_UNIT_TITLES['8'] || 'Musical Instruments');
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
        unit9Plans = getBook6Unit9LessonPlans();
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
        unit10Plans = getBook6Unit10LessonPlans();
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
        unit11Plans = generateUnit1LessonPlans();
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
        unit12Plans = generateUnit1LessonPlans();
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
        unit13Plans = [];
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
        <h3 className="text-xl font-semibold mb-4 text-primary">Lesson Plans</h3>
        <div className="lesson-plan-grid">
          {dynamicLessonPlans.map((plan, index) => (
            <div key={index}>
              <Card className="h-full border-2 hover:border-primary/50 transition-all duration-200 shadow-sm hover:shadow-md">
                <CardHeader className="pb-2 bg-muted/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl truncate text-primary">
                        <span>{plan.title}</span>
                      </CardTitle>
                      <CardDescription className="text-sm mt-1 flex items-center">
                        <FileText className="h-4 w-4 mr-1 text-primary" />
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
                <CardContent className="max-h-[500px] overflow-y-auto p-4">
                  <LessonPlanTemplate plan={plan} />
                </CardContent>
                <CardFooter className="bg-muted/20 pt-3 pb-3">
                  <Button variant="default" size="sm" className="w-full" onClick={() => window.print()}>
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

  // For targeted rendering based on resourceType
  if (resourceType) {
    console.log(`🎯 TeacherResources rendering only ${resourceType} resources for Book ${bookId}, Unit ${unitId}`);
    
    // Just render the specific resource type
    return (
      <div>
        {renderResources(resourceType)}
      </div>
    );
  }
  
  // Default full rendering with all components
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
        <Tabs defaultValue={dynamicLessonPlans.length > 0 ? "lessonplans" : "videos"}>
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
            <TabsTrigger value="lessonplans" className="flex items-center relative">
              <FileText className="h-4 w-4 mr-2" />
              45-min Lesson Plans
              {dynamicLessonPlans.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {dynamicLessonPlans.length}
                </span>
              )}
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
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-primary mb-2">45-minute Lesson Plans</h2>
              <p className="text-muted-foreground">
                Step-by-step lesson plans designed for 45-minute teaching sessions. Each lesson includes warm-up activities, main teaching points, practice activities, and closing activities.
              </p>
            </div>
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
        
        {/* Embedded Content Viewer */}
        <EmbeddedContentModal 
          resource={viewingEmbed} 
          onClose={() => setViewingEmbed(null)} 
        />
      </div>
    </div>
  );
};

export default TeacherResources;