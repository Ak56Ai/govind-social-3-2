import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BarChart, Users, Target, TrendingUp } from 'lucide-react';

export const WorkPage = () => {
  const caseStudies = [
    {
      title: 'Fashion Retailer Success',
      description: 'Increased social media engagement by 300% through strategic content planning',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
      metrics: ['300% Engagement Increase', '50K New Followers', '200% ROI']
    },
    {
      title: 'Tech Startup Growth',
      description: 'Achieved 150% follower growth in 3 months with targeted campaign strategy',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
      metrics: ['150% Follower Growth', '1M+ Impressions', '400% Lead Increase']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Work</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we've helped businesses and individuals transform their social media presence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {caseStudies.map((study) => (
            <div key={study.title} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img 
                src={study.image} 
                alt={study.title} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{study.title}</h3>
                <p className="text-gray-600 mb-4">{study.description}</p>
                <div className="grid grid-cols-3 gap-4">
                  {study.metrics.map((metric) => (
                    <div key={metric} className="text-center p-2 bg-blue-50 rounded-lg">
                      <p className="text-sm font-semibold text-blue-600">{metric}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: BarChart,
              title: 'Data-Driven Strategy',
              description: 'We use advanced analytics to craft winning social media strategies'
            },
            {
              icon: Users,
              title: 'Community Building',
              description: 'Build and engage with your audience effectively'
            },
            {
              icon: Target,
              title: 'Targeted Campaigns',
              description: 'Reach the right audience with precision targeting'
            },
            {
              icon: TrendingUp,
              title: 'Growth Focus',
              description: 'Sustainable growth strategies that deliver results'
            }
          ].map(({ icon: Icon, title, description }) => (
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