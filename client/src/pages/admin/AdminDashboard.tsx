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
      <Card className={`rounded-xl overflow-hidden shadow-lg h-full flex flex-col border-2 border-gray-200 hover:shadow-xl transition-shadow duration-300`}>
        {/* Icon header section */}
        <div className={`relative flex items-center justify-center w-full aspect-square overflow-hidden ${color}`}>
          <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white rounded-full p-3 shadow-lg mb-3">
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
      icon: <BookOpen className="h-10 w-10 text-[#FF40FF]" />,
      color: 'bg-[#FF40FF]', // Pink (Book 0a)
      buttonColor: 'bg-[#FF40FF]',
      route: '/admin/books' // Direct link to admin books management page
    },
    {
      title: 'Shop Management',
      description: 'Configure products, pricing, and shop settings',
      icon: <Store className="h-10 w-10 text-[#FF7F27]" />,
      color: 'bg-[#FF7F27]', // Orange (Book 0b)
      buttonColor: 'bg-[#FF7F27]', 
      route: '/admin/shop'
    },
    {
      title: 'Site Settings',
      description: 'Customize platform appearance and behavior',
      icon: <Settings className="h-10 w-10 text-[#00CEDD]" />,
      color: 'bg-[#00CEDD]', // Teal (Book 0c)
      buttonColor: 'bg-[#00CEDD]',
      route: '/admin/settings'
    },
    {
      title: 'User Management',
      description: 'Manage teachers, students and permissions',
      icon: <Users className="h-10 w-10 text-[#FFFF00]" />,
      color: 'bg-[#FFFF00]', // Yellow (Book 1)
      buttonColor: 'bg-[#FFFF00]',
      route: '/admin/users'
    },
    {
      title: 'Flagged Questions',
      description: 'Review and address content issues reported by users',
      icon: <FileQuestion className="h-10 w-10 text-[#9966CC]" />,
      color: 'bg-[#9966CC]', // Purple (Book 2)
      buttonColor: 'bg-[#9966CC]',
      route: '/admin/flagged'
    },
    {
      title: 'Analytics Panel',
      description: 'View platform usage statistics and reports',
      icon: <BarChart3 className="h-10 w-10 text-[#00CC00]" />,
      color: 'bg-[#00CC00]', // Green (Book 3)
      buttonColor: 'bg-[#00CC00]',
      route: '/admin/analytics'
    },
    {
      title: 'Access Roles',
      description: 'Configure role-based access controls',
      icon: <Shield className="h-10 w-10 text-[#5DADEC]" />,
      color: 'bg-[#5DADEC]', // Blue (Book 4)
      buttonColor: 'bg-[#5DADEC]',
      route: '/admin/roles'
    },
    {
      title: 'Broadcast Messages',
      description: 'Send announcements to users and manage notifications',
      icon: <Bell className="h-10 w-10 text-[#00CC66]" />,
      color: 'bg-[#00CC66]', // Green (Book 5)
      buttonColor: 'bg-[#00CC66]',
      route: '/admin/broadcast'
    },
    {
      title: 'Feedback Viewer',
      description: 'View and respond to user feedback and suggestions',
      icon: <MessageSquare className="h-10 w-10 text-[#FF0000]" />,
      color: 'bg-[#FF0000]', // Red (Book 6)
      buttonColor: 'bg-[#FF0000]',
      route: '/admin/feedback'
    },
    {
      title: 'Payment History',
      description: 'View transaction history and manage subscriptions',
      icon: <CreditCard className="h-10 w-10 text-[#00FF00]" />,
      color: 'bg-[#00FF00]', // Bright Green (Book 7)
      buttonColor: 'bg-[#00FF00]',
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

      {/* Responsive grid layout - 4 per row on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {adminModules.map((module, index) => (
          <AdminModuleCard key={index} {...module} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;