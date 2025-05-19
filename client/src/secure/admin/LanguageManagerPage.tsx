import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Globe, 
  Search, 
  ChevronLeft, 
  Plus, 
  RefreshCw,
  Edit,
  Trash2,
  Languages,
  Settings,
  CheckCircle
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
  createdAt: string;
};

type Translation = {
  id: string;
  keyId: string;
  languageCode: string;
  value: string;
  lastUpdated: string;
};

const LanguageManagerPage = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("languages");
  const [languages, setLanguages] = useState<Language[]>([]);
  const [translationKeys, setTranslationKeys] = useState<TranslationKey[]>([]);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddLanguageDialogOpen, setIsAddLanguageDialogOpen] = useState(false);
  const [isEditKeyDialogOpen, setIsEditKeyDialogOpen] = useState(false);
  const [isAddKeyDialogOpen, setIsAddKeyDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states for adding a new language
  const [newLanguageCode, setNewLanguageCode] = useState("");
  const [newLanguageName, setNewLanguageName] = useState("");
  const [newLanguageNativeName, setNewLanguageNativeName] = useState("");
  
  // Form states for adding/editing a translation key
  const [currentKey, setCurrentKey] = useState<TranslationKey | null>(null);
  const [keyName, setKeyName] = useState("");
  const [keyDescription, setKeyDescription] = useState("");
  const [keySection, setKeySection] = useState("");
  
  // Form states for editing translations
  const [editedTranslations, setEditedTranslations] = useState<Record<string, string>>({});

  // Mock data for demonstration purposes
  useEffect(() => {
    // In a real app, this would be API calls
    const mockLanguages: Language[] = [
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
      },
      {
        id: "lang_4",
        code: "de",
        name: "German",
        nativeName: "Deutsch",
        isActive: false,
        isDefault: false
      }
    ];
    
    const mockTranslationKeys: TranslationKey[] = [
      {
        id: "key_1",
        key: "common.buttons.submit",
        description: "Submit button text",
        section: "common",
        createdAt: "2025-05-01T10:00:00Z"
      },
      {
        id: "key_2",
        key: "common.buttons.cancel",
        description: "Cancel button text",
        section: "common",
        createdAt: "2025-05-01T10:00:00Z"
      },
      {
        id: "key_3",
        key: "auth.login.title",
        description: "Login page title",
        section: "auth",
        createdAt: "2025-05-01T10:00:00Z"
      },
      {
        id: "key_4",
        key: "books.view.unitTitle",
        description: "Unit title text in book viewer",
        section: "content",
        createdAt: "2025-05-01T10:00:00Z"
      },
      {
        id: "key_5",
        key: "admin.dashboard.title",
        description: "Admin dashboard title",
        section: "admin",
        createdAt: "2025-05-02T10:00:00Z"
      }
    ];
    
    const mockTranslations: Translation[] = [
      {
        id: "trans_1",
        keyId: "key_1",
        languageCode: "en",
        value: "Submit",
        lastUpdated: "2025-05-01T10:00:00Z"
      },
      {
        id: "trans_2",
        keyId: "key_1",
        languageCode: "pl",
        value: "Zatwierdź",
        lastUpdated: "2025-05-01T10:00:00Z"
      },
      {
        id: "trans_3",
        keyId: "key_2",
        languageCode: "en",
        value: "Cancel",
        lastUpdated: "2025-05-01T10:00:00Z"
      },
      {
        id: "trans_4",
        keyId: "key_2",
        languageCode: "pl",
        value: "Anuluj",
        lastUpdated: "2025-05-01T10:00:00Z"
      },
      {
        id: "trans_5",
        keyId: "key_3",
        languageCode: "en",
        value: "Login",
        lastUpdated: "2025-05-01T10:00:00Z"
      },
      {
        id: "trans_6",
        keyId: "key_3",
        languageCode: "pl",
        value: "Logowanie",
        lastUpdated: "2025-05-01T10:00:00Z"
      },
      {
        id: "trans_7",
        keyId: "key_4",
        languageCode: "en",
        value: "Unit",
        lastUpdated: "2025-05-01T10:00:00Z"
      },
      {
        id: "trans_8",
        keyId: "key_4",
        languageCode: "pl",
        value: "Rozdział",
        lastUpdated: "2025-05-01T10:00:00Z"
      },
      {
        id: "trans_9",
        keyId: "key_5",
        languageCode: "en",
        value: "Admin Dashboard",
        lastUpdated: "2025-05-02T10:00:00Z"
      },
      {
        id: "trans_10",
        keyId: "key_5",
        languageCode: "pl",
        value: "Panel Administratora",
        lastUpdated: "2025-05-02T10:00:00Z"
      }
    ];
    
    setLanguages(mockLanguages);
    setTranslationKeys(mockTranslationKeys);
    setTranslations(mockTranslations);
    if (mockLanguages.length > 0) {
      setSelectedLanguage(mockLanguages[0].code);
    }
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter translation keys based on search term
  const filteredKeys = translationKeys.filter(key => 
    key.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    key.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    key.section.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get translations for a specific key and language
  const getTranslation = (keyId: string, languageCode: string) => {
    const translation = translations.find(t => t.keyId === keyId && t.languageCode === languageCode);
    return translation ? translation.value : "";
  };
  
  // Handle adding a new language
  const handleAddLanguage = () => {
    if (!newLanguageCode || !newLanguageName) {
      toast({
        title: "Error",
        description: "Language code and name are required.",
        variant: "destructive"
      });
      return;
    }
    
    const newLanguage: Language = {
      id: `lang_${languages.length + 1}`,
      code: newLanguageCode,
      name: newLanguageName,
      nativeName: newLanguageNativeName || newLanguageName,
      isActive: true,
      isDefault: false
    };
    
    setLanguages([...languages, newLanguage]);
    setNewLanguageCode("");
    setNewLanguageName("");
    setNewLanguageNativeName("");
    setIsAddLanguageDialogOpen(false);
    
    toast({
      title: "Language Added",
      description: `${newLanguageName} (${newLanguageCode}) has been added successfully.`
    });
  };
  
  // Handle toggling language active status
  const toggleLanguageActive = (languageId: string) => {
    setLanguages(languages.map(lang => 
      lang.id === languageId ? { ...lang, isActive: !lang.isActive } : lang
    ));
    
    const language = languages.find(lang => lang.id === languageId);
    if (language) {
      toast({
        title: language.isActive ? "Language Deactivated" : "Language Activated",
        description: `${language.name} is now ${language.isActive ? "deactivated" : "activated"}.`
      });
    }
  };
  
  // Handle setting a language as default
  const setLanguageAsDefault = (languageId: string) => {
    setLanguages(languages.map(lang => 
      ({ ...lang, isDefault: lang.id === languageId })
    ));
    
    const language = languages.find(lang => lang.id === languageId);
    if (language) {
      toast({
        title: "Default Language Updated",
        description: `${language.name} is now the default language.`
      });
    }
  };
  
  // Handle saving all translations
  const handleSaveTranslations = () => {
    if (Object.keys(editedTranslations).length === 0) {
      toast({
        title: "No Changes",
        description: "No translation changes to save."
      });
      return;
    }
    
    // Update translations in state
    const updatedTranslations = [...translations];
    
    Object.entries(editedTranslations).forEach(([id, value]) => {
      const index = updatedTranslations.findIndex(t => t.id === id);
      if (index !== -1) {
        updatedTranslations[index] = {
          ...updatedTranslations[index],
          value,
          lastUpdated: new Date().toISOString()
        };
      }
    });
    
    setTranslations(updatedTranslations);
    setEditedTranslations({});
    
    toast({
      title: "Translations Saved",
      description: `Successfully saved ${Object.keys(editedTranslations).length} translation(s).`
    });
  };
  
  // Handle opening edit key dialog
  const handleEditKey = (key: TranslationKey) => {
    setCurrentKey(key);
    setKeyName(key.key);
    setKeyDescription(key.description);
    setKeySection(key.section);
    setIsEditKeyDialogOpen(true);
  };
  
  // Handle saving edited key
  const handleSaveKey = () => {
    if (!keyName || !keySection) {
      toast({
        title: "Error",
        description: "Key name and section are required.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentKey) {
      // Edit existing key
      setTranslationKeys(translationKeys.map(key => 
        key.id === currentKey.id ? {
          ...key,
          key: keyName,
          description: keyDescription,
          section: keySection
        } : key
      ));
      
      toast({
        title: "Key Updated",
        description: `Translation key has been updated successfully.`
      });
    } else {
      // Add new key
      const newKey: TranslationKey = {
        id: `key_${translationKeys.length + 1}`,
        key: keyName,
        description: keyDescription,
        section: keySection,
        createdAt: new Date().toISOString()
      };
      
      setTranslationKeys([...translationKeys, newKey]);
      
      // Add empty translations for all active languages
      const newTranslations = languages
        .filter(lang => lang.isActive)
        .map((lang, index) => ({
          id: `trans_new_${index}_${newKey.id}`,
          keyId: newKey.id,
          languageCode: lang.code,
          value: "",
          lastUpdated: new Date().toISOString()
        }));
      
      setTranslations([...translations, ...newTranslations]);
      
      toast({
        title: "Key Added",
        description: `New translation key has been added successfully.`
      });
    }
    
    // Reset form
    setCurrentKey(null);
    setKeyName("");
    setKeyDescription("");
    setKeySection("");
    setIsEditKeyDialogOpen(false);
    setIsAddKeyDialogOpen(false);
  };
  
  // Handle opening add key dialog
  const handleAddKey = () => {
    setCurrentKey(null);
    setKeyName("");
    setKeyDescription("");
    setKeySection("");
    setIsAddKeyDialogOpen(true);
  };
  
  // Handle deleting a key
  const handleDeleteKey = (keyId: string) => {
    setTranslationKeys(translationKeys.filter(key => key.id !== keyId));
    setTranslations(translations.filter(trans => trans.keyId !== keyId));
    
    toast({
      title: "Key Deleted",
      description: "Translation key and all its translations have been deleted."
    });
  };
  
  // If loading, show spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // If error, show error message
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Language Manager | Visual English Admin</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/admin">
            <Button variant="outline" className="mr-4">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Admin
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Globe className="mr-2 h-6 w-6 text-blue-500" />
              Language Manager
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Manage translations and language settings for the Visual English platform
            </p>
          </div>
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
          
          <TabsContent value="languages" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Platform Languages</CardTitle>
                  <Button onClick={() => setIsAddLanguageDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
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
                      <TableHead>Actions</TableHead>
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
                          {language.isDefault ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setLanguageAsDefault(language.id)}
                              disabled={!language.isActive}
                              className="text-xs h-7 px-2"
                            >
                              Set Default
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleLanguageActive(language.id)}
                              className="text-xs h-7 px-2"
                              disabled={language.isDefault && language.isActive}
                            >
                              {language.isActive ? 'Deactivate' : 'Activate'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="translations" className="space-y-4">
            <Card className="mb-4">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search translation keys..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {languages.filter(lang => lang.isActive).map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name} ({lang.code})
                        </option>
                      ))}
                    </select>
                    
                    <Button onClick={handleSaveTranslations} className="bg-blue-600 hover:bg-blue-700">
                      Save Changes
                    </Button>
                    
                    <Button onClick={handleAddKey} className="bg-green-600 hover:bg-green-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Key
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Translation Keys</CardTitle>
                  <Button 
                    onClick={() => window.location.reload()} 
                    variant="outline" 
                    className="bg-white hover:bg-gray-50"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                </div>
                <CardDescription>
                  Edit translations for {selectedLanguage ? `${languages.find(l => l.code === selectedLanguage)?.name} (${selectedLanguage})` : 'selected language'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/4">Key</TableHead>
                      <TableHead className="w-1/6">Section</TableHead>
                      <TableHead className="w-1/6">Description</TableHead>
                      <TableHead className="w-1/3">Translation</TableHead>
                      <TableHead className="w-1/12">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredKeys.map((key) => {
                      const translation = translations.find(
                        t => t.keyId === key.id && t.languageCode === selectedLanguage
                      );
                      
                      return (
                        <TableRow key={key.id}>
                          <TableCell className="font-mono text-xs break-all">{key.key}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {key.section}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">{key.description}</TableCell>
                          <TableCell>
                            <Textarea
                              value={
                                editedTranslations[translation?.id || ""] !== undefined
                                  ? editedTranslations[translation?.id || ""]
                                  : translation?.value || ""
                              }
                              onChange={(e) => {
                                if (translation) {
                                  setEditedTranslations({
                                    ...editedTranslations,
                                    [translation.id]: e.target.value
                                  });
                                }
                              }}
                              className="min-h-[60px] text-sm"
                              placeholder="Enter translation..."
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col space-y-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditKey(key)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit Key</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteKey(key.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete Key</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    
                    {filteredKeys.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          {searchTerm
                            ? "No translation keys match your search"
                            : "No translation keys available"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
                value={newLanguageCode}
                onChange={(e) => setNewLanguageCode(e.target.value)}
                placeholder="en"
                className="col-span-3"
                maxLength={5}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Language Name
              </label>
              <Input
                id="name"
                value={newLanguageName}
                onChange={(e) => setNewLanguageName(e.target.value)}
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
                value={newLanguageNativeName}
                onChange={(e) => setNewLanguageNativeName(e.target.value)}
                placeholder="English"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddLanguageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLanguage}>Add Language</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Key Dialog */}
      <Dialog open={isEditKeyDialogOpen} onOpenChange={setIsEditKeyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Translation Key</DialogTitle>
            <DialogDescription>
              Update the translation key properties.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="keyName" className="text-right text-sm font-medium">
                Key Name
              </label>
              <Input
                id="keyName"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="common.buttons.submit"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="keySection" className="text-right text-sm font-medium">
                Section
              </label>
              <Input
                id="keySection"
                value={keySection}
                onChange={(e) => setKeySection(e.target.value)}
                placeholder="common"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="keyDescription" className="text-right text-sm font-medium">
                Description
              </label>
              <Textarea
                id="keyDescription"
                value={keyDescription}
                onChange={(e) => setKeyDescription(e.target.value)}
                placeholder="Describe the purpose of this key"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditKeyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveKey}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Key Dialog */}
      <Dialog open={isAddKeyDialogOpen} onOpenChange={setIsAddKeyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Translation Key</DialogTitle>
            <DialogDescription>
              Add a new translation key to the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="newKeyName" className="text-right text-sm font-medium">
                Key Name
              </label>
              <Input
                id="newKeyName"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="common.buttons.submit"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="newKeySection" className="text-right text-sm font-medium">
                Section
              </label>
              <Input
                id="newKeySection"
                value={keySection}
                onChange={(e) => setKeySection(e.target.value)}
                placeholder="common"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="newKeyDescription" className="text-right text-sm font-medium">
                Description
              </label>
              <Textarea
                id="newKeyDescription"
                value={keyDescription}
                onChange={(e) => setKeyDescription(e.target.value)}
                placeholder="Describe the purpose of this key"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddKeyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveKey}>Add Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LanguageManagerPage;