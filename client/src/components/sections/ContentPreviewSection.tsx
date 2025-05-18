import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Eye, Book, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Sample content to preview - in production, this would come from your API
const sampleImages = [
  {
    bookId: '1',
    unit: 1,
    title: 'My Classroom',
    previewImage: 'https://via.placeholder.com/600x400?text=Classroom+Vocabulary',
    description: 'Learn vocabulary related to classroom objects and settings.'
  },
  {
    bookId: '2',
    unit: 3,
    title: 'Colors and Shapes',
    previewImage: 'https://via.placeholder.com/600x400?text=Colors+and+Shapes',
    description: 'Explore different colors and geometric shapes through visual learning.'
  },
  {
    bookId: '0a',
    unit: 2,
    title: 'Fruits and Vegetables',
    previewImage: 'https://via.placeholder.com/600x400?text=Fruits+and+Vegetables',
    description: 'Discover names of common fruits and vegetables with vibrant visuals.'
  },
  {
    bookId: '3',
    unit: 5,
    title: 'My Town',
    previewImage: 'https://via.placeholder.com/600x400?text=Town+Places',
    description: 'Learn about different places in town and directions.'
  }
];

// Sample video resources
const sampleVideos = [
  {
    title: 'Colors Song',
    thumbnail: 'https://via.placeholder.com/320x180?text=Colors+Song',
    provider: 'YouTube',
    description: 'A fun song to help children learn their colors.',
    previewAvailable: true
  },
  {
    title: 'Shapes in Our World',
    thumbnail: 'https://via.placeholder.com/320x180?text=Shapes+Song',
    provider: 'YouTube',
    description: 'Identifying shapes in everyday objects.',
    previewAvailable: true
  },
  {
    title: 'Greetings Song',
    thumbnail: 'https://via.placeholder.com/320x180?text=Greetings+Song',
    provider: 'YouTube',
    description: 'Learn how to say hello and goodbye in English.',
    previewAvailable: true
  }
];

// Color assignments for books
const getBookColor = (bookId: string): string => {
  switch (bookId) {
    case '0a': return '#FF40FF'; // Pink
    case '0b': return '#FF7F27'; // Orange
    case '0c': return '#00CEDD'; // Teal
    case '1': return '#FFFF00'; // Yellow
    case '2': return '#9966CC'; // Purple
    case '3': return '#00CC00'; // Green
    case '4': return '#5DADEC'; // Blue
    case '5': return '#00CC66'; // Green
    case '6': return '#FF0000'; // Red
    case '7': return '#00FF00'; // Bright Green
    default: return '#6b7280'; // Gray
  }
};

const ContentPreviewSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('images');

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % sampleImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + sampleImages.length) % sampleImages.length);
  };

  const currentImage = sampleImages[currentImageIndex];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Sample Content Preview</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore sample content from our Visual English books. These previews give you a taste of our 
          teaching methodology and the quality of our materials.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="images" className="flex items-center">
            <Book className="h-4 w-4 mr-2" />
            Book Content
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center">
            <Play className="h-4 w-4 mr-2" />
            Video Resources
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <TabsContent value="images" className="mt-0">
        <div className="relative max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="absolute top-0 left-0 z-10 m-4">
            <Badge 
              style={{
                backgroundColor: getBookColor(currentImage.bookId),
                color: ['1', '0a'].includes(currentImage.bookId) ? '#000' : '#fff'
              }}
              className="font-bold"
            >
              Book {currentImage.bookId}
            </Badge>
          </div>
          
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-2/3 h-64 md:h-80 bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={currentImage.previewImage} 
                  alt={currentImage.title} 
                  className="object-cover w-full h-full"
                />
                
                {/* Preview label */}
                <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-1 text-sm font-bold">
                  PREVIEW
                </div>
                
                {/* Blurred overlay on bottom part */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="text-white p-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">Unit {currentImage.unit}</h3>
                      <p className="text-sm">{currentImage.title}</p>
                    </div>
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview More
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Navigation arrows */}
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="w-full md:w-1/3 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">{currentImage.title}</h3>
                <p className="text-gray-600 mb-4">{currentImage.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Interactive Q&A pairs</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>Visual learning approach</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span>Teacher resources included</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full">Try Free for 7 Days</Button>
              </div>
            </div>
          </div>
          
          {/* Preview indicator */}
          <div className="flex justify-center p-4 gap-1.5">
            {sampleImages.map((_, idx) => (
              <motion.div 
                key={idx}
                className={`h-1.5 rounded-full ${idx === currentImageIndex ? 'w-6 bg-primary' : 'w-1.5 bg-gray-300'}`}
                onClick={() => setCurrentImageIndex(idx)}
                whileHover={{ scale: 1.2 }}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="videos" className="mt-0">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleVideos.map((video, idx) => (
              <Card key={idx} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors">
                    <Button variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white">
                      <Play className="h-5 w-5 mr-2" fill="currentColor" />
                      Watch Preview
                    </Button>
                  </div>
                  {video.previewAvailable && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs font-bold">
                      FREE PREVIEW
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-1">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <BookOpen className="h-3 w-3 mr-1" />
                    <span>Preview available without subscription</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="mx-auto">
              View More Sample Content
            </Button>
          </div>
        </div>
      </TabsContent>
    </div>
  );
};

export default ContentPreviewSection;