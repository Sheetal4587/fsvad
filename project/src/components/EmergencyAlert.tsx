import React, { useState } from 'react';
import { AlertCircle, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmergencyAlertProps {
  recentEmergencies?: {
    clientName: string;
    message: string;
    timestamp: Date;
    status: string;
  }[];
}

const EmergencyAlert: React.FC<EmergencyAlertProps> = ({ recentEmergencies = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="rounded-md p-3 bg-red-600">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Emergency Assistance
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-lg font-semibold text-gray-900">
                    {recentEmergencies.length} Recent Alerts
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          <Link
            to="/emergency"
            className="ml-5 bg-red-50 px-3 py-1 rounded-full text-sm font-medium text-red-600 hover:bg-red-100"
          >
            Open Emergency Chat
          </Link>
        </div>
      </div>

      {/* Quick Emergency Actions */}
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <Link
            to="/emergency"
            className="font-medium text-red-600 hover:text-red-500"
          >
            View all emergency alerts
            <span className="sr-only"> emergency alerts stats</span>
          </Link>
        </div>
      </div>

      {/* Recent Emergency List */}
      {isExpanded && recentEmergencies.length > 0 && (
        <div className="border-t border-gray-200 px-5 py-3">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Recent Emergencies</h4>
          <div className="space-y-3">
            {recentEmergencies.map((emergency, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {emergency.clientName}
                    </p>
                    <p className="text-sm text-gray-500">{emergency.message}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(emergency.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-2 text-sm text-gray-500 hover:bg-gray-50 flex items-center justify-center"
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </div>
  );
};

export default EmergencyAlert; 