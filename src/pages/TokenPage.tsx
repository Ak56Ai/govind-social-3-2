import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Wallet, BarChart2, Shield, Users, Rocket } from 'lucide-react';

export const TokenPage = () => {
  const tokenomics = [
    { category: 'Public Sale', percentage: 40 },
    { category: 'Team & Advisors', percentage: 15 },
    { category: 'Marketing', percentage: 10 },
    { category: 'Development', percentage: 15 },
    { category: 'Liquidity Pool', percentage: 10 },
    { category: 'Community Rewards', percentage: 10 }
  ];

  const roadmap = [
    {
      phase: 'Phase 1 - Q1-Q2 2025',
      items: [
        'Token Launch on Solana',
        'Initial DEX Offering',
        'Community Building',
        'Platform Integration'
      ]
    },
    {
      phase: 'Phase 2 - Q3-Q4 2025',
      items: [
        'Staking Program Launch',
        'Governance Implementation',
        'Partnership Expansion',
        'Enhanced Platform Features'
      ]
    },
    {
      phase: 'Phase 3 - Q1-Q2 2026',
      items: [
        'Cross-Chain Integration',
        'Advanced Analytics Tools',
        'Enterprise Solutions',
        'Global Marketing Campaign'
      ]
    },
    {
      phase: 'Phase 4 - Q3-Q4 2026',
      items: [
        'Mobile App Integration',
        'AI-Powered Features',
        'International Expansion',
        'Ecosystem Development'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-8">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SocialSync Token (SYNC)
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powering the future of decentralized social media management
          </p>
        </div>

        {/* Smart Contract Info */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Smart Contract Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Network</h3>
              <p className="text-lg">Solana Chain</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Token Standard</h3>
              <p className="text-lg">SPL Token</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Total Supply</h3>
              <p className="text-lg">1,000,000,000 SYNC</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Initial Price</h3>
              <p className="text-lg">$0.01 USD</p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-8 text-center">Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Shield className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Platform Access</h3>
              <p className="text-gray-600">
                Use SYNC tokens to access premium features and advanced analytics tools
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Users className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Governance</h3>
              <p className="text-gray-600">
                Participate in platform decisions and feature proposals
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <BarChart2 className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Rewards</h3>
              <p className="text-gray-600">
                Earn tokens through platform engagement and content creation
              </p>
            </div>
          </div>
        </div>

        {/* Tokenomics */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-8 text-center">Tokenomics</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="relative w-full h-80">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full" style={{ maxWidth: '400px' }}>
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
                      {tokenomics.map((item, index) => (
                        <div
                          key={item.category}
                          className="absolute w-full h-full"
                          style={{
                            clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(2 * Math.PI * index / tokenomics.length)}% ${50 + 50 * Math.sin(2 * Math.PI * index / tokenomics.length)}%, ${50 + 50 * Math.cos(2 * Math.PI * (index + 1) / tokenomics.length)}% ${50 + 50 * Math.sin(2 * Math.PI * (index + 1) / tokenomics.length)}%)`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {tokenomics.map((item) => (
                <div key={item.category} className="flex items-center justify-between">
                  <span className="text-gray-700">{item.category}</span>
                  <span className="font-semibold">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-8 text-center">Roadmap</h2>
          <div className="space-y-8">
            {roadmap.map((phase, index) => (
              <div key={phase.phase} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold">{phase.phase}</h3>
                </div>
                <ul className="grid md:grid-cols-2 gap-4">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-blue-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};