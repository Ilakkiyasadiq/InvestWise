import React, { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';

interface NewsItem {
  title: string;
  source: string;
  url: string;
  date: string;
}

export default function NewsWidget() {
  // Simulated news data (in a real app, this would come from an API)
  const newsItems: NewsItem[] = [
    {
      title: "Market Rally Continues as Tech Stocks Surge",
      source: "Financial Times",
      url: "#",
      date: new Date().toLocaleDateString()
    },
    {
      title: "New Regulations Impact Trading Platforms",
      source: "Reuters",
      url: "#",
      date: new Date().toLocaleDateString()
    },
    {
      title: "Emerging Markets Show Strong Growth",
      source: "Bloomberg",
      url: "#",
      date: new Date().toLocaleDateString()
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Market News</h3>
      </div>

      <div className="space-y-4">
        {newsItems.map((news, index) => (
          <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
            <a
              href={news.url}
              className="block hover:bg-gray-50 rounded-md p-2 -mx-2 transition-colors"
            >
              <h4 className="font-medium text-gray-900 mb-1">{news.title}</h4>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{news.source}</span>
                <span>{news.date}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}