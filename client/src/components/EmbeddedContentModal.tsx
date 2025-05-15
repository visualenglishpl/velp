import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TeacherResource } from './TeacherResources';

interface EmbeddedContentModalProps {
  resource: TeacherResource | null;
  onClose: () => void;
}

export const EmbeddedContentModal: React.FC<EmbeddedContentModalProps> = ({ 
  resource, 
  onClose
}) => {
  if (!resource) return null;

  return (
    <Dialog 
      open={!!resource} 
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center mb-4">
            {resource.title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto flex items-center justify-center h-[80vh]">
          {resource.embedCode && (
            <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: resource.embedCode }} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmbeddedContentModal;