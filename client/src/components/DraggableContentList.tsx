import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { GripVertical, X, Edit, Eye } from "lucide-react";

// Type for content item
interface ContentItem {
  id: string;
  title: string;
  type: string;
  orderIndex: number;
  thumbnail?: string;
  path?: string;
}

// Props for the component
interface DraggableContentListProps {
  items: ContentItem[];
  onReorder: (reorderedItems: ContentItem[]) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
}

// Reorder helper function
const reorder = (list: ContentItem[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  // Update the orderIndex on all items
  return result.map((item, index) => ({
    ...item,
    orderIndex: index
  }));
};

const DraggableContentList: React.FC<DraggableContentListProps> = ({
  items,
  onReorder,
  onDelete,
  onEdit,
  onView
}) => {
  // Handle drag end
  const handleDragEnd = (result: DropResult) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    // No movement
    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    onReorder(reorderedItems);
  };

  // Get appropriate icon based on content type
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "image":
        return <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>;
      case "video":
        return <div className="w-4 h-4 bg-red-500 rounded-sm"></div>;
      case "audio":
        return <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>;
      case "document":
        return <div className="w-4 h-4 bg-green-500 rounded-sm"></div>;
      default:
        return <div className="w-4 h-4 bg-gray-500 rounded-sm"></div>;
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="content-list">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`flex items-center p-3 rounded-md border ${
                      snapshot.isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
                    } shadow-sm transition-all duration-200`}
                  >
                    {/* Drag handle */}
                    <div {...provided.dragHandleProps} className="mr-3 text-gray-400 cursor-grab">
                      <GripVertical size={18} />
                    </div>

                    {/* Thumbnail or type icon */}
                    <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden bg-gray-100 mr-3 flex items-center justify-center">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          {getTypeIcon(item.type)}
                        </div>
                      )}
                    </div>

                    {/* Content info */}
                    <div className="flex-grow min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
                      <p className="text-xs text-gray-500">
                        {item.type} • Order: {item.orderIndex + 1}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 ml-2">
                      {onView && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-blue-600"
                          onClick={() => onView(item.id)}
                          title="View"
                        >
                          <Eye size={16} />
                        </Button>
                      )}
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-amber-600"
                          onClick={() => onEdit(item.id)}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-red-600"
                          onClick={() => onDelete(item.id)}
                          title="Delete"
                        >
                          <X size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableContentList;