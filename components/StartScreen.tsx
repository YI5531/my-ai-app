/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { UploadIcon } from './icons';

interface StartScreenProps {
  onFileSelect: (files: FileList | null) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onFileSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(e.target.files);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
      
      {/* The Camera Lens / Trigger */}
      <div 
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <label htmlFor="image-upload-start" className="block cursor-pointer">
            {/* Outer Ring */}
            <div className={`w-64 h-64 rounded-full border-[20px] transition-all duration-500 ease-out shadow-2xl flex items-center justify-center bg-white relative z-10 ${isHovered ? 'border-gray-200 scale-105' : 'border-gray-100'}`}>
                
                {/* Inner Lens Glass */}
                <div className={`w-40 h-40 rounded-full bg-gray-900 transition-all duration-500 overflow-hidden relative shadow-inner flex items-center justify-center ${isHovered ? 'scale-110' : 'scale-100'}`}>
                    {/* Lens Reflection */}
                    <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white/10 rounded-full blur-md"></div>
                    <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-white/20 rounded-full blur-sm"></div>
                    
                    <UploadIcon className={`w-12 h-12 text-white/80 transition-transform duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-80'}`} />
                </div>

                {/* Text Ring (SVG Text along path could go here, simplifying for CSS) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className={`absolute bottom-[-3rem] text-gray-400 font-mono text-sm tracking-widest uppercase transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`}>
                        Insert Memory
                    </span>
                </div>
            </div>
        </label>
        <input id="image-upload-start" type="file" className="hidden" accept="image/*" onChange={handleFileChange} multiple />
      </div>

      <div className="mt-16 text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter text-gray-800 font-['Space_Grotesk']">PIXSHOP <span className="text-gray-300">AI</span></h1>
        <p className="text-gray-500 font-light">智能影像实验室</p>
      </div>

    </div>
  );
};

export default StartScreen;