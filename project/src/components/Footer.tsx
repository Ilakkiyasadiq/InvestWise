import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 group">
              <TrendingUp className="h-8 w-8 text-primary-400 group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold">StockMate</span>
            </Link>
            <p className="mt-4 text-secondary-400">
              Your trusted partner in smart investing. Make informed decisions and grow your wealth.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                ['Stock Market', '/market'],
                ['Dashboard', '/dashboard'],
                ['Buy Stocks', '/buy-stocks'],
                ['Calculator', '/stock-calculator'],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link 
                    to={path} 
                    className="text-secondary-400 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {[
                ['Terms & Conditions', '/terms'],
                ['Privacy Policy', '/privacy'],
                ['Disclaimer', '/disclaimer'],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link 
                    to={path} 
                    className="text-secondary-400 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {[
                [Facebook, '#facebook'],
                [Twitter, '#twitter'],
                [Linkedin, '#linkedin'],
              ].map(([Icon, url], index) => (
                <a 
                  key={index}
                  href={url}
                  className="text-secondary-400 hover:text-white transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-800 mt-8 pt-8 text-center text-secondary-400">
          <p>&copy; {new Date().getFullYear()} StockMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}