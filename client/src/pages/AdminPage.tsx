import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Store, Settings, Users, FileQuestion, BarChart2, Shield, Bell } from 'lucide-react';

const AdminPage = () => {
  const adminFeatures = [
    {
      title: 'Books Management',
      description: 'Manage the list of educational books, units, and content',
      icon: <BookOpen className="h-10 w-10 text-white" />,
      color: '#FF40FF',
      link: '/admin/books'
    },
    {
      title: 'Shop Management',
      description: 'Configure products, pricing, and shop settings',
      icon: <Store className="h-10 w-10 text-white" />,
      color: '#FF7F27',
      link: '/admin/shop'
    },
    {
      title: 'Site Settings',
      description: 'Customize platform appearance and behavior',
      icon: <Settings className="h-10 w-10 text-white" />,
      color: '#00CEDD',
      link: '/admin/settings'
    },
    {
      title: 'User Management',
      description: 'Manage teachers, students and permissions',
      icon: <Users className="h-10 w-10 text-white" />,
      color: '#FFFF00',
      link: '/admin/users'
    },
    {
      title: 'Flagged Questions',
      description: 'Review and address flagged content',
      icon: <FileQuestion className="h-10 w-10 text-white" />,
      color: '#9966CC',
      link: '/admin/flagged'
    },
    {
      title: 'Analytics Panel',
      description: 'View platform usage statistics',
      icon: <BarChart2 className="h-10 w-10 text-white" />,
      color: '#00FF00',
      link: '/admin/analytics'
    },
    {
      title: 'Access Roles',
      description: 'Configure role-based permissions',
      icon: <Shield className="h-10 w-10 text-white" />,
      color: '#5DADEC',
      link: '/admin/roles'
    },
    {
      title: 'Broadcast Messages',
      description: 'Send notices to users',
      icon: <Bell className="h-10 w-10 text-white" />,
      color: '#00CC66',
      link: '/admin/broadcast'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="bg-blue-600 text-white py-4 px-8 rounded-full inline-block mb-4">
            <h1 className="text-3xl font-bold">Visual English Admin</h1>
          </div>
          <p className="text-xl text-gray-600">
            Manage your educational platform from one central location
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminFeatures.map((feature, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-md">
              <CardHeader 
                className="p-0"
                style={{ backgroundColor: feature.color }}
              >
                <div className="flex flex-col items-center justify-center py-5">
                  <div className="bg-white rounded-full p-3 mb-2">
                    <div style={{ color: feature.color }}>
                      {feature.icon}
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-white">{feature.title}</h2>
                </div>
              </CardHeader>
              <CardContent className="pt-4 pb-2">
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="pb-4 pt-0 flex justify-center">
                <Link href={feature.link}>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Manage
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/standalone-viewer">
            <Button variant="outline" className="mr-2">
              View Content Viewer
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;