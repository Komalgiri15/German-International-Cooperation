import React from 'react';
import { Users } from 'lucide-react';

const StakeholderResources = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-200 p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
              <Users className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Stakeholder & Resources</h1>
              <p className="text-gray-600 mt-1">Manage users and resource allocation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeholderResources;

