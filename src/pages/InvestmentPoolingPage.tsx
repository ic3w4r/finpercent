import React from 'react';
import { ChevronLeft, Users, HandCoins, Scale, TrendingUp, FileText, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InvestmentPoolingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 p-6 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/explore"
          className="flex items-center text-primary-600 hover:text-primary-700 mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="ml-2">Back to Explore</span>
        </Link>

        {/* Main Content */}
        <div className="glass-card rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Investment Pooling</h1>
          
          {/* Introduction Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What is Investment Pooling?</h2>
            <p className="text-gray-600 mb-4">
              Investment Pooling allows you to combine resources with friends, family, or like-minded investors
              to access larger investment opportunities that would be difficult to achieve individually.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 glass-card rounded-xl">
                <Users className="w-6 h-6 text-primary-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-800">Collaborative Investing</h3>
                  <p className="text-sm text-gray-600">Pool resources with trusted partners</p>
                </div>
              </div>
              <div className="flex items-center p-4 glass-card rounded-xl">
                <HandCoins className="w-6 h-6 text-primary-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-800">Shared Benefits</h3>
                  <p className="text-sm text-gray-600">Distribute profits proportionally</p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start p-4 glass-card rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Create or Join a Pool</h3>
                  <p className="text-gray-600">
                    Start your own investment pool or join an existing one. Set clear goals and contribution rules.
                  </p>
                </div>
              </div>
              <div className="flex items-start p-4 glass-card rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Contribute & Vote</h3>
                  <p className="text-gray-600">
                    Members contribute funds and vote on investment opportunities using our secure platform.
                  </p>
                </div>
              </div>
              <div className="flex items-start p-4 glass-card rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Track & Distribute</h3>
                  <p className="text-gray-600">
                    Monitor investments and receive automated profit distributions based on your contribution.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 glass-card rounded-xl">
                <Scale className="w-6 h-6 text-primary-600 mb-2" />
                <h3 className="font-semibold text-gray-800 mb-2">Transparent Governance</h3>
                <p className="text-gray-600">
                  Clear voting rules and decision-making processes ensure fairness and transparency.
                </p>
              </div>
              <div className="p-4 glass-card rounded-xl">
                <TrendingUp className="w-6 h-6 text-primary-600 mb-2" />
                <h3 className="font-semibold text-gray-800 mb-2">Performance Tracking</h3>
                <p className="text-gray-600">
                  Real-time dashboards show pool performance and individual contributions.
                </p>
              </div>
              <div className="p-4 glass-card rounded-xl">
                <FileText className="w-6 h-6 text-primary-600 mb-2" />
                <h3 className="font-semibold text-gray-800 mb-2">Legal Framework</h3>
                <p className="text-gray-600">
                  Our platform provides legal templates and agreements for your investment pool.
                </p>
              </div>
              <div className="p-4 glass-card rounded-xl">
                <ShieldCheck className="w-6 h-6 text-primary-600 mb-2" />
                <h3 className="font-semibold text-gray-800 mb-2">Secure Transactions</h3>
                <p className="text-gray-600">
                  Bank-grade security protects all transactions and sensitive data.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Start Your Investment Pool
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Already have a pool? <Link to="/join-pool" className="text-primary-600 hover:text-primary-700">Join an existing pool</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
