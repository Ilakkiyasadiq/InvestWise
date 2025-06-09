import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

export default function PageHeader({ title, description, icon: Icon }: PageHeaderProps) {
  return (
    <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-8 w-8 text-primary-600" />}
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">{title}</h1>
          {description && (
            <p className="mt-1 text-secondary-600">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}