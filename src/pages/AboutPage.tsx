import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Users, Zap, Clock, TrendingUp, Globe2, Share, DollarSign, Shield } from 'lucide-react';

export const AboutPage = () => {
  const features = [
    {
      icon: Users,
      title: 'Multi-Platform Management',
      description: 'Seamlessly manage all your social media accounts from one intuitive dashboard.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Insights',
      description: 'Get intelligent content suggestions and optimal posting times based on your audience.'
    },
    {
      icon: Clock,
      title: 'Smart Scheduling',
      description: 'Schedule your posts in advance and let SocialSync handle the posting for you.'
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Reporting',
      description: 'Track your social media performance with detailed analytics and actionable insights.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to SocialSync
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your ultimate social media management tool that empowers individuals and businesses 
            to thrive in the digital world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              For Individuals
            </h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="h-6 w-6 text-blue-500 mr-2">•</span>
                Schedule posts across multiple platforms effortlessly
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-blue-500 mr-2">•</span>
                Discover trending topics to boost engagement
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-blue-500 mr-2">•</span>
                Post at optimal times for maximum impact
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              For Businesses
            </h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="h-6 w-6 text-blue-500 mr-2">•</span>
                Access powerful analytics and insights
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-blue-500 mr-2">•</span>
                Track industry trends and competitor analysis
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 text-blue-500 mr-2">•</span>
                Plan data-driven marketing campaigns
              </li>
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to help you manage your social media presence effectively and grow your audience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Globe2,
                title: "Unified Platform",
                description: "Connect and manage all your social media accounts from a single, intuitive dashboard"
              },
              {
                icon: Share,
                title: "Cross-Platform Posting",
                description: "Share content across multiple platforms simultaneously with smart format adaptation"
              },
              {
                icon: Clock,
                title: "Smart Scheduling",
                description: "Schedule posts for optimal times to maximize engagement and reach"
              },
              {
                icon: DollarSign,
                title: "Cost Efficient",
                description: "Save time and resources with our affordable all-in-one solution"
              },
              {
                icon: Zap,
                title: "AI-Powered Insights",
                description: "Get intelligent content suggestions and performance analytics"
              },
              {
                icon: Users,
                title: "Audience Management",
                description: "Track and engage with your audience across all platforms"
              },
              {
                icon: TrendingUp,
                title: "Analytics Dashboard",
                description: "Comprehensive analytics to track your social media performance"
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Enterprise-grade security for your social media accounts"
              }
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-500 transition-colors">
                    <Icon className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white p-6 rounded-lg shadow-sm">
              <Icon className="h-8 w-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};