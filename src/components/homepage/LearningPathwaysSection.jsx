import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

const CourseCard = ({ image, title, description, progress, level, isStarted }) => {
  const levelColors = {
    'Beginner': 'bg-green-100 text-green-700 border-green-200',
    'Intermediate': 'bg-blue-100 text-blue-700 border-blue-200',
    'Advanced': 'bg-purple-100 text-purple-700 border-purple-200',
  };

  return (
    <Card className="h-full border-2 bg-white hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:border-[#004E9A]/30 group overflow-hidden">
      {/* Course Image */}
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-100 to-blue-50">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Level Badge - Positioned on Image */}
        {level && (
          <div className="absolute top-3 right-3">
            <Badge className={`${levelColors[level]} border font-medium text-xs px-2 py-1 shadow-md`}>
              {level}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-5 flex flex-col">
        {/* Title and Description */}
        <div className="flex-1 mb-4">
          <h3 className="font-bold text-gray-900 mb-2 text-base leading-tight group-hover:text-[#004E9A] transition-colors" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Progress Bar */}
        {isStarted && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">Progress</span>
              <span className="text-xs font-bold text-[#004E9A]">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#004E9A] to-[#F5C518] h-2 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button 
          className={`w-full ${isStarted ? 'bg-[#004E9A] hover:bg-[#003d7a]' : 'bg-[#F5C518] hover:bg-[#d4a614] text-gray-900'} text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg`}
        >
          {isStarted ? 'Continue Course' : 'Start Now'}
        </Button>
      </CardContent>
    </Card>
  );
};

export function LearningPathwaysSection() {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  // Mock course data - replace with actual API data
  const courses = [
    {
      id: 1,
      image: "/assets/Digital literacy.jpg",
      title: "Digital Literacy for Workers",
      description: "Master essential digital skills to thrive in modern workplaces.",
      progress: 65,
      level: "Beginner",
      isStarted: true
    },
    {
      id: 2,
      image: "/assets/UnderstandingNewLabourCodes.PNG",
      title: "Understanding New Labour Codes",
      description: "Learn about your rights and responsibilities under reformed labour laws.",
      progress: 30,
      level: "Beginner",
      isStarted: true
    },
    {
      id: 3,
      image: "/assets/Course.jpg",
      title: "Trainer Enablement Program",
      description: "Develop skills to train others effectively on labour reforms and digital tools.",
      progress: 0,
      level: "Advanced",
      isStarted: false
    },
    {
      id: 4,
      image: "/assets/Workplace Compliance Awareness.PNG",
      title: "Workplace Compliance Awareness",
      description: "Understand and implement workplace compliance standards and safety protocols.",
      progress: 0,
      level: "Intermediate",
      isStarted: false
    },
    {
      id: 5,
      image: "/assets/Course.jpg",
      title: "Professional Certification Track",
      description: "Complete structured learning modules to earn recognized professional certifications.",
      progress: 45,
      level: "Intermediate",
      isStarted: true
    },
    {
      id: 6,
      image: "/assets/Digital literacy.jpg",
      title: "Leadership & Management Fundamentals",
      description: "Build leadership capabilities for effective team and project management.",
      progress: 0,
      level: "Advanced",
      isStarted: false
    },
  ];

  const completedCourses = courses.filter(c => c.progress === 100).length;
  const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100).length;

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-blue-50/50 py-8 px-6 rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
              <span className="text-2xl">📚</span>
              My Courses
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl">
              Continue your learning journey with courses designed to strengthen labour awareness and digital capability.
            </p>
          </div>
          
          {/* Summary Pill */}
          <div className="flex items-center gap-3">
            <div className="bg-white border-2 border-[#004E9A]/20 rounded-full px-4 py-2 shadow-sm">
              <span className="text-sm font-semibold text-[#004E9A]">
                {completedCourses + inProgressCourses} of {courses.length} Courses Active
              </span>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="h-9 w-9 rounded-full border-2 disabled:opacity-30 hover:bg-[#004E9A] hover:text-white hover:border-[#004E9A] transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="h-9 w-9 rounded-full border-2 disabled:opacity-30 hover:bg-[#004E9A] hover:text-white hover:border-[#004E9A] transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="max-w-7xl mx-auto relative">
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {courses.map((course) => (
            <div key={course.id} className="flex-shrink-0 w-[320px]">
              <CourseCard {...course} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer - Supported by GIZ */}
      <div className="max-w-7xl mx-auto mt-6 flex justify-end">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Supported by</span>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
            <div className="w-5 h-5 bg-[#004E9A] rounded-sm flex items-center justify-center text-white font-bold text-[8px]">
              GIZ
            </div>
            <span className="font-semibold text-[#004E9A]">Deutsche Gesellschaft</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LearningPathwaysSection;

