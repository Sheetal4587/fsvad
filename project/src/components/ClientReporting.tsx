import { FileText, Download, Filter, Calendar } from 'lucide-react'
import type { Client, Report } from '../types/client'

interface ClientReportingProps {
  client: Client
  reports: Report[]
  onGenerateReport: (type: 'monthly' | 'quarterly' | 'annual') => void
  onDownloadReport: (reportId: string) => void
}

export const ClientReporting = ({ 
  client, 
  reports, 
  onGenerateReport, 
  onDownloadReport 
}: ClientReportingProps) => {
  return (
    <div className="space-y-6">
      {/* Report Generation */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Generate Reports</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => onGenerateReport('monthly')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Monthly Report
            </button>
            <button
              onClick={() => onGenerateReport('quarterly')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Quarterly Report
            </button>
            <button
              onClick={() => onGenerateReport('annual')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Annual Report
            </button>
          </div>
        </div>

        {/* Report List */}
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {report.type.charAt(0).toUpperCase() + report.type.slice(1)} Report
                  </h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(report.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onDownloadReport(report.id)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Latest Report Summary</h2>
        {reports.length > 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500">Portfolio Value</h3>
                <p className="mt-2 text-xl font-semibold text-gray-900">
                  ₹{reports[0].portfolioSnapshot.currentValue.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500">KYC Status</h3>
                <p className="mt-2 text-xl font-semibold text-gray-900">
                  {reports[0].kycStatus.toUpperCase()}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500">Pending Documents</h3>
                <p className="mt-2 text-xl font-semibold text-gray-900">
                  {reports[0].pendingDocuments.length}
                </p>
              </div>
            </div>

            {/* Recent Transactions */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">Recent Transactions</h3>
              <div className="space-y-2">
                {reports[0].recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{transaction.productName}</span>
                    <span className="font-medium">₹{transaction.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">Recommendations</h3>
              <ul className="list-disc list-inside space-y-2">
                {reports[0].recommendations.map((recommendation, index) => (
                  <li key={index} className="text-sm text-gray-600">{recommendation}</li>
                ))}
              </ul>
            </div>

            {/* Next Steps */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">Next Steps</h3>
              <ul className="list-disc list-inside space-y-2">
                {reports[0].nextSteps.map((step, index) => (
                  <li key={index} className="text-sm text-gray-600">{step}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 