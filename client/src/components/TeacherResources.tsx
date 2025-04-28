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
      await apiRequest('POST', `/api/direct/teacherResources/${bookId}/${unitId}`, resourcesToSave);
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
      const response = await apiRequest('GET', `/api/direct/teacherResources/${bookId}/${unitId}`);
      const data = await response.json();
      setResources(data);
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
  
  // Add pre-defined resources for Book 1 units
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
            }
          );
        }
        
        // Save predefined resources
        setResources(predefinedResources);
        saveResourcesToServer(predefinedResources);
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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