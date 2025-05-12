import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, Eye } from 'lucide-react';

export default function SimpleNavPage() {
  // Define quick navigation links
  const navItems = [
    {
      title: 'Simple Admin Dashboard',
      description: 'Admin dashboard without authentication',
      link: '/admin/simple',
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      buttonText: 'Go to Simple Admin'
    },
    {
      title: 'Books Management',
      description: 'Manage books without authentication',
      link: '/admin/simple-books',
      icon: <FileText className="h-6 w-6 text-purple-600" />,
      buttonText: 'Go to Books Management'
    },
    {
      title: 'Standalone Viewer',
      description: 'View content directly without authentication',
      link: '/standalone-viewer',
      icon: <Eye className="h-6 w-6 text-green-600" />,
      buttonText: 'Go to Content Viewer'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Visual English Navigator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quick navigation to content without authentication requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {navItems.map((item, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-2">{item.icon}</div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={item.link} className="w-full">
                  <Button className="w-full">{item.buttonText}</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}