import React, { useState } from 'react';
import { Mic, Send } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface MessageInputProps {
  onSubmit: (message: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
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

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={listening ? stopListening : startListening}
            className={`p-2 rounded-full ${
              listening ? 'bg-red-500' : 'bg-blue-500'
            } text-white hover:opacity-80`}
          >
            <Mic size={20} />
          </button>
          <button
            type="submit"
            className="p-2 rounded-full bg-green-500 text-white hover:opacity-80"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </form>
  );
}