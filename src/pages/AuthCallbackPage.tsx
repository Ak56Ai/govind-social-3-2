import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';
import { SocialMediaService } from '../services/socialMedia';

export const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying authentication...');
  const socialMediaService = new SocialMediaService();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const platform = searchParams.get('platform');
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          throw new Error(`Authentication failed: ${error}`);
        }

        if (!platform || !code) {
          throw new Error('Missing required parameters');
        }

        setStatus(`Connecting ${platform} account...`);

        // Handle platform-specific OAuth flows
        switch (platform) {
          case 'twitter':
            await handleTwitterAuth(code);
            break;
          case 'linkedin':
            await handleLinkedInAuth(code);
            break;
          case 'facebook':
            await handleFacebookAuth(code);
            break;
          case 'instagram':
            await handleInstagramAuth(code);
            break;
          default:
            throw new Error('Unsupported platform');
        }

        setStatus('Successfully connected!');
        
        // Close the popup window if this page was opened as a popup
        if (window.opener) {
          window.opener.postMessage({ type: 'SOCIAL_AUTH_SUCCESS', platform }, window.location.origin);
          window.close();
        } else {
          navigate('/');
        }
      } catch (error: any) {
        setStatus(`Error: ${error.message}`);
        setTimeout(() => {
          if (window.opener) {
            window.opener.postMessage({ type: 'SOCIAL_AUTH_ERROR', error: error.message }, window.location.origin);
            window.close();
          } else {
            navigate('/');
          }
        }, 3000);
      }
    };

    handleAuth();
  }, [searchParams, navigate]);

  const handleTwitterAuth = async (code: string) => {
    const tokenResponse = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${import.meta.env.VITE_TWITTER_CLIENT_ID}:${import.meta.env.VITE_TWITTER_CLIENT_SECRET}`)}`,
      },
      body: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${window.location.origin}/auth/callback?platform=twitter`,
        code_verifier: 'challenge',
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get Twitter access token');
    }

    const tokens = await tokenResponse.json();
    await socialMediaService.connectAccount('twitter');
  };

  const handleLinkedInAuth = async (code: string) => {
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
        client_secret: import.meta.env.VITE_LINKEDIN_CLIENT_SECRET,
        redirect_uri: `${window.location.origin}/auth/callback?platform=linkedin`,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get LinkedIn access token');
    }

    const tokens = await tokenResponse.json();
    await socialMediaService.connectAccount('linkedin');
  };

  const handleFacebookAuth = async (code: string) => {
    const tokenResponse = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: import.meta.env.VITE_FACEBOOK_APP_ID,
        redirect_uri: `${window.location.origin}/auth/callback?platform=facebook`,
        client_secret: import.meta.env.VITE_FACEBOOK_CLIENT_SECRET,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get Facebook access token');
    }

    const tokens = await tokenResponse.json();
    await socialMediaService.connectAccount('facebook');
  };

  const handleInstagramAuth = async (code: string) => {
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: import.meta.env.VITE_INSTAGRAM_CLIENT_ID,
        client_secret: import.meta.env.VITE_INSTAGRAM_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: `${window.location.origin}/auth/callback?platform=instagram`,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get Instagram access token');
    }

    const tokens = await tokenResponse.json();
    await socialMediaService.connectAccount('instagram');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {status}
        </h2>
        <p className="text-gray-600">
          Please wait while we complete the authentication process...
        </p>
      </div>
    </div>
  );
};