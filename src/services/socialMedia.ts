import { supabase } from './supabase';
import type { ScheduledPost, SocialMediaAccount } from '../types';

export class SocialMediaService {
  async connectAccount(platform: string): Promise<boolean> {
    // This method will be called after OAuth callback
    const { data: existingAccount } = await supabase
      .from('social_media_accounts')
      .select('*')
      .eq('platform', platform)
      .single();

    if (existingAccount) {
      return true;
    }

    return false;
  }

  async getConnectedAccounts(): Promise<SocialMediaAccount[]> {
    const { data, error } = await supabase
      .from('social_media_accounts')
      .select('*');

    if (error) throw error;
    return data;
  }

  async disconnectAccount(platform: string): Promise<void> {
    const { error } = await supabase
      .from('social_media_accounts')
      .delete()
      .match({ platform });

    if (error) throw error;
  }

  async postToTwitter(content: string) {
    const response = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_TWITTER_BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: content
      })
    });

    if (!response.ok) {
      throw new Error('Failed to post to Twitter');
    }

    return await response.json();
  }

  // ... (previous methods remain unchanged)

  async schedulePost(platforms: string[], content: string, scheduledTime: Date) {
    const user = await supabase.auth.getUser();
    
    // Validate that user has connected accounts for selected platforms
    const { data: connectedAccounts } = await supabase
      .from('social_media_accounts')
      .select('platform')
      .in('platform', platforms);

    if (!connectedAccounts || connectedAccounts.length !== platforms.length) {
      throw new Error('Please connect all selected social media accounts first');
    }

    const posts = platforms.map(platform => ({
      platform,
      content,
      scheduled_time: scheduledTime,
      status: 'scheduled',
      user_id: user.data.user?.id
    }));

    const { data, error } = await supabase
      .from('scheduled_posts')
      .insert(posts);

    if (error) throw error;
    return data;
  }
}