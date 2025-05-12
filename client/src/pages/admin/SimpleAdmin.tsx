import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Upload, 
  Settings, 
  Home,
  ChevronLeft
} from 'lucide-react';

// Main admin feature selection screen
const AdminDashboard = () => {
  const adminFeatures = [
    {
      title: 'Book Management',
      description: 'Manage books and their units',
      icon: <BookOpen className="h-8 w-8 text-purple-600 mb-2" />,
      action: () => setCurrentSection('books')
    },
    {
      title: 'User Management',
      description: 'Manage users and permissions',
      icon: <Users className="h-8 w-8 text-blue-600 mb-2" />,
      action: () => setCurrentSection('users')
    },
    {
      title: 'Content Manager',
      description: 'Upload and organize content',
      icon: <FileText className="h-8 w-8 text-teal-600 mb-2" />,
      action: () => setCurrentSection('content')
    },
    {
      title: 'Resource Uploader',
      description: 'Upload educational resources',
      icon: <Upload className="h-8 w-8 text-orange-600 mb-2" />,
      action: () => setCurrentSection('resources')
    },
    {
      title: 'System Settings',
      description: 'Configure system parameters',
      icon: <Settings className="h-8 w-8 text-gray-600 mb-2" />,
      action: () => setCurrentSection('settings')
    },
    {
      title: 'Standalone Viewer',
      description: 'View content directly',
      icon: <BookOpen className="h-8 w-8 text-green-600 mb-2" />,
      action: () => window.location.href = '/standalone-viewer'
    }
  ];

  const [currentSection, setCurrentSection] = useState('dashboard');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 mb-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Simple Admin Dashboard</h1>
          <div className="flex space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 pb-12">
        {currentSection === 'dashboard' ? (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Admin Control Panel</h2>
              <p className="text-gray-500">
                Select an option below to manage different aspects of the Visual English platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 text-center">
                    <div className="flex justify-center">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={feature.action}
                    >
                      Manage
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <SectionContent
            section={currentSection}
            onBack={() => setCurrentSection('dashboard')}
          />
        )}
      </main>
    </div>
  );
};

// Book Management Section
const BookManagementSection = ({ onBack }) => {
  const books = [
    { id: '0a', title: 'Book 0a', unitCount: 20, color: '#FF40FF' },
    { id: '0b', title: 'Book 0b', unitCount: 20, color: '#FF7F27' },
    { id: '0c', title: 'Book 0c', unitCount: 20, color: '#00CEDD' },
    { id: '1', title: 'Book 1', unitCount: 18, color: '#FFFF00' },
    { id: '2', title: 'Book 2', unitCount: 18, color: '#9966CC' },
    { id: '3', title: 'Book 3', unitCount: 18, color: '#00CC00' },
    { id: '4', title: 'Book 4', unitCount: 16, color: '#5DADEC' },
    { id: '5', title: 'Book 5', unitCount: 16, color: '#00CC66' },
    { id: '6', title: 'Book 6', unitCount: 16, color: '#FF0000' },
    { id: '7', title: 'Book 7', unitCount: 16, color: '#00FF00' }
  ];

  const [selectedBook, setSelectedBook] = useState(null);

  if (selectedBook) {
    return (
      <UnitManagementSection 
        book={selectedBook} 
        onBack={() => setSelectedBook(null)}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" onClick={onBack} className="mr-4">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h2 className="text-xl font-semibold">Book Management</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book.id} className="hover:shadow-md transition-shadow">
            <CardHeader style={{ backgroundColor: book.color, color: '#000' }}>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                {book.unitCount} Units
              </CardDescription>
            </CardHeader>
            <CardFooter className="p-4">
              <Button 
                className="w-full" 
                onClick={() => setSelectedBook(book)}
              >
                Manage Units
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Unit Management Section
const UnitManagementSection = ({ book, onBack }) => {
  const getUnitsForBook = (book) => {
    const unitCount = book.unitCount || 18;
    return Array.from({ length: unitCount }, (_, i) => ({
      id: i + 1,
      title: `Unit ${i + 1}`,
      slideCount: Math.floor(Math.random() * 200) + 100 // Random number between 100-300 for demonstration
    }));
  };

  const units = getUnitsForBook(book);

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" onClick={onBack} className="mr-4">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Books
        </Button>
        <h2 className="text-xl font-semibold">
          {book.title} - Unit Management
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {units.map((unit) => (
          <Card key={unit.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Unit {unit.id}</CardTitle>
              <CardDescription>{unit.slideCount} slides</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <Link href={`/standalone-viewer?book=${book.id}&unit=${unit.id}`} className="w-full">
                <Button className="w-full">
                  View Content
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Content for other sections (simplified placeholders)
const PlaceholderSection = ({ title, onBack }) => (
  <div>
    <div className="flex items-center mb-6">
      <Button variant="outline" size="sm" onClick={onBack} className="mr-4">
        <ChevronLeft className="h-4 w-4 mr-1" /> Back
      </Button>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    
    <Card className="mb-6">
      <CardContent className="p-6">
        <p className="text-gray-500 mb-4">
          This section is currently under development. Features for {title.toLowerCase()} will be available soon.
        </p>
        <Link href="/standalone-viewer">
          <Button>Go to Content Viewer</Button>
        </Link>
      </CardContent>
    </Card>
  </div>
);

// Switch between different sections based on selection
const SectionContent = ({ section, onBack }) => {
  switch (section) {
    case 'books':
      return <BookManagementSection onBack={onBack} />;
    case 'users':
      return <PlaceholderSection title="User Management" onBack={onBack} />;
    case 'content':
      return <PlaceholderSection title="Content Manager" onBack={onBack} />;
    case 'resources':
      return <PlaceholderSection title="Resource Uploader" onBack={onBack} />;
    case 'settings':
      return <PlaceholderSection title="System Settings" onBack={onBack} />;
    default:
      return <PlaceholderSection title="Feature" onBack={onBack} />;
  }
};

export default AdminDashboard;