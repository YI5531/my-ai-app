/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface PromptInspectorProps {
  requestPayload: object | null;
}

const PromptInspector: React.FC<PromptInspectorProps> = ({ requestPayload }) => {

  if (!requestPayload) {
    return (
      <div className="sticky top-28 bg-gray-900/50 border border-gray-700 rounded-lg p-4 flex flex-col gap-4 backdrop-blur-sm h-[calc(100vh-9rem)]">
        <h2 className="text-lg font-bold text-center text-gray-400">原始请求审查器</h2>
        <div className="flex-grow flex items-center justify-center">
            <p className="text-gray-500 text-center">在此处输入提示以查看将发送给 AI 的确切原始请求。</p>
        </div>
      </div>
    );
  }

  // Sanitize parts for display to avoid gigantic base64 string
  const getDisplayPayload = () => {
      const payload = JSON.parse(JSON.stringify(requestPayload)); // Deep copy
      if (payload.contents?.parts) {
        payload.contents.parts = payload.contents.parts.map((part: any) => {
            if (part.inlineData) {
                return { 
                    inlineData: { 
                        mimeType: part.inlineData.mimeType, 
                        data: '<base64_image_data_hidden_for_display>' 
                    } 
                };
            }
            return part;
        });
      }
      return payload;
  }

  return (
    <div className="sticky top-28 bg-gray-900/50 border border-gray-700 rounded-lg p-4 flex flex-col gap-4 backdrop-blur-sm h-[calc(100vh-9rem)]">
      <h2 className="text-lg font-bold text-center text-gray-300">原始请求审查器</h2>
      
      <div className="flex flex-col gap-2 flex-grow min-h-0">
        <label className="text-left text-sm font-semibold text-gray-400">
            发送至AI的原始请求 (JSON)
        </label>
        <textarea
          readOnly
          value={JSON.stringify(getDisplayPayload(), null, 2)}
          className={`w-full flex-grow bg-black/30 border border-gray-600 rounded-md p-3 text-xs text-gray-300 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 animate-fade-in`}
        />
      </div>

    </div>
  );
};

export default PromptInspector;