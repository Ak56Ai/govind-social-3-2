import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Check } from 'lucide-react';

export const PlansPage = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$9',
      features: [
        'Connect up to 3 social accounts',
        'Basic analytics',
        'Schedule up to 30 posts',
        'AI content suggestions',
      ],
      recommended: false
    },
    {
      name: 'Professional',
      price: '$29',
      features: [
        'Connect up to 10 social accounts',
        'Advanced analytics',
        'Unlimited scheduled posts',
        'Priority AI content generation',
        'Custom posting schedule',
        'Team collaboration (2 members)'
      ],
      recommended: true
    },
    {
      name: 'Business',
      price: '$99',
      features: [
        'Connect unlimited social accounts',
        'Enterprise analytics',
        'Unlimited scheduled posts',
        'Priority AI content generation',
        'Custom posting schedule',
        'Team collaboration (unlimited)',
        'API access',
        'Dedicated support'
      ],
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan for your social media management needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg shadow-sm overflow-hidden ${
                plan.recommended ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.recommended && (
                <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                  Recommended
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full py-2 px-4 rounded-lg font-medium ${
                    plan.recommended
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};