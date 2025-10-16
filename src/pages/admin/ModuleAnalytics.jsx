import React from 'react';
import { BookOpen } from 'lucide-react';

const ModuleAnalytics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-200 p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Module & Assessment Analytics</h1>
              <p className="text-gray-600 mt-1">Track learning outcomes and assessments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleAnalytics;

