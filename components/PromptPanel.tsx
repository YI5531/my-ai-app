/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface PromptPanelProps {
  onApplyPrompt: (prompt: string) => void;
  isLoading: boolean;
}

// Curated list of trendy, high-quality prompts
const PROMPT_TEMPLATES = [
  {
    category: "热门风格 (Trendy)",
    items: [
      { label: "Midjourney V6 质感", value: "style of Midjourney V6, hyper-realistic, incredibly detailed, 8k resolution, masterpiece" },
      { label: "Niji 动漫风", value: "anime style, vibrant colors, studio ghibli inspired, makoto shinkai lighting, highly detailed background" },
      { label: "泡泡玛特盲盒", value: "Pop Mart style, 3D render, c4d, blind box toy design, cute, chibi, soft lighting, pastel colors, clay material" },
      { label: "赛博朋克", value: "cyberpunk aesthetic, neon lights, futuristic city, rain-slicked streets, chromatic aberration, high contrast" },
      { label: "复古胶片", value: "vintage film photography, kodak portra 400, grain, light leaks, nostalgic atmosphere, soft focus" }
    ]
  },
  {
    category: "光影与镜头 (Camera)",
    items: [
      { label: "电影级布光", value: "cinematic lighting, dramatic shadows, volumetrics, god rays, rim lighting" },
      { label: "黄金时刻", value: "golden hour lighting, warm tones, sun flare, soft shadows, ethereal atmosphere" },
      { label: "微距镜头", value: "macro photography, extreme close-up, shallow depth of field, bokeh, intricate details" },
      { label: "广角史诗", value: "wide angle lens, epic scale, establishing shot, vast landscape, detailed environment" }
    ]
  },
  {
    category: "特殊材质 (Material)",
    items: [
      { label: "半透明水晶", value: "translucent crystal material, subsurface scattering, glass refraction, shiny, elegant" },
      { label: "流体霓虹", value: "liquid neon, glowing fluid, abstract shapes, vibrant colors, dark background" },
      { label: "折纸艺术", value: "paper art, origami style, layered paper, texture, soft shadows, intricate folds" }
    ]
  }
];

const PromptPanel: React.FC<PromptPanelProps> = ({ onApplyPrompt, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const addTag = (val: string) => {
      const cleanVal = val.trim();
      if (prompt.includes(cleanVal)) return;
      setPrompt(prev => prev ? `${prev}, ${cleanVal}` : cleanVal);
  };

  return (
    <div className="flex flex-col h-full gap-4 animate-fade-in">
      {/* Input Area */}
      <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="输入提示词，或点击下方标签组合..."
            className="w-full h-28 bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none resize-none transition-colors placeholder-gray-400"
          />
          <button 
            onClick={() => prompt.trim() && onApplyPrompt(prompt)}
            disabled={isLoading || !prompt.trim()}
            className="absolute bottom-3 right-3 bg-blue-600 text-white rounded-lg px-4 py-1.5 text-xs font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-200"
          >
            GENERATE
          </button>
      </div>

      {/* Tag Cloud */}
      <div className="flex-grow overflow-y-auto pr-1 space-y-4">
        {PROMPT_TEMPLATES.map((group) => (
            <div key={group.category}>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{group.category}</h4>
                <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => addTag(item.value)}
                            className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all active:scale-95"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default PromptPanel;