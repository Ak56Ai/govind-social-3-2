import React from 'react';
import { Clock, Edit2, Trash2 } from 'lucide-react';
import type { ScheduledPost } from '../types';
import { format } from 'date-fns';

interface PendingPostsProps {
  posts: ScheduledPost[];
  onEdit?: (post: ScheduledPost) => void;
  onDelete?: (postId: string) => void;
}

export const PendingPosts: React.FC<PendingPostsProps> = ({ posts, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Pending Posts</h3>
      {posts.length === 0 ? (
        <p className="text-gray-500">No pending posts</p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">
                    {format(new Date(post.scheduled_time), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>
                <div className="flex gap-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(post)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(post.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-gray-800 line-clamp-2">{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};