import { DollarSign, Users, TrendingUp, Activity } from 'lucide-react'
import EmergencyAlert from '../components/EmergencyAlert'

// Mock emergency data
const mockEmergencies = [
  {
    clientName: "Ramesh Patel",
    message: "Medical emergency - Need immediate assistance",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: "forwarded"
  },
  {
    clientName: "Lakshmi Devi",
    message: "Urgent consultation required",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    status: "completed"
  }
];

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      {/* Emergency Alert Section */}
      <div className="mt-6">
        <EmergencyAlert recentEmergencies={mockEmergencies} />
      </div>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Revenue Card */}
        <DashboardCard
          title="Total Revenue"
          value="$54,764"
          icon={<DollarSign className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        
        {/* Users Card */}
        <DashboardCard
          title="Active Clients"
          value="2,345"
          icon={<Users className="h-6 w-6 text-white" />}
          color="bg-green-500"
        />
        
        {/* Growth Card */}
        <DashboardCard
          title="Growth Rate"
          value="+23.4%"
          icon={<TrendingUp className="h-6 w-6 text-white" />}
          color="bg-purple-500"
        />
        
        {/* Transactions Card */}
        <DashboardCard
          title="Transactions"
          value="1,234"
          icon={<Activity className="h-6 w-6 text-white" />}
          color="bg-orange-500"
        />
      </div>
      
      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <div className="mt-4 bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Investment Processed
                      </p>
                      <p className="text-sm text-gray-500">
                        Transaction ID: #INV-789-012
                      </p>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        New Client Onboarded
                      </p>
                      <p className="text-sm text-gray-500">
                        Client ID: #CL-345-678
                      </p>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Active
                      </span>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Portfolio Updated
                      </p>
                      <p className="text-sm text-gray-500">
                        Reference: #PF-567-890
                      </p>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Updated
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DashboardCard = ({ 
  title, 
  value, 
  icon, 
  color 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  color: string;
}) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`rounded-md p-3 ${color}`}>
              {icon}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-semibold text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 