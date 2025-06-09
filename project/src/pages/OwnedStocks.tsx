import React from 'react';
import { Briefcase } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StockCard from '../components/StockCard';

export default function OwnedStocks() {
  const ownedStocks = [
    { symbol: 'AAPL', price: 178.25, change: 2.3, shares: 15, value: 2673.75 },
    { symbol: 'GOOGL', price: 142.50, change: -1.2, shares: 8, value: 1140.00 },
    { symbol: 'MSFT', price: 325.75, change: 1.8, shares: 10, value: 3257.50 },
    { symbol: 'AMZN', price: 175.25, change: 0.5, shares: 12, value: 2103.00 },
  ];

  const totalValue = ownedStocks.reduce((sum, stock) => sum + stock.value, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Owned Stocks"
        description="Manage your stock portfolio"
        icon={Briefcase}
      />

      {/* Portfolio Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Portfolio Summary</h3>
          <p className="text-2xl font-bold text-blue-600">${totalValue.toFixed(2)}</p>
        </div>
      </div>

      {/* Stock Holdings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ownedStocks.map((stock) => (
          <div key={stock.symbol} className="bg-white rounded-xl shadow-sm p-6">
            <StockCard
              symbol={stock.symbol}
              price={stock.price}
              change={stock.change}
              volume={`${stock.shares} shares`}
            />
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Value</span>
                <span className="font-semibold">${stock.value.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}