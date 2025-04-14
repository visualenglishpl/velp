import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Plus, FileEdit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Types
interface TeachingGuidanceProps {
  bookId: string;
  unitNumber: number;
}

interface GuidancePoint {
  text: string;
}

interface SentenceFrame {
  question: string;
  answer: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  trusted?: boolean;
}

// Dummy data - would be replaced with API data
const guidanceData = {
  presentingQuestions: [
    { text: "Show the question on the slide and point to any key image details (e.g. facial expressions, actions, background objects)." },
    { text: "Clearly read the question aloud to the class — say it twice to help students process the language." }
  ],
  promptStudentAnswers: [
    { text: "Use structured sentence frames:" }
  ],
  sentenceFrames: [
    { question: "Is it a cat or a dog?", answer: "It is a..." },
    { question: "Are they sitting or standing?", answer: "They are..." },
    { question: "Is he eating or sleeping?", answer: "He is..." },
    { question: "Is she happy or sad?", answer: "She is..." }
  ],
  checkVocabulary: [
    { text: "Refer back to the textbook vocabulary section if available." },
    { text: "Pause and explain any unfamiliar words using visuals, gestures, or simple definitions." }
  ],
  followUpQuestions: [
    { text: "To reinforce comprehension:" },
    { text: ""Why do you think so?"" },
    { text: ""Can you describe it more?"" },
    { text: ""What else can you see?"" }
  ]
};

const resourcesData: Resource[] = [
  {
    id: "1",
    title: "Kahoot Quiz: Unit 1",
    description: "Interactive quiz about key vocabulary",
    url: "https://kahoot.com/example",
    trusted: true
  },
  {
    id: "2",
    title: "Wordwall: Vocabulary Practice",
    description: "Practice key vocabulary from this unit",
    url: "https://wordwall.net/example",
    trusted: true
  },
  {
    id: "3",
    title: "YouTube Teaching Resources",
    description: "Find teaching videos for ESL lessons",
    url: "https://youtube.com/playlist?list=example",
    trusted: true
  },
  {
    id: "4",
    title: "Online Games PDF",
    description: "PDF with links to online games (if available)",
    url: "https://example.com/games.pdf",
    trusted: false
  }
];

export default function TeachingGuidance({ bookId, unitNumber }: TeachingGuidanceProps) {
  // In a real implementation, we would fetch the teaching guidance data from the API
  // const { data } = useQuery({ queryKey: ['/api/teaching-guidance', bookId, unitNumber] });
  
  return (
    <div className="mt-8 bg-white rounded-lg shadow border">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-xl font-bold flex items-center">
          <FileEdit className="h-5 w-5 mr-2 text-primary" />
          Teaching Guidance
        </h2>
        <div className="flex items-center">
          <Badge variant="outline" className="mr-2">Teacher View</Badge>
          <Button size="sm" variant="outline">Hide</Button>
        </div>
      </div>
      
      <Tabs defaultValue="guidance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 p-4 bg-gray-50 border-b">
          <TabsTrigger value="guidance">Teaching Guidance</TabsTrigger>
          <TabsTrigger value="resources">Teacher Resources</TabsTrigger>
          <TabsTrigger value="description">Unit Description</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guidance" className="p-4 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Presenting Questions Panel */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Presenting Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {guidanceData.presentingQuestions.map((point, i) => (
                    <li key={i} className="text-gray-700">{point.text}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Check Vocabulary Panel */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Check Vocabulary Understanding</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {guidanceData.checkVocabulary.map((point, i) => (
                    <li key={i} className="text-gray-700">{point.text}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Prompt Student Answers Panel */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Prompt Student Answers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2 font-medium">Use structured sentence frames:</p>
                <div className="space-y-2 p-3 bg-gray-50 rounded-md">
                  {guidanceData.sentenceFrames.map((frame, i) => (
                    <div key={i} className="pb-2 border-b border-gray-200 last:border-0">
                      <div className="text-gray-700">"{frame.question}" → "{frame.answer}"</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Follow-up Questions Panel */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Ask Follow-up Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">To reinforce comprehension:</p>
                <ul className="list-disc pl-5 space-y-2">
                  {guidanceData.followUpQuestions.slice(1).map((point, i) => (
                    <li key={i} className="text-gray-700">{point.text}</li>
                  ))}
                </ul>
                <p className="mt-3 text-gray-600 italic text-sm">
                  Encourage full-sentence answers — especially with more advanced learners — and guide them toward more complete responses.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Interactive Resources</h3>
            <Button size="sm" variant="outline" className="flex items-center">
              <Plus className="h-4 w-4 mr-1" /> Add Resource
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {resourcesData.map(resource => (
              <Card key={resource.id} className="relative">
                <CardHeader className="py-3 flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-md flex items-center">
                      <span className="truncate">{resource.title}</span>
                    </CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {resource.trusted ? (
                    <a 
                      href={resource.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      {resource.title} <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  ) : (
                    <div className="bg-amber-50 p-3 rounded-md">
                      <p className="text-amber-700 text-sm font-medium">Untrusted URL</p>
                      <p className="text-amber-600 text-xs mb-2">This URL cannot be embedded. Please use a trusted educational platform.</p>
                      <a 
                        href={resource.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-primary hover:underline"
                      >
                        Open link in new tab <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="description" className="p-4">
          <div className="prose prose-sm max-w-none">
            <h3 className="text-xl font-bold mb-4">Unit-Specific Guidance for Book {bookId}, Unit {unitNumber}</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="mb-2">This unit not only teaches vocabulary related to school supplies but also provides practical language skills for everyday school interactions.</p>
              <p>Ready to gear up with your school bag and learn English? Let's make learning fun and educational! ✏️ 📚</p>
            </div>
            
            <h4 className="font-bold text-lg mt-6 mb-2">Classroom Items Introduced:</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-lg">✏️</span>
                <div>
                  <span className="font-medium">Pencil:</span> Learn to ask for or lend a pencil.
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">📓</span>
                <div>
                  <span className="font-medium">Notebook:</span> Discuss what a notebook is used for.
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">📚</span>
                <div>
                  <span className="font-medium">Book:</span> Share favorite books and how they are used in class.
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">✂️</span>
                <div>
                  <span className="font-medium">Scissors:</span> Talk about safety and uses of scissors.
                </div>
              </li>
            </ul>
            
            <h4 className="font-bold text-lg mt-6 mb-2">Basic School Phrases:</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-lg">📱</span>
                <div>"Excuse me, may I borrow your...?"</div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">👋</span>
                <div>"Here you are."</div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">🙏</span>
                <div>"Thank you."</div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">😊</span>
                <div>"You are welcome."</div>
              </li>
            </ul>
            
            <h4 className="font-bold text-lg mt-6 mb-2">Suggested Teaching Activities:</h4>
            <ul className="space-y-3">
              <li>
                <p className="font-medium">School Supply Swap:</p>
                <p className="text-gray-700">A classroom activity where students 'trade' items and describe them in English.</p>
              </li>
              <li>
                <p className="font-medium">Vocabulary Games:</p>
                <p className="text-gray-700">"What's Missing?" where students identify missing classroom items, or "School Supply Scramble" to unscramble words related to school supplies.</p>
              </li>
              <li>
                <p className="font-medium">Discussion Questions:</p>
                <p className="text-gray-700">What items do you always carry in your school bag? How do you take care of your school supplies?</p>
              </li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}