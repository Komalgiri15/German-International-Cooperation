import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Award, Clock, Users } from 'lucide-react';

// Animated counter hook
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
};

const StatCard = ({ icon: Icon, label, value, suffix = '', color = 'blue' }) => {
  const animatedValue = useCountUp(value);
  
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100/50 border-blue-200',
    yellow: 'from-yellow-50 to-yellow-100/50 border-yellow-200',
    green: 'from-green-50 to-green-100/50 border-green-200',
    purple: 'from-purple-50 to-purple-100/50 border-purple-200',
  };

  const iconColors = {
    blue: 'text-[#004E9A]',
    yellow: 'text-[#F5C518]',
    green: 'text-green-600',
    purple: 'text-purple-600',
  };

  return (
    <Card className={`border bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">{animatedValue}</span>
              {suffix && <span className="text-lg font-semibold text-gray-700">{suffix}</span>}
            </div>
          </div>
          <div className={`p-3 rounded-xl bg-white/80 shadow-sm ${iconColors[color]}`}>
            <Icon className="w-7 h-7" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function WelcomeStatsSection() {
  const { t } = useTranslation();
  // Mock user data - replace with actual user data from context/API
  const userName = "Samir Kumar";
  const stats = [
    { icon: GraduationCap, label: t('dashboard.coursesEnrolled'), value: 12, suffix: t('dashboard.courses'), color: "blue" },
    { icon: Award, label: t('dashboard.certificatesEarned'), value: 8, suffix: t('dashboard.certs'), color: "yellow" },
    { icon: Clock, label: t('dashboard.totalHoursLearned'), value: 156, suffix: t('dashboard.hours'), color: "green" },
    { icon: Users, label: t('dashboard.activeGroups'), value: 5, suffix: t('dashboard.groups'), color: "purple" },
  ];

  return (
    <div className="space-y-6">
      {/* Personalized Welcome Message */}
      <Card className="border-l-4 border-l-[#004E9A] shadow-md bg-gradient-to-r from-white to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">👋</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
                {t('dashboard.welcomeBack', { name: userName })}
              </h2>
              <p className="text-gray-600 mt-1">{t('dashboard.continueJourney')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
}

export default WelcomeStatsSection;

