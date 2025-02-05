export interface SocialMediaPost {
  content: string;
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram' | 'telegram';
  scheduledTime?: Date;
  status: 'draft' | 'scheduled' | 'posted';
  aiGenerated: boolean;
}

export interface ScheduledPost {
  id: string;
  content: string;
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram' | 'telegram';
  scheduled_time: string;
  status: string;
  user_id: string;
}

export interface PlatformPreview {
  platform: string;
  characterLimit: number;
  supportedFeatures: string[];
}

export interface SocialMediaAccount {
  id: string;
  user_id: string;
  platform: string;
  access_token: string;
  refresh_token?: string;
  expires_at?: string;
  created_at: string;
}