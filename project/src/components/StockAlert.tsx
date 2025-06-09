import React, { useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface StockAlertProps {
  symbol: string;
  currentPrice: number;
}

export default function StockAlert({ symbol, currentPrice }: StockAlertProps) {
  const [showForm, setShowForm] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');
  const { user } = useAuth();

  const handleSetAlert = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to a backend to set up notifications
    const alert = {
      symbol,
      targetPrice: parseFloat(targetPrice),
      currentPrice,
      userId: user?.id,
      createdAt: new Date().toISOString()
    };
    
    const alerts = JSON.parse(localStorage.getItem('price_alerts') || '[]');
    localStorage.setItem('price_alerts', JSON.stringify([...alerts, alert]));
    
    setShowForm(false);
    setTargetPrice('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowForm(!showForm)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        title="Set Price Alert"
      >
        {showForm ? <BellOff className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
      </button>

      {showForm && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
          <form onSubmit={handleSetAlert} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Target Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Set Alert
            </button>
          </form>
        </div>
      )}
    </div>
  );
}