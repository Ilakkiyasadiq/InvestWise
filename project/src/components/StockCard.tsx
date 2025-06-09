import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockCardProps {
  symbol: string;
  price: number;
  change: number;
  volume?: string;
  marketCap?: string;
}

export default function StockCard({ symbol, price, change, volume, marketCap }: StockCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="card p-6 hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold text-secondary-900">{symbol}</span>
        {isPositive ? (
          <TrendingUp className="h-5 w-5 text-green-500" />
        ) : (
          <TrendingDown className="h-5 w-5 text-red-500" />
        )}
      </div>
      <div className="text-2xl font-bold text-secondary-900 mb-2">
        ${price.toFixed(2)}
      </div>
      <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '+' : ''}{change.toFixed(2)}%
      </div>
      {(volume || marketCap) && (
        <div className="mt-4 pt-4 border-t border-secondary-100">
          {volume && (
            <div className="text-sm text-secondary-600 flex justify-between items-center">
              <span>Volume</span>
              <span className="font-medium">{volume}</span>
            </div>
          )}
          {marketCap && (
            <div className="text-sm text-secondary-600 flex justify-between items-center mt-2">
              <span>Market Cap</span>
              <span className="font-medium">{marketCap}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}