import React from 'react';
import { DollarSign, TrendingUp, BarChart2 } from 'lucide-react';

interface PortfolioStatsProps {
  portfolioValue: number;
  portfolioChange: number;
  stockCount: number;
}

export default function PortfolioStats({ portfolioValue, portfolioChange, stockCount }: PortfolioStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Portfolio Value</h3>
          <DollarSign className="h-5 w-5 text-blue-600" />
        </div>
        <p className="text-3xl font-bold">${portfolioValue.toLocaleString()}</p>
        <p className="text-green-500 mt-2">+{portfolioChange}% All Time</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Today's Change</h3>
          <TrendingUp className="h-5 w-5 text-green-500" />
        </div>
        <p className="text-3xl font-bold">+$1,250.45</p>
        <p className="text-green-500 mt-2">+2.3% Today</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Stocks</h3>
          <BarChart2 className="h-5 w-5 text-blue-600" />
        </div>
        <p className="text-3xl font-bold">{stockCount}</p>
        <p className="text-gray-600 mt-2">Active Positions</p>
      </div>
    </div>
  );
}