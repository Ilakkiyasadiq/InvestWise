import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieChartIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface PortfolioAnalyticsProps {
  portfolio: {
    stocks: Array<{
      symbol: string;
      shares: number;
      buyPrice: number;
      currentPrice: number;
    }>;
  };
}

export default function PortfolioAnalytics({ portfolio }: PortfolioAnalyticsProps) {
  // Calculate portfolio metrics
  const calculateMetrics = () => {
    const metrics = portfolio.stocks.map(stock => ({
      symbol: stock.symbol,
      value: stock.shares * stock.currentPrice,
      gain: (stock.currentPrice - stock.buyPrice) * stock.shares,
      gainPercentage: ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100
    }));

    const totalValue = metrics.reduce((sum, stock) => sum + stock.value, 0);
    const totalGain = metrics.reduce((sum, stock) => sum + stock.gain, 0);
    const averageGainPercentage = metrics.reduce((sum, stock) => sum + stock.gainPercentage, 0) / metrics.length;

    return {
      metrics,
      totalValue,
      totalGain,
      averageGainPercentage
    };
  };

  const { metrics, totalValue, totalGain, averageGainPercentage } = calculateMetrics();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <PieChartIcon className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Portfolio Analytics</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Value</p>
          <p className="text-xl font-bold">${totalValue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Gain/Loss</p>
          <p className={`text-xl font-bold flex items-center gap-1 ${
            totalGain >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {totalGain >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            ${Math.abs(totalGain).toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Average Return</p>
          <p className={`text-xl font-bold ${
            averageGainPercentage >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {averageGainPercentage.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={metrics}
              dataKey="value"
              nameKey="symbol"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {metrics.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2">
        {metrics.map((stock, index) => (
          <div key={stock.symbol} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span>{stock.symbol}</span>
            </div>
            <span className="font-medium">${stock.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}