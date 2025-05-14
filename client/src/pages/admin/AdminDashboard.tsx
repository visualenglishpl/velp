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
  // Extract hex color code from tailwind-style class (e.g., 'bg-[#FF40FF]' -> '#FF40FF')
  const extractColorCode = (colorClass: string) => {
    const match = colorClass.match(/\[#(.*?)\]/);
    return match ? `#${match[1]}` : '#000000';
  };
  
  const iconColor = extractColorCode(color);
  
  // Clone and modify icon with correct color
  const styledIcon = React.cloneElement(icon as React.ReactElement, {
    style: { color: iconColor }
  });
  
  return (
    <div className="h-full">
      <Card className={`rounded-xl overflow-hidden shadow-lg h-full flex flex-col border-2 border-gray-200 hover:shadow-xl transition-shadow duration-300`}>
        {/* Icon header section */}
        <div className={`relative flex items-center justify-center w-full aspect-square overflow-hidden ${color}`}>
          <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 flex items-center justify-center">
              {styledIcon}
            </div>
            <h3 className="text-xl font-bold text-white drop-shadow-md">{title}</h3>
          </div>
        </div>
        
        {/* Action section */}
        <CardContent className="p-4 text-center flex-grow flex flex-col bg-white">
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
      icon: <BookOpen size={42} />,
      color: 'bg-[#FF40FF]', // Pink (Book 0a)
      buttonColor: 'bg-[#FF40FF]',
      route: '/admin/books' // Direct link to admin books management page
    },
    {
      title: 'Shop Management',
      description: 'Configure products, pricing, and shop settings',
      icon: <Store size={42} />,
      color: 'bg-[#FF7F27]', // Orange (Book 0b)
      buttonColor: 'bg-[#FF7F27]', 
      route: '/admin/shop'
    },
    {
      title: 'Site Settings',
      description: 'Customize platform appearance and behavior',
      icon: <Settings size={42} />,
      color: 'bg-[#00CEDD]', // Teal (Book 0c)
      buttonColor: 'bg-[#00CEDD]',
      route: '/admin/settings'
    },
    {
      title: 'User Management',
      description: 'Manage teachers, students and permissions',
      icon: <Users size={42} />,
      color: 'bg-[#FFFF00]', // Yellow (Book 1)
      buttonColor: 'bg-[#FFFF00]',
      route: '/admin/users'
    },
    {
      title: 'Flagged Questions',
      description: 'Review and address content issues reported by users',
      icon: <FileQuestion size={42} />,
      color: 'bg-[#9966CC]', // Purple (Book 2)
      buttonColor: 'bg-[#9966CC]',
      route: '/admin/flagged'
    },
    {
      title: 'Analytics Panel',
      description: 'View platform usage statistics and reports',
      icon: <BarChart3 size={42} />,
      color: 'bg-[#00CC00]', // Green (Book 3)
      buttonColor: 'bg-[#00CC00]',
      route: '/admin/analytics'
    },
    {
      title: 'Access Roles',
      description: 'Configure role-based access controls',
      icon: <Shield size={42} />,
      color: 'bg-[#5DADEC]', // Blue (Book 4)
      buttonColor: 'bg-[#5DADEC]',
      route: '/admin/roles'
    },
    {
      title: 'Broadcast Messages',
      description: 'Send announcements to users and manage notifications',
      icon: <Bell size={42} />,
      color: 'bg-[#00CC66]', // Green (Book 5)
      buttonColor: 'bg-[#00CC66]',
      route: '/admin/broadcast'
    },
    {
      title: 'Feedback Viewer',
      description: 'View and respond to user feedback and suggestions',
      icon: <MessageSquare size={42} />,
      color: 'bg-[#FF0000]', // Red (Book 6)
      buttonColor: 'bg-[#FF0000]',
      route: '/admin/feedback'
    },
    {
      title: 'Payment History',
      description: 'View transaction history and manage subscriptions',
      icon: <CreditCard size={42} />,
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