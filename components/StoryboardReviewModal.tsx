/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface StoryboardReviewModalProps {
  storyboard: string[];
  onUpdate: (index: number, newPrompt: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

const StoryboardReviewModal: React.FC<StoryboardReviewModalProps> = ({
  storyboard,
  onUpdate,
  onConfirm,
  onCancel,
  isLoading,
}) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in backdrop-blur-sm"
      onClick={onCancel}
    >
      <div 
        className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-6 w-full max-w-3xl flex flex-col gap-4 m-4 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
            <div>
                <h2 className="text-xl font-bold text-gray-100">审查并调整AI的动画计划</h2>
                <p className="text-sm text-gray-400">在生成图像前，请检查并编辑每一帧的提示词。</p>
            </div>
            <button
                onClick={onCancel}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="关闭"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        
        <div className="flex-grow overflow-y-auto pr-2 space-y-4">
          {storyboard.map((prompt, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 bg-gray-700 text-gray-200 text-sm font-semibold rounded-full w-8 h-8 flex items-center justify-center mt-2">{index + 1}</span>
              <textarea
                value={prompt}
                onChange={(e) => onUpdate(index, e.target.value)}
                className="w-full h-20 bg-gray-800 border border-gray-600 text-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-y"
                disabled={isLoading}
              />
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-center gap-4 pt-2">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-grow bg-white/10 border border-white/20 text-gray-200 font-semibold py-3 px-6 rounded-lg transition-all duration-200 ease-in-out hover:bg-white/20 hover:border-white/30 active:scale-95 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-grow bg-gradient-to-br from-blue-600 to-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:from-blue-800 disabled:to-blue-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
          >
            生成帧
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryboardReviewModal;