import React from 'react';
import { Link } from 'react-router-dom';
import { User, Crown } from 'lucide-react';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    plan: string;
    avatar?: string;
  };
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-500" />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-900">Hi, {user.name}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-blue-500" />
            <span className="font-medium text-gray-900">{user.plan} Plan</span>
          </div>
        </div>
        <Link
          to="/plans"
          className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium mt-2"
        >
          Upgrade Plan
        </Link>
      </div>
    </div>
  );
};