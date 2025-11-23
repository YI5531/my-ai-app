/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface AdjustmentPanelProps {
  onApplyAdjustment: (prompt: string) => void;
  isLoading: boolean;
}

const AdjustmentPanel: React.FC<AdjustmentPanelProps> = ({ onApplyAdjustment, isLoading }) => {
  const [customPrompt, setCustomPrompt] = useState('');

  const adjustments = [
    { label: "背景虚化", value: "apply realistic depth of field, blur background, sharp subject" },
    { label: "提升清晰度", value: "enhance details, sharpen image, remove noise, 4k quality" },
    { label: "暖色调", value: "warm color temperature, golden hour lighting, cozy atmosphere" },
    { label: "冷色调", value: "cool color temperature, blue tones, cinematic cold look" },
    { label: "影棚光", value: "professional studio lighting, softbox, rim light, high key" },
    { label: "HDR", value: "high dynamic range, balanced exposure, vibrant colors, detailed shadows" }
  ];

  return (
    <div className="flex flex-col gap-5 h-full animate-fade-in">
      <div className="grid grid-cols-2 gap-3">
          {adjustments.map((adj) => (
              <button
                key={adj.label}
                onClick={() => onApplyAdjustment(adj.value)}
                disabled={isLoading}
                className="py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:border-blue-400 hover:shadow-sm transition-all text-left flex justify-between items-center group"
              >
                  {adj.label}
                  <span className="text-gray-300 group-hover:text-blue-500">→</span>
              </button>
          ))}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">自定义调整</label>
          <div className="flex gap-2">
            <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="例如：更亮的阴影..."
                className="flex-grow bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
                onClick={() => onApplyAdjustment(customPrompt)}
                disabled={!customPrompt.trim() || isLoading}
                className="bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-black transition disabled:opacity-50"
            >
                应用
            </button>
          </div>
      </div>
    </div>
  );
};

export default AdjustmentPanel;