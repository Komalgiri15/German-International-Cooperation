import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap,
  Users,
  Video,
  MessageSquare,
  ChevronRight,
  Zap
} from 'lucide-react';

const QuickActionButton = ({ icon: Icon, label, description, color, onClick }) => {
  const colorClasses = {
    blue: 'border-l-[#004E9A] hover:bg-blue-50',
    yellow: 'border-l-[#F5C518] hover:bg-yellow-50',
    purple: 'border-l-purple-600 hover:bg-purple-50',
    green: 'border-l-green-600 hover:bg-green-50',
  };

  const iconColorClasses = {
    blue: 'bg-blue-100 text-[#004E9A]',
    yellow: 'bg-yellow-100 text-[#F5C518]',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
  };

  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full p-5 rounded-lg text-left
        bg-white border-l-4 ${colorClasses[color] || colorClasses.blue}
        border border-gray-200 shadow-md hover:shadow-xl
        transform hover:-translate-y-1 transition-all duration-300
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 ${iconColorClasses[color] || iconColorClasses.blue}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-base text-gray-900 mb-1" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
            {label}
          </h4>
          <p className="text-sm text-gray-600">
            {description}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-1 transition-all" />
      </div>
    </button>
  );
};

export function QuickActionsSection() {
  const quickActions = [
    {
      icon: GraduationCap,
      label: 'Enroll in Next Pathway',
      description: 'Continue your learning journey with recommended courses',
      color: 'blue',
    },
    {
      icon: Users,
      label: 'Join a Group Discussion',
      description: 'Connect with peers and share insights',
      color: 'purple',
    },
    {
      icon: Video,
      label: 'Watch Featured Reform Video',
      description: 'Stay updated on latest labour reform initiatives',
      color: 'green',
    },
    {
      icon: MessageSquare,
      label: 'Give Feedback / Suggest a Topic',
      description: 'Help us improve your learning experience',
      color: 'yellow',
    },
  ];

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-blue-50/50 py-8 px-6 rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
              <Zap className="w-7 h-7 text-[#F5C518]" />
              Quick Actions
            </h2>
            <p className="text-sm text-gray-600">
              Take the next step in your learning journey
            </p>
          </div>
          <Button 
            variant="outline"
            className="border-2 border-[#004E9A] text-[#004E9A] hover:bg-[#004E9A] hover:text-white font-semibold transition-all duration-300 px-6"
          >
            View All Actions
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Quick Action Buttons Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionButton
              key={index}
              {...action}
              onClick={() => console.log(`Action clicked: ${action.label}`)}
            />
          ))}
        </div>
      </div>

      {/* Footer - Supported by GIZ */}
      <div className="max-w-7xl mx-auto mt-8 flex justify-center">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Powered by</span>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
            <div className="w-5 h-5 bg-[#004E9A] rounded-sm flex items-center justify-center text-white font-bold text-[8px]">
              GIZ
            </div>
            <span className="font-semibold text-[#004E9A]">Labour Reform & Digital Learning Initiative</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuickActionsSection;

