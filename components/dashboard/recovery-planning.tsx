'use client';

import { ClipboardList, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface RecoveryTask {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'pending' | 'urgent';
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
}

const mockRecoveryTasks: RecoveryTask[] = [
  {
    id: '1',
    title: 'Damage Assessment - Residential Areas',
    status: 'in-progress',
    priority: 'high',
    assignedTo: 'FEMA Team A',
  },
  {
    id: '2',
    title: 'Emergency Shelter Coordination',
    status: 'completed',
    priority: 'high',
    assignedTo: 'Red Cross',
  },
  {
    id: '3',
    title: 'Infrastructure Recovery Planning',
    status: 'pending',
    priority: 'medium',
    assignedTo: 'State DOT',
  },
  {
    id: '4',
    title: 'Medical Resource Allocation',
    status: 'urgent',
    priority: 'high',
    assignedTo: 'HHS Emergency Response',
  },
  {
    id: '5',
    title: 'Power Grid Restoration',
    status: 'in-progress',
    priority: 'high',
    assignedTo: 'Utility Companies',
  },
];

export default function RecoveryPlanning() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'urgent':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <ClipboardList className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recovery Planning & Needs Assessment</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
          Add Task
        </button>
      </div>

      <div className="space-y-3">
        {mockRecoveryTasks.map((task) => (
          <div
            key={task.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              {getStatusIcon(task.status)}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                    {task.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Assigned to: {task.assignedTo}</span>
                  <span className={`font-semibold ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()} Priority
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-2xl font-bold text-green-700">1</p>
          <p className="text-sm text-green-600">Completed</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-2xl font-bold text-blue-700">2</p>
          <p className="text-sm text-blue-600">In Progress</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-2xl font-bold text-red-700">1</p>
          <p className="text-sm text-red-600">Urgent</p>
        </div>
      </div>
    </div>
  );
}
