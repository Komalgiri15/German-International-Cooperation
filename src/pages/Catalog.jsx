import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Star, Crown, Award, Clock, Users } from 'lucide-react';

const Catalog = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Training Catalog
            </h1>
          </div>
          <p className="text-gray-600">
            Browse our comprehensive collection of workplace safety and harassment prevention courses.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Free Courses Category */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-green-600 rounded-lg">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Free Courses</h2>
              <p className="text-sm text-gray-500">Essential training materials available at no cost</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder Course 1 */}
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:bg-white hover:shadow-lg transition-all duration-300 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Workplace Safety Fundamentals
                    </h3>
                    <p className="text-gray-700 text-sm mb-4">
                      Learn the basics of workplace safety, hazard identification, and prevention strategies.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        2 hours
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        1,250 enrolled
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Placeholder Course 2 */}
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:bg-white hover:shadow-lg transition-all duration-300 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Harassment Prevention Basics
                    </h3>
                    <p className="text-gray-700 text-sm mb-4">
                      Understand different types of harassment and learn how to prevent them in the workplace.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        1.5 hours
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        980 enrolled
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Placeholder Course 3 */}
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:bg-white hover:shadow-lg transition-all duration-300 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Employee Rights & Responsibilities
                    </h3>
                    <p className="text-gray-700 text-sm mb-4">
                      Learn about your rights as an employee and your responsibilities in maintaining a safe workplace.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        1 hour
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        750 enrolled
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Premium Courses Category */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Premium Courses</h2>
              <p className="text-sm text-gray-500">Advanced training with expert instructors and certifications</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder Premium Course 1 */}
            <Card className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 hover:bg-gray-900/90 transition-all duration-300 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Crown className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Advanced Leadership Training
                    </h3>
                    <p className="text-gray-200 text-sm mb-4">
                      Comprehensive leadership program covering team management, conflict resolution, and workplace culture.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-300">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        8 hours
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        320 enrolled
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Placeholder Premium Course 2 */}
            <Card className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 hover:bg-gray-900/90 transition-all duration-300 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Compliance Officer Certification
                    </h3>
                    <p className="text-gray-200 text-sm mb-4">
                      Professional certification program for workplace compliance and legal requirements.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-300">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        12 hours
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        180 enrolled
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          </div>
            </div>
    </div>
  );
};

export default Catalog;