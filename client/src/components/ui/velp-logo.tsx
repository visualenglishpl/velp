import { Book } from 'lucide-react';

interface VelpLogoProps extends React.HTMLAttributes<HTMLDivElement> {}

const VelpLogo = ({ className, ...props }: VelpLogoProps) => {
  return (
    <div className={`flex items-center ${className}`} {...props}>
      <Book className="h-full w-auto text-primary" />
      <span className="ml-2 font-bold text-primary">Visual English</span>
    </div>
  );
};

export default VelpLogo;