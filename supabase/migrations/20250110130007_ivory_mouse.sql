/*
  # Initial Schema Setup

  1. New Tables
    - `social_media_accounts`
      - Stores connected social media account credentials
    - `scheduled_posts`
      - Stores posts scheduled for future publishing
    - `post_analytics`
      - Tracks performance metrics for published posts

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Social Media Accounts Table
CREATE TABLE IF NOT EXISTS social_media_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  platform text NOT NULL,
  access_token text NOT NULL,
  refresh_token text,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE social_media_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own social media accounts"
  ON social_media_accounts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Scheduled Posts Table
CREATE TABLE IF NOT EXISTS scheduled_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  platform text NOT NULL,
  content text NOT NULL,
  scheduled_time timestamptz NOT NULL,
  status text DEFAULT 'scheduled',
  ai_generated boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own scheduled posts"
  ON scheduled_posts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Post Analytics Table
CREATE TABLE IF NOT EXISTS post_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES scheduled_posts(id),
  likes integer DEFAULT 0,
  shares integer DEFAULT 0,
  comments integer DEFAULT 0,
  impressions integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE post_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own post analytics"
  ON post_analytics
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM scheduled_posts
      WHERE scheduled_posts.id = post_analytics.post_id
      AND scheduled_posts.user_id = auth.uid()
    )
  );