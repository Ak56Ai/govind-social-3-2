import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { MessageInput } from './components/MessageInput';
import { PlatformPreview } from './components/PlatformPreview';
import { SchedulingModal } from './components/SchedulingModal';
import { Dashboard } from './components/Dashboard';
import { PlatformSelector } from './components/PlatformSelector';
import { AccountConnection } from './components/AccountConnection';
import { SignInForm } from './components/SignInForm';
import { SignUpForm } from './components/SignUpForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { ResetPasswordForm } from './components/ResetPasswordForm';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { WorkPage } from './pages/WorkPage';
import { TeamPage } from './pages/TeamPage';
import { PlansPage } from './pages/PlansPage';
import { ContactPage } from './pages/ContactPage';
import { TokenPage } from './pages/TokenPage';
import { ArrowLeft, Share2, ArrowRight, Globe2, Clock, DollarSign, Zap, Share, Users, TrendingUp, Shield, Star } from 'lucide-react';
import { UserProfile } from './components/UserProfile';
import { PendingPosts } from './components/PendingPosts';
import { PostHistory } from './components/PostHistory';
import type { SocialMediaPost, SocialMediaAccount, ScheduledPost } from './types';
import { SocialMediaService } from './services/socialMedia';
import { supabase } from './services/supabase';

const socialMediaService = new SocialMediaService();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState(supabase.auth.getSession());

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!session) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
}

function MainContent() {
  const navigate = useNavigate();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [connectedAccounts, setConnectedAccounts] = useState<SocialMediaAccount[]>([]);
  const [showSchedulingModal, setShowSchedulingModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showApp, setShowApp] = useState(false);
  const [pendingPosts, setPendingPosts] = useState<ScheduledPost[]>([]);
  const [postHistory, setPostHistory] = useState<ScheduledPost[]>([]);

  useEffect(() => {
    loadConnectedAccounts();
    loadPosts();
  }, []);

  const loadConnectedAccounts = async () => {
    try {
      const accounts = await socialMediaService.getConnectedAccounts();
      setConnectedAccounts(accounts);
    } catch (error) {
      console.error('Failed to load connected accounts:', error);
    }
  };

  const loadPosts = async () => {
    try {
      const { data: scheduled } = await supabase
        .from('scheduled_posts')
        .select('*')
        .eq('status', 'scheduled')
        .order('scheduled_time', { ascending: true });

      const { data: completed } = await supabase
        .from('scheduled_posts')
        .select('*')
        .eq('status', 'completed')
        .order('scheduled_time', { ascending: false })
        .limit(10);

      if (scheduled) setPendingPosts(scheduled);
      if (completed) setPostHistory(completed);
    } catch (error) {
      console.error('Failed to load posts:', error);
    }
  };

  const handleAccountConnected = async (platform: string) => {
    await loadConnectedAccounts();
  };

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleMessageSubmit = (message: string) => {
    setCurrentMessage(message);
    setShowSchedulingModal(true);
  };

  const handleSchedule = async (scheduledTime: Date) => {
    try {
      await socialMediaService.schedulePost(selectedPlatforms, currentMessage, scheduledTime);
      setShowSchedulingModal(false);
      setCurrentMessage('');
      setSelectedPlatforms([]);
      loadPosts();
    } catch (error) {
      console.error('Failed to schedule post:', error);
    }
  };

  if (!showApp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[calc(100vh-8rem)]">
            {/* Left Content */}
            <div className="flex-1 max-w-2xl">
              <h1 className="text-6xl font-bold text-gray-900 mb-6">
                Turn <span className="text-blue-500">Social Posts</span> into 
                <span className="text-blue-500"> Conversions</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                With SocialSync, master the art of social media management as we harness AI, analytics, and automation to transform your digital engagement strategy.
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowApp(true)}
                  className="px-8 py-4 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  Launch App
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-6 py-4 text-gray-700 hover:text-blue-500 flex items-center gap-2 transition-colors">
                  Learn more
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-500">124K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-500">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-500">14K+</div>
                  <div className="text-sm text-gray-600">Projects Delivered</div>
                </div>
              </div>

              {/* Powered By */}
              <div className="mt-12">
                <p className="text-sm text-gray-500 mb-4">Powered by</p>
                <div className="flex flex-wrap items-center gap-8">
                  {['Twitter', 'LinkedIn', 'Facebook', 'Instagram', 'TikTok'].map((platform) => (
                    <div key={platform} className="text-gray-400 hover:text-gray-600 transition-colors">
                      {platform}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Stats and Images */}
            <div className="flex-1 relative">
              <div className="relative">
                {/* Main Image */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" 
                    alt="Dashboard" 
                    className="w-full h-auto"
                  />
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-8 -left-8 bg-blue-500 text-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>5.8K+ Clients Served</span>
                  </div>
                </div>

                <div className="absolute -bottom-8 -right-8 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-gray-900">98% Growth Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }  
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        <button
          onClick={() => setShowApp(false)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
        
        <div className="grid grid-cols-12 gap-6">
          {/* Side Panel */}
          <div className="col-span-12 md:col-span-3 space-y-6">
            <UserProfile
              user={{
                name: "John Doe",
                email: "john@example.com",
                plan: "Starter"
              }}
            />
            <PendingPosts posts={pendingPosts} />
            <PostHistory posts={postHistory} />
          </div>

          {/* Main Content */}
          <div className="col-span-12 md:col-span-9">
            <AccountConnection onAccountConnected={handleAccountConnected} />

            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
              <PlatformSelector
                selectedPlatforms={selectedPlatforms}
                onPlatformToggle={handlePlatformToggle}
                connectedAccounts={connectedAccounts}
              />
              <MessageInput onSubmit={handleMessageSubmit} />
            </div>

            {showSchedulingModal && (
              <SchedulingModal
                onSchedule={handleSchedule}
                onClose={() => setShowSchedulingModal(false)}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/token" element={<TokenPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainContent />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;