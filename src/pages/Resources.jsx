import React from 'react';
import { BookOpen, FileText, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Resources = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Resources & Knowledge
            </h1>
              </div>
          <p className="text-gray-600">
            Access training materials, documents, and resources for workplace safety and harassment prevention.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Placeholder Resource 1 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Workplace Safety Training Guide
                              </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive guide covering workplace safety protocols, harassment prevention, and employee rights. Essential reading for all staff members.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span>PDF • 2.5 MB</span>
                  <span>•</span>
                  <span>Updated 2 days ago</span>
                            </div>

                              </div>
                              </div>
                            </div>

          {/* Placeholder Resource 2 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-6 w-6 text-green-600" />
                            </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Employee Handbook & Policies
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Complete employee handbook containing company policies, procedures, and guidelines for maintaining a respectful workplace environment.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span>PDF • 1.8 MB</span>
                  <span>•</span>
                  <span>Updated 1 week ago</span>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
