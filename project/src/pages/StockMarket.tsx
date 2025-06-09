import React, { useState } from 'react';
import { Search, TrendingUp, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import PageHeader from '../components/PageHeader';
import StockCard from '../components/StockCard';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  volume: string;
  marketCap: string;
  data: { date: string; price: number }[];
}

export default function StockMarket() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  const generateHistoricalData = (basePrice: number, days: number) => {
    const data = [];
    let price = basePrice;
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const change = (Math.random() - 0.5) * 5;
      price = price + (price * change) / 100;
      data.push({
        date: format(date, 'MMM dd'),
        price: Number(price.toFixed(2)),
      });
    }
    return data;
  };

  const stocks: StockData[] = [
    {
      symbol: 'AAPL',
      price: 178.25,
      change: 2.3,
      volume: '45.2M',
      marketCap: '2.8T',
      data: generateHistoricalData(178.25, 30),
    },
    {
      symbol: 'GOOGL',
      price: 142.50,
      change: -1.2,
      volume: '32.1M',
      marketCap: '1.8T',
      data: generateHistoricalData(142.50, 30),
    },
    {
      symbol: 'TSLA',
      price: 250.15,
      change: 3.5,
      volume: '20.8M',
      marketCap: '0.8T',
      data: generateHistoricalData(250.15, 30)
    },
    {
      symbol: 'NFLX',
      price: 450.55,
      change: -5.2,
      volume: '15.4M',
      marketCap: '0.2T',
      data: generateHistoricalData(450.55, 30)
    },
    {
      symbol: 'NVDA',
      price: 470.80,
      change: 4.0,
      volume: '12.2M',
      marketCap: '1.2T',
      data: generateHistoricalData(470.80, 30)
    },
    {
      symbol: 'MSFT',
      price: 325.75,
      change: 1.8,
      volume: '28.5M',
      marketCap: '2.5T',
      data: generateHistoricalData(325.75, 30),
    },
    {
      symbol: 'AMZN',
      price: 175.25,
      change: 0.5,
      volume: '35.7M',
      marketCap: '1.9T',
      data: generateHistoricalData(175.25, 30),
    },
    
  ];

  const filteredStocks = stocks.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedFilter === 'gainers') return stock.change > 0 && matchesSearch;
    if (selectedFilter === 'losers') return stock.change < 0 && matchesSearch;
    return matchesSearch;
  });

  const selectedStockData = selectedStock 
    ? stocks.find(stock => stock.symbol === selectedStock)
    : null;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Stock Market"
        description="Explore and analyze market trends"
        icon={TrendingUp}
      />

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 h-5 w-5" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Stocks</option>
            <option value="gainers">Top Gainers</option>
            <option value="losers">Top Losers</option>
          </select>
        </div>
      </div>

      {/* Stock Chart */}
      {selectedStockData && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">{selectedStockData.symbol} - 30 Day Price History</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedStockData.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#c2410c"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStocks.map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => setSelectedStock(stock.symbol)}
            className={`cursor-pointer transform transition-all duration-200 hover:scale-105 ${
              selectedStock === stock.symbol ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
            }`}
          >
            <StockCard
              symbol={stock.symbol}
              price={stock.price}
              change={stock.change}
              volume={stock.volume}
              marketCap={stock.marketCap}
            />
          </div>
        ))}
      </div>

      {filteredStocks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No stocks found matching your criteria</p>
        </div>
      )}
    </div>
  );
}