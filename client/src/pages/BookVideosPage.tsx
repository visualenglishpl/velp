import React from 'react';
import { Play } from 'lucide-react';

const BookVideosPage = () => {
  const bookVideos = [
    {
      id: 'book1',
      title: 'Visual English Book 1 Flip Through',
      youtubeId: 'RJiO6ozydDs',
      description: 'Explore the interactive content and visual learning materials in Book 1'
    },
    {
      id: 'book2',
      title: 'Visual English Book 2 Flip Through',
      youtubeId: 'S3faBMGbArg',
      description: 'Discover advanced lessons and activities in Book 2'
    },
    {
      id: 'book3',
      title: 'Visual English Book 3 Flip Through',
      youtubeId: 'WaGwUQAl23g',
      description: 'See the comprehensive learning approach in Book 3'
    },
    {
      id: 'book4',
      title: 'Visual English Book 4 Flip Through',
      youtubeId: 'b40lPAEW94A',
      description: 'Preview the engaging content and exercises in Book 4'
    },
    {
      id: 'book5',
      title: 'Visual English Book 5 Flip Through',
      youtubeId: 'mVTOOry-FJ0',
      description: 'Explore intermediate level materials in Book 5'
    },
    {
      id: 'book6',
      title: 'Visual English Book 6 Flip Through',
      youtubeId: '-BCA1gy9P9E',
      description: 'Discover advanced learning concepts in Book 6'
    },
    {
      id: 'book7',
      title: 'Visual English Book 7 Flip Through',
      youtubeId: 'iYka_tbZhMI',
      description: 'See comprehensive language skills development in Book 7'
    },
    {
      id: 'book0a',
      title: 'Visual English Book 0A Flip Through',
      youtubeId: 'f1JcBYmQvPE',
      description: 'Perfect starter book for young learners'
    },
    {
      id: 'book0b',
      title: 'Visual English Book 0B Flip Through',
      youtubeId: 'BkISgzgzcWc',
      description: 'Building foundation skills for early learners'
    },
    {
      id: 'book0c',
      title: 'Visual English Book 0C Flip Through',
      youtubeId: '3PAJ4vSbZIc',
      description: 'Advanced starter content for young English learners'
    }
  ];

  const openVideo = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Visual English Book Videos
          </h1>
          <p className="text-gray-600 text-center text-lg max-w-3xl mx-auto">
            Take a peek inside our Visual English books with these detailed flip-through videos. 
            See the interactive content, visual learning materials, and engaging activities that make our books special.
          </p>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bookVideos.map((video) => (
            <div 
              key={video.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Video Thumbnail */}
              <div 
                className="relative aspect-video cursor-pointer group"
                onClick={() => openVideo(video.youtubeId)}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                  <div className="bg-red-600 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  Preview
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {video.description}
                </p>
                <button
                  onClick={() => openVideo(video.youtubeId)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Watch on YouTube
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-6">
              Experience the Visual English learning method with our interactive books and comprehensive teaching materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/#books"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Browse Our Books
              </a>
              <a 
                href="/#pricing"
                className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookVideosPage;