import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AdminToggle = ({ isCollapsed }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdminMode, setIsAdminMode] = useState(location.pathname.startsWith('/admin-portal'));

  const handleToggle = () => {
    const newMode = !isAdminMode;
    setIsAdminMode(newMode);
    
    if (newMode) {
      navigate('/admin-portal/overview');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="border-t border-gray-100 p-2">
      <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 transition-all">
        <Shield className="h-4 w-4 text-blue-600 flex-shrink-0" />
        {!isCollapsed && (
          <span className="text-sm font-semibold text-gray-700 truncate">
            {t('header.adminPortal')}
          </span>
        )}
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0 ${
            isAdminMode ? 'bg-blue-600' : 'bg-gray-300'
          }`}
          role="switch"
          aria-checked={isAdminMode}
          title={isCollapsed ? t('header.adminPortal') : undefined}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isAdminMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default AdminToggle;
