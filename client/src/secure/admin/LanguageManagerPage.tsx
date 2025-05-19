import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Globe, 
  Search, 
  ChevronLeft, 
  Plus, 
  Languages, 
  Settings, 
  CheckCircle,
  Download,
  Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Types for language management
type Language = {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  isActive: boolean;
  isDefault: boolean;
};

type TranslationKey = {
  id: string;
  key: string;
  description: string;
  section: string;
};

const LanguageManagerPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("languages");
  const [isAddLanguageDialogOpen, setIsAddLanguageDialogOpen] = useState(false);
  
  // Mock languages for demonstration
  const languages = [
    {
      id: "lang_1",
      code: "en",
      name: "English",
      nativeName: "English",
      isActive: true,
      isDefault: true
    },
    {
      id: "lang_2",
      code: "pl",
      name: "Polish",
      nativeName: "Polski",
      isActive: true,
      isDefault: false
    },
    {
      id: "lang_3",
      code: "es",
      name: "Spanish",
      nativeName: "Español",
      isActive: true,
      isDefault: false
    }
  ];

  return (
    <>
      <Helmet>
        <title>Language Manager | Visual English Admin</title>
      </Helmet>
      
      <div className="min-h-screen bg-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center mb-5">
            <Link href="/admin" className="flex items-center gap-1 text-gray-700 hover:text-gray-900 px-2 py-1">
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Admin</span>
            </Link>
          </div>
          
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Language Manager</h1>
              <p className="text-gray-500 mt-1">
                Configure translation settings and language preferences
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <Globe className="h-5 w-5 text-blue-500 ml-2" />
            </div>
          </div>
        
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 bg-gray-50 p-1 rounded-md">
              <TabsTrigger value="languages" className="flex items-center gap-1.5 rounded-md data-[state=active]:bg-white">
                <Languages className="h-4 w-4" />
                Available Languages
              </TabsTrigger>
              <TabsTrigger value="translations" className="flex items-center gap-1.5 rounded-md data-[state=active]:bg-white">
                <Settings className="h-4 w-4" />
                Translation Manager
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="languages">
              <div className="bg-white rounded-lg border shadow-sm">
                <div className="px-6 py-5 border-b flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">Platform Languages</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Manage which languages are available in the Visual English platform
                    </p>
                  </div>
                  <Button 
                    onClick={() => setIsAddLanguageDialogOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Language
                  </Button>
                </div>
                <div className="p-6">
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-medium">Language</TableHead>
                          <TableHead className="font-medium">Code</TableHead>
                          <TableHead className="font-medium">Native Name</TableHead>
                          <TableHead className="font-medium">Status</TableHead>
                          <TableHead className="font-medium">Default</TableHead>
                          <TableHead className="font-medium">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {languages.map((language) => (
                          <TableRow key={language.id}>
                            <TableCell className="font-medium">{language.name}</TableCell>
                            <TableCell className="text-gray-600 font-mono text-sm">{language.code}</TableCell>
                            <TableCell>{language.nativeName}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                language.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {language.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </TableCell>
                            <TableCell>
                              {language.isDefault && (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              )}
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-gray-500 hover:text-gray-700"
                              >
                                {language.isActive ? 'Deactivate' : 'Activate'}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="translations">
              <div className="bg-white rounded-lg border shadow-sm">
                <div className="px-6 py-5 border-b flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">Translation Manager</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Manage text translations for the Visual English platform
                    </p>
                  </div>
                  <Button 
                    onClick={() => {}}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Translation Key
                  </Button>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search translation keys..." className="pl-10" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Language:</span>
                      <select className="min-w-40 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="en">English (en)</option>
                        <option value="pl">Polish (pl)</option>
                        <option value="es">Spanish (es)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-medium w-1/4">Key</TableHead>
                          <TableHead className="font-medium w-1/6">Section</TableHead>
                          <TableHead className="font-medium w-1/3">Translation</TableHead>
                          <TableHead className="font-medium w-1/6">Last Updated</TableHead>
                          <TableHead className="font-medium w-1/12">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-mono text-sm">common.buttons.submit</TableCell>
                          <TableCell><span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">common</span></TableCell>
                          <TableCell>
                            <Textarea placeholder="Enter translation..." className="min-h-[60px]" defaultValue="Submit" />
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm">2 days ago</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-sm">auth.login.title</TableCell>
                          <TableCell><span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs">auth</span></TableCell>
                          <TableCell>
                            <Textarea placeholder="Enter translation..." className="min-h-[60px]" defaultValue="Login" />
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm">1 day ago</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-sm">books.view.unitTitle</TableCell>
                          <TableCell><span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">content</span></TableCell>
                          <TableCell>
                            <Textarea placeholder="Enter translation..." className="min-h-[60px]" defaultValue="Unit" />
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm">3 days ago</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Add Language Dialog */}
      <Dialog open={isAddLanguageDialogOpen} onOpenChange={setIsAddLanguageDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Language</DialogTitle>
            <DialogDescription>
              Add a new language to the Visual English platform.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="code" className="text-right text-sm font-medium">
                Language Code
              </label>
              <Input
                id="code"
                placeholder="en"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Language Name
              </label>
              <Input
                id="name"
                placeholder="English"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="nativeName" className="text-right text-sm font-medium">
                Native Name
              </label>
              <Input
                id="nativeName"
                placeholder="English"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddLanguageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast({
                title: "Language Added",
                description: "The new language has been added successfully."
              });
              setIsAddLanguageDialogOpen(false);
            }}>
              Add Language
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LanguageManagerPage;