/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface FilterPanelProps {
  onApplyFilter: (prompt: string) => void;
  isLoading: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onApplyFilter, isLoading }) => {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  
  const presets = [
    { name: 'Synthwave', prompt: '80s synthwave aesthetic, neon magenta and cyan, scan lines, retro futuristic' },
    { name: 'Anime', prompt: 'Japanese anime style, bold outlines, cel-shading, vibrant colors, studio ghibli' },
    { name: 'Lomo', prompt: 'Lomography style, high contrast, oversaturated, dark vignette, cross-processing' },
    { name: 'Glitch', prompt: 'digital glitch art, chromatic aberration, pixel sorting, holographic distortion' },
    { name: 'B&W Noir', prompt: 'film noir style, high contrast black and white, dramatic shadows, mystery' },
    { name: 'Watercolor', prompt: 'watercolor painting, artistic, paint splashes, soft edges, paper texture' }
  ];

  return (
    <div className="flex flex-col gap-4 h-full animate-fade-in">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {presets.map(preset => (
          <button
            key={preset.name}
            onClick={() => { setSelectedPreset(preset.name); onApplyFilter(preset.prompt); }}
            disabled={isLoading}
            className={`p-4 rounded-xl border text-sm font-bold transition-all hover:-translate-y-1 ${
                selectedPreset === preset.name 
                ? 'bg-gray-900 text-white border-gray-900 shadow-lg' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:shadow-md'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>
      <div className="mt-auto text-xs text-center text-gray-400">
          点击滤镜立即应用。所有效果均由 AI 实时生成。
      </div>
    </div>
  );
};

export default FilterPanel;