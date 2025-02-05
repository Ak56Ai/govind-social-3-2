import React, { useState, useRef } from 'react';
import { Mic, Send, Smile, Image, Video, Gift, Wand2, AlertCircle } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { generateContent } from '../services/ai';

interface MessageInputProps {
  onSubmit: (message: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
      setMediaPreview(null);
      setError(null);
    }
  };

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setMessage(transcript);
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size must be less than 10MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
        setError(null);
      };
      reader.onerror = () => {
        setError('Failed to read file');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAIAssist = async () => {
    try {
      setIsGeneratingAI(true);
      setError(null);
      const prompt = message || 'Generate an engaging social media post';
      const aiContent = await generateContent(prompt, 'general');
      setMessage(aiContent);
    } catch (error: any) {
      setError(error.message || 'Failed to generate AI content');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 text-red-700 bg-red-50 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      {mediaPreview && (
        <div className="relative">
          <img 
            src={mediaPreview} 
            alt="Upload preview" 
            className="max-h-48 rounded-lg object-contain"
          />
          <button
            onClick={() => setMediaPreview(null)}
            className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
          >
            ×
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="w-full">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-4 rounded-t-lg border-b resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
          
          <div className="p-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Smile className="w-5 h-5 text-gray-500" />
              </button>
              
              <label className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                <Image className="w-5 h-5 text-gray-500" />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleMediaUpload}
                  accept="image/*,video/*"
                  className="hidden"
                />
              </label>
              
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Video className="w-5 h-5 text-gray-500" />
              </button>
              
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Gift className="w-5 h-5 text-gray-500" />
              </button>
              
              <button
                type="button"
                onClick={handleAIAssist}
                disabled={isGeneratingAI}
                className={`p-2 hover:bg-gray-100 rounded-full ${
                  isGeneratingAI ? 'opacity-50 cursor-not-allowed animate-pulse' : ''
                }`}
              >
                <Wand2 className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={listening ? stopListening : startListening}
                className={`p-2 rounded-full ${
                  listening ? 'bg-red-100 text-red-500' : 'hover:bg-gray-100'
                }`}
              >
                <Mic size={20} />
              </button>
              
              <button
                type="submit"
                disabled={!message.trim() && !mediaPreview}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
      
      {showEmojiPicker && (
        <div className="absolute z-10">
          <Picker 
            data={data} 
            onEmojiSelect={handleEmojiSelect}
            theme="light"
          />
        </div>
      )}
    </div>
  );
};