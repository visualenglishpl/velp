import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GamepadIcon, Video } from "lucide-react";

const DirectTeacherResources = ({ bookId, unitId }: { bookId: string | null, unitId: string | null }) => {
  // Only show resources for Book 7 and specific units
  if (bookId !== '7' || !unitId || !['1', '6', '9', '11'].includes(unitId)) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-700">Teacher Resources</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Unit 9 - Jobs Resource */}
        {unitId === '9' && (
          <Card key="book7-unit9-game1" className="overflow-hidden h-full border border-gray-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <GamepadIcon className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-base font-medium text-gray-800">
                    Types of Jobs - Wordwall Game
                  </CardTitle>
                </div>
              </div>
              <div className="flex mt-1 gap-2">
                <Badge variant="outline" className="bg-white/50 text-xs font-normal">game</Badge>
                <Badge variant="outline" className="bg-white/50 text-xs font-normal">Wordwall</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="w-full min-h-[300px]">
                <iframe 
                  style={{ maxWidth: '100%' }} 
                  src="https://wordwall.net/embed/97b3979a70a54b17a193a2d9c85f1d40?themeId=1&templateId=3&fontStackId=0" 
                  width="100%" 
                  height="300" 
                  frameBorder="0" 
                  allowFullScreen
                />
              </div>
            </CardContent>
            
            <CardFooter className="p-2 bg-gray-50 flex justify-between">
              <a 
                href="https://wordwall.net/resource/10037807/types-jobs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                View Source
              </a>
            </CardFooter>
          </Card>
        )}

        {/* Unit 11 - Natural Disasters Resources */}
        {unitId === '11' && (
          <>
            <Card key="book7-unit11-video1" className="overflow-hidden h-full border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-base font-medium text-gray-800">
                      CG Animated Short Film about Climate change
                    </CardTitle>
                  </div>
                </div>
                <div className="flex mt-1 gap-2">
                  <Badge variant="outline" className="bg-white/50 text-xs font-normal">video</Badge>
                  <Badge variant="outline" className="bg-white/50 text-xs font-normal">YouTube</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="w-full min-h-[300px]">
                  <iframe 
                    width="100%" 
                    height="300" 
                    src="https://www.youtube.com/embed/dKP08GCh4d4?si=NYAjQpwGFz-VsDxH" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  />
                </div>
              </CardContent>
              
              <CardFooter className="p-2 bg-gray-50 flex justify-between">
                <a 
                  href="https://www.youtube.com/watch?v=dKP08GCh4d4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  View Source
                </a>
              </CardFooter>
            </Card>

            <Card key="book7-unit11-game1" className="overflow-hidden h-full border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <GamepadIcon className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-base font-medium text-gray-800">
                      Natural Disasters Vocabulary Game
                    </CardTitle>
                  </div>
                </div>
                <div className="flex mt-1 gap-2">
                  <Badge variant="outline" className="bg-white/50 text-xs font-normal">game</Badge>
                  <Badge variant="outline" className="bg-white/50 text-xs font-normal">Wordwall</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="w-full min-h-[300px]">
                  <iframe 
                    style={{ maxWidth: '100%' }} 
                    src="https://wordwall.net/embed/f71ec9e2c30d4499b9e0fb0ba5c91a70?themeId=1&templateId=3&fontStackId=0" 
                    width="100%" 
                    height="300" 
                    frameBorder="0" 
                    allowFullScreen
                  />
                </div>
              </CardContent>
              
              <CardFooter className="p-2 bg-gray-50 flex justify-between">
                <a 
                  href="https://wordwall.net/resource/8518517/natural-disasters" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  View Source
                </a>
              </CardFooter>
            </Card>
          </>
        )}

        {/* Unit 6 - Money Resource */}
        {unitId === '6' && (
          <Card key="book7-unit6-video1" className="overflow-hidden h-full border border-gray-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-base font-medium text-gray-800">
                    Learn English: Money from 1p to 50 Pounds
                  </CardTitle>
                </div>
              </div>
              <div className="flex mt-1 gap-2">
                <Badge variant="outline" className="bg-white/50 text-xs font-normal">video</Badge>
                <Badge variant="outline" className="bg-white/50 text-xs font-normal">YouTube</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="w-full min-h-[300px]">
                <iframe 
                  width="100%" 
                  height="300" 
                  src="https://www.youtube.com/embed/RrXNezFLWSI?si=CJsKkDLw0TpfUfm7" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                />
              </div>
            </CardContent>
            
            <CardFooter className="p-2 bg-gray-50 flex justify-between">
              <a 
                href="https://www.youtube.com/watch?v=RrXNezFLWSI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                View Source
              </a>
            </CardFooter>
          </Card>
        )}

        {/* Unit 1 - Movie Genres Resources */}
        {unitId === '1' && (
          <>
            <Card key="book7-unit1-video1" className="overflow-hidden h-full border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-base font-medium text-gray-800">
                      Movie Genres Vocabulary Epic ESL Guessing Game
                    </CardTitle>
                  </div>
                </div>
                <div className="flex mt-1 gap-2">
                  <Badge variant="outline" className="bg-white/50 text-xs font-normal">video</Badge>
                  <Badge variant="outline" className="bg-white/50 text-xs font-normal">YouTube</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="w-full min-h-[300px]">
                  <iframe 
                    width="100%" 
                    height="300" 
                    src="https://www.youtube.com/embed/FTuQIwl7j3k?si=wh3So_Qj8Hqk6TL3" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  />
                </div>
              </CardContent>
              
              <CardFooter className="p-2 bg-gray-50 flex justify-between">
                <a 
                  href="https://www.youtube.com/watch?v=FTuQIwl7j3k" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  View Source
                </a>
              </CardFooter>
            </Card>

            <Card key="book7-unit1-game1" className="overflow-hidden h-full border border-gray-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <GamepadIcon className="h-5 w-5 text-green-500" />
                    <CardTitle className="text-base font-medium text-gray-800">
                      Movie & Film Genres - Wordwall Game
                    </CardTitle>
                  </div>
                </div>
                <div className="flex mt-1 gap-2">
                  <Badge variant="outline" className="bg-white/50 text-xs font-normal">game</Badge>
                  <Badge variant="outline" className="bg-white/50 text-xs font-normal">Wordwall</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="w-full min-h-[300px]">
                  <iframe 
                    style={{ maxWidth: '100%' }} 
                    src="https://wordwall.net/embed/0e3ddce1b4b54f92a65a0c702db44271?themeId=23&templateId=5&fontStackId=0" 
                    width="100%" 
                    height="300" 
                    frameBorder="0" 
                    allowFullScreen
                  />
                </div>
              </CardContent>
              
              <CardFooter className="p-2 bg-gray-50 flex justify-between">
                <a 
                  href="https://wordwall.net/resource/17566456/movies-film-genres" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  View Source
                </a>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default DirectTeacherResources;