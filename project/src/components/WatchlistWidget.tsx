import React, { useState } from 'react';
import { Star, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function WatchlistWidget() {
  const { user } = useAuth();
  const [showAdd, setShowAdd] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');
  
  // Get watchlist from localStorage
  const getWatchlist = () => {
    if (!user) return [];
    const watchlist = localStorage.getItem(`watchlist_${user.id}`);
    return watchlist ? JSON.parse(watchlist) : [];
  };

  const [watchlist, setWatchlist] = useState(getWatchlist());

  const addToWatchlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const updatedWatchlist = [...watchlist, {
      symbol: newSymbol.toUpperCase(),
      addedAt: new Date().toISOString()
    }];

    localStorage.setItem(`watchlist_${user.id}`, JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);
    setNewSymbol('');
    setShowAdd(false);
  };

  const removeFromWatchlist = (symbol: string) => {
    if (!user) return;

    const updatedWatchlist = watchlist.filter((item: any) => item.symbol !== symbol);
    localStorage.setItem(`watchlist_${user.id}`, JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Watchlist
        </h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {showAdd && (
        <form onSubmit={addToWatchlist} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              placeholder="Enter stock symbol"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {watchlist.map((item: any) => (
          <div
            key={item.symbol}
            className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md"
          >
            <span className="font-medium">{item.symbol}</span>
            <button
              onClick={() => removeFromWatchlist(item.symbol)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {watchlist.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No stocks in watchlist
          </p>
        )}
      </div>
    </div>
  );
}