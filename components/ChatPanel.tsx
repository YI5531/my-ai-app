/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef, useState } from 'react';
import { BookOpenIcon, PaperClipIcon, WarningIcon } from './icons';

// Icons local to this file
const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
);

const ImageMessage: React.FC<{ file: File }> = ({ file }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (!imageUrl) return <div className="w-32 h-32 bg-gray-200 rounded animate-pulse" />;
  return <img src={imageUrl} alt="AI Generated" className="max-w-xs h-auto rounded-xl border border-gray-200 shadow-sm" />;
};

const StagedImageThumbnail: React.FC<{ file: File, onRemove: () => void }> = ({ file, onRemove }) => {
    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);
    return (
        <div className="relative group">
            <img src={imageUrl} alt={file.name} className="h-16 w-16 object-cover rounded-lg border border-gray-200" />
            <button onClick={onRemove} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <CloseIcon className="w-3 h-3" />
            </button>
        </div>
    );
};

interface ChatMessage { role: 'user' | 'model'; content: string | File; }
interface ChatPanelProps {
  onGenerate: () => void;
  isLoading: boolean;
  isNsfwModeEnabled: boolean;
  setIsNsfwModeEnabled: (value: boolean) => void;
  userPrompt: string;
  setUserPrompt: (value: string) => void;
  onShowGuide: () => void;
  chatHistory: ChatMessage[];
  stagedImages: File[];
  onStageFiles: (files: FileList) => void;
  onRemoveStagedFile: (index: number) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ 
    onGenerate, isLoading, isNsfwModeEnabled, setIsNsfwModeEnabled, userPrompt, setUserPrompt, onShowGuide, chatHistory, stagedImages, onStageFiles, onRemoveStagedFile
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className="flex flex-col h-full gap-4 animate-fade-in">
      {/* Header Toggle */}
      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
             <span className="text-xs font-bold text-gray-400 uppercase">Advanced Chat</span>
          </div>
          <div className="flex items-center gap-3">
              <button onClick={onShowGuide} className="text-xs font-medium text-blue-500 hover:text-blue-700 flex items-center gap-1">
                  <BookOpenIcon className="w-3 h-3" /> Guide
              </button>
              <label className="flex items-center gap-2 cursor-pointer">
                  <span className={`text-xs font-bold ${isNsfwModeEnabled ? 'text-purple-600' : 'text-gray-400'}`}>NSFW</span>
                  <div className={`relative w-8 h-5 rounded-full transition-colors ${isNsfwModeEnabled ? 'bg-purple-600' : 'bg-gray-200'}`} onClick={() => setIsNsfwModeEnabled(!isNsfwModeEnabled)}>
                      <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${isNsfwModeEnabled ? 'translate-x-3' : ''}`} />
                  </div>
              </label>
          </div>
      </div>

      {/* Chat History */}
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto space-y-4 p-2">
          {chatHistory.length === 0 && <p className="text-center text-gray-400 text-sm mt-10">Start a conversation to refine your image...</p>}
          {chatHistory.map((msg, idx) => {
              const isUser = msg.role === 'user';
              const isError = typeof msg.content === 'string' && msg.content.startsWith('ERROR:');
              return (
                  <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                          isUser ? 'bg-blue-600 text-white rounded-br-none' : 
                          isError ? 'bg-red-50 text-red-600 border border-red-100 rounded-bl-none' : 
                          'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}>
                          {typeof msg.content === 'string' ? (
                               isError ? msg.content.substring(7) : msg.content
                          ) : <ImageMessage file={msg.content} />}
                      </div>
                  </div>
              )
          })}
          {isLoading && <div className="flex justify-start"><div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none text-gray-400 text-xs">Thinking...</div></div>}
      </div>

      {/* Staging Area */}
      {stagedImages.length > 0 && (
          <div className="flex gap-2 overflow-x-auto p-2 border-t border-gray-100">
              {stagedImages.map((file, i) => <StagedImageThumbnail key={i} file={file} onRemove={() => onRemoveStagedFile(i)} />)}
          </div>
      )}

      {/* Input */}
      <form onSubmit={(e) => { e.preventDefault(); onGenerate(); }} className="relative flex items-end gap-2 bg-white pt-2">
          <input type="file" ref={attachmentInputRef} className="hidden" accept="image/*" multiple onChange={(e) => {if(e.target.files) onStageFiles(e.target.files); e.target.value='';}} />
          <button type="button" onClick={() => attachmentInputRef.current?.click()} className="p-3 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition">
              <PaperClipIcon className="w-5 h-5" />
          </button>
          <input 
            value={userPrompt} 
            onChange={(e) => setUserPrompt(e.target.value)} 
            placeholder="Type your instruction..." 
            className="flex-grow bg-gray-50 border-none rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-100"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || (!userPrompt.trim() && stagedImages.length === 0)} className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-200 disabled:opacity-50 disabled:shadow-none">
              <SendIcon className="w-5 h-5" />
          </button>
      </form>
    </div>
  );
};

export default ChatPanel;