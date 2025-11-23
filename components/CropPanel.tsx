/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface CropPanelProps {
  onApplyCrop: () => void;
  onSetAspect: (aspect: number | undefined) => void;
  isLoading: boolean;
  isCropping: boolean;
}

const CropPanel: React.FC<CropPanelProps> = ({ onApplyCrop, onSetAspect, isLoading, isCropping }) => {
  const [activeAspect, setActiveAspect] = useState<string>('free');

  const aspects = [
    { id: 'free', label: '自由', value: undefined },
    { id: '1:1', label: '1:1 (方形)', value: 1 },
    { id: '16:9', label: '16:9 (宽屏)', value: 16 / 9 },
    { id: '4:3', label: '4:3 (标准)', value: 4 / 3 },
    { id: '9:16', label: '9:16 (竖屏)', value: 9 / 16 },
  ];

  return (
    <div className="flex flex-col h-full gap-6 animate-fade-in">
       <div className="flex flex-col gap-2">
           <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">比例设定</label>
           <div className="flex flex-wrap gap-2">
               {aspects.map((a) => (
                   <button
                        key={a.id}
                        onClick={() => { setActiveAspect(a.id); onSetAspect(a.value); }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            activeAspect === a.id 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                   >
                       {a.label}
                   </button>
               ))}
           </div>
       </div>

       <div className="mt-auto">
           <p className="text-xs text-gray-400 mb-4 text-center">在左侧取景器中拖动以选择区域</p>
           <button
                onClick={onApplyCrop}
                disabled={isLoading || !isCropping}
                className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-lg hover:bg-black transition shadow-lg shadow-gray-300 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
           >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
               确认裁剪
           </button>
       </div>
    </div>
  );
};

export default CropPanel;