import React from 'react';

interface Activity {
  action: string;
  stock: string;
  amount: string;
  price: string;
  date: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
            <div>
              <p className="font-semibold">{activity.action} {activity.stock}</p>
              <p className="text-sm text-gray-600">{activity.amount} at {activity.price}</p>
            </div>
            <p className="text-sm text-gray-600">{activity.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}