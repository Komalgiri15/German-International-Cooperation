import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, BookOpen, Trophy, Users, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function AdminFloatingNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

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

  // Handle scroll visibility
  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      setHasScrolled(true);
      setIsVisible(true);

      // Hide after 3 seconds of no scrolling
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    window.addEventListener('scroll', handleScroll);

    // Show initially for 3 seconds when first entering admin portal
    const initialTimeout = setTimeout(() => {
      if (!hasScrolled) {
        setIsVisible(false);
      }
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
      clearTimeout(initialTimeout);
    };
  }, [hasScrolled]);

  const isActive = (path) => location.pathname === path;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
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
      )}
    </AnimatePresence>
  );
}

export default AdminFloatingNav;

