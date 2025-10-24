import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  PlayCircle,
  FileText,
  Video,
  Bell,
  ChevronRight
} from 'lucide-react';

const AnnouncementItem = ({ announcement, isActive, onClick }) => {
  const { t } = useTranslation();
  const typeIcons = {
    'reform': FileText,
    'webinar': Video,
    'video': PlayCircle,
  };

  const typeColors = {
    'reform': 'text-[#004E9A]',
    'webinar': 'text-purple-600',
    'video': 'text-red-600',
  };

  const Icon = typeIcons[announcement.type] || FileText;

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-2 rounded-md transition-all duration-200
        ${isActive 
          ? 'bg-gray-100 border border-gray-300' 
          : 'bg-white hover:bg-gray-50 border border-gray-200'
        }
      `}
    >
      <div className="flex items-center gap-2">
        <div className="p-1 rounded bg-gray-100 flex-shrink-0">
          <Icon className="w-3 h-3 text-gray-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-xs text-gray-900 truncate" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
            {announcement.title}
          </h4>
          <div className="flex items-center gap-1 text-[10px] text-gray-500">
            <Calendar className="w-2 h-2" />
            <span>{announcement.date}</span>
          </div>
        </div>
        {announcement.isNew && (
          <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
        )}
      </div>
    </button>
  );
};

export function AwarenessUpdatesSection() {
  const { t } = useTranslation();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(0);

  // Placeholder content for demonstration
  const announcements = [
    {
      id: 1,
      type: 'webinar',
      title: 'Item 1',
      date: 'Date 1',
      description: 'Placeholder content.',
      thumbnail: '/assets/digital.PNG',
      isNew: true,
      hasVideo: true
    },
    {
      id: 2,
      type: 'video',
      title: 'Item 2',
      date: 'Date 2',
      description: 'Placeholder content.',
      thumbnail: '/assets/UnderstandingNewLabourCodes.PNG',
      isNew: true,
      hasVideo: true
    },
    {
      id: 3,
      type: 'reform',
      title: 'Item 3',
      date: 'Date 3',
      description: 'Placeholder content.',
      thumbnail: '/assets/Course.jpg',
      isNew: false,
      hasVideo: false
    }
  ];

  const currentAnnouncement = announcements[selectedAnnouncement];

  return (
    <section className="w-full bg-white py-6 px-4 rounded-xl border border-gray-200">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
          <span className="text-lg">📋</span>
          Awareness Updates
        </h2>
        <p className="text-xs text-gray-500">
          Stay updated with the latest awareness updates and resources.
        </p>
      </div>

      {/* Split View Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Side - Featured Media Panel */}
        <div className="lg:col-span-2">
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-0">
              {/* Featured Image/Video */}
              <div className="relative h-[120px] bg-gray-100">
                <img 
                  src={currentAnnouncement.thumbnail} 
                  alt={currentAnnouncement.title}
                  className="w-full h-full object-cover"
                />
                {currentAnnouncement.isNew && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-red-500 text-white border-none text-[10px] px-1.5 py-0.5">
                      New
                    </Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-gray-100 text-gray-700 text-[10px] px-2 py-0.5">
                    {currentAnnouncement.type}
                  </Badge>
                  <span className="text-[10px] text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {currentAnnouncement.date}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
                  {currentAnnouncement.title}
                </h3>

                <p className="text-xs text-gray-600 mb-2">
                  {currentAnnouncement.description}
                </p>

                <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs py-1.5">
                  {currentAnnouncement.hasVideo ? 'Watch' : 'Read'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Scrollable Announcements List */}
        <div className="lg:col-span-1">
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-3">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
                <Bell className="w-4 h-4 text-gray-600" />
                List Title
              </h3>
              
              <div className="space-y-1 max-h-[200px] overflow-y-auto">
                {announcements.map((announcement, index) => (
                  <AnnouncementItem
                    key={announcement.id}
                    announcement={announcement}
                    isActive={selectedAnnouncement === index}
                    onClick={() => setSelectedAnnouncement(index)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default AwarenessUpdatesSection;

