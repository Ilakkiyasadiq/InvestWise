import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, ShoppingCart } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StockCard from '../components/StockCard';

export default function BuyStocks() {
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState('');
  const [shares, setShares] = useState('');

  const availableStocks = [
    { symbol: 'AAPL', price: 178.25, change: 2.3, volume: '45.2M', marketCap: '2.8T' },
    { symbol: 'GOOGL', price: 142.50, change: -1.2, volume: '32.1M', marketCap: '1.8T' },
    { symbol: 'MSFT', price: 325.75, change: 1.8, volume: '28.5M', marketCap: '2.5T' },
    { symbol: 'AMZN', price: 175.25, change: 0.5, volume: '35.7M', marketCap: '1.9T' },
  ];

  const handleBuy = (e: React.FormEvent) => {
    e.preventDefault();
    const stockData = availableStocks.find(stock => stock.symbol === selectedStock);
    if (stockData && shares) {
      const totalAmount = Number(shares) * stockData.price;
      navigate('/payment', {
        state: {
          stockSymbol: selectedStock,
          shares: Number(shares),
          totalAmount,
        },
      });
    }
  };

  const selectedStockData = availableStocks.find(stock => stock.symbol === selectedStock);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Buy Stocks"
        description="Purchase stocks from our curated selection"
        icon={ShoppingCart}
      />

      {/* Stock Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {availableStocks.map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => setSelectedStock(stock.symbol)}
            className={`cursor-pointer transform transition-all duration-200 hover:scale-105 ${
              selectedStock === stock.symbol ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
            }`}
          >
            <StockCard {...stock} />
          </div>
        ))}
      </div>

      {/* Purchase Form */}
      {selectedStockData && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">Purchase {selectedStockData.symbol}</h3>
          <form onSubmit={handleBuy} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Shares</label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    value={shares}
                    onChange={(e) => setShares(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter number of shares"
                    min="1"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Cost</label>
                <div className="mt-1 relative">
                  <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-medium">
                    ${(Number(shares) * selectedStockData.price).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <DollarSign className="h-5 w-5 mr-2" />
              Proceed to Payment
            </button>
          </form>
        </div>
      )}
    </div>
  );
}