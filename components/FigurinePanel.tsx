/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface FigurinePanelProps {
  onGenerateFigurine: (additionalPrompt: string) => void;
  isLoading: boolean;
}

const FigurinePanel: React.FC<FigurinePanelProps> = ({ onGenerateFigurine, isLoading }) => {
  const [additionalPrompt, setAdditionalPrompt] = useState('');

  const basePrompt = `Turn the person in the uploaded picture into a 1/7 scale commercialized figure of the character in the illustration, in a realistic style and environment. Place the figure on a computer desk, using a circular transparent acrylic base without any text. On the computer screen, display the ZBrush modeling process of the figure. Next to the computer screen, place a BANDAI-style toy packaging box printed with the original artwork.`;

  const handleGenerate = () => {
    onGenerateFigurine(additionalPrompt);
  };

  return (
    <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col gap-4 animate-fade-in backdrop-blur-sm">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-300">AI 手办化</h3>
        <p className="text-sm text-gray-400 -mt-1">将照片中的人物变成精美的商业化手办模型。</p>
      </div>
      
      <div className="bg-black/20 p-3 rounded-lg border border-gray-600">
        <p className="text-sm font-semibold text-gray-400 mb-2">基础提示词模板:</p>
        <p className="text-xs text-gray-400 font-mono">{basePrompt}</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="w-full flex flex-col gap-4">
        <textarea
            value={additionalPrompt}
            onChange={(e) => setAdditionalPrompt(e.target.value)}
            placeholder="（可选）在此添加补充要求，例如“更改手办的姿势为坐姿”或“将包装盒的背景改为宇宙”..."
            className="w-full h-24 bg-gray-800 border border-gray-700 text-gray-200 rounded-lg p-4 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-y disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isLoading}
        />

        <button 
            type="submit"
            className="bg-gradient-to-br from-blue-600 to-blue-500 text-white font-bold py-4 px-8 text-lg rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner disabled:from-blue-800 disabled:to-blue-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
            disabled={isLoading}
        >
            开始制作
        </button>
      </form>
    </div>
  );
};

export default FigurinePanel;
