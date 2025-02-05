import React from 'react';
import { CheckCircle, BarChart2 } from 'lucide-react';
import type { ScheduledPost } from '../types';
import { format } from 'date-fns';

interface PostHistoryProps {
  posts: ScheduledPost[];
}

export const PostHistory: React.FC<PostHistoryProps> = ({ posts }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Post History</h3>
      {posts.length === 0 ? (
        <p className="text-gray-500">No post history</p>
      ) : (
        <div className="space-y-3">
          {posts.slice(0, 10).map((post) => (
            <div key={post.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">
                    {format(new Date(post.scheduled_time), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <BarChart2 className="w-4 h-4 text-blue-500" />
                </button>
              </div>
              <p className="text-gray-800 line-clamp-2">{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};