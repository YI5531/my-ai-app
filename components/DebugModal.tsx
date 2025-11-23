/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface DebugModalProps {
  data: object;
  onClose: () => void;
}

const DebugModal: React.FC<DebugModalProps> = ({ data, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-6 w-full max-w-2xl flex flex-col gap-4 m-4 h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-100">技术细节 (原始响应)</h2>
            <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="关闭"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div className="flex-grow bg-black/50 rounded-lg overflow-auto border border-gray-600">
            <pre className="p-4 text-xs text-gray-300 font-mono whitespace-pre-wrap break-all">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-white/10 border border-white/20 text-gray-200 font-semibold py-3 px-6 rounded-lg transition-all duration-200 ease-in-out hover:bg-white/20 hover:border-white/30 active:scale-95 text-base"
        >
          关闭
        </button>
      </div>
    </div>
  );
};

export default DebugModal;