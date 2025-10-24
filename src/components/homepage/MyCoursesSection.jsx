import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function MyCoursesSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const courses = [
    {
      id: 1,
      title: "Preventing Sexual Harassment in the Workplace",
      description: "Every employee has the right to a safe, respectful, and inclusive work environment. Learn to recognize, prevent, and respond to harassment.",
      image: "/assets/Workplace Compliance Awareness.PNG",
      progress: 22,
      level: "Beginner",
      status: "in-progress",
      scormLink: "file:///C:/Users/Cobuy/Downloads/preventing-sexual-harassment-in-the-workplace-scorm12-ZQkg0ul1/scormcontent/index.html#/lessons/ngMFy4IvstDmGOSfChlNQC3SVdHo5L5g",
      currentLesson: "Lesson 1 of 9",
      totalLessons: 9,
      completedLessons: 2,
      modules: [
        { 
          name: "Introduction", 
          progress: 91, 
          status: "in-progress",
          content: "Every employee has the right to a safe, respectful, and inclusive work environment. Sexual harassment is not just a violation of company policy—it is also a violation of trust, personal dignity, and the law."
        },
        { 
          name: "Understanding Harassment and Discrimination", 
          progress: 100, 
          status: "completed",
          content: "Learn the key differences between harassment and discrimination and understand legal definitions."
        },
        { 
          name: "What Is Sexual Harassment", 
          progress: 100, 
          status: "completed",
          content: "Understand what constitutes sexual harassment including subtle and overt behaviors."
        },
        { 
          name: "Four Forms of Sexual Harassment", 
          progress: 46, 
          status: "in-progress",
          content: "Explore the four main categories of sexual harassment in workplace settings."
        },
        { 
          name: "What to Do If You're Sexually Harassed", 
          progress: 0, 
          status: "not-started",
          content: "Learn practical steps to take if you experience sexual harassment."
        },
        { 
          name: "Bystander Intervention", 
          progress: 0, 
          status: "not-started",
          content: "Discover how to safely intervene when you witness harassment."
        },
        { 
          name: "Preventing Sexual Harassment as a Supervisor", 
          progress: 0, 
          status: "not-started",
          content: "Understand your responsibilities as a leader in preventing workplace harassment."
        },
        { 
          name: "Responding to Sexual Harassment Complaints", 
          progress: 0, 
          status: "not-started",
          content: "Learn the proper procedures for handling and responding to complaints."
        },
        { 
          name: "Summary", 
          progress: 0, 
          status: "not-started",
          content: "Review key concepts and takeaways from the training."
        }
      ],
      learningObjectives: [
        "Recognize what constitutes sexual harassment, including subtle and overt behaviors",
        "Prevent harassment by fostering awareness, respect, and proactive communication",
        "Respond appropriately if you experience, witness, or are informed about harassment",
        "Understand employee rights and responsibilities",
        "Learn reporting procedures and support resources"
      ],
      keyTopics: [
        "Definitions and examples of sexual harassment",
        "Employee rights and responsibilities",
        "Reporting procedures and support resources",
        "Practical strategies for preventing harassment in everyday workplace interactions"
      ]
    },
    {
      id: 2,
      title: "Understanding Harassment and Discrimination",
      description: "Comprehensive guide to recognizing and addressing harassment and discrimination in the workplace.",
      image: "/assets/Course2.PNG",
      progress: 100,
      level: "Beginner",
      status: "completed",
      scormLink: null,
      completedDate: "2 days ago"
    },
    {
      id: 3,
      title: "What Is Sexual Harassment",
      description: "Deep dive into understanding sexual harassment definitions, examples, and legal frameworks.",
      image: "/assets/LAw.PNG",
      progress: 100,
      level: "Beginner",
      status: "completed",
      scormLink: null,
      completedDate: "2 days ago"
    },
    {
      id: 4,
      title: "Four Forms of Sexual Harassment",
      description: "Explore the four main categories of sexual harassment and how to identify them in workplace settings.",
      image: "/assets/communication.PNG",
      progress: 46,
      level: "Beginner",
      status: "in-progress",
      scormLink: null,
      currentLesson: "In Progress"
    }
  ];

  const activeCourses = courses.filter(c => c.status === 'in-progress').length;
  const coursesPerPage = 3;
  const maxIndex = Math.max(0, courses.length - coursesPerPage);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const handleCourseClick = (course) => {
    // If course has a SCORM link, open it in a new tab
    if (course.scormLink) {
      window.open(course.scormLink, '_blank');
    } else {
      // Otherwise navigate to the course detail page
      navigate(`/courses/${course.id}`);
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 70) return 'from-green-500 to-green-600';
    if (progress >= 40) return 'from-blue-500 to-blue-600';
    if (progress > 0) return 'from-yellow-500 to-yellow-600';
    return 'from-gray-300 to-gray-400';
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
              <p className="text-xs text-gray-600 mt-0.5 max-w-2xl">
                Continue your learning journey with courses designed to strengthen labour awareness and digital capability.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full">
              <span className="text-xs font-semibold text-blue-700">
                {activeCourses} of {courses.length} Courses Active
              </span>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="p-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="p-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="relative overflow-hidden">
          <div 
            className="flex gap-5 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / coursesPerPage)}%)` }}
          >
            {courses.map((course) => (
              <div 
                key={course.id} 
                className="flex-shrink-0"
                style={{ width: `calc(${100 / coursesPerPage}% - ${(coursesPerPage - 1) * 20 / coursesPerPage}px)` }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 rounded-lg">
                  <CardContent className="p-0">
                    {/* Course Image */}
                    <div className="relative h-40 overflow-hidden rounded-t-lg bg-gray-100">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop&auto=format';
                        }}
                      />
                      {/* Level Badge */}
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-gray-200 shadow-sm">
                        <span className="text-[10px] font-semibold text-gray-700">{course.level}</span>
                      </div>
                      {/* Lock Icon if not started */}
                      {course.status === 'not-started' && (
                        <div className="absolute top-3 left-3 bg-blue-500 p-1.5 rounded-lg shadow-sm">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Course Content */}
                    <div className="p-4">
                      <h3 className="text-base font-bold text-gray-900 mb-1.5 line-clamp-1 leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2 min-h-[32px] leading-relaxed">
                        {course.description}
                      </p>

                      {/* Progress Section */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-medium text-gray-600">Progress</span>
                          <span className="text-xs font-bold text-gray-900">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${getProgressColor(course.progress)} transition-all duration-500 rounded-full`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button 
                        onClick={() => handleCourseClick(course)}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 text-sm rounded-lg shadow-sm hover:shadow-md transition-all"
                      >
                        {course.status === 'completed' ? 'Review Course' : course.status === 'not-started' ? 'Start Course' : 'Continue Course'}
                      </Button>
                      
                      {/* Course Status Info */}
                      {course.currentLesson && (
                        <p className="text-[10px] text-gray-500 mt-1.5 text-center">
                          {course.currentLesson}
                        </p>
                      )}
                      {course.completedDate && (
                        <p className="text-[10px] text-green-600 mt-1.5 text-center font-medium">
                          ✓ Completed {course.completedDate}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyCoursesSection;

