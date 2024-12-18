import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  User, Building2, Mail, Phone, Calendar, MessageSquare, 
  CheckCircle, Clock, AlertCircle, ChevronRight, ArrowLeft 
} from 'lucide-react'
import { KYCDocuments } from '../components/KYCDocuments'
import { PortfolioManager } from '../components/PortfolioManager'
import { ClientReporting } from '../components/ClientReporting'
import { ReminderSection } from '../components/ReminderSection'
import { getClients } from '../data/mockClients'
import type { Client } from '../types/client'

const ClientDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'overview' | 'kyc' | 'portfolio' | 'reports'>('overview')
  
  // Find the client from localStorage
  const client = getClients().find(c => c.id === id)

  if (!client) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Client Not Found</h2>
        <p className="text-gray-600 mb-6">The client you're looking for doesn't exist or has been deleted.</p>
        <button
          onClick={() => navigate('/clients')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Clients
        </button>
      </div>
    )
  }

  const handleScheduleMeeting = () => {
    // In a real app, this would open a modal or navigate to a scheduling page
    console.log('Schedule meeting for client:', client.id)
  }

  const handleScheduleCall = () => {
    // In a real app, this would open a modal or navigate to a scheduling page
    console.log('Schedule call for client:', client.id)
  }

  const getStatusColor = (status: Client['status']) => {
    const colors = {
      lead: 'bg-yellow-100 text-yellow-800',
      prospect: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      churned: 'bg-red-100 text-red-800'
    }
    return colors[status]
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/clients')}
        className="inline-flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Clients
      </button>

      {/* Client Header */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl font-semibold text-blue-600">
                  {client.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{client.name}</h1>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Building2 className="h-4 w-4 mr-1" />
                  <span>{client.company}</span>
                  <span className="mx-2">•</span>
                  <span>{client.city}</span>
                  <span className="mx-2">•</span>
                  <span>Age: {client.age}</span>
                </div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(client.status)}`}>
              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center text-sm text-gray-500">
              <Mail className="h-4 w-4 mr-2" />
              <span>{client.contactInfo.email}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Phone className="h-4 w-4 mr-2" />
              <span>{client.contactInfo.phone}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <User className="h-4 w-4 mr-2" />
              <span>Managed by {client.assignedTo.name}</span>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="text-sm font-medium text-gray-500">Investment Capacity</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">{client.investmentCapacity}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="text-sm font-medium text-gray-500">Risk Profile</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">{client.riskProfile}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="text-sm font-medium text-gray-500">Interested Product</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">{client.interestedProduct}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <TabButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
            icon={<User size={20} />}
          >
            Overview
          </TabButton>
          <TabButton 
            active={activeTab === 'kyc'} 
            onClick={() => setActiveTab('kyc')}
            icon={<CheckCircle size={20} />}
          >
            KYC & Documents
          </TabButton>
          <TabButton 
            active={activeTab === 'portfolio'} 
            onClick={() => setActiveTab('portfolio')}
            icon={<MessageSquare size={20} />}
          >
            Portfolio
          </TabButton>
          <TabButton 
            active={activeTab === 'reports'} 
            onClick={() => setActiveTab('reports')}
            icon={<Calendar size={20} />}
          >
            Reports
          </TabButton>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Reminders Section */}
            <ReminderSection 
              meetings={client.meetings}
              communications={client.communications}
              onScheduleMeeting={handleScheduleMeeting}
              onScheduleCall={handleScheduleCall}
            />

            {/* Progress Tracking */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Progress Tracking</h2>
              <div className="space-y-4">
                {client.progress.completedSteps.map((step) => (
                  <div key={step} className="flex items-start">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-5 w-5">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{step}</p>
                        <p className="text-sm text-gray-500">Completed</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Current Stage */}
                <div className="flex items-start">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5">
                      <Clock className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{client.progress.currentStage}</p>
                      <p className="text-sm text-blue-500">In Progress</p>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                {client.progress.nextSteps.map((step) => (
                  <div key={step} className="flex items-start">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-5 w-5">
                        <AlertCircle className="h-5 w-5 text-gray-300" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">{step}</p>
                        <p className="text-sm text-gray-400">Pending</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'kyc' && (
          <KYCDocuments 
            client={client} 
            onUploadDocument={(type) => console.log('Upload document:', type)}
            onVerifyDocument={(docId) => console.log('Verify document:', docId)}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioManager client={client} />
        )}

        {activeTab === 'reports' && (
          <ClientReporting 
            client={client}
            reports={[]}
            onGenerateReport={(type) => console.log('Generate report:', type)}
            onDownloadReport={(reportId) => console.log('Download report:', reportId)}
          />
        )}
      </div>
    </div>
  )
}

const TabButton = ({ 
  children, 
  active, 
  onClick, 
  icon 
}: { 
  children: React.ReactNode
  active: boolean
  onClick: () => void
  icon: React.ReactNode
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        group inline-flex items-center px-1 py-4 border-b-2 font-medium text-sm
        ${active 
          ? 'border-blue-600 text-blue-600' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }
      `}
    >
      <span className="mr-2">{icon}</span>
      {children}
    </button>
  )
}

export default ClientDetail 