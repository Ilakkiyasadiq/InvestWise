import React from 'react';
import { LineChart } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StockCard from '../components/StockCard';
import WatchlistWidget from '../components/WatchlistWidget';
import NewsWidget from '../components/NewsWidget';
import PortfolioAnalytics from '../components/PortfolioAnalytics';
import PortfolioStats from '../components/PortfolioStats';
import RecentActivity from '../components/RecentActivity';
import { useAuth } from '../context/AuthContext';

export default function StockDashboard() {
  const { user } = useAuth();
  
  const portfolioValue = 125750.32;
  const portfolioChange = 12.5;

  const ownedStocks = [
    { 
      symbol: 'AAPL', 
      price: 178.25, 
      change: 2.3, 
      shares: 15,
      buyPrice: 150.25,
      currentPrice: 178.25
    },
    { 
      symbol: 'GOOGL', 
      price: 142.50, 
      change: -1.2, 
      shares: 8,
      buyPrice: 138.50,
      currentPrice: 142.50
    },
    { 
      symbol: 'MSFT', 
      price: 325.75, 
      change: 1.8, 
      shares: 10,
      buyPrice: 290.75,
      currentPrice: 325.75
    }
  ];

  const recentActivities = [
    { action: 'Bought', stock: 'AAPL', amount: '5 shares', price: '$178.25', date: '2021-03-15' },
    { action: 'Sold', stock: 'GOOGL', amount: '2 shares', price: '$142.50', date: '2022-03-14' },
    { action: 'Bought', stock: 'MSFT', amount: '3 shares', price: '$325.75', date: '2022-03-22' },
    { action: 'Bought', stock: 'TCS', amount: '6 shares', price: '$865.98', date: '2023-09-14' },
    { action: 'Bought', stock: 'TRIDENT', amount: '8 shares', price: '$325', date: '2024-03-11' },
    { action: 'sold', stock: 'INFY', amount: '8 shares', price: '$925.55', date: '2022-03-08' },
    { action: 'brought', stock: 'RELIANCE', amount: '12 shares', price: '$2325.86', date: '2024-12-16' },
    { action: 'sold', stock: 'HDFC', amount: '24 shares', price: '$7325.56', date: '2024-07-12'},
    { action: 'sold', stock: 'BAJAJFIN', amount: '10 shares', price: '$325.25', date: '2024-09-27' }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome, ${user?.firstName || 'Investor'}`}
        description="Monitor your portfolio performance and market trends"
        icon={LineChart}
      />

      <PortfolioStats 
        portfolioValue={portfolioValue}
        portfolioChange={portfolioChange}
        stockCount={ownedStocks.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PortfolioAnalytics portfolio={{ stocks: ownedStocks }} />
        </div>
        <div className="space-y-6">
          <WatchlistWidget />
          <NewsWidget />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Your Holdings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ownedStocks.map((stock) => (
            <StockCard
              key={stock.symbol}
              symbol={stock.symbol}
              price={stock.price}
              change={stock.change}
              volume={`${stock.shares} shares`}
            />
          ))}
        </div>
      </div>

      <RecentActivity activities={recentActivities} />
    </div>
  );
}