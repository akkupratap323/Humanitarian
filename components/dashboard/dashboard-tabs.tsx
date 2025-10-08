'use client';

import { Home, Shield, TrendingUp, AlertTriangle, Building2, Hospital, School, Users } from 'lucide-react';

export type TabType = 'overview' | 'administration' | 'risk-index' | 'disasters' | 'shelters' | 'hospitals' | 'schools' | 'demographics';

interface DashboardTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'overview' as TabType, label: 'Overview', icon: Home },
  { id: 'administration' as TabType, label: 'Administration', icon: Shield },
  { id: 'risk-index' as TabType, label: 'Risk Index', icon: TrendingUp },
  { id: 'disasters' as TabType, label: 'Disasters', icon: AlertTriangle },
  { id: 'shelters' as TabType, label: 'Shelters', icon: Building2 },
  { id: 'hospitals' as TabType, label: 'Hospitals', icon: Hospital },
  { id: 'schools' as TabType, label: 'School Districts', icon: School },
  { id: 'demographics' as TabType, label: 'Demographics', icon: Users },
];

export default function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  return (
    <div className="bg-white border-b border-gray-200 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-2 py-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
