import React from 'react';
import { Twitter, Linkedin, Facebook, MessageCircle } from 'lucide-react';
import type { SocialMediaPost } from '../types';

interface PlatformPreviewProps {
  post: SocialMediaPost;
  onEdit: (platform: string, content: string) => void;
}

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
  telegram: MessageCircle,
} as const;

export const PlatformPreview: React.FC<PlatformPreviewProps> = ({ post, onEdit }) => {
  const Icon = platformIcons[post.platform];

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="text-blue-500" />
        <h3 className="font-semibold capitalize">{post.platform}</h3>
      </div>
      <textarea
        value={post.content}
        onChange={(e) => onEdit(post.platform, e.target.value)}
        className="w-full p-2 border rounded-md"
        rows={4}
      />
      <div className="mt-2 text-sm text-gray-500">
        {post.scheduledTime && (
          <p>Scheduled for: {new Date(post.scheduledTime).toLocaleString()}</p>
        )}
      </div>
    </div>
  );
}