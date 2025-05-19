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
import { Globe, Search, ChevronLeft, Plus, Languages, Settings, CheckCircle } from "lucide-react";
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
      
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/admin">
                <Button variant="outline" className="mr-4">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Admin
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Language Manager</h1>
                <p className="text-lg text-gray-600 mt-1">
                  Manage translations and language settings for the Visual English platform
                </p>
              </div>
            </div>
            <Globe className="h-8 w-8 text-blue-500" />
          </div>
        
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="languages" className="flex items-center">
                <Languages className="mr-2 h-4 w-4" />
                Available Languages
              </TabsTrigger>
              <TabsTrigger value="translations" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Translation Manager
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="languages">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Platform Languages</CardTitle>
                    <Button onClick={() => setIsAddLanguageDialogOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Language
                    </Button>
                  </div>
                  <CardDescription>
                    Manage which languages are available in the Visual English platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Language</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Native Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Default</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {languages.map((language) => (
                        <TableRow key={language.id}>
                          <TableCell className="font-medium">{language.name}</TableCell>
                          <TableCell>{language.code}</TableCell>
                          <TableCell>{language.nativeName}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="translations">
              <Card>
                <CardHeader>
                  <CardTitle>Translation Manager</CardTitle>
                  <CardDescription>
                    Manage text translations for the Visual English platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search translations..." className="pl-10" />
                    </div>
                    
                    <select className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="en">English (en)</option>
                      <option value="pl">Polish (pl)</option>
                      <option value="es">Spanish (es)</option>
                    </select>
                    
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Key
                    </Button>
                  </div>
                  
                  <p className="text-gray-500 text-center py-8">
                    Select a language and translation key to edit values
                  </p>
                </CardContent>
              </Card>
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