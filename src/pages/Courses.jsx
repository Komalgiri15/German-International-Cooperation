import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Clock, Filter, Search, Plus, Grid, List, Compass, UserPlus, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';
import { EnrollCourseDialog } from '@/components/courses/EnrollCourseDialog';
import { CourseOptionsMenu } from '@/components/courses/CourseOptionsMenu';
import { Tabs, TabsList, TabsTrigger, PillTabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';

const Courses = () => {
  const [view, setView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  // Removed course access type (open/sequential)
  const [activeTab, setActiveTab] = useState('courses');
  const navigate = useNavigate();

  // GIZ-Aligned Labour Reform Initiative Courses
  const mockCourses = [
    {
      id: 1,
      title: "Strategic Communication",
      description: "Master effective communication strategies for labour reform advocacy and stakeholder collaboration in organizational and policy contexts.",
      students: 342,
      duration: "8 weeks",
      fullDuration: "8 Weeks (adaptable for 6-week intensive program)",
      format: "Hybrid (workshops, online labs, project consultancy)",
      output: "Strategic Communication Plan (Capstone)",
      level: "Intermediate",
      status: "Active",
      image: "/assets/communication.PNG",
      archived: false,
      deleted: false,
      catalog: "Labour Reform"
    },
    {
      id: 2,
      title: "Digital Learning Pathways",
      description: "Explore digital tools, e-learning platforms, and innovative pathways for skill development and workforce empowerment in the digital age.",
      students: 456,
      duration: "10 weeks",
      fullDuration: "10 Weeks (adaptable for 8-week intensive program)",
      format: "Hybrid (workshops, e-learning modules, hands-on projects)",
      output: "Digital Learning Rollout Plan (Capstone)",
      level: "Beginner",
      status: "Active",
      image: "/assets/digital.PNG",
      archived: false,
      deleted: false,
      catalog: "Digital Skills"
    },
    {
      id: 3,
      title: "Stakeholder Engagement for Labour Reform Initiatives",
      description: "Build expertise in engaging diverse stakeholders—employers, workers, policymakers—to drive meaningful labour law reforms and compliance.",
      students: 289,
      duration: "12 weeks",
      fullDuration: "12 Weeks (adaptable for 8-10-week intensive program)",
      format: "Hybrid (workshops, online labs, project consultancy)",
      output: "Stakeholder Engagement & Policy Implementation Plan (Capstone)",
      level: "Advanced",
      status: "Active",
      image: "/assets/LAw.PNG",
      archived: false,
      deleted: false,
      catalog: "Policy & Reform"
    }
  ];

  const [courses, setCourses] = useState(mockCourses);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'courses') return matchesSearch && !course.archived && !course.deleted;
    if (activeTab === 'archived') return matchesSearch && course.archived && !course.deleted;
    if (activeTab === 'deleted') return matchesSearch && course.deleted;
    
    return matchesSearch;
  });

  const handleCourseClick = (courseId) => {
    navigate(`/courses/view/${courseId}`);
  };

  const handleCatalogClick = () => {
    navigate('/catalog');
    toast({
      title: "Catalog",
      description: "Redirecting to course catalog",
    });
  };

  const handleCreateCourse = () => {
    navigate('/courses/create');
  };

  const handleCourseEdit = (courseId, courseName) => {
    navigate(`/courses/edit/${courseId}`);
    toast({
      title: "Edit Course",
      description: `Opening edit page for ${courseName}`,
    });
  };

  const handleCourseArchive = (courseId, courseName) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId ? { ...course, archived: true } : course
      )
    );
    toast({
      title: "Course Archived",
      description: `${courseName} has been moved to archived courses.`,
    });
  };

  const handleCourseDelete = (courseId, courseName) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId ? { ...course, deleted: true, archived: false } : course
      )
    );
    toast({
      title: "Course Deleted",
      description: `${courseName} has been moved to deleted courses.`,
    });
  };

  const handleCourseRestore = (courseId, courseName) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId ? { ...course, deleted: false, archived: false } : course
      )
    );
    toast({
      title: "Course Restored",
      description: `${courseName} has been restored to active courses.`,
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Published': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground mt-2">
            Manage your course catalog and create new learning experiences
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsEnrollDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Enroll
          </Button>
          <Button onClick={handleCreateCourse}>
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </div>
      </div>

      {/* Course Tabs - Templates removed */}
      <div className="flex items-center gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-cyan-50 p-1">
            <PillTabsTrigger value="courses" className="data-[state=active]:bg-cyan-400 data-[state=active]:text-white">
              Courses {courses.filter(c => !c.archived && !c.deleted).length}
            </PillTabsTrigger>
            <PillTabsTrigger value="archived" className="data-[state=active]:bg-cyan-400 data-[state=active]:text-white">
              Archived {courses.filter(c => c.archived && !c.deleted).length}
            </PillTabsTrigger>
            <PillTabsTrigger value="deleted" className="data-[state=active]:bg-cyan-400 data-[state=active]:text-white">
              Deleted {courses.filter(c => c.deleted).length}
            </PillTabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9" 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {/* Catalog Button */}
          <Button 
            variant="outline" 
            onClick={handleCatalogClick}
            className="flex items-center gap-2"
          >
            <Compass className="h-4 w-4" />
            Catalog
          </Button>

          {/* Removed Sequential/Open Toggle */}

          {/* View Toggle */}
          <Tabs value={view} onValueChange={(value) => setView(value)}>
            <TabsList>
              <TabsTrigger value="grid" className="flex items-center gap-2">
                <Grid className="h-4 w-4" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer" >
              <div className="h-48 overflow-hidden relative">
                <img 
                 onClick={() => handleCourseClick(course.id)}
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                <div className="absolute top-2 right-2 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <Badge className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                  <div className="bg-white/90 rounded-md">
                    <CourseOptionsMenu 
                      courseId={course.id} 
                      courseName={course.title}
                      onEdit={handleCourseEdit}
                      onArchive={handleCourseArchive}
                      onDelete={handleCourseDelete}
                      onRestore={handleCourseRestore}
                      isDeleted={course.deleted}
                    />
                  </div>
                </div>
                {/* Removed Course Access Type Indicator */}
              </div>
              <CardHeader className="pb-2"  onClick={() => handleCourseClick(course.id)}>
                <CardTitle className="text-lg font-semibold line-clamp-1">
                  {course.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>
              </CardHeader>
              <CardContent onClick={() => handleCourseClick(course.id)}>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {course.catalog}
                  </Badge>
                </div>
                
                {/* Course Details - Clean Layout */}
                <div className="space-y-2.5 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="line-clamp-1">{course.fullDuration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="line-clamp-1">{course.format}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="line-clamp-1">{course.output}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{course.students} enrolled</span>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                    Enrolling
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-medium">Course</th>
                    <th className="text-left p-4 font-medium">Catalog</th>
                    <th className="text-left p-4 font-medium">Students</th>
                    <th className="text-left p-4 font-medium">Duration</th>
                    <th className="text-left p-4 font-medium">Level</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Access Type</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div 
                            className="cursor-pointer"
                            onClick={() => handleCourseClick(course.id)}
                          >
                            <h3 className="font-medium text-blue-600 hover:text-blue-800">
                              {course.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {course.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="text-xs">
                          {course.catalog}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{course.students}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{course.duration}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={getLevelColor(course.level)}>
                          {course.level}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(course.status)}>
                          {course.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        {courseType === 'sequential' ? (
                          <Badge variant="outline" className="text-orange-600 border-orange-300">
                            Sequential
                          </Badge>
                        ) : (
                          <Badge className="bg-green-500 text-white border-green-400">
                            Open Access
                          </Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <CourseOptionsMenu 
                          courseId={course.id} 
                          courseName={course.title}
                          onEdit={handleCourseEdit}
                          onArchive={handleCourseArchive}
                          onDelete={handleCourseDelete}
                          onRestore={handleCourseRestore}
                          isDeleted={course.deleted}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <EnrollCourseDialog 
        open={isEnrollDialogOpen} 
        onOpenChange={setIsEnrollDialogOpen} 
      />
    </div>
  );
};

export default Courses;