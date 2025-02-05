import React from 'react';
import { Twitter, Linkedin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import type { SocialMediaAccount } from '../types';

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onPlatformToggle: (platform: string) => void;
  connectedAccounts: SocialMediaAccount[];
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatforms,
  onPlatformToggle,
  connectedAccounts,
}) => {
  const platforms = [
    { id: 'twitter', icon: Twitter, label: 'Twitter' },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
    { id: 'facebook', icon: Facebook, label: 'Facebook' },
    { id: 'instagram', icon: Instagram, label: 'Instagram' },
    { id: 'telegram', icon: MessageCircle, label: 'Telegram' },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {platforms.map(({ id, icon: Icon, label }) => {
        const isConnected = connectedAccounts.some(account => account.platform === id);
        return (
          <label
            key={id}
            className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border transition-colors ${
              !isConnected 
                ? 'opacity-50 cursor-not-allowed'
                : selectedPlatforms.includes(id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedPlatforms.includes(id)}
              onChange={() => isConnected && onPlatformToggle(id)}
              disabled={!isConnected}
              className="hidden"
            />
            <Icon className={`w-5 h-5 ${
              selectedPlatforms.includes(id) ? 'text-blue-500' : 'text-gray-500'
            }`} />
            <span className={`text-sm font-medium ${
              selectedPlatforms.includes(id) ? 'text-blue-700' : 'text-gray-700'
            }`}>
              {label}
              {!isConnected && ' (Not Connected)'}
            </span>
          </label>
        )
      })}
    </div>
  );
};