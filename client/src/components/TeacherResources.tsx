import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Trash, Plus, Edit, Save, X, Video, Gamepad2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';

interface TeacherResource {
  id?: number;
  bookId: string;
  unitId: string;
  title: string;
  resourceType: 'video' | 'game' | 'activity' | 'pdf' | 'other';
  embedCode: string;
  provider?: string;
  sourceUrl?: string;
  order: number;
}

interface TeacherResourcesProps {
  bookId?: string;
  unitId?: string;
  isEditMode?: boolean;
}

const TeacherResources: React.FC<TeacherResourcesProps> = ({ 
  bookId, 
  unitId, 
  isEditMode = false 
}) => {
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [newResource, setNewResource] = useState<Partial<TeacherResource>>({
    resourceType: 'video',
    title: '',
    embedCode: '',
    provider: '',
    sourceUrl: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingResource, setEditingResource] = useState<number | null>(null);
  const { toast } = useToast();

  // Function to save resources to the server
  const saveResourcesToServer = async (resourcesToSave: TeacherResource[]) => {
    if (!bookId || !unitId || resourcesToSave.length === 0) return;
    
    try {
      await apiRequest('POST', `/api/direct/${bookId}/${unitId}/resources`, { resources: resourcesToSave });
      toast({
        title: "Resources Saved",
        description: "Teacher resources have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error Saving Resources",
        description: "There was an error saving teacher resources.",
        variant: "destructive",
      });
      console.error("Error saving teacher resources:", error);
    }
  };

  // Fetch resources from the server
  const fetchResources = async () => {
    if (!bookId || !unitId) return;
    
    try {
      const response = await apiRequest('GET', `/api/direct/${bookId}/${unitId}/resources`);
      const data = await response.json();
      // Check if the data structure has a resources property
      const resourcesData = data.resources || data;
      setResources(Array.isArray(resourcesData) ? resourcesData : []);
    } catch (error) {
      console.error("Error fetching teacher resources:", error);
    }
  };

  // Handle state for editing a resource
  const handleEditResource = (index: number) => {
    setEditingResource(index);
  };

  // Handle canceling an edit
  const handleCancelEdit = () => {
    setEditingResource(null);
  };

  // Handle updating a resource
  const handleUpdateResource = (index: number) => {
    setEditingResource(null);
    saveResourcesToServer(resources);
  };

  // Handle deleting a resource
  const handleDeleteResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
    saveResourcesToServer(resources.filter((_, i) => i !== index));
    toast({
      title: "Resource Deleted",
      description: "The resource has been deleted successfully.",
    });
  };

  // Handle changes to resource fields during editing
  const handleFieldChange = (index: number, field: string, value: string) => {
    const updatedResources = [...resources];
    (updatedResources[index] as any)[field] = value;
    setResources(updatedResources);
  };

  // Initial load of resources
  useEffect(() => {
    if (bookId && unitId) {
      fetchResources();
      
      // This ensures synchronization between admin and teacher pages
      const intervalId = setInterval(fetchResources, 5000);
      
      // Clean up interval on unmount or when bookId/unitId changes
      return () => clearInterval(intervalId);
    }
  }, [bookId, unitId]);
  
  // Add pre-defined resources for Book 1 and Book 4 units
  useEffect(() => {
    if (resources.length === 0 && bookId && unitId) {
      let predefinedResources: TeacherResource[] = [];
      
      // Book 1 - Add PDF lesson resources to all units
      if (bookId === "1") {
        // Map unit numbers to folder locations for units with special locations
        const unitLocationMap: Record<string, string> = {
          "3": "unit10", // Unit 3 PDF is in S3 unit10 folder
          "6": "unit10", // Unit 6 PDF is in S3 unit10 folder
          "10": "unit11", // Unit 10 PDF is in S3 unit11 folder
          "11": "unit10", // Unit 11 PDF is in S3 unit10 folder
          "16": "unit10", // Unit 16 PDF is in S3 unit10 folder
        };

        // Default folder location is unit11
        const folderLocation = unitLocationMap[unitId] || "unit11";
        
        // Create PDF resource for all Book 1 units
        const pdfFilename = `00 A Visual English 1 – Unit ${unitId} – New Version.pdf`;
        const encodedFilename = encodeURIComponent(pdfFilename);
        
        // Create the PDF resource object
        const pdfResource: TeacherResource = {
          bookId: "1",
          unitId: unitId,
          title: `Visual English Book 1 - Unit ${unitId} - Lesson PDF`,
          resourceType: "pdf",
          embedCode: `<div style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
            <h3 style="margin-bottom: 15px; color: #2563eb;">Unit ${unitId} - Complete Lesson PDF</h3>
            <p style="margin-bottom: 20px;">This PDF contains the complete lesson materials for Unit ${unitId}</p>
            <a href="/api/direct/book1/${folderLocation}/assets/${encodedFilename}" 
               target="_blank" 
               style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: 500;">
              <span style="display: flex; align-items: center; justify-content: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <line x1="10" y1="9" x2="8" y2="9"></line>
                </svg>
                Download PDF
              </span>
            </a>
          </div>`,
          order: 0,
          provider: "Amazon S3"
        };
        
        // Start with the PDF resource
        predefinedResources = [pdfResource];
        
        // Add additional unit-specific resources
        // Unit 1 - Greeting and Introduction
        if (unitId === "1") {
          predefinedResources.push(
            {
              bookId: "1",
              unitId: "1",
              title: "Hello Song for Kids - Super Simple Songs",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/_x5KQBtLcJI?si=qdTrTvpAGWxn-pTk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 1,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "1",
              title: "Hello! - Super Simple Songs",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/tVlcKp3bWH8?si=DZLTajD2AH9JfcpC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 2,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "1",
              title: "Hello! What's Your Name? - English Tree TV",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/l15aPP4nUTs?si=vfJasmGf79TGR-FT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 3,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "1",
              title: "Greeting Words - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/2e7d4bdbcc23420689c5274d1df5a6af?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 4,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "1",
              title: "Greeting Matching Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/76e7d34b884a46ad9cdfeea4bda98c8c?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 5,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "1",
              title: "Greeting and Introduction Lesson Plan",
              resourceType: "activity",
              embedCode: `<div class="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                <h2 class="text-xl font-bold mb-4 text-blue-700 border-b pb-2">Greetings and Introductions - Comprehensive Lesson Plan</h2>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Lesson Objectives</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Students will learn basic greeting expressions in English</li>
                    <li>Students will be able to introduce themselves and ask others' names</li>
                    <li>Students will practice saying "hello" and "goodbye" in different situations</li>
                  </ul>
                </div>

                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Key Vocabulary</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Hello, Hi, Good morning, Good afternoon, Good evening</li>
                    <li>Goodbye, Bye, See you later</li>
                    <li>My name is..., What's your name?</li>
                    <li>Nice to meet you</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Warm-up Activities (5-10 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Greeting Wave:</strong> Have students stand in a circle. Say "Hello" and wave to a student. That student then waves and says "Hello" to another student, and so on.</li>
                    <li><strong>Time-based Greetings:</strong> Practice saying "Good morning," "Good afternoon," and "Good evening" based on different times shown on a clock.</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Main Activities (20-25 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Hello Song:</strong> Teach and sing the "Hello Song" together (see video resources).</li>
                    <li><strong>Puppet Dialogues:</strong> Use puppets or stuffed animals to demonstrate greetings. Have the puppets greet each other, introduce themselves, and say goodbye.</li>
                    <li><strong>Name Chain Game:</strong> Sitting in a circle, the first student says "Hello, my name is [name]." The next student says "Hello [previous student's name], my name is [name]" and so on.</li>
                    <li><strong>Role Play Cards:</strong> Give students role-play cards with different situations (meeting a new friend, greeting a teacher, etc.) and have them practice appropriate greetings.</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Practice Activities (15 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Greeting Flashcards:</strong> Use flashcards showing different times of day and have students say the appropriate greeting.</li>
                    <li><strong>Name Game:</strong> Students walk around the classroom. When the teacher says "Stop," they greet the nearest person and introduce themselves.</li>
                    <li><strong>Wordwall Games:</strong> Use the interactive Wordwall games to practice greeting vocabulary (see game resources).</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Wrap-up Activity (5 minutes)</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Review greetings using a ball toss game. When a student catches the ball, they must greet another student and ask their name.</li>
                    <li>End the class with a proper "Goodbye" song or chant.</li>
                  </ul>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Extension Activities</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Create greeting cards with different expressions for classroom display</li>
                    <li>Learn greetings from different cultures and compare them</li>
                    <li>Practice formal vs. informal greetings for different situations</li>
                  </ul>
                </div>
              </div>`,
              order: 6,
              provider: "Visual English"
            }
          );
        }
        // Unit 2 - School Objects
        else if (unitId === "2") {
          predefinedResources.push(
            {
              bookId: "1",
              unitId: "2",
              title: "School Objects - English Tree",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/e9C30pu9uj4?si=0ZHCRHhj_-rY5y9c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 1,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "2",
              title: "School Supplies Song - ELF Learning",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/41cJ0mqWses?si=xFIxcoBqhGwtaYEb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 2,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "2",
              title: "In My Schoolbag - Pinkfong",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/0IfDjT-Fqf4?si=0vz4_G8qdahQJK7A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 3,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "2",
              title: "School Objects - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/34cdb3acf77747118b9ff4f1b18e7f90?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 4,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "2",
              title: "School Supplies Matching Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/60ade0a6f8f54e3ca3cc03227fa71f9c?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 5,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "2",
              title: "School Objects Lesson Plan",
              resourceType: "activity",
              embedCode: `<div class="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                <h2 class="text-xl font-bold mb-4 text-blue-700 border-b pb-2">School Objects - Comprehensive Lesson Plan</h2>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Lesson Objectives</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Students will learn vocabulary related to common school objects</li>
                    <li>Students will be able to identify and name at least 10 different classroom items</li>
                    <li>Students will practice using "This is a..." and "These are..." structures</li>
                    <li>Students will respond to "What's this?" questions about classroom objects</li>
                  </ul>
                </div>

                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Key Vocabulary</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Pencil, pen, pencil case, eraser, ruler, book, notebook</li>
                    <li>Scissors, sharpener, glue, backpack/schoolbag</li>
                    <li>Crayon, marker, folder, calculator, whiteboard</li>
                    <li>Structures: "This is a...", "That is a...", "These are...", "What's this?"</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Warm-up Activities (5-10 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Object Introduction:</strong> Display real school objects and introduce them one by one, having students repeat their names.</li>
                    <li><strong>What's Missing Game:</strong> Show several objects, then remove one while students close their eyes. Ask them to identify what's missing.</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Main Activities (20-25 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>School Supplies Song:</strong> Teach and sing one of the school objects songs from the video resources.</li>
                    <li><strong>Show and Tell:</strong> Give each student an object or picture of a school item. They take turns saying "This is a [object]" to the class.</li>
                    <li><strong>Memory Circle:</strong> In a circle, the first student says "In my schoolbag, I have a pencil." The next student repeats and adds their own item: "In my schoolbag, I have a pencil and a book."</li>
                    <li><strong>Object Sorting:</strong> Sort objects by category (writing tools, art supplies, etc.) and have students name each group.</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Practice Activities (15 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>School Object Bingo:</strong> Create bingo cards with pictures of school objects. Call out the items and have students mark them off.</li>
                    <li><strong>I Spy Game:</strong> "I spy with my little eye something that is [color] and we use it for [function]."</li>
                    <li><strong>Wordwall Games:</strong> Use the interactive Wordwall games to reinforce vocabulary (see game resources).</li>
                    <li><strong>Classroom Scavenger Hunt:</strong> Students find and identify specific objects around the classroom.</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Wrap-up Activity (5 minutes)</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Show flashcards quickly and have students name the objects as fast as they can.</li>
                    <li>Play "Whisper Chain" with school object vocabulary words.</li>
                  </ul>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Extension Activities</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Create an illustrated "My School Objects" mini-book with drawings and labels</li>
                    <li>Add color vocabulary: "This is a blue pen" or "These are red scissors"</li>
                    <li>Practice counting objects: "I have two pencils and three markers"</li>
                    <li>Introduce possessive pronouns: "This is my book" vs. "That is your book"</li>
                  </ul>
                </div>
              </div>`,
              order: 6,
              provider: "Visual English"
            }
          );
        }
        // Unit 3 - Classroom Rules
        else if (unitId === "3") {
          predefinedResources.push(
            {
              bookId: "1",
              unitId: "3",
              title: "Stand Up Sit Down - FUN KIDS ENGLISH",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/WsiRSWthV1k?si=5qhIghLOyTJLoACs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 1,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "3",
              title: "Stand Up - Sit Down - tddongtv",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/DiXMZJi_2NU?si=UQ4Gw6Tmux2TgAIG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 2,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "3",
              title: "Open Close! Open Shut Them Song - MAPLE LEAF LEARNING",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/E_VcSQn73do?si=rqxV1ItW15Gp0biP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 3,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "3",
              title: "Open Close! Open Shut Them Song - SUPER SIMPLE",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/RNUZBHlRH4Y?si=Q5ovKH7UTWy0eTXk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 4,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "3",
              title: "Clean Up Song - Kids Song for Tidying Up - Super Simple Songs",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/SFE0mMWbA-Y?si=DMWEOIFgkgokf4Bf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 5,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "3",
              title: "Classroom Rules - Game 1",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/94341df31881431a8e6bb5e707557a42?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 6,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "3",
              title: "Classroom Rules - Game 2",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/c95d7edfe0e64b77be765f3289a7c3e3?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 7,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "3",
              title: "Classroom Rules Teaching Activities",
              resourceType: "activity",
              embedCode: `<div class="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                <h2 class="text-xl font-bold mb-4 text-blue-700 border-b pb-2">Classroom Rules - Comprehensive Lesson Plan</h2>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Lesson Objectives</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Students will learn and follow basic classroom instructions</li>
                    <li>Students will respond to commands: "stand up", "sit down", "open", "close", etc.</li>
                    <li>Students will understand and follow classroom rules through interactive activities</li>
                    <li>Students will practice giving and responding to simple classroom commands</li>
                  </ul>
                </div>

                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Key Vocabulary</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Commands: Stand up, Sit down, Open your book, Close your book, Listen, Look</li>
                    <li>Classroom objects: Book, pencil, pen, eraser, door, window</li>
                    <li>Actions: Open, close, put away, take out, raise hand, line up</li>
                    <li>Structures: "Please [action]", "Can you [action]?", "Let's [action]"</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Warm-up Activities (5-10 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Action Greeting:</strong> As students enter, give them a simple command to follow (stand up, sit down, wave hello).</li>
                    <li><strong>Command Chain:</strong> Students stand in a circle. Teacher gives a command to the first student who performs it and passes a different command to the next student.</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Main Activities (20-25 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>TPR (Total Physical Response):</strong> Practice classroom commands as a whole class. Start with teacher modeling, then students respond to commands without teacher modeling.</li>
                    <li><strong>Simon Says:</strong> Play "Simon Says" with classroom commands. "Simon says, stand up." "Simon says, open your book." Students only follow commands preceded by "Simon says."</li>
                    <li><strong>Command Songs:</strong> Teach and sing the "Stand Up, Sit Down" song or "Open, Close" song with actions (see video resources).</li>
                    <li><strong>Classroom Rules Poster:</strong> Create a visual classroom rules poster together with simple rules and corresponding pictures.</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Practice Activities (15 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Role-Play Scenarios:</strong> Students act out different classroom scenarios following appropriate rules (entering class, asking questions, cleaning up).</li>
                    <li><strong>Command Challenge:</strong> Students work in pairs; one student gives commands, the other follows them. Then they switch roles.</li>
                    <li><strong>Wordwall Games:</strong> Use the interactive Wordwall games to reinforce classroom rules (see game resources).</li>
                    <li><strong>Action Cards:</strong> Students draw cards showing different classroom actions and must perform the action and say what they're doing.</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Wrap-up Activity (5 minutes)</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Play a quick game of "Classroom Rules Freeze" - students move around when music plays and freeze in a position when music stops. Teacher calls out a command they must follow while frozen.</li>
                    <li>Review the classroom rules poster created earlier and practice the actions together one last time.</li>
                  </ul>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Extension Activities</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Create illustrated classroom rule cards for students to use as reminders</li>
                    <li>Introduce polite language with commands: "Please stand up", "Thank you for sitting down"</li>
                    <li>Assign "Classroom Helpers" who assist with giving commands to classmates</li>
                    <li>Integrate math by having students count while doing actions: "Jump 5 times", "Clap 3 times"</li>
                  </ul>
                </div>
              </div>`,
              order: 8,
              provider: "Visual English"
            }
          );
        }
        
        // Unit 4 - How Are You?
        else if (unitId === "4") {
          predefinedResources.push(
            {
              bookId: "1",
              unitId: "4",
              title: "Are You Happy Sad Hot Cold - WATTS ENGLISH",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/5su1M6NdG-I?si=VDPLCxtaD7jlbp6l" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 1,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "4",
              title: "Are you Thirsty Hungry and Sick - WATTS ENGLISH",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/iztRyiYIwUs?si=fVLZihbWVRUgpwXt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 2,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "4",
              title: "Are You Hungry Kids - SUPER SIMPLE SONGS",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ykTR0uFGwE0?si=Y5Ty39bwGYrdD-W6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 3,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "4",
              title: "How Are You Today - MAPLE LEAF",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/teMU8dHLqSI?si=QuGLh_wOKnY8LR2k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 4,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "4",
              title: "SKIT How Are You Today - MAPLE LEAF",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/kR6Qcqx2fJE?si=ZhzOtIlzF8guQFDx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 5,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "4",
              title: "How Are You/How Is The Dog - Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/cc9df848c6a94c99b8dcf9c9b65caeb4?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 6,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "4",
              title: "How Are You - Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/61576e9315e949fd9a89477f5807ce46?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 7,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "4",
              title: "Feelings & Emotions Teaching Activities",
              resourceType: "activity",
              embedCode: `<div class="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                <h2 class="text-xl font-bold mb-4 text-blue-700 border-b pb-2">Feelings & Emotions - Comprehensive Lesson Plan</h2>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Lesson Objectives</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Students will learn vocabulary related to basic feelings and emotions</li>
                    <li>Students will be able to ask and answer "How are you?" with appropriate responses</li>
                    <li>Students will identify and express different emotions in English</li>
                    <li>Students will recognize emotions based on facial expressions and tone of voice</li>
                  </ul>
                </div>

                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Key Vocabulary</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Basic emotions: Happy, sad, angry, scared, surprised, tired</li>
                    <li>Physical states: Hot, cold, hungry, thirsty, sick</li>
                    <li>Question forms: "How are you?", "How do you feel?", "Are you [emotion]?"</li>
                    <li>Responses: "I'm happy", "I'm sad", "I'm not angry", etc.</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Warm-up Activities (5-10 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Emotion Faces:</strong> Show different emotion faces and have students identify them. Use exaggerated expressions for better recognition.</li>
                    <li><strong>How Are You Today?:</strong> Greet each student individually with "How are you today?" and encourage varied responses beyond just "I'm fine."</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Main Activities (20-25 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Emotion Songs:</strong> Teach and sing the "How Are You Today?" song or "Are You Happy?" song (see video resources).</li>
                    <li><strong>Mirror Expressions:</strong> Using small mirrors, have students practice making different facial expressions for emotions and saying the corresponding words.</li>
                    <li><strong>Emotions Flashcards:</strong> Create emotion flashcards with students - they draw faces showing different emotions and label them in English.</li>
                    <li><strong>Feelings Charades:</strong> Students take turns acting out an emotion for others to guess. "Are you [emotion]?" "Yes, I'm [emotion]." or "No, I'm not."</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Practice Activities (15 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Emotion Interviews:</strong> Students walk around the classroom asking classmates "How are you?" and recording responses on a simple chart.</li>
                    <li><strong>Emotion Story:</strong> Show a simple picture story and ask students to identify how characters feel at different points.</li>
                    <li><strong>Wordwall Games:</strong> Use the interactive Wordwall games to practice emotions vocabulary (see game resources).</li>
                    <li><strong>Feelings Match-up:</strong> Match emotion words to corresponding pictures or situations.</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Wrap-up Activity (5 minutes)</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li><strong>Feelings Chart:</strong> Create a classroom feelings chart with emoticons for students to indicate how they feel at the end of class.</li>
                    <li><strong>Emotion Ball Pass:</strong> Pass a ball around. When a student catches the ball, they say how they're feeling and pass to another student.</li>
                  </ul>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Extension Activities</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Create an "Emotions Book" with drawings of different feelings and simple sentences</li>
                    <li>Discuss what makes us feel different emotions (I'm happy when...)</li>
                    <li>Add intensity words to emotions (very happy, a little sad, really tired)</li>
                    <li>Practice changing emotions in role plays (I was sad, but now I'm happy)</li>
                  </ul>
                </div>
              </div>`,
              order: 8,
              provider: "Visual English"
            }
          );
        }
        
        // Unit 5 - Family
        else if (unitId === "5") {
          predefinedResources.push(
            {
              bookId: "1",
              unitId: "5",
              title: "The Finger Family Song",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/1EyrquyRg5s?si=3Zq8IQRNRyPxT6CU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 1,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "5",
              title: "My Family - WATTS ENGLISH",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/VvrG4JguNQk?si=MghyBpQyLCnOTu_H" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 2,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "5",
              title: "Baby Shark Dance - PINKFONG",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/XqZsoesa55w?si=QTyqs9ClhhT3iApt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 3,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "5",
              title: "Baby Shark - SUPER SIMPLE SONGS",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/GR2o6k8aPlI?si=tcGAuyQKEkEVZdJr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 4,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "5",
              title: "Family - ENGLISH TREE",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/d_WQEw13TCo?si=caFvmudI0NPkvY-_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 5,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "5",
              title: "Family - Game 1",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/e5f62afa86814cc98336327469ce1554?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 6,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "5",
              title: "Family - Game 2",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/d1bc1e8629a445468a696f03f372e5e9?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 7,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "5",
              title: "Family - Game 3",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/1c606c6af00643d692fc0199a60c2b2c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 8,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "5",
              title: "Family Teaching Activities",
              resourceType: "activity",
              embedCode: `<div class="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                <h2 class="text-xl font-bold mb-4 text-blue-700 border-b pb-2">Family - Comprehensive Lesson Plan</h2>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Lesson Objectives</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Students will learn and identify basic family member vocabulary</li>
                    <li>Students will be able to introduce their family members using simple English</li>
                    <li>Students will use possessive adjectives (my, your) with family vocabulary</li>
                    <li>Students will create and describe a simple family tree</li>
                  </ul>
                </div>

                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Key Vocabulary</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Immediate family: Mother/mom, father/dad, sister, brother, baby</li>
                    <li>Extended family: Grandmother/grandma, grandfather/grandpa, aunt, uncle, cousin</li>
                    <li>Possessive adjectives: My, your, his, her</li>
                    <li>Structures: "This is my...", "Who is this?", "This is your..."</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Warm-up Activities (5-10 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Family Photos:</strong> Show pictures of your own family (or a cartoon family) and introduce them to students.</li>
                    <li><strong>Family Mime:</strong> Mime different family members (grandpa walking with a cane, baby crawling) and have students guess.</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Main Activities (20-25 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Family Songs:</strong> Teach and sing one of the family songs, such as "The Finger Family" or "The Baby Shark" song with actions (see video resources).</li>
                    <li><strong>Finger Puppets:</strong> Make simple finger puppets representing different family members using paper, markers, and tape. Practice dialogues between family members.</li>
                    <li><strong>Family Tree Craft:</strong> Create a simple family tree using pictures or drawings. Students label each member and practice saying "This is my mother," etc.</li>
                    <li><strong>Photo Sharing:</strong> If appropriate, ask students to bring photos of their family members and introduce them to a partner or small group.</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Practice Activities (15 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Family Memory Game:</strong> Place family flashcards face down. Students turn over two cards at a time, naming each family member, trying to find matches.</li>
                    <li><strong>Who's Missing?:</strong> Display family member cards, then remove one while students close their eyes. They must identify which family member is missing.</li>
                    <li><strong>Wordwall Games:</strong> Use the interactive Wordwall games to practice family vocabulary (see game resources).</li>
                    <li><strong>Family Role Play:</strong> Students take on roles of different family members and act out simple family scenarios (dinner time, going to the park).</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Wrap-up Activity (5 minutes)</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li><strong>Family Portrait:</strong> Students draw a quick family portrait and label each member.</li>
                    <li><strong>Family Chain:</strong> In a circle, each student introduces one family member. The next student repeats and adds their own.</li>
                  </ul>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Extension Activities</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Create a class book with each student contributing a page about their family</li>
                    <li>Introduce numbers with family (I have 1 sister, 2 brothers, etc.)</li>
                    <li>Compare family sizes and structure (My family is big/small)</li>
                    <li>Learn about family celebrations and traditions in different cultures</li>
                  </ul>
                </div>
              </div>`,
              order: 9,
              provider: "Visual English"
            }
          );
        }
        
        // Unit 6 - My Favourite Colour
        else if (unitId === "6") {
          predefinedResources.push(
            {
              bookId: "1",
              unitId: "6",
              title: "I See Something Blue - Super Simple Songs",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/jYAWf8Y91hA?si=b9qEwXN-0LtJVkre" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 1,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "6",
              title: "I See Something Pink - Super Simple Songs",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Asb8N0nz9OI?si=5Oh9ii42PJzsv7mc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 2,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "6",
              title: "What Colour Is It?",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/NUquLTPhMwg?si=6GQoDS1m4JvkT-gj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 3,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "6",
              title: "What's Your Favorite Color - Super Simple Song",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/zxIpA5nF_LY?si=MItpQRQKiUxtWmg_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 4,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "6",
              title: "Colour Spelling",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/0LNuoKsAtN8?si=FM5PFJceDGSdGIW6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 5,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "6",
              title: "Colours - Game 1",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/54d466d5a13948c6acbafc5729e6d887?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 6,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "6",
              title: "Colours - Game 2",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/360776cf889d4170872d084aa81d3995?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 7,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "6",
              title: "Colors Teaching Activities",
              resourceType: "activity",
              embedCode: `<div class="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                <h2 class="text-xl font-bold mb-4 text-blue-700 border-b pb-2">Colors - Comprehensive Lesson Plan</h2>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Lesson Objectives</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Students will learn and identify basic colors in English</li>
                    <li>Students will express preferences about colors: "My favorite color is..."</li>
                    <li>Students will associate colors with common objects</li>
                    <li>Students will practice asking and answering questions about colors</li>
                  </ul>
                </div>

                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Key Vocabulary</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Basic colors: Red, blue, green, yellow, black, white, orange, purple, pink, brown</li>
                    <li>Question forms: "What color is it?", "What's your favorite color?"</li>
                    <li>Structures: "It's [color]", "My favorite color is [color]", "I like [color]"</li>
                    <li>Descriptive: Light/dark, bright/dull</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Warm-up Activities (5-10 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Color Flash:</strong> Show colored flashcards quickly and have students call out the color names.</li>
                    <li><strong>Touch the Color:</strong> Call out a color and have students touch something of that color in the classroom or on their clothing.</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Main Activities (20-25 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Color Songs:</strong> Teach and sing the "I See Something Blue" or "What's Your Favorite Color" songs (see video resources).</li>
                    <li><strong>Color Hunt:</strong> Students search for items of specific colors around the classroom. "Find something red!" Students bring or point to red objects.</li>
                    <li><strong>Color Sorting:</strong> Provide a collection of colored objects (buttons, blocks, etc.) and have students sort them by color, naming each group.</li>
                    <li><strong>Favorite Color Survey:</strong> Students ask 5 classmates "What's your favorite color?" and record the answers on a simple chart.</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Practice Activities (15 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>I Spy Game:</strong> Play "I spy with my little eye something [color]" and students guess the object.</li>
                    <li><strong>Color Dictation Drawing:</strong> Describe a simple picture using colors (e.g., "Draw a red apple on a green table") and students draw according to instructions.</li>
                    <li><strong>Wordwall Games:</strong> Use the interactive Wordwall games to practice color vocabulary (see game resources).</li>
                    <li><strong>Color Categories:</strong> Name a color and students must think of objects that are naturally that color (e.g., "Blue - sky, ocean, blueberries").</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Wrap-up Activity (5 minutes)</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li><strong>Rainbow Collage:</strong> Create a quick collaborative classroom rainbow with student drawings or colored paper strips.</li>
                    <li><strong>Color Bomb:</strong> Pass a ball while music plays. When music stops, teacher calls out a color and the student holding the ball must name something of that color.</li>
                  </ul>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Extension Activities</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Create color mixing experiments to learn about secondary colors</li>
                    <li>Read a color-themed storybook like "Brown Bear, Brown Bear, What Do You See?"</li>
                    <li>Make color word cards where the word is written in the corresponding color</li>
                    <li>Connect colors to emotions (How does each color make you feel?)</li>
                  </ul>
                </div>
              </div>`,
              order: 8,
              provider: "Visual English"
            }
          );
        }

        // Unit 7 - How Old Are You
        else if (unitId === "7") {
          predefinedResources.push(
            {
              bookId: "1",
              unitId: "7",
              title: "Number Zoo 1-10",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/nsDanlM8_3c?si=owcKnsCijJfHmIWz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 1,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "7",
              title: "Spelling Numbers 1-10 - Salamander",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/HG361wJyDY0?si=-d2LBkehBjfjOKYC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 2,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "7",
              title: "How Old Are You - ENGLISH TREE",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/JooOjnzWv3E?si=bqiXPFN_AS0j-2dw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 3,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "7",
              title: "Numbers 1-10 - Game 1",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/43666156c96d455686dc6620f025c979?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 4,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "7",
              title: "Numbers 1-10 - Game 2",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/6b732e25ee5641e38bdb2785e4fe390b?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 5,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "7",
              title: "Numbers 1-10 - Game 3",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/a0ac3f124ba146bda184a6fe30e24d5b?themeId=26&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 6,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "7",
              title: "Numbers & Age Teaching Activities",
              resourceType: "activity",
              embedCode: `<div class="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                <h2 class="text-xl font-bold mb-4 text-blue-700 border-b pb-2">Numbers & Age - Comprehensive Lesson Plan</h2>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Lesson Objectives</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Students will learn numbers from 1-10 in English</li>
                    <li>Students will be able to ask and answer "How old are you?" with appropriate responses</li>
                    <li>Students will count objects using numbers 1-10</li>
                    <li>Students will recognize written number words (one, two, three, etc.)</li>
                  </ul>
                </div>

                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Key Vocabulary</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Numbers: 1-10 (one, two, three, four, five, six, seven, eight, nine, ten)</li>
                    <li>Question forms: "How old are you?", "How many...?", "Can you count...?"</li>
                    <li>Structures: "I am [number] years old", "There are [number] [objects]"</li>
                    <li>Birthday-related: Cake, candles, present, party</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Warm-up Activities (5-10 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Number Chant:</strong> Count from 1-10 together using different voices (loud, whisper, robot) with accompanying hand gestures.</li>
                    <li><strong>Number Line-up:</strong> Give students number cards from 1-10 and have them arrange themselves in order.</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Main Activities (20-25 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Number Songs:</strong> Teach and sing counting songs or watch number videos (see video resources).</li>
                    <li><strong>How Old Are You Chain:</strong> Students form a circle. First student asks "How old are you?" to the next, who responds "I am [age] years old" and then asks the next student.</li>
                    <li><strong>Counting Objects:</strong> Place collections of classroom objects (pencils, books, etc.) around the room. Students work in pairs to count and report: "There are six pencils."</li>
                    <li><strong>Birthday Cards:</strong> Students create simple birthday cards with age numbers, practicing writing numbers and saying "Happy Birthday! You are [number] years old."</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Practice Activities (15 minutes)</h3>
                  <ul class="space-y-2 list-disc pl-5 text-gray-700">
                    <li><strong>Number Bingo:</strong> Play bingo with numbers 1-10. Call out numbers in English and students mark their cards.</li>
                    <li><strong>How Many?:</strong> Show pictures with different quantities of objects and ask "How many [objects] are there?" Students answer with full sentences.</li>
                    <li><strong>Wordwall Games:</strong> Use the interactive Wordwall games to practice number vocabulary (see game resources).</li>
                    <li><strong>Number Dictation:</strong> Call out numbers and have students write them down or select the correct number card.</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Wrap-up Activity (5 minutes)</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li><strong>Number Snowball:</strong> Students write a number from 1-10 on a piece of paper, crumple it into a "snowball," throw it, pick up another, and read the number aloud.</li>
                    <li><strong>Birthday Role Play:</strong> Act out a birthday scene with age-appropriate candles on a cake. Practice asking and telling age.</li>
                  </ul>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Extension Activities</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Introduce numbers 11-20 for advanced students</li>
                    <li>Play number-based math games with simple addition using objects</li>
                    <li>Create a class birthday chart showing everyone's age</li>
                    <li>Read stories featuring numbers, like "Ten Little Fingers" or "Five Little Monkeys"</li>
                  </ul>
                </div>
              </div>`,
              order: 7,
              provider: "Visual English"
            }
          );
        }
        
        // Unit 13 - Do You Have a Pet
        else if (unitId === "13") {
          predefinedResources.push(
            {
              bookId: "1",
              unitId: "13",
              title: "I Have A Pet - Super Simple Songs",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/pWepfJ-8XU0?si=ij_lH_zn4Fvq_Vr7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 1,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "13",
              title: "What Pet Should I Get - Dr. Seuss",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/psCzO1TlJUU?si=PLgE3Tn7fUOhkLJK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 2,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "13",
              title: "Pets Game 1",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/a6ed7abe04ef40a3b7fc7a1c1e43baa3?themeId=1&templateId=8&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 3,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "13",
              title: "Pets Game 2",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/a69c62dffa604b9b8b3bf8af18be33e3?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 4,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "13",
              title: "Pets Teaching Activities",
              resourceType: "activity",
              embedCode: `<div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 class="text-lg font-semibold mb-3">Teaching Activities for Pets</h3>
                <ul class="space-y-2 list-disc pl-5">
                  <li>Create pet puppets and role play caring for pets</li>
                  <li>Draw your favorite pet and write about what it eats</li>
                  <li>Match pets with their homes and food</li>
                  <li>Play "Guess the Animal" by describing pet characteristics</li>
                </ul>
              </div>`,
              order: 5,
              provider: "Visual English"
            }
          );
        }
        
        // Unit 12 - Home Sweet Home
        else if (unitId === "12") {
          predefinedResources.push(
            {
              bookId: "1",
              unitId: "12",
              title: "Rooms Of The House Song - Planet Pop",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/IjnlkdGwcIY?si=vEVQmhSvgJHkZAXN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 1,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "12",
              title: "Home Sweet Home - Kids Learning Tube",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/JRh0YAWziWE?si=9m4fKJAZLcGNGsIS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 2,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "12",
              title: "Rooms of the House Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/edd2c3b1d51e4c749c12f7f29c51bbd4?themeId=1&templateId=11&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 3,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "12",
              title: "Home & House Teaching Activities",
              resourceType: "activity",
              embedCode: `<div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 class="text-lg font-semibold mb-3">Teaching Activities for Home & House</h3>
                <ul class="space-y-2 list-disc pl-5">
                  <li>Create a paper doll house with labeled rooms</li>
                  <li>Match household items to the rooms they belong in</li>
                  <li>Draw and label your own bedroom</li>
                  <li>Role play different activities in each room: "What do you do in the kitchen?"</li>
                </ul>
              </div>`,
              order: 4,
              provider: "Visual English"
            }
          );
        }
        
        // Unit 11 - Seasons of the Year
        else if (unitId === "11") {
          predefinedResources.push(
            {
              bookId: "1",
              unitId: "11",
              title: "Season Song - Pancake Manor",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/8ZjpI6fgYSY?si=QGaTvWjzJTIbImrB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 1,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "11",
              title: "Four Seasons Song - The Singing Walrus",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ksGiLaIx39c?si=FT1qJ0jdUjU8F74Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 2,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "11",
              title: "Seasons Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/a01f74fd215e479cab60c7c0bba25d18?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 3,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "11",
              title: "Seasons Teaching Activities",
              resourceType: "activity",
              embedCode: `<div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 class="text-lg font-semibold mb-3">Teaching Activities for Seasons</h3>
                <ul class="space-y-2 list-disc pl-5">
                  <li>Create a seasons wheel with pictures for each season</li>
                  <li>Sort clothing items appropriate for different seasons</li>
                  <li>Draw a tree showing how it changes in each season</li>
                  <li>Discuss seasonal activities: "What do you do in summer/winter?"</li>
                </ul>
              </div>`,
              order: 4,
              provider: "Visual English"
            }
          );
        }
        
        // Unit 8 - Shapes
        else if (unitId === "8") {
          predefinedResources.push(
            {
              bookId: "1",
              unitId: "8",
              title: "The Shape Song 1 - Super Simple Songs",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/TJhfl5vdxp4?si=KGz3TRf8JULhBF1W" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 1,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "8",
              title: "The Shape Song 2 - Super Simple Songs",
              resourceType: "video",
              embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/03pyY9C2Pm8?si=gZQXn83XKYLa0kQI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
              order: 2,
              provider: "YouTube"
            },
            {
              bookId: "1",
              unitId: "8",
              title: "Shapes Game 1",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/0cad1e2eff7c492f87bf170e073e3fa7?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 3,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "8",
              title: "Shapes Game 2",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9aba456eebc04fcdbcace5c56cd6ed48?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 4,
              provider: "Wordwall"
            },
            {
              bookId: "1",
              unitId: "8",
              title: "Shapes Teaching Activities",
              resourceType: "activity",
              embedCode: `<div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 class="text-lg font-semibold mb-3">Teaching Activities for Shapes</h3>
                <ul class="space-y-2 list-disc pl-5">
                  <li>Shape hunt - find objects of different shapes in the classroom</li>
                  <li>Create a shape collage using colored paper</li>
                  <li>Draw pictures using only basic shapes</li>
                  <li>Sort objects by shape and count how many of each shape</li>
                </ul>
              </div>`,
              order: 5,
              provider: "Visual English"
            }
          );
        }
        
        // Save predefined resources
        setResources(predefinedResources);
        saveResourcesToServer(predefinedResources);
      }
      // Book 4 - Add interactive teacher resources
      else if (bookId === "4") {
        // Unit 1 - Nationalities
        if (unitId === "1") {
          predefinedResources.push(
            {
              bookId: "4",
              unitId: "1",
              title: "UK Flags Game - Wordwall",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9d62a87534154c39b8572b448fdd59ed?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 0,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "1",
              title: "UK Countries Game - Wordwall",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/3af0790f88df445b94749377ac272a6a?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 1,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "1",
              title: "UK Capital Cities Game - Wordwall",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/779a554a69a1475d9ea370e71279bf75?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 2,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "1",
              title: "Book 4 - Unit 1 - Nationalities",
              resourceType: "pdf",
              embedCode: `<div class="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center">
                <div class="text-center mb-3">
                  <h3 class="text-lg font-semibold mb-1 text-blue-700">Book 4 - Unit 1 - Nationalities</h3>
                  <p class="text-sm text-gray-500">Complete lesson curriculum from Visual English</p>
                </div>
                <div class="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex justify-center items-center">
                  <a 
                    href="/api/direct/book4/unit1/assets/00 A Book 4 – Unit 1 – New Version.pdf" 
                    target="_blank"
                    class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    View PDF Curriculum
                  </a>
                </div>
                <p class="mt-3 text-xs text-gray-500 italic">Access the complete teaching materials for Unit 1</p>
              </div>`,
              order: 3,
              provider: "Visual English"
            },
            {
              bookId: "4",
              unitId: "1",
              title: "World Explorers: Nationalities Lesson Plan (Ages 9-10)",
              resourceType: "activity",
              embedCode: `<div class="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                <h2 class="text-xl font-bold mb-4 text-blue-700 border-b pb-2">World Explorers: Nationalities Lesson Plan</h2>
                <div class="text-right text-sm text-gray-500 mb-4">For students aged 9-10 years</div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Lesson Objectives</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Students will learn to identify countries and their nationalities</li>
                    <li>Students will practice asking and answering "Where are you from?" and "What's your nationality?"</li>
                    <li>Students will explore cultural aspects of different countries</li>
                  </ul>
                </div>

                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Materials Needed</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>World map or globe</li>
                    <li>Pictures of famous landmarks from different countries</li>
                    <li>Country flags flashcards</li>
                    <li>Passport template handouts (one per student)</li>
                    <li>Colored pencils or markers</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Warm-up (10 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>World Map Exploration:</strong> Display a world map and ask students to point to countries they know. Have them share any experiences with travel or connections to different countries.</p>
                    <p class="mt-2"><strong>Flag Quiz:</strong> Show different country flags and see if students can identify the countries. Introduce the concept of nationalities as you go.</p>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Vocabulary Development (15 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>Country-Nationality Pairs:</strong> Introduce 8-10 country-nationality pairs using flashcards or slides. For each country, show:</p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Country name (Poland, Japan, Brazil, etc.)</li>
                      <li>Flag</li>
                      <li>Nationality (Polish, Japanese, Brazilian, etc.)</li>
                      <li>Simple sentence: "She is from Poland. She is Polish."</li>
                    </ul>
                    <p class="mt-2"><strong>Choral Repetition:</strong> Lead students in pronouncing each country and nationality, focusing on pronunciation.</p>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Practice Activities (20 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>1. Passport Creation:</strong> Give each student a passport template. Have them:</p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Draw their picture on the first page</li>
                      <li>Write their name and choose a country they would like to be "from"</li>
                      <li>Write their "nationality" based on their chosen country</li>
                      <li>Decorate their passport with the flag of their chosen country</li>
                    </ul>
                    <p class="mt-3"><strong>2. Immigration Station Role Play:</strong> Set up an "immigration counter" in the classroom:</p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>One student plays the immigration officer, asking: "Where are you from?" and "What's your nationality?"</li>
                      <li>Students line up with their passports and answer based on their created identities</li>
                      <li>The "officer" stamps their passport after successful answers</li>
                      <li>Rotate roles so several students get to be the officer</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Interactive Game (15 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>World Travelers Game:</strong></p>
                    <ol class="ml-4 mt-1 space-y-1 list-decimal">
                      <li>Arrange students in a circle</li>
                      <li>First student says: "My name is [name], I'm from [country], and I'm [nationality]."</li>
                      <li>They pass a small globe or ball to another student</li>
                      <li>The next student must repeat what the previous student said and then add their own information</li>
                      <li>For an easier version, students only need to repeat their immediate predecessor's information</li>
                      <li>For a challenge, add that each student must also name something famous from their chosen country</li>
                    </ol>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Cultural Extension (10 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>Famous Landmarks:</strong> Show pictures of famous landmarks and have students guess the country and nationality.</p>
                    <p class="mt-2"><strong>Cultural Facts:</strong> Share 1-2 interesting facts about each country discussed (traditional food, sport, custom, etc.).</p>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Wrap-up (5 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>Exit Ticket:</strong> Each student tells one new country-nationality pair they learned today.</p>
                    <p class="mt-2"><strong>Mini-Reflection:</strong> Ask students which countries they'd like to visit one day and why.</p>
                  </div>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Assessment</h3>
                  <div class="pl-5 text-gray-700">
                    <p>Observe students' participation in activities and assess their ability to:</p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Correctly match countries with nationalities</li>
                      <li>Ask and answer questions about origin and nationality</li>
                      <li>Use proper sentence structure when discussing nationalities</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Extension Activities</h3>
                  <div class="pl-5 text-gray-700">
                    <ul class="ml-4 space-y-1 list-disc">
                      <li>Create a classroom display with country profiles created by students</li>
                      <li>Research and present about a chosen country's traditions or celebrations</li>
                      <li>International food day where students bring or describe traditional foods</li>
                    </ul>
                  </div>
                </div>
              </div>`,
              order: 3,
              provider: "Visual English"
            }
          );
        }
        // Unit 2 - Gadgets
        else if (unitId === "2") {
          predefinedResources.push(
            {
              bookId: "4",
              unitId: "2",
              title: "Gadgets 1 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9b778eef10ff453b8ef30da1d667dadb?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 0,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "2",
              title: "Gadgets 2 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/7543280a4eab4edf90f4cbbe14a8f771?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 1,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "2",
              title: "Gadgets 3 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/96418a9e2fce4091844ac3f35a855add?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 2,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "2",
              title: "Book 4 - Unit 2 - Technology & Gadgets",
              resourceType: "pdf",
              embedCode: `<div class="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center">
                <div class="text-center mb-3">
                  <h3 class="text-lg font-semibold mb-1 text-blue-700">Book 4 - Unit 2 - Technology & Gadgets</h3>
                  <p class="text-sm text-gray-500">Complete lesson curriculum from Visual English</p>
                </div>
                <div class="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex justify-center items-center">
                  <a 
                    href="/api/direct/book4/unit2/assets/00 A Book 4 – Unit 2 – New Version.pdf" 
                    target="_blank"
                    class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    View PDF Curriculum
                  </a>
                </div>
                <p class="mt-3 text-xs text-gray-500 italic">Access the complete teaching materials for Unit 2</p>
              </div>`,
              order: 3,
              provider: "Visual English"
            },
            {
              bookId: "4",
              unitId: "2",
              title: "Find the Technology - ABCya Game",
              resourceType: "game",
              embedCode: `<div style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
                <h3 style="margin-bottom: 15px; color: #2563eb;">Find the Technology - Interactive Game</h3>
                <p style="margin-bottom: 20px;">Practice identifying technology and gadgets with this interactive game</p>
                <a href="https://www.abcya.com/games/find_the_tech" 
                   target="_blank" 
                   style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: 500;">
                  <span style="display: flex; align-items: center; justify-content: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                      <path d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
                      <path d="M12 17v4"></path>
                      <path d="M8 21h8"></path>
                      <path d="M7 14.5s.5-2 5-2 5 2 5 2"></path>
                      <path d="M7 10h0"></path>
                      <path d="M17 10h0"></path>
                    </svg>
                    Play the Game
                  </span>
                </a>
              </div>`,
              order: 3,
              provider: "ABCya"
            },
            {
              bookId: "4",
              unitId: "2",
              title: "Digital Detectives: Technology Lesson Plan (Ages 9-10)",
              resourceType: "activity",
              embedCode: `<div class="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                <h2 class="text-xl font-bold mb-4 text-blue-700 border-b pb-2">Digital Detectives: Technology & Gadgets Lesson Plan</h2>
                <div class="text-right text-sm text-gray-500 mb-4">For students aged 9-10 years</div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Lesson Objectives</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Students will learn vocabulary related to modern technology and gadgets</li>
                    <li>Students will practice describing gadgets and their functions</li>
                    <li>Students will compare older technologies with modern equivalents</li>
                    <li>Students will use phrases to express ownership of technology items</li>
                  </ul>
                </div>

                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Materials Needed</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Pictures or real examples of various gadgets (smartphones, tablets, headphones, etc.)</li>
                    <li>"Then and Now" technology cards (showing old and new versions of technologies)</li>
                    <li>Mini-whiteboards or paper and markers</li>
                    <li>Materials for "Invent a Gadget" activity (paper, colored pencils, markers)</li>
                    <li>Optional: A few actual gadgets for demonstration (if available)</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Warm-up (10 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>Gadget Guessing Game:</strong> Show students images of gadgets with certain parts hidden or blurred. Have them guess what the gadget is based on the partial image.</p>
                    <p class="mt-2"><strong>My Favorite Gadget:</strong> Ask students to draw their favorite technology item on mini-whiteboards and then hold them up. Have volunteers explain what their favorite gadget is and what they use it for.</p>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Vocabulary Development (15 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>Technology Vocabulary:</strong> Introduce 10-12 key gadget terms with visuals:</p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Smartphone, tablet, laptop, smartwatch, headphones, earbuds</li>
                      <li>Charger, keyboard, mouse, webcam, speaker, microphone</li>
                    </ul>
                    <p class="mt-2"><strong>Function Words:</strong> Teach verbs associated with gadgets:</p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Charge, connect, download, upload, install, browse</li>
                      <li>Turn on/off, plug in, scroll, swipe, tap, click</li>
                    </ul>
                    <p class="mt-2"><strong>Ownership Phrases:</strong> Practice phrases like "I have a...", "Do you have a...?", "It's my...", "Whose... is this?"</p>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Practice Activities (20 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>1. Then and Now Technology:</strong> Show pairs of old and new technology:</p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Old telephone → Smartphone</li>
                      <li>Walkman → MP3 player/streaming service</li>
                      <li>VHS tape → Streaming video</li>
                      <li>Film camera → Digital camera/phone camera</li>
                    </ul>
                    <p class="mt-1">Ask students to describe differences using simple comparative language: "The smartphone is smaller than the old telephone." "The digital camera is easier to use than the film camera."</p>
                    
                    <p class="mt-3"><strong>2. Gadget Charades:</strong></p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Divide students into small groups</li>
                      <li>One student acts out using a gadget without speaking</li>
                      <li>Others guess what gadget it is and what they're doing with it</li>
                      <li>The student who guesses correctly goes next</li>
                    </ul>
                    
                    <p class="mt-3"><strong>3. Survey Activity:</strong></p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Students circulate around the room asking each other questions</li>
                      <li>"Do you have a tablet?" "How often do you use headphones?"</li>
                      <li>Students record answers on a simple survey sheet</li>
                      <li>Afterward, they report findings: "Five students have tablets."</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Creative Project (15 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>"Invent a Gadget" Activity:</strong></p>
                    <ol class="ml-4 mt-1 space-y-1 list-decimal">
                      <li>Students work in pairs to design a new, imaginary gadget</li>
                      <li>They draw their invention and label its parts</li>
                      <li>Students must give their gadget a name and explain what it does</li>
                      <li>Encourage them to use the new vocabulary from the lesson</li>
                      <li>Each pair presents their invention to the class: "This is a [gadget name]. It can [function]."</li>
                    </ol>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Digital Citizenship Discussion (10 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>Safe Technology Use:</strong> Have a simple, age-appropriate discussion about:</p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Screen time limits ("When do you use gadgets? For how long?")</li>
                      <li>Being kind online ("How can we be nice when using technology?")</li>
                      <li>Asking permission to use others' gadgets ("Whose tablet is this? Can I use your headphones?")</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Wrap-up (5 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>Technology Memory Chain:</strong> Start with "In my tech bag, I have a smartphone." Next student repeats and adds an item: "In my tech bag, I have a smartphone and headphones." Continue around the class.</p>
                    <p class="mt-2"><strong>Quick Review:</strong> Show flashcards of gadgets and have students quickly name them as a class.</p>
                  </div>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Assessment</h3>
                  <div class="pl-5 text-gray-700">
                    <p>Assessment can be based on:</p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Correct identification and naming of technology items</li>
                      <li>Appropriate use of "have/has" and possessive forms</li>
                      <li>Participation in interactive activities</li>
                      <li>Creativity and language use in the "Invent a Gadget" activity</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Extension Activities</h3>
                  <div class="pl-5 text-gray-700">
                    <ul class="ml-4 space-y-1 list-disc">
                      <li>Create a class technology dictionary with pictures and definitions</li>
                      <li>Write simple instructions for how to use a particular gadget</li>
                      <li>Interview parents/grandparents about technology from when they were young</li>
                      <li>Design a poster showing technology rules for the classroom</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Homework Ideas</h3>
                  <div class="pl-5 text-gray-700">
                    <ul class="ml-4 space-y-1 list-disc">
                      <li>Draw and label your favorite gadget and write 3-5 sentences about it</li>
                      <li>Create a simple timeline showing how one technology has changed over time</li>
                      <li>Find and count technology items at home and create a simple bar chart</li>
                    </ul>
                  </div>
                </div>
              </div>`,
              order: 4,
              provider: "Visual English"
            }
          );
        }
        // Unit 3 - Home Sweet Home
        else if (unitId === "3") {
          predefinedResources.push(
            {
              bookId: "4",
              unitId: "3",
              title: "Types of Houses 1 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/cbcccb9fd6d94e119677fad59f266cb0?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 0,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "3",
              title: "Types of Houses 2 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/b1e0d0a301514e3683d544934b5b6fc3?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 1,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "3",
              title: "Rooms of Houses - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/b9cc3e3556ad460887c4c142019276ea?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 2,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "3",
              title: "Office - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/2c152aa804c24e4e93a02ffc82bd898e?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 3,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "3",
              title: "Garage - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/f5e2aaddc74a4f52ba8b4bb2f6590aca?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 4,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "3",
              title: "Bedroom - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/f5e2aaddc74a4f52ba8b4bb2f6590aca?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 5,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "3",
              title: "Bathroom - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/992ac1652f2449089965650466150410?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 6,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "3",
              title: "Living Room - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/467616b037bd4fd8b9dfb6537f7f8170?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 7,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "3",
              title: "Dining Room - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/4506b9c842e44a4d97c817692a0b7919?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 8,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "3",
              title: "Basement - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/af5f6cbe67b842f690c0a9783053391d?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 9,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "3",
              title: "Attic - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/4cdcb6c9228644cb8bec9eb93ca948bb?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 10,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "3",
              title: "Kitchen - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/88b29208d37147cda3dd3ab49c7a7355?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 11,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "3",
              title: "Hall - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/3849bf8c81d540689446cee3d48088fa?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 12,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "3",
              title: "Parts of the House - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/76146409a4de4fa59a6c364e43e4eee6?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 13,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "3",
              title: "Book 4 - Unit 3 - Home Sweet Home",
              resourceType: "pdf",
              embedCode: `<div class="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center">
                <div class="text-center mb-3">
                  <h3 class="text-lg font-semibold mb-1 text-blue-700">Book 4 - Unit 3 - Home Sweet Home</h3>
                  <p class="text-sm text-gray-500">Complete lesson curriculum from Visual English</p>
                </div>
                <div class="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex justify-center items-center">
                  <a 
                    href="/api/direct/book4/unit3/assets/00 A Book 4 – Unit 3 – New Version.pdf" 
                    target="_blank"
                    class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    View PDF Curriculum
                  </a>
                </div>
                <p class="mt-3 text-xs text-gray-500 italic">Access the complete teaching materials for Unit 3</p>
              </div>`,
              order: 14,
              provider: "Visual English"
            },
            {
              bookId: "4",
              unitId: "3",
              title: "Home Sweet Home: Lesson Plan (Ages 9-10)",
              resourceType: "activity",
              embedCode: `<div class="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                <h2 class="text-xl font-bold mb-4 text-blue-700 border-b pb-2">Home Sweet Home: Lesson Plan</h2>
                <div class="text-right text-sm text-gray-500 mb-4">For students aged 9-10 years</div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Lesson Objectives</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Students will identify different types of housing (apartment, detached house, cottage, etc.)</li>
                    <li>Students will name and describe different rooms in a house</li>
                    <li>Students will learn vocabulary for common furniture and household items</li>
                    <li>Students will practice giving and following directions using prepositions of place</li>
                  </ul>
                </div>

                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Materials Needed</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Pictures of different types of houses (apartment, house, cottage, mansion, etc.)</li>
                    <li>Flashcards with rooms of the house</li>
                    <li>Small furniture cutouts or toy furniture</li>
                    <li>Paper for drawing floor plans</li>
                    <li>Colored pencils or markers</li>
                    <li>Handout with house vocabulary</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Warm-up (10 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>Types of Houses Discussion:</strong> Show students pictures of different types of houses and ask:</p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>"What type of house is this?" (apartment building, detached house, cottage, etc.)</li>
                      <li>"Do you live in a house like this?"</li>
                      <li>"What type of house do you live in?"</li>
                    </ul>
                    <p class="mt-2">Create a quick tally on the board of how many students live in each type of housing.</p>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Vocabulary Development (15 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>1. Rooms in a House:</strong> Introduce or review vocabulary:</p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Kitchen, living room, bedroom, bathroom, dining room</li>
                      <li>Attic, basement, garage, garden/yard</li>
                    </ul>
                    
                    <p class="mt-3"><strong>2. Furniture and Items:</strong> Teach key vocabulary for each room:</p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Kitchen: refrigerator, stove, sink, cupboard, table, chair</li>
                      <li>Living room: sofa, armchair, TV, bookshelf, coffee table</li>
                      <li>Bedroom: bed, wardrobe, desk, lamp, pillow, blanket</li>
                      <li>Bathroom: toilet, shower, bathtub, sink, mirror</li>
                    </ul>
                    
                    <p class="mt-3"><strong>3. Prepositions Review:</strong> Quick review of:</p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>In, on, under, next to, between, in front of, behind</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Practice Activities (25 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>1. "Where Is It?" Game (10 minutes):</strong></p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Place small furniture items or cutouts on a table</li>
                      <li>Students take turns asking: "Where is the [item]?"</li>
                      <li>Another student must answer using a preposition: "It's under the table" or "It's next to the chair"</li>
                      <li>For more challenge, add room context: "The lamp is on the desk in the bedroom"</li>
                    </ul>
                    
                    <p class="mt-3"><strong>2. "My Dream House" Floor Plan (15 minutes):</strong></p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Students draw a simple floor plan of their dream house</li>
                      <li>They must label at least 5 rooms</li>
                      <li>They should draw and label at least 3 furniture items in each room</li>
                      <li>Encourage creativity but ensure they're using the vocabulary correctly</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Pair Work Activity (15 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>"Find the Differences" Houses:</strong></p>
                    <ol class="ml-4 mt-1 space-y-1 list-decimal">
                      <li>Pair students and give each student a slightly different house picture (with 5-7 differences)</li>
                      <li>Without looking at each other's pictures, they must ask questions to identify differences</li>
                      <li>Example questions:
                        <ul class="ml-4 mt-1 space-y-1 list-disc">
                          <li>"How many bedrooms are there in your house?"</li>
                          <li>"Is there a TV in the living room?"</li>
                          <li>"Where is the lamp in the bedroom?"</li>
                        </ul>
                      </li>
                      <li>Students should list all differences they discover</li>
                    </ol>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Speaking Activity (10 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>"House Tour" Presentations:</strong></p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Students use their dream house floor plans from earlier</li>
                      <li>In pairs, students give a "tour" of their dream house</li>
                      <li>They should describe each room and its furniture: "This is the kitchen. There's a big refrigerator next to the door and a table in the middle of the room."</li>
                      <li>Select 2-3 volunteers to share their house tours with the whole class</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Wrap-up (5 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>Room Riddles:</strong> Describe a room without naming it, and have students guess which room it is.</p>
                    <p class="mt-2">Example: "In this room, you can find a refrigerator, a sink, and a stove. What room is it?"</p>
                    <p class="mt-2">Have students create their own room riddles and share them with the class.</p>
                  </div>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Assessment</h3>
                  <div class="pl-5 text-gray-700">
                    <p>Observe students during activities and assess:</p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Correct use of house and furniture vocabulary</li>
                      <li>Proper use of prepositions of place</li>
                      <li>Ability to describe rooms and house layouts</li>
                      <li>Participation in pair and group activities</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Homework Ideas</h3>
                  <div class="pl-5 text-gray-700">
                    <ul class="ml-4 space-y-1 list-disc">
                      <li>Draw and label your real home with at least 8 furniture items</li>
                      <li>Write 5 sentences describing where things are in your home using prepositions</li>
                      <li>Create a mini-book titled "My Home" with drawings of different rooms</li>
                      <li>Research and write about a traditional type of house from another country</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Extension Activities</h3>
                  <div class="pl-5 text-gray-700">
                    <ul class="ml-4 space-y-1 list-disc">
                      <li>Create a 3D model of a room using a shoebox</li>
                      <li>Explore different housing types around the world (igloos, yurts, houseboats)</li>
                      <li>Role play conversations in different rooms (shopping in the kitchen, watching TV in the living room)</li>
                      <li>Create a house advertisement with drawings and descriptions</li>
                    </ul>
                  </div>
                </div>
              </div>`,
              order: 14,
              provider: "Visual English"
            }
          );
        }
        // Unit 4 - Family - Describing People
        else if (unitId === "4") {
          predefinedResources.push(
            {
              bookId: "4",
              unitId: "4",
              title: "Types of Hair - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/0268bf9e65734957a7b291700fc07eee?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 0,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "4",
              title: "Describing People - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/6c610a5d0f4e4b72be38e5deebf55425?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 1,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "4",
              title: "Family - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/1373ff4429454b2c8c63824e64176643?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 2,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "4",
              title: "Book 4 - Unit 4 - Family & Describing People",
              resourceType: "pdf",
              embedCode: `<div class="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center">
                <div class="text-center mb-3">
                  <h3 class="text-lg font-semibold mb-1 text-blue-700">Book 4 - Unit 4 - Family & Describing People</h3>
                  <p class="text-sm text-gray-500">Complete lesson curriculum from Visual English</p>
                </div>
                <div class="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex justify-center items-center">
                  <a 
                    href="/api/direct/book4/unit4/assets/00 A Book 4 – Unit 4 – New Version.pdf" 
                    target="_blank"
                    class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    View PDF Curriculum
                  </a>
                </div>
                <p class="mt-3 text-xs text-gray-500 italic">Access the complete teaching materials for Unit 4</p>
              </div>`,
              order: 3,
              provider: "Visual English"
            },
            {
              bookId: "4",
              unitId: "4",
              title: "All About Me & My Family: Lesson Plan (Ages 9-10)",
              resourceType: "activity",
              embedCode: `<div class="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                <h2 class="text-xl font-bold mb-4 text-blue-700 border-b pb-2">All About Me & My Family: Lesson Plan</h2>
                <div class="text-right text-sm text-gray-500 mb-4">For students aged 9-10 years</div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Lesson Objectives</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Students will learn and use vocabulary to describe physical appearance</li>
                    <li>Students will identify and name family members using appropriate terms</li>
                    <li>Students will practice asking and answering personal questions</li>
                    <li>Students will create descriptions of themselves and family members</li>
                  </ul>
                </div>

                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Materials Needed</h3>
                  <ul class="space-y-1 list-disc pl-5 text-gray-700">
                    <li>Family photos (teacher brings some examples, students can bring their own)</li>
                    <li>Small mirrors for students to observe themselves</li>
                    <li>Pictures of people with different physical features</li>
                    <li>Family tree template worksheets</li>
                    <li>Art supplies (colored pencils, markers, paper)</li>
                    <li>Vocabulary flashcards for family members and physical descriptions</li>
                  </ul>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Warm-up (10 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>Guess Who? Game:</strong></p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Display pictures of famous people or cartoon characters</li>
                      <li>Describe one person without saying who it is</li>
                      <li>Students guess which person you're describing</li>
                      <li>Use phrases like: "This person has long black hair. This person wears glasses. This person is tall."</li>
                      <li>Invite volunteers to describe someone for others to guess</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Vocabulary Development (15 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>1. Physical Description Vocabulary:</strong></p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Hair: long/short, straight/curly/wavy, blonde/brown/black/red/gray</li>
                      <li>Eyes: blue/green/brown/hazel, big/small</li>
                      <li>Height: tall/medium height/short</li>
                      <li>Build: thin/average/heavy</li>
                      <li>Age: young/middle-aged/old</li>
                      <li>Other features: glasses, freckles, beard, mustache</li>
                    </ul>
                    
                    <p class="mt-3"><strong>2. Family Vocabulary:</strong></p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Immediate family: mother, father, sister, brother</li>
                      <li>Extended family: grandmother, grandfather, aunt, uncle, cousin</li>
                      <li>Other terms: parents, grandparents, siblings, twins</li>
                    </ul>
                    
                    <p class="mt-3">Demonstrate by describing your own family members or using photos.</p>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Practice Activities (25 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>1. "Describe Yourself" Mirror Activity (10 minutes):</strong></p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Give each student a small mirror</li>
                      <li>Have them write 5-6 sentences describing themselves</li>
                      <li>Prompt with questions: "What color is your hair? What color are your eyes? Are you tall or short?"</li>
                      <li>Students share their descriptions with a partner who verifies the accuracy</li>
                    </ul>
                    
                    <p class="mt-3"><strong>2. Family Tree Project (15 minutes):</strong></p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Distribute family tree templates</li>
                      <li>Students fill in names and draw small portraits of their family members</li>
                      <li>For each family member, they write one sentence describing them</li>
                      <li>Example: "My mother has brown hair and blue eyes. She is tall."</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Interview Activity (15 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>"Family Reporter" Pairs Activity:</strong></p>
                    <ol class="ml-4 mt-1 space-y-1 list-decimal">
                      <li>Pair students and give them question prompts:</li>
                      <ul class="ml-4 mt-1 space-y-1 list-disc">
                        <li>"How many people are in your family?"</li>
                        <li>"Do you have any brothers or sisters?"</li>
                        <li>"What does your mother/father look like?"</li>
                        <li>"Who do you look most like in your family?"</li>
                        <li>"Do you have any pets in your family?"</li>
                      </ul>
                      <li>Students interview each other and take notes</li>
                      <li>Each student presents 3 interesting facts they learned about their partner's family</li>
                    </ol>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Creative Writing Activity (10 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>"My Special Family Member" Mini-Essay:</strong></p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Students choose one family member they want to write about</li>
                      <li>They write 5-7 sentences describing:
                        <ul class="ml-4 mt-1 space-y-1 list-disc">
                          <li>Who this person is in their family</li>
                          <li>What they look like (physical description)</li>
                          <li>What they like to do (simple interests/hobbies)</li>
                          <li>Why this family member is special to them</li>
                        </ul>
                      </li>
                      <li>Volunteers can share their writing with the class</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mb-5">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Wrap-up (5 minutes)</h3>
                  <div class="pl-5 text-gray-700">
                    <p><strong>Family Similarities Game:</strong></p>
                    <p class="mt-1">Call out statements about family similarities and students stand up if it's true for them:</p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>"Stand up if you have the same color hair as your mother/father."</li>
                      <li>"Stand up if you have the same color eyes as someone in your family."</li>
                      <li>"Stand up if you are the tallest person in your family."</li>
                      <li>"Stand up if you have more than one brother or sister."</li>
                    </ul>
                    <p class="mt-2">Conclude by emphasizing that all families are different and special.</p>
                  </div>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Assessment</h3>
                  <div class="pl-5 text-gray-700">
                    <p>Assessment based on:</p>
                    <ul class="ml-4 mt-1 space-y-1 list-disc">
                      <li>Accurate use of physical description vocabulary</li>
                      <li>Correct use of family relationship terms</li>
                      <li>Ability to form clear, grammatically correct descriptive sentences</li>
                      <li>Participation in pair and group activities</li>
                      <li>Completion of family tree with appropriate descriptions</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Homework Ideas</h3>
                  <div class="pl-5 text-gray-700">
                    <ul class="ml-4 space-y-1 list-disc">
                      <li>Complete a more detailed family tree with descriptions of each person</li>
                      <li>Interview an older family member about what they looked like when they were the student's age</li>
                      <li>Write a short story about "A Day in My Family" describing family activities</li>
                      <li>Find photos of famous people who look similar to family members and explain the similarities</li>
                    </ul>
                  </div>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-200">
                  <h3 class="text-lg font-semibold mb-2 text-blue-600">Extension Activities</h3>
                  <div class="pl-5 text-gray-700">
                    <ul class="ml-4 space-y-1 list-disc">
                      <li>Create "Wanted" posters with detailed descriptions of family members</li>
                      <li>Research family traditions from different cultures and compare with their own</li>
                      <li>Create a family recipe book with descriptions of who makes each dish in the family</li>
                      <li>Role-play introducing family members at a family reunion</li>
                    </ul>
                  </div>
                </div>
              </div>`,
              order: 3,
              provider: "Visual English"
            }
          );
        }
        // Unit 5 - Personality
        else if (unitId === "5") {
          predefinedResources.push(
            {
              bookId: "4",
              unitId: "5",
              title: "Personality Traits - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/339ab9a507314c98aa8ad268f9dbd2fc?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 0,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "5",
              title: "Personality Matching - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/c6d609be7c0a4370adf35d199dd1001d?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 1,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "5",
              title: "Book 4 - Unit 5 - Personality",
              resourceType: "pdf",
              embedCode: `<div class="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center">
                <div class="text-center mb-3">
                  <h3 class="text-lg font-semibold mb-1 text-blue-700">Book 4 - Unit 5 - Personality</h3>
                  <p class="text-sm text-gray-500">Complete lesson curriculum from Visual English</p>
                </div>
                <div class="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex justify-center items-center">
                  <a 
                    href="/api/direct/book4/unit5/assets/00 A Book 4 – Unit 5 – New Version.pdf" 
                    target="_blank"
                    class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    View PDF Curriculum
                  </a>
                </div>
                <p class="mt-3 text-xs text-gray-500 italic">Access the complete teaching materials for Unit 5</p>
              </div>`,
              order: 2,
              provider: "Visual English"
            }
          );
        }
        // Unit 6 - Collections
        else if (unitId === "6") {
          predefinedResources.push(
            {
              bookId: "4",
              unitId: "6",
              title: "Collections - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/6bcdbdd1f33a4700968fcc126d42c323?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 0,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "6",
              title: "Collections Kahoot Game",
              resourceType: "game",
              embedCode: `<div style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
                <h3 style="margin-bottom: 15px; color: #2563eb;">Collections Kahoot Game</h3>
                <p style="margin-bottom: 20px;">Interactive Kahoot game about collecting things</p>
                <a href="https://create.kahoot.it/share/collecting-things/cde5c17a-250c-4764-be4a-cadc750ce300" 
                   target="_blank" 
                   style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: 500;">
                  <span style="display: flex; align-items: center; justify-content: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 8v8"></path>
                      <path d="M8 12h8"></path>
                    </svg>
                    Play Kahoot Game
                  </span>
                </a>
              </div>`,
              order: 1,
              provider: "Kahoot"
            },
            {
              bookId: "4",
              unitId: "6",
              title: "Book 4 - Unit 6 - Collections",
              resourceType: "pdf",
              embedCode: `<div class="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center">
                <div class="text-center mb-3">
                  <h3 class="text-lg font-semibold mb-1 text-blue-700">Book 4 - Unit 6 - Collections</h3>
                  <p class="text-sm text-gray-500">Complete lesson curriculum from Visual English</p>
                </div>
                <div class="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex justify-center items-center">
                  <a 
                    href="/api/direct/book4/unit6/assets/00 A Book 4 – Unit 6 – New Version.pdf" 
                    target="_blank"
                    class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    View PDF Curriculum
                  </a>
                </div>
                <p class="mt-3 text-xs text-gray-500 italic">Access the complete teaching materials for Unit 6</p>
              </div>`,
              order: 2,
              provider: "Visual English"
            }
          );
        }
        // Unit 7 - Fashion Crazy
        else if (unitId === "7") {
          predefinedResources.push(
            {
              bookId: "4",
              unitId: "7",
              title: "Clothes - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/4b5921b195f2437b91adf882adb32d07?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 0,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "7",
              title: "Clothes Patterns 1 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/31b10b47b8184627b05d45e372b69b62?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 1,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "7",
              title: "Clothes Patterns 2 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/87e2df1853c646db9f4a27d632cc9f48?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 2,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "7",
              title: "Book 4 - Unit 7 - Fashion Crazy",
              resourceType: "pdf",
              embedCode: `<div class="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center">
                <div class="text-center mb-3">
                  <h3 class="text-lg font-semibold mb-1 text-blue-700">Book 4 - Unit 7 - Fashion Crazy</h3>
                  <p class="text-sm text-gray-500">Complete lesson curriculum from Visual English</p>
                </div>
                <div class="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex justify-center items-center">
                  <a 
                    href="/api/direct/book4/unit7/assets/00 A Book 4 – Unit 7 – New Version.pdf" 
                    target="_blank"
                    class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    View PDF Curriculum
                  </a>
                </div>
                <p class="mt-3 text-xs text-gray-500 italic">Access the complete teaching materials for Unit 7</p>
              </div>`,
              order: 3,
              provider: "Visual English"
            }
          );
        }
        // Unit 8 - Enjoy Your Meal
        else if (unitId === "8") {
          predefinedResources.push(
            {
              bookId: "4",
              unitId: "8",
              title: "British Breakfast - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/26789cf0b8d648709a7ac5457a9bbfa6?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 0,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "8",
              title: "Food Groups Part 1 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9cf0155f43aa4ff8821070d9f084aa4e?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 1,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "8",
              title: "Food Groups Part 2 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9899470993214165a255330753bdd0ff?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 2,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "8",
              title: "Drinks - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9cf0155f43aa4ff8821070d9f084aa4e?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 3,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "8",
              title: "Berries - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/a6ff7af2a86047cfbc2bc3fa0e940c96?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 4,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "8",
              title: "Nuts - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/08c1c6a3d58a46419a654d194ffd9af0?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 5,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "8",
              title: "Food Pyramid - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/c19d7fb0540e4e269de458c2184b6624?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 6,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "8",
              title: "Book 4 - Unit 8 - Enjoy Your Meal",
              resourceType: "pdf",
              embedCode: `<div class="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center">
                <div class="text-center mb-3">
                  <h3 class="text-lg font-semibold mb-1 text-blue-700">Book 4 - Unit 8 - Enjoy Your Meal</h3>
                  <p class="text-sm text-gray-500">Complete lesson curriculum from Visual English</p>
                </div>
                <div class="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex justify-center items-center">
                  <a 
                    href="/api/direct/book4/unit8/assets/00 A Book 4 – Unit 8 – New Version.pdf" 
                    target="_blank"
                    class="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    View PDF Curriculum
                  </a>
                </div>
                <p class="mt-3 text-xs text-gray-500 italic">Access the complete teaching materials for Unit 8</p>
              </div>`,
              order: 7,
              provider: "Visual English"
            }
          );
        }
        // Unit 9 - Camping
        else if (unitId === "9") {
          predefinedResources.push(
            {
              bookId: "4",
              unitId: "9",
              title: "Camping Verbs - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/26789cf0b8d648709a7ac5457a9bbfa6?themeId=1&templateId=22&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 0,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "9",
              title: "Camping Vocabulary - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/6433e17ad3f84d538f1d5e9eb5d6b4e0?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 1,
              provider: "Wordwall"
            }
          );
        }
        // Unit 10 - Mother Nature
        else if (unitId === "10") {
          predefinedResources.push(
            {
              bookId: "4",
              unitId: "10",
              title: "Weather 1 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/e01b844b81f34deca0222f6548d2b19a?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 0,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "10",
              title: "Weather 2 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/584b1bd4ad394131b887c4787bf869a3?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 1,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "10",
              title: "Weather 3 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/531c7ba221c44e3389dc009f2ec114f8?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 2,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "10",
              title: "Mother Nature - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9c1af9a866eb4251a65afc8696916d4d?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 3,
              provider: "Wordwall"
            }
          );
        }
        // Unit 11 - Daily Routines
        else if (unitId === "11") {
          predefinedResources.push(
            {
              bookId: "4",
              unitId: "11",
              title: "Daily Routines 1 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/06b2e108c57843bc86f50245c245854a?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 0,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "11",
              title: "Daily Routines 2 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/459e14c3d21a459f9423a4eb7097e5fc?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 1,
              provider: "Wordwall"
            }
          );
        }
        // Unit 12 - At The Farm
        else if (unitId === "12") {
          predefinedResources.push(
            {
              bookId: "4",
              unitId: "12",
              title: "Farm Animals 1 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9ac6bf8c618248c894a6ffaf6747f79f?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 0,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "12",
              title: "Farm Animals 2 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/c4c0f4a82d1e4fafa10a6cad72b201be?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 1,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "12",
              title: "Farm Animals Verbs - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/cdbb6e247e6049c0a53ab06a8ede7a00?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 2,
              provider: "Wordwall"
            }
          );
        }
        // Unit 13 - At The Playground
        else if (unitId === "13") {
          predefinedResources.push(
            {
              bookId: "4",
              unitId: "13",
              title: "At The Playground 1 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/c50669484ab247c4ab66b98e3c94f4af?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 0,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "13",
              title: "At The Playground 2 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/ca514af1b9ce49429181a2475142de6a?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 1,
              provider: "Wordwall"
            }
          );
        }
        // Unit 14 - What Can You Do
        else if (unitId === "14") {
          predefinedResources.push(
            {
              bookId: "4",
              unitId: "14",
              title: "I Can Verbs 1 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/cb60e7edbea74d8d81417cd3eeef28ed?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 0,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "14",
              title: "I Can Verbs 2 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/29b2dad99a9d447f8ea8823024d19216?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 1,
              provider: "Wordwall"
            }
          );
        }
        // Unit 15 - At The Circus
        else if (unitId === "15") {
          predefinedResources.push(
            {
              bookId: "4",
              unitId: "15",
              title: "Circus Vocabulary 1 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/94c4f083575e4321bd59f57bc024dbd3?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 0,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "15",
              title: "Circus Vocabulary 2 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/6c0d9d6d5b1d40b78d0d23df4539e1e1?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 1,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "15",
              title: "Circus Animals - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/1c724495ff684609895ed535379cbec0?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 2,
              provider: "Wordwall"
            }
          );
        }
        // Unit 16 - Free Time Activities
        else if (unitId === "16") {
          predefinedResources.push(
            {
              bookId: "4",
              unitId: "16",
              title: "Free Time Activities 1 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/ba588163d9c4497d9f86c6aca1479354?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 0,
              provider: "Wordwall"
            },
            {
              bookId: "4",
              unitId: "16",
              title: "Free Time Activities 2 - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9d97f106652e47cd86c4416269c4fd86?themeId=1&templateId=38&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 1,
              provider: "Wordwall"
            }
          );
        }

        // Save resources to the server
        if (predefinedResources.length > 0) {
          setResources(predefinedResources);
          saveResourcesToServer(predefinedResources);
        }
      }
    }
  }, [resources.length, bookId, unitId]);

  // Render resource type icon based on type
  const renderResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'game':
        return <Gamepad2 className="h-5 w-5" />;
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      case 'activity':
        return <FileText className="h-5 w-5" />;
      default:
        return null;
    }
  };

  // No content to display if no bookId or unitId
  if (!bookId || !unitId) {
    return <div className="p-4 text-center text-gray-500">Please select a book and unit to view resources.</div>;
  }

  return (
    <div className="teacher-resources">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Teacher Resources</h2>
        {isEditMode && (
          <Button 
            onClick={() => setIsAdding(true)}
            className="flex items-center"
            size="sm"
          >
            <Plus className="mr-1 h-4 w-4" /> Add Resource
          </Button>
        )}
      </div>
      
      {resources.length === 0 ? (
        <div className="text-center p-8 border rounded-md bg-gray-50">
          <p className="text-gray-500">No teacher resources available for this unit yet.</p>
        </div>
      ) : (
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="pdf">Lesson PDFs</TabsTrigger>
            <TabsTrigger value="activity">Lesson Plans</TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.filter(r => r.resourceType === 'video').map((resource, index) => (
                <ResourceItem
                  key={index}
                  resource={resource}
                  index={resources.indexOf(resource)}
                  isEditing={editingResource === resources.indexOf(resource)}
                  isEditMode={isEditMode}
                  onEdit={() => handleEditResource(resources.indexOf(resource))}
                  onCancelEdit={handleCancelEdit}
                  onUpdate={() => handleUpdateResource(resources.indexOf(resource))}
                  onDelete={() => handleDeleteResource(resources.indexOf(resource))}
                  onChange={(field, value) => handleFieldChange(resources.indexOf(resource), field, value)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="games">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.filter(r => r.resourceType === 'game').map((resource, index) => (
                <ResourceItem
                  key={index}
                  resource={resource}
                  index={resources.indexOf(resource)}
                  isEditing={editingResource === resources.indexOf(resource)}
                  isEditMode={isEditMode}
                  onEdit={() => handleEditResource(resources.indexOf(resource))}
                  onCancelEdit={handleCancelEdit}
                  onUpdate={() => handleUpdateResource(resources.indexOf(resource))}
                  onDelete={() => handleDeleteResource(resources.indexOf(resource))}
                  onChange={(field, value) => handleFieldChange(resources.indexOf(resource), field, value)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pdf">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.filter(r => r.resourceType === 'pdf').map((resource, index) => (
                <ResourceItem
                  key={index}
                  resource={resource}
                  index={resources.indexOf(resource)}
                  isEditing={editingResource === resources.indexOf(resource)}
                  isEditMode={isEditMode}
                  onEdit={() => handleEditResource(resources.indexOf(resource))}
                  onCancelEdit={handleCancelEdit}
                  onUpdate={() => handleUpdateResource(resources.indexOf(resource))}
                  onDelete={() => handleDeleteResource(resources.indexOf(resource))}
                  onChange={(field, value) => handleFieldChange(resources.indexOf(resource), field, value)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.filter(r => r.resourceType === 'activity').map((resource, index) => (
                <ResourceItem
                  key={index}
                  resource={resource}
                  index={resources.indexOf(resource)}
                  isEditing={editingResource === resources.indexOf(resource)}
                  isEditMode={isEditMode}
                  onEdit={() => handleEditResource(resources.indexOf(resource))}
                  onCancelEdit={handleCancelEdit}
                  onUpdate={() => handleUpdateResource(resources.indexOf(resource))}
                  onDelete={() => handleDeleteResource(resources.indexOf(resource))}
                  onChange={(field, value) => handleFieldChange(resources.indexOf(resource), field, value)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

interface ResourceItemProps {
  resource: TeacherResource;
  index: number;
  isEditing: boolean;
  isEditMode: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  onChange: (field: string, value: string) => void;
}

const ResourceItem: React.FC<ResourceItemProps> = ({
  resource,
  index,
  isEditing,
  isEditMode,
  onEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
  onChange
}) => {
  // Render icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'game':
        return <Gamepad2 className="h-5 w-5" />;
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      case 'activity':
        return <FileText className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="resource-item border rounded-lg p-4 bg-white">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="mr-2 text-primary">
            {getResourceIcon(resource.resourceType)}
          </div>
          {isEditing ? (
            <Input 
              value={resource.title}
              onChange={(e) => onChange('title', e.target.value)}
              className="font-medium"
            />
          ) : (
            <h3 className="font-medium">{resource.title}</h3>
          )}
        </div>
        
        {isEditMode && (
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button size="sm" variant="outline" onClick={onCancelEdit}>
                  <X className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="default" onClick={onUpdate}>
                  <Save className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline" onClick={onEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={onDelete}>
                  <Trash className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      
      <Separator className="my-2" />
      
      {isEditing ? (
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Resource Type</label>
            <select 
              value={resource.resourceType}
              onChange={(e) => onChange('resourceType', e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="video">Video</option>
              <option value="game">Game</option>
              <option value="activity">Activity</option>
              <option value="pdf">PDF</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Provider</label>
            <Input 
              value={resource.provider || ''}
              onChange={(e) => onChange('provider', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Embed Code / HTML</label>
            <textarea 
              rows={5}
              className="w-full border rounded p-2"
              value={resource.embedCode}
              onChange={(e) => onChange('embedCode', e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="media-wrapper">
          <div 
            className="media-embed"
            dangerouslySetInnerHTML={{ __html: resource.embedCode }}
          />
        </div>
      )}
    </div>
  );
};

export default TeacherResources;