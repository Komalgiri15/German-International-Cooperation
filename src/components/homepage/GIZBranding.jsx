import React from 'react';
import { useTranslation } from 'react-i18next';

export function BAPCOBranding() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between gap-4 mb-4 px-6 pt-6">
      {/* HSE Initiative Badge */}
      <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 px-4 py-2 rounded-lg shadow-sm border-2 border-green-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white">
            <span className="text-sm font-bold">🛡️</span>
          </div>
          <div className="text-xs">
            <div className="font-bold text-green-700" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
              {t('hse.initiative')}
            </div>
            <div className="text-green-600 font-medium">
              {t('hse.digitalLearning')}
            </div>
          </div>
        </div>
      </div>
      
      {/* BAPCO Branding */}
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
        {/* BAPCO Logo placeholder - replace with actual logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#004E9A] rounded flex items-center justify-center text-white font-bold text-xs">
            BAPCO
          </div>
          <div className="border-l border-gray-300 h-6 mx-1"></div>
          <div className="text-xs">
            <div className="font-bold text-[#004E9A]" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
              BAPCO Upstream
            </div>
            <div className="text-gray-600 font-medium">
              {t('hse.oilGasExcellence')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


  export default BAPCOBranding;

