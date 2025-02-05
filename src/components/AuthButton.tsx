import React from 'react';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

export const AuthButton = () => {
  const navigate = useNavigate();
  const user = supabase.auth.getUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  return user ? (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
    >
      <LogIn className="w-5 h-5" />
      Sign Out
    </button>
  ) : (
    <button
      onClick={() => navigate('/signin')}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      <LogIn className="w-5 h-5" />
      Sign In
    </button>
  );
};