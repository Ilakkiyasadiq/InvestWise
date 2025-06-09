import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart2, Shield, DollarSign } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-cyan-950 rounded-3xl">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-sans text-white mb-6">
            Invest in Your Future
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your investment journey today with StockMate. Smart investing made simple.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
            >
              Get Started
            </Link>
            <Link
              to="/market"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10"
            >
              View Markets
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose StockMate?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BarChart2 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-gray-600">
              Get instant access to market data and powerful analytical tools
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Trading</h3>
            <p className="text-gray-600">
              Your investments are protected with bank-level security
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Investment</h3>
            <p className="text-gray-600">
              Make informed decisions with our expert insights
            </p>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="bg-cyan-950 py-16 rounded-2xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-neutral-100 font-bold text-center mb-12">Market Overview</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {['AAPL', 'GOOGL', 'MSFT', 'AMZN'].map((stock) => (
              <div key={stock} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">{stock}</span>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold mb-2">
                  ${Math.floor(Math.random() * 1000)}
                </div>
                <div className="text-green-500">+{(Math.random() * 5).toFixed(2)}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Investing?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of investors who trust StockMate for their investment needs
        </p>
        <Link
          to="/signup"
          className="bg-sky-950 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-400"
        >
          Create Free Account
        </Link>
      </section>
    </div>
  );
}