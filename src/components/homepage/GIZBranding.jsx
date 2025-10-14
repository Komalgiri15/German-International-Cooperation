import React from 'react';

export function GIZBranding() {
  return (
    <div className="flex items-center justify-end gap-3 mb-4 px-6 pt-6">
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
        {/* GIZ Logo placeholder - replace with actual logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#004E9A] rounded flex items-center justify-center text-white font-bold text-xs">
            GIZ
          </div>
          <div className="border-l border-gray-300 h-6 mx-1"></div>
          <div className="text-xs">
            <div className="font-bold text-[#004E9A]" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
              Labour Reform &
            </div>
            <div className="text-gray-600 font-medium">
              Digital Learning Initiative
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GIZBranding;

