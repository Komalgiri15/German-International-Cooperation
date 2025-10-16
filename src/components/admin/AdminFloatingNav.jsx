import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, BookOpen, Trophy, Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function AdminFloatingNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 'overview',
      icon: BarChart3,
      label: 'Overview',
      path: '/admin-portal/overview',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'analytics',
      icon: BookOpen,
      label: 'Analytics',
      path: '/admin-portal/analytics',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'engagement',
      icon: Trophy,
      label: 'Engagement',
      path: '/admin-portal/engagement',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'stakeholders',
      icon: Users,
      label: 'Stakeholders',
      path: '/admin-portal/stakeholders',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'reporting',
      icon: Calendar,
      label: 'Reporting',
      path: '/admin-portal/reporting',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-3 backdrop-blur-lg"
      >
        <div className="flex items-center gap-2">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(item.path)}
              className={cn(
                "group relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300",
                isActive(item.path)
                  ? "bg-gradient-to-br " + item.color + " shadow-lg"
                  : "hover:bg-gray-50"
              )}
              title={item.label}
            >
              <div className={cn(
                "relative",
                isActive(item.path) ? "text-white" : "text-gray-600 group-hover:text-gray-900"
              )}>
                <item.icon className="h-6 w-6" />
              </div>
              <span className={cn(
                "text-xs font-semibold whitespace-nowrap",
                isActive(item.path) ? "text-white" : "text-gray-600 group-hover:text-gray-900"
              )}>
                {item.label}
              </span>

              {/* Active indicator */}
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-br rounded-xl -z-10"
                  style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default AdminFloatingNav;

