import React from 'react';
import { BarChart3 } from 'lucide-react';

const OverviewSummary = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <BarChart3 className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Overview Summary</h1>
              <p className="text-gray-600 mt-1">Dashboard analytics and key metrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSummary;

