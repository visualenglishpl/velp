import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Trash, Plus, Edit, Save, X, Upload, Video, Gamepad2, BookOpen, Link, ExternalLink, FileText, Download } from 'lucide-react';
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
      const response = await apiRequest('POST', `/api/direct/${bookId}/${unitId}/resources`, {
        resources: resourcesToSave
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log(`Successfully saved ${resourcesToSave.length} resources to server for ${bookId}/${unitId}`);
      } else {
        console.error('Failed to save resources to server:', data.error);
      }
    } catch (error) {
      console.error('Error saving resources to server:', error);
    }
  };

  // Load resources from server with localStorage fallback
  useEffect(() => {
    if (bookId && unitId) {
      // First try to fetch from server
      const fetchResources = async () => {
        try {
          const response = await apiRequest('GET', `/api/direct/${bookId}/${unitId}/resources`);
          const data = await response.json();
          
          if (data.success && Array.isArray(data.resources) && data.resources.length > 0) {
            console.log(`Loaded ${data.resources.length} resources from server for ${bookId}/${unitId}`);
            setResources(data.resources);
          } else {
            // Fallback to localStorage if server has no resources
            const savedResources = localStorage.getItem(`resources-${bookId}-${unitId}`);
            if (savedResources) {
              try {
                const parsed = JSON.parse(savedResources);
                if (Array.isArray(parsed)) {
                  console.log(`Loaded ${parsed.length} resources from localStorage for ${bookId}/${unitId}`);
                  setResources(parsed);
                  
                  // Save to server for future use
                  saveResourcesToServer(parsed);
                }
              } catch (error) {
                console.error('Error parsing saved resources:', error);
              }
            }
          }
        } catch (error) {
          console.error('Error fetching resources from server:', error);
          
          // Fallback to localStorage on error
          const savedResources = localStorage.getItem(`resources-${bookId}-${unitId}`);
          if (savedResources) {
            try {
              const parsed = JSON.parse(savedResources);
              if (Array.isArray(parsed)) {
                console.log(`Loaded ${parsed.length} resources from localStorage (server error) for ${bookId}/${unitId}`);
                setResources(parsed);
              }
            } catch (error) {
              console.error('Error parsing saved resources:', error);
            }
          }
        }
      };
      
      // Fetch resources immediately when component mounts or bookId/unitId changes
      fetchResources();
      
      // Set up an interval to refresh resources from server every 5 seconds
      // This ensures synchronization between admin and teacher pages
      const intervalId = setInterval(fetchResources, 5000);
      
      // Clean up interval on unmount or when bookId/unitId changes
      return () => clearInterval(intervalId);
    }
  }, [bookId, unitId]);
  
  // Add pre-defined resources for Book 1, Unit 1, Book 1, Unit 2, Book 1, Unit 10, and Book 0b, Unit 1
  useEffect(() => {
    if (resources.length === 0 && bookId && unitId) {
      let predefinedResources: TeacherResource[] = [];
      
      // Book 1, Unit 2 resources (School Objects)
      if (bookId === "1" && unitId === "2") {
        predefinedResources = [
          // PDF Resource
          {
            bookId: "1",
            unitId: "2",
            title: "Visual English Book 1 - Unit 2 - Lesson PDF",
            resourceType: "pdf",
            embedCode: `<div style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
              <h3 style="margin-bottom: 15px; color: #2563eb;">Unit 2 - Complete Lesson PDF</h3>
              <p style="margin-bottom: 20px;">This PDF contains the complete lesson materials for Unit 2 - School Objects</p>
              <a href="https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit2/00%20A%20Visual%20English%201%20%E2%80%93%20Unit%202%20%E2%80%93%20New%20Version.pdf" 
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
          },
          // Lesson Plan
          {
            bookId: "1",
            unitId: "2",
            title: "Unit 2 - School Objects Lesson Plan (2 x 45min)",
            resourceType: "activity",
            embedCode: `<div style="padding: 20px; background-color: white; border-radius: 8px; border: 1px solid #e2e8f0;">
              <h2 style="font-size: 1.5rem; color: #2563eb; margin-bottom: 1rem; text-align: center;">Comprehensive Lesson Plan: Unit 2 - School Objects (2 x 45min)</h2>
              
              <div style="margin-bottom: 1.5rem; background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <h3 style="font-size: 1.3rem; color: #1e40af; margin-bottom: 0.5rem;">Lesson Overview</h3>
                <p>This comprehensive plan covers two 45-minute lessons focusing on the key vocabulary and expressions related to school objects.</p>
              </div>
              
              <!-- Two-column layout for learning objectives and materials -->
              <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 1.5rem;">
                <div style="flex: 1; min-width: 300px;">
                  <h3 style="font-size: 1.2rem; color: #4b5563; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Learning Objectives</h3>
                  <ul style="list-style-type: disc; padding-left: 1.5rem;">
                    <li>Identify and name common school objects (pen, pencil, crayon, book, etc.)</li>
                    <li>Ask and answer questions about school objects using "What is it?" and "What are they?"</li>
                    <li>Describe school objects by color, size, and attributes</li>
                    <li>Express possession of school objects using "Do you have...?"</li>
                    <li>Differentiate between singular and plural forms of school objects</li>
                    <li>Express preferences (e.g., "Do you prefer a pencil or a pen?")</li>
                  </ul>
                </div>
                
                <div style="flex: 1; min-width: 300px;">
                  <h3 style="font-size: 1.2rem; color: #4b5563; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Required Materials</h3>
                  <ul style="list-style-type: disc; padding-left: 1.5rem;">
                    <li>Visual English Book 1, Unit 2 slides</li>
                    <li>Actual school objects (pens, pencils, crayons, erasers, etc.)</li>
                    <li>Flashcards of school objects</li>
                    <li>School bag or pencil case for demonstration</li>
                    <li>Worksheets for guided practice</li>
                    <li>Colored pencils and markers</li>
                    <li>Mini-whiteboards or scrap paper for quick activities</li>
                  </ul>
                </div>
              </div>
              
              <!-- Two-column layout for lesson plans -->
              <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 1.5rem;">
                <!-- Lesson 1 -->
                <div style="flex: 1; min-width: 300px; background-color: #f0f9ff; padding: 16px; border-radius: 8px;">
                  <h3 style="font-size: 1.3rem; color: #0369a1; margin-bottom: 1rem; text-align: center;">Lesson 1: School Objects Vocabulary (45 minutes)</h3>
                  
                  <div style="margin-bottom: 1rem;">
                    <h4 style="font-size: 1.1rem; color: #0ea5e9; margin-bottom: 0.5rem;">Warm-up (5 minutes)</h4>
                    <p>Start by showing your own school bag and taking out different school objects one by one. Ask students what each object is, encouraging them to respond with "It's a/an..." as you model the question "What is it?"</p>
                  </div>
                  
                  <div style="margin-bottom: 1rem;">
                    <h4 style="font-size: 1.1rem; color: #0ea5e9; margin-bottom: 0.5rem;">Presentation (15 minutes)</h4>
                    <ul style="list-style-type: disc; padding-left: 1.5rem;">
                      <li>Show slides 1-15 introducing the key vocabulary (pen, pencil, eraser, etc.)</li>
                      <li>Model pronunciation and have students repeat each term</li>
                      <li>Demonstrate the question-answer pattern "What is it?" / "It's a/an..."</li>
                      <li>Introduce plural forms with "What are they?" / "They are..."</li>
                      <li>Show actual objects alongside the images for better retention</li>
                    </ul>
                  </div>
                  
                  <div style="margin-bottom: 1rem;">
                    <h4 style="font-size: 1.1rem; color: #0ea5e9; margin-bottom: 0.5rem;">Practice (15 minutes)</h4>
                    <ul style="list-style-type: disc; padding-left: 1.5rem;">
                      <li>Pass around actual school objects and have students identify them</li>
                      <li>Play "What's in my bag?" where you slowly reveal items</li>
                      <li>Pair work: Students take turns asking "What is it?" about flashcards</li>
                      <li>Group items together and practice plurals with "What are they?"</li>
                      <li>Practice with colors: "What color is the pencil?" "It's red."</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 style="font-size: 1.1rem; color: #0ea5e9; margin-bottom: 0.5rem;">Production & Assessment (10 minutes)</h4>
                    <ul style="list-style-type: disc; padding-left: 1.5rem;">
                      <li>Students draw their own school bag contents and label items</li>
                      <li>Mini show-and-tell: Students present 3-4 school objects they have</li>
                      <li>Quick quiz: Show objects and have students write names</li>
                      <li>Exit ticket: Each student names 3 school objects they learned</li>
                    </ul>
                  </div>
                </div>
                
                <!-- Lesson 2 -->
                <div style="flex: 1; min-width: 300px; background-color: #f0fdf4; padding: 16px; border-radius: 8px;">
                  <h3 style="font-size: 1.3rem; color: #166534; margin-bottom: 1rem; text-align: center;">Lesson 2: School Objects Usage (45 minutes)</h3>
                  
                  <div style="margin-bottom: 1rem;">
                    <h4 style="font-size: 1.1rem; color: #16a34a; margin-bottom: 0.5rem;">Review & Warm-up (8 minutes)</h4>
                    <ul style="list-style-type: disc; padding-left: 1.5rem;">
                      <li>Play the "School Objects" video and have students point to objects they recognize</li>
                      <li>Quick review game: Teacher shows objects and students call out names</li>
                      <li>Flashcard race: Students race to identify objects correctly</li>
                    </ul>
                  </div>
                  
                  <div style="margin-bottom: 1rem;">
                    <h4 style="font-size: 1.1rem; color: #16a34a; margin-bottom: 0.5rem;">New Patterns (12 minutes)</h4>
                    <ul style="list-style-type: disc; padding-left: 1.5rem;">
                      <li>Introduce the question: "Do you have a/an...?" with "Yes, I do" / "No, I don't"</li>
                      <li>Model asking about different school objects</li>
                      <li>Introduce preference questions: "Do you prefer a pencil or a pen?"</li>
                      <li>Demonstrate descriptions: "It's a blue notebook" / "It's a big eraser"</li>
                    </ul>
                  </div>
                  
                  <div style="margin-bottom: 1rem;">
                    <h4 style="font-size: 1.1rem; color: #16a34a; margin-bottom: 0.5rem;">Interactive Activities (15 minutes)</h4>
                    <ul style="list-style-type: disc; padding-left: 1.5rem;">
                      <li>Survey activity: Students ask 5 classmates "Do you have a...?" and record answers</li>
                      <li>"Find someone who" activity with school objects</li>
                      <li>School object preference interview: "Do you prefer...or...?"</li>
                      <li>Describe and draw: Students describe an object for partner to draw</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 style="font-size: 1.1rem; color: #16a34a; margin-bottom: 0.5rem;">Games & Assessment (10 minutes)</h4>
                    <ul style="list-style-type: disc; padding-left: 1.5rem;">
                      <li>Play the Wordwall games in pairs or small groups</li>
                      <li>"What's missing?" game with school objects</li>
                      <li>Brief assessment worksheet with matching and fill-in-the-blank</li>
                      <li>Preview of next lesson's content</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <!-- Extension Activities Section -->
              <div style="background-color: #fffbeb; padding: 16px; border-radius: 8px; margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.3rem; color: #92400e; margin-bottom: 1rem; text-align: center;">Extension Activities & Differentiation</h3>
                
                <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                  <div style="flex: 1; min-width: 300px;">
                    <h4 style="font-size: 1.1rem; color: #b45309; margin-bottom: 0.5rem;">For Advanced Students</h4>
                    <ul style="list-style-type: disc; padding-left: 1.5rem;">
                      <li>Create a school supply shopping dialogue</li>
                      <li>Write descriptions of school objects using multiple adjectives</li>
                      <li>Create a classroom scavenger hunt with clues</li>
                      <li>Make a poster about school supplies in different countries</li>
                    </ul>
                  </div>
                  
                  <div style="flex: 1; min-width: 300px;">
                    <h4 style="font-size: 1.1rem; color: #b45309; margin-bottom: 0.5rem;">For Students Needing Support</h4>
                    <ul style="list-style-type: disc; padding-left: 1.5rem;">
                      <li>Focus on just 5-6 key school objects</li>
                      <li>Use picture cards with words underneath</li>
                      <li>Simplify questions to yes/no format</li>
                      <li>Provide sentence frames for responses</li>
                      <li>Work with a language buddy</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <!-- Homework and Follow-up -->
              <div style="background-color: #f5f5f4; padding: 16px; border-radius: 8px;">
                <h3 style="font-size: 1.3rem; color: #44403c; margin-bottom: 1rem; text-align: center;">Homework & Follow-up</h3>
                
                <ul style="list-style-type: disc; padding-left: 1.5rem;">
                  <li>Create a picture dictionary of school objects with at least 10 items</li>
                  <li>Find and label school objects in magazines or catalogs</li>
                  <li>Complete a worksheet with "Do you have a...?" questions</li>
                  <li>Watch the recommended YouTube videos for further practice</li>
                  <li>Play the Wordwall games at home for reinforcement</li>
                </ul>
                
                <p style="margin-top: 1rem;"><strong>Follow-up:</strong> In the next lesson, we will build on these vocabulary items by introducing more complex structures and incorporating them into role-plays about school life.</p>
              </div>
            </div>`,
            order: 1,
            provider: "Visual English"
          },
          // Videos
          {
            bookId: "1",
            unitId: "2",
            title: "School Objects - ENGLISH TREE",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/41cJ0mqWses?si=JlxMgV_GADKfiUFf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 2,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "2",
            title: "Magic Crayons - WATTS ENGLISH",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Ix4dSjKqwvc?si=eK9P-OvHUpAP2T49" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 3,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "2",
            title: "PPAP Pen Pineapple Apple Pen (Long Version) - PIKOTARO",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Ct6BUPvE2sM?si=-OWJf3xPmmeHVw_b" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 4,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "2",
            title: "PenPineappleApplePen Song - PPAP",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/t24dt39WNG0?si=DkWmQWqsVIBtV_sQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 5,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "2",
            title: "Back to School Mix - WATTS ENGLISH",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/F9OdB53UGmA?si=dli3ESO3Q-28sZ3q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 6,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "2",
            title: "What is In Your Bag Song - DREAM ENGLISH",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/JLMsm-D7kjk?si=hbbam_l55tiPpX5F" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 7,
            provider: "YouTube"
          },
          // Games
          {
            bookId: "1",
            unitId: "2",
            title: "School Objects Game 1 - WORDWALL",
            resourceType: "game",
            embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/db3feb02d90048c794504e2a408ef901?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
            order: 8,
            provider: "Wordwall"
          },
          {
            bookId: "1",
            unitId: "2",
            title: "School Objects Game 2 - WORDWALL",
            resourceType: "game",
            embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/5282ddaa503a4c5e9875ee2426934081?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
            order: 9,
            provider: "Wordwall"
          },
          {
            bookId: "1",
            unitId: "2",
            title: "School Objects Game 3 - WORDWALL",
            resourceType: "game",
            embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/5ce51d4acf1e41058c70f1b6d1951f8a?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
            order: 10,
            provider: "Wordwall"
          }
        ];
        setResources(predefinedResources);
        saveResourcesToServer(predefinedResources);
      }
      
      // Book 0b, Unit 1 resources
      if (bookId === "0b" && unitId === "1") {
        predefinedResources = [
          {
            bookId: "0b",
            unitId: "1",
            title: "Good Morning, Good Night - LITTLE FOX",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/7CuZr1Dz3sk?si=xjDrz_iryoabkZjn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 0,
            provider: "YouTube"
          }
        ];
        setResources(predefinedResources);
      }
      // Book 1, Unit 10 resources
      else if (bookId === "1" && unitId === "10") {
        predefinedResources = [
          // PDF Resource
          {
            bookId: "1",
            unitId: "10",
            title: "Visual English Book 1 - Unit 10 - Lesson PDF",
            resourceType: "pdf",
            embedCode: `<div style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
              <h3 style="margin-bottom: 15px; color: #2563eb;">Unit 10 - Complete Lesson PDF</h3>
              <p style="margin-bottom: 20px;">This PDF contains the complete lesson materials for Unit 10</p>
              <a href="https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book1/unit10/00%20A%20Visual%20English%201%20%E2%80%93%20Unit%2010%20%E2%80%93%20New%20Version.pdf" 
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
          },
          // Lesson Plan
          {
            bookId: "1",
            unitId: "10",
            title: "Unit 10 - Comprehensive Lesson Plan (2 x 45min)",
            resourceType: "activity",
            embedCode: `<div style="padding: 20px; background-color: white; border-radius: 8px; border: 1px solid #e2e8f0;">
              <h2 style="font-size: 1.5rem; color: #2563eb; margin-bottom: 1rem; text-align: center;">Comprehensive Lesson Plan: Unit 10 (2 x 45min)</h2>
              
              <div style="margin-bottom: 1.5rem; background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <h3 style="font-size: 1.3rem; color: #1e40af; margin-bottom: 0.5rem;">Lesson Overview</h3>
                <p>This comprehensive plan covers two 45-minute lessons focusing on the key vocabulary and expressions from Unit 10.</p>
              </div>
              
              <!-- Two-column layout for learning objectives and materials -->
              <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 1.5rem;">
                <div style="flex: 1; min-width: 300px;">
                  <h3 style="font-size: 1.2rem; color: #4b5563; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Learning Objectives</h3>
                  <ul style="list-style-type: disc; padding-left: 1.5rem;">
                    <li>Students will identify and use key vocabulary from Unit 10</li>
                    <li>Students will practice question and answer patterns from the unit</li>
                    <li>Students will demonstrate understanding through role-play and interactive activities</li>
                    <li>Students will be able to create their own dialogues using target language</li>
                  </ul>
                </div>
                
                <div style="flex: 1; min-width: 300px;">
                  <h3 style="font-size: 1.2rem; color: #4b5563; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Required Materials</h3>
                  <ul style="list-style-type: disc; padding-left: 1.5rem;">
                    <li>Visual English Book 1 - Unit 10 slides</li>
                    <li>Unit 10 vocabulary flashcards</li>
                    <li>Role-play situation cards</li>
                    <li>Craft materials: colored paper, markers, scissors, glue</li>
                    <li>Printed worksheets for guided practice</li>
                    <li>Audio/video resources for the unit theme</li>
                  </ul>
                </div>
              </div>
              
              <!-- Two-column layout for lesson plans -->
              <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 1.5rem;">
                <!-- Lesson 1 -->
                <div style="flex: 1; min-width: 300px; background-color: #f0f9ff; padding: 16px; border-radius: 8px;">
                  <h3 style="font-size: 1.3rem; color: #0369a1; margin-bottom: 1rem; text-align: center;">Lesson 1: Vocabulary Introduction (45 minutes)</h3>
                  
                  <div style="margin-bottom: 1rem;">
                    <h4 style="font-size: 1.1rem; color: #0ea5e9; margin-bottom: 0.5rem;">Warm-up (5 minutes)</h4>
                    <p>Begin with a quick review of previously learned vocabulary. Show pictures related to Unit 10 and ask students to guess what they will learn today.</p>
                  </div>
                  
                  <div style="margin-bottom: 1rem;">
                    <h4 style="font-size: 1.1rem; color: #0ea5e9; margin-bottom: 0.5rem;">Presentation (15 minutes)</h4>
                    <ul style="list-style-type: disc; padding-left: 1.5rem;">
                      <li>Show slides 1-10 introducing the key vocabulary</li>
                      <li>Model pronunciation and have students repeat each term</li>
                      <li>Demonstrate simple question and answer patterns</li>
                      <li>Use visual aids to reinforce understanding</li>
                    </ul>
                  </div>
                  
                  <div style="margin-bottom: 1rem;">
                    <h4 style="font-size: 1.1rem; color: #0ea5e9; margin-bottom: 0.5rem;">Practice (15 minutes)</h4>
                    <ul style="list-style-type: disc; padding-left: 1.5rem;">
                      <li>Guided practice with flashcards - show images and elicit vocabulary</li>
                      <li>Pair activity: Students practice Q&A patterns with partners</li>
                      <li>Chain activity: Each student adds a new word from the unit</li>
                      <li>Matching game: Connect questions with appropriate answers</li>
                    </ul>
                  </div>
                  
                  <div style="margin-bottom: 1rem;">
                    <h4 style="font-size: 1.1rem; color: #0ea5e9; margin-bottom: 0.5rem;">Production (5 minutes)</h4>
                    <p>Students create simple dialogues using the vocabulary and patterns learned in class.</p>
                  </div>
                  
                  <div>
                    <h4 style="font-size: 1.1rem; color: #0ea5e9; margin-bottom: 0.5rem;">Wrap-up & Assessment (5 minutes)</h4>
                    <p>Quick review of vocabulary learned. Exit ticket: Each student must correctly use one new word or phrase before leaving.</p>
                  </div>
                </div>
                
                <!-- Lesson 2 -->
                <div style="flex: 1; min-width: 300px; background-color: #fff7ed; padding: 16px; border-radius: 8px;">
                  <h3 style="font-size: 1.3rem; color: #9a3412; margin-bottom: 1rem; text-align: center;">Lesson 2: Application & Practice (45 minutes)</h3>
                  
                  <div style="margin-bottom: 1rem;">
                    <h4 style="font-size: 1.1rem; color: #ea580c; margin-bottom: 0.5rem;">Warm-up & Review (8 minutes)</h4>
                    <ul style="list-style-type: disc; padding-left: 1.5rem;">
                      <li>Vocabulary recall game: Teacher shows images from Unit 10</li>
                      <li>Students race to identify and use vocabulary in sentences</li>
                    </ul>
                  </div>
                  
                  <div style="margin-bottom: 1rem;">
                    <h4 style="font-size: 1.1rem; color: #ea580c; margin-bottom: 0.5rem;">Extended Practice (20 minutes)</h4>
                    <ul style="list-style-type: disc; padding-left: 1.5rem;">
                      <li>Group activity: Students rotate through 3 stations with different practice activities</li>
                      <li>Station 1: Complete written worksheets with Unit 10 vocabulary</li>
                      <li>Station 2: Role-play dialogues using question and answer patterns</li>
                      <li>Station 3: Create visual vocabulary cards for classroom display</li>
                    </ul>
                  </div>
                  
                  <div style="margin-bottom: 1rem;">
                    <h4 style="font-size: 1.1rem; color: #ea580c; margin-bottom: 0.5rem;">Creative Application (12 minutes)</h4>
                    <p>Students work in small groups to create a short skit or story incorporating at least 5 vocabulary items from Unit 10. Groups perform their skits for the class.</p>
                  </div>
                  
                  <div>
                    <h4 style="font-size: 1.1rem; color: #ea580c; margin-bottom: 0.5rem;">Assessment & Closure (5 minutes)</h4>
                    <ul style="list-style-type: disc; padding-left: 1.5rem;">
                      <li>Conduct a quick quiz using the Unit 10 question patterns</li>
                      <li>Review any challenging vocabulary or expressions</li>
                      <li>Assign homework: Students complete a take-home worksheet to reinforce learning</li>
                      <li>Preview upcoming content for the next lesson</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 1rem;">
                <h3 style="font-size: 1.2rem; color: #475569; margin-bottom: 0.5rem;">Teacher Notes</h3>
                <ul style="list-style-type: disc; padding-left: 1.5rem;">
                  <li>Adjust the pace based on student comprehension and engagement</li>
                  <li>For mixed-ability classes, prepare additional challenge activities for advanced students</li>
                  <li>The Visual English Book 1 - Unit 10 PDF contains additional exercises that can be incorporated</li>
                  <li>Consider using online games and videos as supplementary materials</li>
                  <li>Take photos of student work for portfolio assessment</li>
                </ul>
              </div>
            </div>`,
            order: 1,
            provider: "Visual English"
          }
        ];
        setResources(predefinedResources);
      }

      // Book 1, Unit 1 resources
      else if (bookId === "1" && unitId === "1") {
        predefinedResources = [
          // Videos
          {
            bookId: "1",
            unitId: "1",
            title: "Good Morning - PINKFONG",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/7CuZr1Dz3sk?si=8rsR-SrYgJ8GhGSf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 0,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "1",
            title: "Good Morning, Good Night - LITTLE FOX",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/mebfKDQ4dLo?si=YT-l31BE-4hvjN8m" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 1,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "1",
            title: "The Greetings Song - MAPLE LEAF",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/gVIFEVLzP4o?si=7yhM78fH9pFHwlgD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 2,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "1",
            title: "Hello! - Super Simple Songs",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/tVlcKp3bWH8?si=Z_LsC0kU3mC3KZDA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 3,
            provider: "YouTube"
          },
          // Games
          {
            bookId: "1",
            unitId: "1",
            title: "Greetings Game - Wordwall",
            resourceType: "game",
            embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/7a5f9c9d02764745b1b471a56483ddf2?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
            order: 4,
            provider: "Wordwall"
          },
          {
            bookId: "1",
            unitId: "1",
            title: "Times of the Day Game - Wordwall",
            resourceType: "game",
            embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/aa9083a0802940d7abd8dfbb0ea2113d?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
            order: 5,
            provider: "Wordwall"
          },
          {
            bookId: "1",
            unitId: "1",
            title: "Greetings Match-Up - Wordwall",
            resourceType: "game",
            embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/7a5f9c9d02764745b1b471a56483ddf2?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
            order: 6,
            provider: "Wordwall"
          },
          // Lesson Plans
          {
            bookId: "1",
            unitId: "1",
            title: "Lesson Plan - Greetings and Times of Day (2 x 45min)",
            resourceType: "activity",
            embedCode: `<div style="padding: 20px; background-color: white; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h2 style="font-size: 1.5rem; color: #2563eb; margin-bottom: 1rem; text-align: center;">Comprehensive Lesson Plan: Greetings and Times of Day (2 x 45min)</h2>
            
            <div style="margin-bottom: 1.5rem; background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <h3 style="font-size: 1.3rem; color: #1e40af; margin-bottom: 0.5rem;">Lesson Overview</h3>
              <p>This comprehensive plan covers two 45-minute lessons focusing on greetings and times of day vocabulary and expressions.</p>
            </div>
            
            <!-- Two-column layout for learning objectives and materials -->
            <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 1.5rem;">
              <div style="flex: 1; min-width: 300px;">
                <h3 style="font-size: 1.2rem; color: #4b5563; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Learning Objectives</h3>
                <ul style="list-style-type: disc; padding-left: 1.5rem;">
                  <li>Students will identify and use greetings appropriate for different times of day</li>
                  <li>Students will practice time-related vocabulary (morning, afternoon, evening, night)</li>
                  <li>Students will demonstrate understanding through role-play and interactive activities</li>
                  <li>Students will create their own greeting dialogues for different scenarios</li>
                </ul>
              </div>
              
              <div style="flex: 1; min-width: 300px;">
                <h3 style="font-size: 1.2rem; color: #4b5563; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Required Materials</h3>
                <ul style="list-style-type: disc; padding-left: 1.5rem;">
                  <li>Visual English Book 1 - Unit 1 slides (Greetings section)</li>
                  <li>Time of day flashcards with images showing different times</li>
                  <li>Role-play situation cards (different times and settings)</li>
                  <li>Craft materials: colored paper, markers, scissors, glue</li>
                  <li>Clock face templates</li>
                  <li>Printed greetings for a matching activity</li>
                </ul>
              </div>
            </div>
            
            <!-- Two-column layout for lesson plans -->
            <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 1.5rem;">
              <!-- Lesson 1 -->
              <div style="flex: 1; min-width: 300px; background-color: #f0f9ff; padding: 16px; border-radius: 8px;">
                <h3 style="font-size: 1.3rem; color: #0369a1; margin-bottom: 1rem; text-align: center;">Lesson 1: Greetings Basics (45 minutes)</h3>
                
                <div style="margin-bottom: 1rem;">
                  <h4 style="font-size: 1.1rem; color: #0ea5e9; margin-bottom: 0.5rem;">Warm-up (5 minutes)</h4>
                  <p>Greet students as they enter with various greetings based on the current time. Have students respond with an appropriate greeting. Ask students what time of day it is and which greetings are appropriate now.</p>
                </div>
                
                <div style="margin-bottom: 1rem;">
                  <h4 style="font-size: 1.1rem; color: #0ea5e9; margin-bottom: 0.5rem;">Presentation (15 minutes)</h4>
                  <ul style="list-style-type: disc; padding-left: 1.5rem;">
                    <li>Show slides 1-10 with different greetings and times of day</li>
                    <li>Model pronunciation and have students repeat each greeting</li>
                    <li>Demonstrate greeting dialogues with a student volunteer</li>
                    <li>Explain when each greeting is appropriate using visual time cues</li>
                  </ul>
                </div>
                
                <div style="margin-bottom: 1rem;">
                  <h4 style="font-size: 1.1rem; color: #0ea5e9; margin-bottom: 0.5rem;">Practice (15 minutes)</h4>
                  <ul style="list-style-type: disc; padding-left: 1.5rem;">
                    <li>Show time flashcards and have students call out appropriate greetings</li>
                    <li>Pair activity: Students practice greetings dialogues with partners</li>
                    <li>Matching game: Match greetings to appropriate times of day</li>
                    <li>Chain greeting: Students form a circle and greet the next person with a different greeting</li>
                  </ul>
                </div>
                
                <div style="margin-bottom: 1rem;">
                  <h4 style="font-size: 1.1rem; color: #0ea5e9; margin-bottom: 0.5rem;">Production (10 minutes)</h4>
                  <p>Role-play activity: Students work in pairs with time scenario cards. Each pair creates and performs a short greeting dialogue appropriate for their assigned time of day.</p>
                </div>
                
                <div>
                  <h4 style="font-size: 1.1rem; color: #0ea5e9; margin-bottom: 0.5rem;">Wrap-up & Assessment (5 minutes)</h4>
                  <p>Quick review of the greetings learned. Students complete a short self-assessment checklist about which greetings they feel confident using.</p>
                </div>
              </div>
              
              <!-- Lesson 2 -->
              <div style="flex: 1; min-width: 300px; background-color: #fff7ed; padding: 16px; border-radius: 8px;">
                <h3 style="font-size: 1.3rem; color: #9a3412; margin-bottom: 1rem; text-align: center;">Lesson 2: Creative Applications (45 minutes)</h3>
                
                <div style="margin-bottom: 1rem;">
                  <h4 style="font-size: 1.1rem; color: #ea580c; margin-bottom: 0.5rem;">Warm-up & Review (8 minutes)</h4>
                  <ul style="list-style-type: disc; padding-left: 1.5rem;">
                    <li>Greeting song: Play the "Good Morning" video and have students sing along</li>
                    <li>Quick review game: Teacher shows times on a clock, students say the appropriate greeting</li>
                  </ul>
                </div>
                
                <div style="margin-bottom: 1rem;">
                  <h4 style="font-size: 1.1rem; color: #ea580c; margin-bottom: 0.5rem;">Creative Craft Activity (15 minutes)</h4>
                  <p><strong>Time-of-Day Greeting Wheels:</strong> Students create interactive wheels with different times of day and matching greetings:</p>
                  <ol style="list-style-type: decimal; padding-left: 1.5rem;">
                    <li>Give each student two circles of cardboard/paper</li>
                    <li>On the bottom circle, students draw/write the four times of day</li>
                    <li>On the top circle (with a section cut out), students write matching greetings</li>
                    <li>Connect the circles with a paper fastener so the top wheel rotates</li>
                    <li>Students can decorate their wheels with appropriate time symbols</li>
                  </ol>
                </div>
                
                <div style="margin-bottom: 1rem;">
                  <h4 style="font-size: 1.1rem; color: #ea580c; margin-bottom: 0.5rem;">Interactive Game (12 minutes)</h4>
                  <p><strong>Greeting Detectives:</strong> A fun movement activity to practice greetings:</p>
                  <ul style="list-style-type: disc; padding-left: 1.5rem;">
                    <li>Students move around the classroom</li>
                    <li>Teacher calls out a time of day</li>
                    <li>Students must find a partner and exchange appropriate greetings</li>
                    <li>Students who use incorrect greetings sit down</li>
                    <li>Last students standing are the "Greeting Detectives"</li>
                  </ul>
                </div>
                
                <div>
                  <h4 style="font-size: 1.1rem; color: #ea580c; margin-bottom: 0.5rem;">Digital Extension & Closing (10 minutes)</h4>
                  <ul style="list-style-type: disc; padding-left: 1.5rem;">
                    <li>Play the Wordwall Greetings game as a class competition</li>
                    <li>Students take turns answering questions</li>
                    <li>Award small prizes for correct answers</li>
                    <li>Final review of all greetings and when to use them</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Two-column layout for additional ideas and assessment -->
            <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 1.5rem;">
              <div style="flex: 1; min-width: 300px;">
                <h3 style="font-size: 1.2rem; color: #4b5563; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Additional Games & Craft Ideas</h3>
                <ul style="list-style-type: disc; padding-left: 1.5rem;">
                  <li><strong>Greeting Bingo:</strong> Create bingo cards with different greetings. Teacher shows a time of day, students mark the appropriate greeting.</li>
                  <li><strong>Greeting Posters:</strong> Students create illustrated posters showing different greetings and when to use them.</li>
                  <li><strong>Time Puppets:</strong> Create sun/moon puppets that students hold up while practicing appropriate greetings.</li>
                  <li><strong>Greeting Charades:</strong> Students act out times of day while others guess the appropriate greeting.</li>
                  <li><strong>Digital Greeting Cards:</strong> Older students can create digital greeting cards with appropriate time-based greetings.</li>
                </ul>
              </div>
              
              <div style="flex: 1; min-width: 300px;">
                <h3 style="font-size: 1.2rem; color: #4b5563; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Assessment Strategies</h3>
                <ul style="list-style-type: disc; padding-left: 1.5rem;">
                  <li>Observation during pair and group activities</li>
                  <li>Greeting wheels completion and accuracy</li>
                  <li>Role-play performance using correct greetings</li>
                  <li>Exit tickets: Students write or circle correct greetings for given scenarios</li>
                  <li>Peer assessment during partner activities</li>
                </ul>
              </div>
            </div>
          </div>`,
            order: 7,
            provider: "Lesson Plan"
          }
        ];
        setResources(predefinedResources);
      }
    }
  }, [bookId, unitId, resources.length]);
  
  // Save resources to localStorage and server whenever they change
  useEffect(() => {
    if (bookId && unitId && resources.length > 0) {
      // Always save to localStorage as a backup
      localStorage.setItem(`resources-${bookId}-${unitId}`, JSON.stringify(resources));
      
      // Also save to server
      saveResourcesToServer(resources);
    }
  }, [resources, bookId, unitId]);

  const handleAddResource = () => {
    if (!newResource.title || !newResource.embedCode) {
      toast({
        title: 'Missing information',
        description: 'Please provide both a title and embed code for the resource.',
        variant: 'destructive'
      });
      return;
    }

    const resourceToAdd: TeacherResource = {
      ...newResource as TeacherResource,
      bookId: bookId || '',
      unitId: unitId || '',
      order: resources.length,
      resourceType: newResource.resourceType || 'video'
    };

    const updatedResources = [...resources, resourceToAdd];
    setResources(updatedResources);
    
    // Save to server if we have bookId and unitId
    if (bookId && unitId) {
      saveResourcesToServer(updatedResources);
      
      // Also update localStorage for fallback
      localStorage.setItem(`resources-${bookId}-${unitId}`, JSON.stringify(updatedResources));
    }
    
    setNewResource({
      resourceType: 'video',
      title: '',
      embedCode: '',
      provider: '',
      sourceUrl: ''
    });
    setIsAdding(false);

    toast({
      title: 'Resource added',
      description: 'The teaching resource has been added successfully.'
    });
  };

  const handleDeleteResource = (index: number, e?: React.MouseEvent) => {
    // Stop propagation to prevent triggering parent events if event is provided
    if (e) {
      e.stopPropagation();
    }
    
    const updatedResources = resources.filter((_, i) => i !== index);
    setResources(updatedResources);
    
    // If we have bookId and unitId, save to server
    if (bookId && unitId) {
      saveResourcesToServer(updatedResources);
    }
    
    toast({
      title: 'Resource deleted',
      description: 'The teaching resource has been removed.'
    });
  };

  const handleUpdateResource = (index: number) => {
    const updatedResources = [...resources];
    const editedResource = updatedResources[index];
    
    if (!editedResource.title || !editedResource.embedCode) {
      toast({
        title: 'Missing information',
        description: 'Please provide both a title and embed code for the resource.',
        variant: 'destructive'
      });
      return;
    }
    
    setResources(updatedResources);
    setEditingResource(null);
    
    // Save to server if we have bookId and unitId
    if (bookId && unitId) {
      saveResourcesToServer(updatedResources);
      
      // Also update localStorage for fallback
      localStorage.setItem(`resources-${bookId}-${unitId}`, JSON.stringify(updatedResources));
    }
    
    toast({
      title: 'Resource updated',
      description: 'The teaching resource has been updated successfully.'
    });
  };

  const getCategoryCount = (type: string) => {
    return resources.filter(r => r.resourceType === type).length;
  };
  
  if (!bookId || !unitId) {
    return null;
  }

  const videoResources = resources.filter(r => r.resourceType === 'video');
  const gameResources = resources.filter(r => r.resourceType === 'game');
  const activityResources = resources.filter(r => r.resourceType === 'activity');
  const pdfResources = resources.filter(r => r.resourceType === 'pdf');
  const otherResources = resources.filter(r => r.resourceType === 'other');
  
  // Add default PDF resource for Book 1, Unit 1 if not already present
  useEffect(() => {
    if (bookId === '1' && unitId === '1' && !pdfResources.length) {
      // Only add if we don't already have a PDF resource
      const pdfPath = encodeURIComponent("book1/unit1/00 A Visual English 1 – Unit 1 – New Version.pdf");
      const pdfResource: TeacherResource = {
        bookId: "1",
        unitId: "1",
        title: "Visual English 1 - Unit 1 - Lesson PDF",
        resourceType: "pdf",
        // Use a direct link to PDF instead of embedding to avoid Chrome security restrictions
        embedCode: `<div class="pdf-container flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl">
          <div class="w-20 h-20 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600 w-full h-full">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Visual English 1 - Unit 1 - Lesson PDF</h3>
          <p class="text-gray-600 mb-6 text-center">The PDF is ready to view, but must be opened in a separate window for better compatibility with all browsers.</p>
          <a 
            href="/api/direct/book1/unit1/file?path=${pdfPath}" 
            target="_blank" 
            class="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            View Lesson PDF
          </a>
        </div>`,
        order: resources.length,
        provider: "Visual English",
        sourceUrl: `/api/direct/book1/unit1/file?path=${pdfPath}`
      };
      
      setResources(prev => [...prev, pdfResource]);
    }
  }, [bookId, unitId, pdfResources.length, resources.length]);

  return (
    <div className="mt-8 border-t pt-6 pb-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4 px-4 flex items-center">
        <BookOpen className="w-6 h-6 mr-2 text-primary" />
        Teacher Resources
      </h2>
      
      {/* Show the Add Teacher Resource button for both admin and teacher users */}
      <div className="mb-6">
        {!isAdding ? (
          <Button 
            onClick={() => setIsAdding(true)}
            className="flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Teaching Resource
          </Button>
        ) : (
          <Card className="p-6 border-2 bg-gray-50">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              {(newResource.resourceType || 'video') === 'video' && <Video className="h-5 w-5 mr-2 text-red-500" />}
              {(newResource.resourceType || 'video') === 'game' && <Gamepad2 className="h-5 w-5 mr-2 text-blue-500" />}
              {(newResource.resourceType || 'video') === 'activity' && <BookOpen className="h-5 w-5 mr-2 text-amber-500" />}
              {(newResource.resourceType || 'video') === 'other' && <Link className="h-5 w-5 mr-2 text-gray-500" />}
              Add New {((newResource.resourceType || 'video').charAt(0).toUpperCase() + (newResource.resourceType || 'video').slice(1))} Resource
            </h3>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Resource Type</label>
                  <select 
                    value={newResource.resourceType || 'video'}
                    onChange={(e) => setNewResource(prev => ({ 
                      ...prev, 
                      resourceType: e.target.value as 'video' | 'game' | 'activity' | 'pdf' | 'other'
                    }))}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/30 focus:border-primary/70"
                  >
                    <option value="video">Video (YouTube, Vimeo, etc.)</option>
                    <option value="game">Game (Wordwall, etc.)</option>
                    <option value="activity">Activity (Lesson plans, exercises)</option>
                    <option value="pdf">Lesson PDF (Materials, handouts)</option>
                    <option value="other">Other Embedded Content</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Provider (Optional)</label>
                  <Input 
                    placeholder="e.g., YouTube, Wordwall, etc."
                    value={newResource.provider || ''}
                    onChange={(e) => setNewResource(prev => ({ ...prev, provider: e.target.value }))}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input 
                  placeholder="Resource title"
                  value={newResource.title || ''}
                  onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">External URL (Optional)</label>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="https://example.com/resource"
                    value={newResource.sourceUrl || ''}
                    onChange={(e) => setNewResource(prev => ({ ...prev, sourceUrl: e.target.value }))}
                    className="w-full"
                  />
                  {newResource.sourceUrl && (
                    <a 
                      href={newResource.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  {newResource.resourceType === 'activity' && "Lesson Plan Content"}
                  {newResource.resourceType === 'pdf' && "PDF Display Content"}
                  {(newResource.resourceType === 'video' || newResource.resourceType === 'game' || newResource.resourceType === 'other') && "Embed Code"}
                </label>
                <textarea 
                  placeholder={
                    newResource.resourceType === 'activity' 
                      ? 'Enter lesson plan content or HTML formatting...' 
                      : newResource.resourceType === 'pdf'
                        ? 'Enter PDF display information or embed code...'
                        : '<iframe src="..." width="..." height="..." frameborder="0" allowfullscreen></iframe>'
                  }
                  rows={newResource.resourceType === 'activity' ? 10 : 5}
                  className="w-full resize-y p-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary/70"
                  value={newResource.embedCode}
                  onChange={(e) => setNewResource(prev => ({ ...prev, embedCode: e.target.value }))}
                />
                {newResource.resourceType === 'activity' && (
                  <p className="text-xs text-gray-500 mt-1">
                    You can use HTML formatting to create a nicely structured lesson plan.
                  </p>
                )}
                {newResource.resourceType === 'pdf' && (
                  <p className="text-xs text-gray-500 mt-1">
                    For PDF files, provide the full path to the PDF in the S3 bucket (e.g., book1/unit1/sample.pdf).
                  </p>
                )}
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddResource}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Resource
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
      
      {resources.length > 0 ? (
        <Tabs defaultValue="video" className="px-4">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="video" className="flex items-center gap-1">
                <Video className="h-4 w-4 text-red-500" />
                <span>Videos</span>
                {getCategoryCount('video') > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                    {getCategoryCount('video')}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="game" className="flex items-center gap-1">
                <Gamepad2 className="h-4 w-4 text-blue-500" />
                <span>Games</span>
                {getCategoryCount('game') > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {getCategoryCount('game')}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-amber-500" />
                <span>Lessons</span>
                {getCategoryCount('activity') > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                    {getCategoryCount('activity')}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="pdf" className="flex items-center gap-1">
                <FileText className="h-4 w-4 text-green-500" />
                <span>Lesson PDF</span>
                {getCategoryCount('pdf') > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    {getCategoryCount('pdf')}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          
            <div className="flex flex-wrap gap-2">
                {isEditMode && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        console.log("Add Video button clicked - setting isAdding to true");
                        setNewResource({
                          bookId: bookId || '',
                          unitId: unitId || '',
                          title: "New Video",
                          resourceType: "video",
                          embedCode: "",
                          order: resources.length,
                          provider: "YouTube"
                        });
                        setIsAdding(true);
                      }}
                      className="flex items-center"
                    >
                      <Video className="h-4 w-4 mr-1 text-red-500" />
                      Add Video
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        console.log("Add Game button clicked - setting isAdding to true");
                        setNewResource({
                          bookId: bookId || '',
                          unitId: unitId || '',
                          title: "New Game",
                          resourceType: "game",
                          embedCode: "",
                          order: resources.length,
                          provider: "Wordwall"
                        });
                        setIsAdding(true);
                      }}
                      className="flex items-center"
                    >
                      <Gamepad2 className="h-4 w-4 mr-1 text-blue-500" />
                      Add Game
                    </Button>
                  </>
                )}
              </div>
          </div>
          
          <TabsContent value="video" className="space-y-4">
            {videoResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {videoResources.map((resource, index) => (
                  <div key={resource.id || index} className="h-full flex">
                    <ResourceItem 
                      resource={resource}
                      index={index}
                      isEditing={editingResource === index}
                      isEditMode={isEditMode}
                      onEdit={() => setEditingResource(index)}
                      onCancelEdit={() => setEditingResource(null)}
                      onUpdate={() => handleUpdateResource(index)}
                      onDelete={() => handleDeleteResource(index)}
                      onChange={(field, value) => {
                        const updatedResources = [...resources];
                        updatedResources[index] = { 
                          ...updatedResources[index],
                          [field]: value
                        };
                        setResources(updatedResources);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No video resources available.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="game" className="space-y-4">
            {gameResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gameResources.map((resource, index) => (
                  <div key={resource.id || index} className="h-full flex">
                    <ResourceItem 
                      resource={resource}
                      index={index}
                      isEditing={editingResource === index}
                      isEditMode={isEditMode}
                      onEdit={() => setEditingResource(index)}
                      onCancelEdit={() => setEditingResource(null)}
                      onUpdate={() => handleUpdateResource(index)}
                      onDelete={() => handleDeleteResource(index)}
                      onChange={(field, value) => {
                        const updatedResources = [...resources];
                        const resourceIndex = resources.findIndex(r => r === resource);
                        updatedResources[resourceIndex] = { 
                          ...updatedResources[resourceIndex],
                          [field]: value
                        };
                        setResources(updatedResources);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No game resources available.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            {activityResources.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {activityResources.map((resource, index) => (
                  <div key={resource.id || index} className="border rounded-lg overflow-hidden shadow-sm bg-white">
                    <div className="p-4 flex flex-wrap items-center justify-between gap-2 border-b bg-gray-50">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-amber-500" />
                        <h3 className="text-lg font-semibold">{resource.title}</h3>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {resource.provider && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {resource.provider}
                          </span>
                        )}
                        
                        {isEditMode && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setEditingResource(index)}
                              className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                              title="Edit resource"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => handleDeleteResource(index, e)}
                              className="h-8 w-8 p-0 rounded-full hover:bg-red-100 text-red-500"
                              title="Delete resource"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      {editingResource === index ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Provider (Optional)</label>
                            <Input 
                              placeholder="e.g., Lesson Plan, Activity, etc."
                              value={resource.provider || ''}
                              onChange={(e) => {
                                const updatedResources = [...resources];
                                const resourceIndex = resources.findIndex(r => r === resource);
                                updatedResources[resourceIndex] = { 
                                  ...updatedResources[resourceIndex],
                                  provider: e.target.value
                                };
                                setResources(updatedResources);
                              }}
                              className="w-full"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <Input 
                              placeholder="Resource title"
                              value={resource.title || ''}
                              onChange={(e) => {
                                const updatedResources = [...resources];
                                const resourceIndex = resources.findIndex(r => r === resource);
                                updatedResources[resourceIndex] = { 
                                  ...updatedResources[resourceIndex],
                                  title: e.target.value
                                };
                                setResources(updatedResources);
                              }}
                              className="w-full"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Lesson Plan Content</label>
                            <textarea 
                              placeholder='Enter lesson plan content or HTML'
                              rows={15}
                              className="w-full resize-y p-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary/70"
                              value={resource.embedCode}
                              onChange={(e) => {
                                const updatedResources = [...resources];
                                const resourceIndex = resources.findIndex(r => r === resource);
                                updatedResources[resourceIndex] = { 
                                  ...updatedResources[resourceIndex],
                                  embedCode: e.target.value
                                };
                                setResources(updatedResources);
                              }}
                            />
                          </div>
                          
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              onClick={() => setEditingResource(null)}>
                              Cancel
                            </Button>
                            <Button 
                              onClick={() => handleUpdateResource(index)}>
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="w-full rounded-lg overflow-auto p-4 max-w-full lesson-plan-container"
                          style={{ maxHeight: "800px", overflowY: "auto" }}
                          dangerouslySetInnerHTML={{ __html: resource.embedCode }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No lesson or activity resources available.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pdf" className="space-y-4">
            {pdfResources.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {pdfResources.map((resource, index) => (
                  <div key={resource.id || index} className="border rounded-lg overflow-hidden shadow-sm bg-white">
                    <div className="p-4 flex flex-wrap items-center justify-between gap-2 border-b bg-gray-50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-500" />
                        <h3 className="text-lg font-semibold">{resource.title}</h3>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {resource.sourceUrl && (
                          <a 
                            href={resource.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-2.5 py-1 border border-green-300 text-sm font-medium rounded-full shadow-sm text-green-700 bg-white hover:bg-green-50 transition-all"
                          >
                            <Download className="mr-1 h-4 w-4" />
                            Download PDF
                          </a>
                        )}
                        
                        {isEditMode && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => handleDeleteResource(index, e)}
                            className="h-8 w-8 p-0 rounded-full hover:bg-red-100 text-red-500"
                            title="Delete resource"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div 
                        className="w-full overflow-hidden rounded-md" 
                        dangerouslySetInnerHTML={{ __html: resource.embedCode }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {bookId === '1' && unitId === '1' ? (
                  <div className="flex flex-col items-center">
                    <p className="mb-4">Loading Lesson PDF...</p>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <p>No PDF resources available for this unit.</p>
                )}
              </div>
            )}
          </TabsContent>
          
          {/* "Other" tab has been removed as requested */}
        </Tabs>
      ) : (
        <div className="p-8 text-center">
          <div className="text-gray-500 mb-4">No teaching resources available for this unit.</div>
          {isEditMode && (
            <Button 
              onClick={() => setIsAdding(true)}
              className="flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Teaching Resource
            </Button>
          )}
        </div>
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
  return (
    <div className="resource-card">
      {/* Resource header */}
      <div className="resource-card-header">
        <div className="resource-title">
          {resource.resourceType === 'video' && <Video className="icon text-red-500" />}
          {resource.resourceType === 'game' && <Gamepad2 className="icon text-blue-500" />}
          {resource.resourceType === 'activity' && <BookOpen className="icon text-amber-500" />}
          {resource.resourceType === 'pdf' && <FileText className="icon text-green-500" />}
          {resource.resourceType === 'other' && <Link className="icon text-gray-500" />}
          
          {isEditing ? (
            <Input 
              value={resource.title}
              onChange={(e) => onChange('title', e.target.value)}
              className="w-full"
            />
          ) : (
            <h3 className="title">{resource.title}</h3>
          )}
        </div>
        
        <div className="resource-actions">
          {resource.provider && !isEditing && (
            <span className="provider-badge">
              {resource.provider}
            </span>
          )}
          
          {resource.sourceUrl && !isEditing && (
            <a 
              href={resource.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              Source
            </a>
          )}
          
          {isEditMode && !isEditing && (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onEdit}
                className="action-button edit"
                title="Edit resource"
              >
                <Edit className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="action-button delete"
                title="Delete resource"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </>
          )}
          
          {isEditing && (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onUpdate}
                className="action-button save"
                title="Save changes"
              >
                <Save className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onCancelEdit}
                className="action-button cancel"
                title="Cancel editing"
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Resource content */}
      <div className="resource-card-content">
        {isEditing ? (
          <div className="edit-form">
            <div>
              <label className="form-label">Provider (Optional)</label>
              <Input 
                placeholder="e.g., YouTube, Wordwall, etc."
                value={resource.provider || ''}
                onChange={(e) => onChange('provider', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="form-label">External URL (Optional)</label>
              <Input 
                placeholder="https://example.com/resource"
                value={resource.sourceUrl || ''}
                onChange={(e) => onChange('sourceUrl', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="form-label">Embed Code</label>
              <textarea 
                placeholder='<iframe src="..." width="..." height="..." frameborder="0" allowfullscreen></iframe>'
                rows={5}
                className="embed-textarea"
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
    </div>
  );
};

export default TeacherResources;