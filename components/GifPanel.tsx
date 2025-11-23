/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';

interface GifPanelProps {
  onPlanGif: (prompt: string, frameCount: number) => void;
  onGenerateGif: (prompts: string[], delay: number) => void;
  isLoading: boolean;
  storyboard: string[] | null;
  translatedStoryboard: string[] | null;
  onClearStoryboard: () => void;
}

const GifPanel: React.FC<GifPanelProps> = ({ 
  onPlanGif, 
  onGenerateGif, 
  isLoading, 
  storyboard, 
  translatedStoryboard,
  onClearStoryboard 
}) => {
  const [mode, setMode] = useState<'ai' | 'manual'>('ai');
  const [prompt, setPrompt] = useState('');
  const [frameCount, setFrameCount] = useState(4);
  const [delay, setDelay] = useState(200); // ms
  const [editedStoryboard, setEditedStoryboard] = useState<string[]>([]);
  const [editedTranslatedStoryboard, setEditedTranslatedStoryboard] = useState<string[] | null>(null);

  useEffect(() => {
    // Sync external storyboard to local editable state
    setEditedStoryboard(storyboard ?? []);
    setEditedTranslatedStoryboard(translatedStoryboard ?? null);
  }, [storyboard, translatedStoryboard]);

  useEffect(() => {
    // Adjust prompt array size for manual mode when frameCount changes
    if (mode === 'manual') {
      setEditedStoryboard(currentPrompts => {
          const newPrompts = new Array(frameCount).fill('');
          for (let i = 0; i < Math.min(currentPrompts.length, frameCount); i++) {
              newPrompts[i] = currentPrompts[i];
          }
          return newPrompts;
      });
    }
  }, [frameCount, mode]);

  const handleStoryboardChange = (index: number, value: string) => {
    const newPrompts = [...editedStoryboard];
    newPrompts[index] = value;
    setEditedStoryboard(newPrompts);
  };

  const handleTranslatedStoryboardChange = (index: number, value: string) => {
    if (editedTranslatedStoryboard) {
      const newPrompts = [...editedTranslatedStoryboard];
      newPrompts[index] = value;
      setEditedTranslatedStoryboard(newPrompts);
    }
  };

  const handlePlan = () => {
    if (prompt) {
      onPlanGif(prompt, frameCount);
    }
  };
  
  const handleGenerate = () => {
    onGenerateGif(editedStoryboard, delay);
  };
  
  const isPlanDisabled = isLoading || !prompt.trim();
  const isGenerateDisabled = isLoading || editedStoryboard.length === 0 || editedStoryboard.some(p => p.trim() === '');

  const renderAIPlanner = () => (
    <div className="animate-fade-in w-full flex flex-col gap-4">
      <p className="text-sm text-center text-gray-400 -mt-2">描述您想制作的动画，AI将为您规划每一帧。</p>
      <div className="w-full flex items-center gap-2">
        <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="例如，“让她衣服飘动”"
            className="flex-grow bg-gray-800 border border-gray-700 text-gray-200 rounded-lg p-5 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isLoading}
        />
        <button 
            type="button"
            onClick={handlePlan}
            className="bg-gradient-to-br from-blue-600 to-blue-500 text-white font-bold py-5 px-8 text-lg rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner disabled:from-blue-800 disabled:to-blue-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
            disabled={isPlanDisabled}
        >
            规划
        </button>
      </div>
    </div>
  );

  const renderStoryboardEditor = () => (
    <div className="animate-fade-in w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h4 className="text-md font-semibold text-gray-300">审查并调整AI的动画计划</h4>
        <button onClick={onClearStoryboard} className="text-sm text-gray-400 hover:text-white hover:bg-white/10 px-3 py-1 rounded-md transition-colors">重新开始</button>
      </div>
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {editedStoryboard.map((p, index) => (
          <div key={index} className="flex flex-col gap-2 bg-black/20 p-3 rounded-lg border border-gray-700/50">
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 bg-gray-700 text-gray-200 text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center mt-2">{index + 1}</span>
              <textarea
                  value={p}
                  onChange={(e) => handleStoryboardChange(index, e.target.value)}
                  placeholder={`第 ${index + 1} 帧的原始提示词...`}
                  className="flex-grow bg-gray-800 border border-gray-600 text-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full resize-y"
                  rows={2}
                  disabled={isLoading}
              />
            </div>
            {editedTranslatedStoryboard && (
              <div className="flex items-start gap-2">
                 <span className="flex-shrink-0 w-6 h-6"></span>
                 <textarea
                  value={editedTranslatedStoryboard[index]}
                  onChange={(e) => handleTranslatedStoryboardChange(index, e.target.value)}
                  placeholder={`第 ${index + 1} 帧的翻译提示词...`}
                  className="flex-grow bg-gray-900 border border-gray-700 text-gray-400 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full resize-y"
                  rows={2}
                  disabled={isLoading}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <button 
          type="button"
          onClick={handleGenerate}
          className="bg-gradient-to-br from-purple-600 to-indigo-500 text-white font-bold py-5 px-8 text-lg rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner disabled:from-indigo-800 disabled:to-indigo-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
          disabled={isGenerateDisabled}
      >
          生成 GIF
      </button>
    </div>
  );

  const renderManualEditor = () => (
    <div className="animate-fade-in w-full flex flex-col gap-4">
       <p className="text-sm text-center text-gray-400 -mt-2">为动画的每一帧精确地输入提示词。</p>
      <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
        {editedStoryboard.map((p, index) => (
            <div key={index} className="flex items-center gap-2">
                <span className="flex-shrink-0 bg-gray-700 text-gray-200 text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">{index + 1}</span>
                <input
                    type="text"
                    value={p}
                    onChange={(e) => handleStoryboardChange(index, e.target.value)}
                    placeholder={`第 ${index + 1} 帧的提示词...`}
                    className="flex-grow bg-gray-800 border border-gray-700 text-gray-200 rounded-lg p-3 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isLoading}
                />
            </div>
        ))}
      </div>
      <button 
          type="button"
          onClick={handleGenerate}
          className="bg-gradient-to-br from-purple-600 to-indigo-500 text-white font-bold py-5 px-8 text-lg rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner disabled:from-indigo-800 disabled:to-indigo-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
          disabled={isGenerateDisabled}
      >
          生成 GIF
      </button>
    </div>
  );

  return (
    <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col gap-4 animate-fade-in backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-center text-gray-300">创建 GIF 动画</h3>
      
      <div className="flex justify-center p-1 bg-gray-900/50 rounded-lg">
        <button onClick={() => setMode('ai')} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${mode === 'ai' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/10'}`}>
          AI 规划故事板
        </button>
        <button onClick={() => setMode('manual')} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${mode === 'manual' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/10'}`}>
          手动输入每一帧
        </button>
      </div>
      
      <div className="w-full flex flex-col gap-4">
        {mode === 'ai' && !storyboard && renderAIPlanner()}
        {mode === 'ai' && storyboard && renderStoryboardEditor()}
        {mode === 'manual' && renderManualEditor()}

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-700/50">
            <div>
                <label htmlFor="frameCount" className="block text-sm font-medium text-gray-400 mb-1">帧数 ({frameCount})</label>
                <input
                    id="frameCount"
                    type="range"
                    min="2"
                    max="8"
                    value={frameCount}
                    onChange={(e) => setFrameCount(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    disabled={isLoading || (mode === 'ai' && !!storyboard)}
                />
            </div>
            <div>
                <label htmlFor="delay" className="block text-sm font-medium text-gray-400 mb-1">帧延迟 ({delay}ms)</label>
                <input
                    id="delay"
                    type="range"
                    min="100"
                    max="1000"
                    step="100"
                    value={delay}
                    onChange={(e) => setDelay(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    disabled={isLoading}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default GifPanel;