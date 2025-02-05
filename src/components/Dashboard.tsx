import React from 'react';
import { format } from 'date-fns';
import { Twitter, Linkedin, Facebook, Instagram, MessageCircle, Trash2, Edit2 } from 'lucide-react';
import type { ScheduledPost } from '../types';

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  telegram: MessageCircle,
} as const;

interface DashboardProps {
  posts: ScheduledPost[];
}

export const Dashboard: React.FC<DashboardProps> = ({ posts }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Scheduled Posts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Platform</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Content</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Schedule</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              const Icon = platformIcons[post.platform as keyof typeof platformIcons];
              return (
                <tr key={post.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Icon className="w-5 h-5 text-blue-500" />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-800 line-clamp-2">{post.content}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {format(new Date(post.scheduled_time), 'MMM d, yyyy h:mm a')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};