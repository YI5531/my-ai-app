/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { DownloadIcon } from './icons';

interface GifPreviewModalProps {
  gifUrl: string;
  onClose: () => void;
  onDownload: () => void;
}

const GifPreviewModal: React.FC<GifPreviewModalProps> = ({ gifUrl, onClose, onDownload }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-6 w-full max-w-lg flex flex-col items-center gap-6 m-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <h2 className="text-2xl font-bold text-gray-100">GIF 已生成！</h2>
        <img 
          src={gifUrl} 
          alt="生成的GIF" 
          className="w-full h-auto object-contain max-h-[50vh] rounded-lg border border-gray-600"
        />
        <div className="w-full flex items-center justify-center gap-4">
          <button
            onClick={onDownload}
            className="flex-grow flex items-center justify-center bg-gradient-to-br from-green-600 to-green-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base"
          >
            <DownloadIcon className="w-5 h-5 mr-2" />
            下载 GIF
          </button>
          <button
            onClick={onClose}
            className="flex-grow bg-white/10 border border-white/20 text-gray-200 font-semibold py-3 px-6 rounded-lg transition-all duration-200 ease-in-out hover:bg-white/20 hover:border-white/30 active:scale-95 text-base"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

export default GifPreviewModal;