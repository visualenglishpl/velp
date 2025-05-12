import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, BookCopy, Settings, Upload, FileText, School, Database } from 'lucide-react';

export default function SimpleAdminDashboard() {
  // Admin dashboard cards configuration
  const adminCards = [
    {
      title: 'Books Management',
      description: 'Manage books, units, and content',
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      link: '/admin/simple-books',
      color: 'bg-purple-50'
    },
    {
      title: 'Users Management',
      description: 'Manage teachers, students and admins',
      icon: <Users className="h-8 w-8 text-blue-600" />,
      link: '/admin/users',
      color: 'bg-blue-50'
    },
    {
      title: 'Schools Management',
      description: 'Manage school accounts and subscriptions',
      icon: <School className="h-8 w-8 text-green-600" />,
      link: '/admin/schools',
      color: 'bg-green-50'
    },
    {
      title: 'Content Uploads',
      description: 'Upload new books and materials',
      icon: <Upload className="h-8 w-8 text-amber-600" />,
      link: '/admin/uploads',
      color: 'bg-amber-50'
    },
    {
      title: 'System Settings',
      description: 'Configure platform settings',
      icon: <Settings className="h-8 w-8 text-gray-600" />,
      link: '/admin/settings',
      color: 'bg-gray-50'
    },
    {
      title: 'Standalone Viewer',
      description: 'Access content directly without auth',
      icon: <BookCopy className="h-8 w-8 text-teal-600" />,
      link: '/standalone-viewer',
      color: 'bg-teal-50'
    },
    {
      title: 'Books Page',
      description: 'View all available books',
      icon: <FileText className="h-8 w-8 text-red-600" />,
      link: '/books',
      color: 'bg-red-50'
    },
    {
      title: 'Database Diagnostics',
      description: 'Check system health and connections',
      icon: <Database className="h-8 w-8 text-indigo-600" />,
      link: '/admin/diagnostics',
      color: 'bg-indigo-50'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-lg text-gray-500">
              Welcome to the Visual English Learning Platform admin area
            </p>
          </div>
        </header>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminCards.map((card, index) => (
            <Card key={index} className={`shadow-sm transition-all hover:shadow ${card.color}`}>
              <CardHeader className="px-6 pt-6 pb-4">
                <div className="mb-3">
                  {card.icon}
                </div>
                <CardTitle className="text-xl">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardFooter className="px-6 pb-6 pt-0">
                <Link href={card.link} className="w-full">
                  <Button className="w-full bg-gray-900 hover:bg-gray-700">
                    Access
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}