import React from 'react';
import { Twitter, Linkedin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { SocialMediaService } from '../services/socialMedia';

interface AccountConnectionProps {
  onAccountConnected: (platform: string) => void;
}

export const AccountConnection: React.FC<AccountConnectionProps> = ({ onAccountConnected }) => {
  const socialMediaService = new SocialMediaService();
  const DOMAIN = 'https://www.socialsync.fun';

  const handleConnect = async (platform: string) => {
    try {
      const connected = await socialMediaService.connectAccount(platform);
      if (connected) {
        onAccountConnected(platform);
      }
    } catch (error) {
      console.error(`Failed to connect ${platform} account:`, error);
    }
  };

  const platforms = [
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      authUrl: `https://twitter.com/i/oauth2/authorize?client_id=${import.meta.env.VITE_TWITTER_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(DOMAIN)}/auth/callback?platform=twitter&scope=tweet.read%20tweet.write%20users.read&code_challenge=challenge&code_challenge_method=plain`
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      authUrl: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${import.meta.env.VITE_LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(DOMAIN)}/auth/callback?platform=linkedin&scope=w_member_social`
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      authUrl: `https://www.facebook.com/v18.0/dialog/oauth?client_id=${import.meta.env.VITE_FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(DOMAIN)}/auth/callback?platform=facebook&scope=pages_manage_posts,pages_read_engagement`
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      authUrl: `https://api.instagram.com/oauth/authorize?client_id=${import.meta.env.VITE_INSTAGRAM_CLIENT_ID}&redirect_uri=${encodeURIComponent(DOMAIN)}/auth/callback?platform=instagram&scope=instagram_basic,instagram_content_publish&response_type=code`
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: MessageCircle,
      authUrl: `https://telegram.me/${import.meta.env.VITE_TELEGRAM_BOT_USERNAME}?start=auth`
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Connect Your Accounts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map(({ id, name, icon: Icon, authUrl }) => (
          <a
            key={id}
            href={authUrl}
            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.open(authUrl, 'Connect Account', 'width=600,height=700');
            }}
          >
            <Icon className="w-6 h-6 text-blue-500" />
            <span className="font-medium">Connect {name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};