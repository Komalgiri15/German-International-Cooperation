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
    <motion.div 
      className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-2 backdrop-blur-lg">
        <div className="flex items-center justify-center gap-1.5">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(item.path)}
              className={cn(
                "group relative flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300",
                isActive(item.path)
                  ? "bg-gradient-to-br " + item.color + " shadow-md"
                  : "hover:bg-gray-50"
              )}
              title={item.label}
            >
              <div className={cn(
                "relative",
                isActive(item.path) ? "text-white" : "text-gray-600 group-hover:text-gray-900"
              )}>
                <item.icon className="h-4 w-4" />
              </div>
              <span className={cn(
                "text-[10px] font-semibold whitespace-nowrap",
                isActive(item.path) ? "text-white" : "text-gray-600 group-hover:text-gray-900"
              )}>
                {item.label}
              </span>

              {/* Active indicator */}
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-br rounded-lg -z-10"
                  style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default AdminFloatingNav;

