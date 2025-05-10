import React from 'react';
import { Link } from 'wouter';
import { 
  BookOpen, 
  Settings, 
  Users, 
  FileQuestion, 
  BarChart3, 
  Shield, 
  MessageSquare, 
  CreditCard,
  Store,
  Bell
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AdminModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  route: string;
  buttonColor: string;
  buttonText?: string;
}

const AdminModuleCard: React.FC<AdminModuleCardProps> = ({
  title,
  description,
  icon,
  color,
  route,
  buttonColor,
  buttonText = 'Manage'
}) => {
  return (
    <div className="h-full">
      <Card className={`rounded-xl overflow-hidden shadow-md h-full flex flex-col ${color}`}>
        {/* Icon header section */}
        <div className="relative flex items-center justify-center w-full aspect-square overflow-hidden">
          <div className={`absolute inset-0 bg-opacity-20 ${buttonColor}`}></div>
          <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white rounded-full p-5 shadow-md mb-3">
              {icon}
            </div>
            <h3 className="text-xl font-bold text-white drop-shadow-md">{title}</h3>
          </div>
        </div>
        
        {/* Description and action section */}
        <CardContent className="p-4 text-center flex-grow flex flex-col bg-white">
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="mt-auto">
            <Link href={route}>
              <Button 
                className="w-full text-white" 
                style={{ backgroundColor: buttonColor.replace('bg-', '') }}
              >
                {buttonText}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard = () => {
  // Define admin modules with appropriate styling and routes
  const adminModules: AdminModuleCardProps[] = [
    {
      title: 'Books Management',
      description: 'Manage the list of educational books, units, and content',
      icon: <BookOpen className="h-8 w-8 text-pink-600" />,
      color: 'bg-pink-100',
      buttonColor: 'bg-pink-600',
      route: '/admin/books'
    },
    {
      title: 'Shop Management',
      description: 'Configure products, pricing, and shop settings',
      icon: <Store className="h-8 w-8 text-purple-600" />,
      color: 'bg-purple-100',
      buttonColor: 'bg-purple-600', 
      route: '/admin/shop'
    },
    {
      title: 'Site Settings',
      description: 'Customize platform appearance and behavior',
      icon: <Settings className="h-8 w-8 text-blue-600" />,
      color: 'bg-blue-100',
      buttonColor: 'bg-blue-600',
      route: '/admin/settings'
    },
    {
      title: 'User Management',
      description: 'Manage teachers, students and permissions',
      icon: <Users className="h-8 w-8 text-teal-600" />,
      color: 'bg-teal-100',
      buttonColor: 'bg-teal-600',
      route: '/admin/users'
    },
    {
      title: 'Flagged Questions',
      description: 'Review and address content issues reported by users',
      icon: <FileQuestion className="h-8 w-8 text-amber-600" />,
      color: 'bg-amber-100',
      buttonColor: 'bg-amber-600',
      route: '/admin/flagged'
    },
    {
      title: 'Analytics Panel',
      description: 'View platform usage statistics and reports',
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      color: 'bg-green-100',
      buttonColor: 'bg-green-600',
      route: '/admin/analytics'
    },
    {
      title: 'Access Roles',
      description: 'Configure role-based access controls',
      icon: <Shield className="h-8 w-8 text-red-600" />,
      color: 'bg-red-100',
      buttonColor: 'bg-red-600',
      route: '/admin/roles'
    },
    {
      title: 'Broadcast Messages',
      description: 'Send announcements to users and manage notifications',
      icon: <Bell className="h-8 w-8 text-indigo-600" />,
      color: 'bg-indigo-100',
      buttonColor: 'bg-indigo-600',
      route: '/admin/broadcast'
    },
    {
      title: 'Feedback Viewer',
      description: 'View and respond to user feedback and suggestions',
      icon: <MessageSquare className="h-8 w-8 text-cyan-600" />,
      color: 'bg-cyan-100',
      buttonColor: 'bg-cyan-600',
      route: '/admin/feedback'
    },
    {
      title: 'Payment History',
      description: 'View transaction history and manage subscriptions',
      icon: <CreditCard className="h-8 w-8 text-orange-600" />,
      color: 'bg-orange-100',
      buttonColor: 'bg-orange-600',
      route: '/admin/payments'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl px-6 py-3 mb-2 shadow-md">
          <h1 className="text-3xl font-extrabold text-white">Visual English Admin</h1>
        </div>
        <p className="text-gray-600 text-lg">Manage your educational platform from one central location</p>
      </div>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminModules.map((module, index) => (
          <AdminModuleCard key={index} {...module} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;