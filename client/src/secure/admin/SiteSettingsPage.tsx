import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Globe,
  Settings,
  BellRing,
  Shield,
  ChevronLeft,
  Upload,
  PaletteIcon,
  Clock,
  DollarSign,
  CalendarIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SiteSettingsPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // General Settings State
  const [siteSettings, setSiteSettings] = useState({
    name: 'Visual English Learning Platform',
    description: 'Interactive ESL learning platform for young minds ages 4-15',
    logoUrl: '/api/direct/content/icons/LOGO VISUAL ENGLISH.png',
    faviconUrl: '/favicon.ico',
    primaryColor: '#6366f1'
  });
  
  // Language Settings State
  const [languageSettings, setLanguageSettings] = useState({
    defaultLanguage: 'en',
    timeZone: 'Europe/Warsaw',
    currency: 'EUR',
    dateFormat: 'dd/mm/yyyy'
  });
  
  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    enableEmails: true,
    replyToEmail: 'support@visualenglish.com',
    senderName: 'Visual English Team',
    senderEmail: 'no-reply@visualenglish.com',
    enableSms: false
  });
  
  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    enable2FA: false,
    passwordStrength: 'medium',
    loginAttemptLimit: 5,
    maintenanceMode: false
  });
  
  // Handle input changes for general settings
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSiteSettings({
      ...siteSettings,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle input changes for language settings
  const handleLanguageChange = (field: string, value: string) => {
    setLanguageSettings({
      ...languageSettings,
      [field]: value
    });
  };
  
  // Handle switch changes for notification settings
  const handleNotificationToggle = (field: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [field]: !notificationSettings[field as keyof typeof notificationSettings]
    });
  };
  
  // Handle input changes for notification settings
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({
      ...notificationSettings,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle switch changes for security settings
  const handleSecurityToggle = (field: string) => {
    setSecuritySettings({
      ...securitySettings,
      [field]: !securitySettings[field as keyof typeof securitySettings]
    });
  };
  
  // Handle select changes for security settings
  const handleSecurityChange = (field: string, value: string) => {
    setSecuritySettings({
      ...securitySettings,
      [field]: value
    });
  };
  
  // Mock file upload handler
  const handleFileUpload = (type: string) => {
    toast({
      title: "Upload initiated",
      description: `${type} upload functionality would be implemented here`,
    });
  };
  
  // Save settings (mock implementation)
  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been applied successfully",
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-4" 
          onClick={() => setLocation('/admin')}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Admin
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Site Settings</h1>
          <p className="text-gray-500">Configure platform settings and preferences</p>
        </div>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="general" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center">
            <Globe className="mr-2 h-4 w-4" />
            Language & Region
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <BellRing className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the basic information and appearance of your platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Site Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  value={siteSettings.name} 
                  onChange={handleGeneralChange}
                  placeholder="Visual English Learning Platform" 
                />
                <p className="text-sm text-gray-500">Displayed in headers, browser tab, emails</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Site Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  value={siteSettings.description} 
                  onChange={handleGeneralChange}
                  placeholder="Interactive ESL learning platform for young minds" 
                  rows={3}
                />
                <p className="text-sm text-gray-500">Meta description / used in dashboard subtitles</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Site Logo</Label>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={siteSettings.logoUrl} 
                      alt="Current logo" 
                      className="h-16 border rounded p-1" 
                    />
                    <Button onClick={() => handleFileUpload('Logo')} className="flex items-center">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload new logo
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">For branding throughout the platform</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={siteSettings.faviconUrl} 
                      alt="Current favicon" 
                      className="h-16 w-16 border rounded p-1" 
                    />
                    <Button onClick={() => handleFileUpload('Favicon')} className="flex items-center">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload new favicon
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">Small icon in browser tabs</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center space-x-4">
                  <div 
                    className="h-10 w-10 rounded-full border" 
                    style={{ backgroundColor: siteSettings.primaryColor }}
                  ></div>
                  <Input 
                    id="primaryColor" 
                    name="primaryColor"
                    type="color"
                    value={siteSettings.primaryColor} 
                    onChange={handleGeneralChange}
                    className="w-24 h-10"
                  />
                  <div className="flex items-center">
                    <PaletteIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-500">Theme customization</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Language & Region Settings */}
        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>Language & Region Settings</CardTitle>
              <CardDescription>
                Configure language, regional and format preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <Select 
                    value={languageSettings.defaultLanguage}
                    onValueChange={(value) => handleLanguageChange('defaultLanguage', value)}
                  >
                    <SelectTrigger id="defaultLanguage">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="pl">Polish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">Default platform language</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeZone">Time Zone</Label>
                  <Select 
                    value={languageSettings.timeZone}
                    onValueChange={(value) => handleLanguageChange('timeZone', value)}
                  >
                    <SelectTrigger id="timeZone" className="flex items-center">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Warsaw">Europe/Warsaw</SelectItem>
                      <SelectItem value="Europe/London">Europe/London</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                      <SelectItem value="Australia/Sydney">Australia/Sydney</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    For logs, notifications, and events
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select 
                    value={languageSettings.currency}
                    onValueChange={(value) => handleLanguageChange('currency', value)}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="PLN">Polish Złoty (zł)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="GBP">British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    For pricing in shop
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select 
                    value={languageSettings.dateFormat}
                    onValueChange={(value) => handleLanguageChange('dateFormat', value)}
                  >
                    <SelectTrigger id="dateFormat">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    For displaying dates
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure communication methods and messages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableEmails">Enable Email Notifications</Label>
                    <p className="text-sm text-gray-500">System messages, confirmations</p>
                  </div>
                  <Switch 
                    id="enableEmails"
                    checked={notificationSettings.enableEmails}
                    onCheckedChange={() => handleNotificationToggle('enableEmails')}
                  />
                </div>
                
                <div className="space-y-0.5">
                  <Label htmlFor="replyToEmail">Reply-to Email Address</Label>
                  <Input 
                    id="replyToEmail" 
                    name="replyToEmail"
                    value={notificationSettings.replyToEmail} 
                    onChange={handleNotificationChange}
                    placeholder="support@visualenglish.com" 
                  />
                  <p className="text-sm text-gray-500">For outgoing emails</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="senderName">Sender Name</Label>
                    <Input 
                      id="senderName" 
                      name="senderName"
                      value={notificationSettings.senderName} 
                      onChange={handleNotificationChange}
                      placeholder="Visual English Team" 
                    />
                  </div>
                  
                  <div className="space-y-0.5">
                    <Label htmlFor="senderEmail">Sender Email</Label>
                    <Input 
                      id="senderEmail" 
                      name="senderEmail"
                      value={notificationSettings.senderEmail} 
                      onChange={handleNotificationChange}
                      placeholder="no-reply@visualenglish.com" 
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500">Branding your messages</p>
                
                <div className="flex items-center justify-between pt-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableSms">Enable SMS Notifications</Label>
                    <p className="text-sm text-gray-500">For urgent alerts and reminders</p>
                  </div>
                  <Switch 
                    id="enableSms"
                    checked={notificationSettings.enableSms}
                    onCheckedChange={() => handleNotificationToggle('enableSms')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security and access requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable2FA">Enable Two-Factor Authentication (2FA)</Label>
                    <p className="text-sm text-gray-500">For admin accounts</p>
                  </div>
                  <Switch 
                    id="enable2FA"
                    checked={securitySettings.enable2FA}
                    onCheckedChange={() => handleSecurityToggle('enable2FA')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passwordStrength">Password Strength Requirement</Label>
                  <Select 
                    value={securitySettings.passwordStrength}
                    onValueChange={(value) => handleSecurityChange('passwordStrength', value)}
                  >
                    <SelectTrigger id="passwordStrength">
                      <SelectValue placeholder="Select password strength" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Minimum 6 characters)</SelectItem>
                      <SelectItem value="medium">Medium (8+ characters, mixed case)</SelectItem>
                      <SelectItem value="high">High (10+ chars, symbols, numbers)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="loginAttemptLimit">Login Attempt Limit</Label>
                  <Select 
                    value={securitySettings.loginAttemptLimit.toString()}
                    onValueChange={(value) => handleSecurityChange('loginAttemptLimit', value)}
                  >
                    <SelectTrigger id="loginAttemptLimit">
                      <SelectValue placeholder="Select attempt limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">Prevent brute-force attacks</p>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenanceMode" className="text-red-500 font-medium">Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">Lock the platform for updates</p>
                  </div>
                  <Switch 
                    id="maintenanceMode"
                    checked={securitySettings.maintenanceMode}
                    onCheckedChange={() => handleSecurityToggle('maintenanceMode')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettingsPage;