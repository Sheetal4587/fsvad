import { FileText, Upload, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import type { Client, Document, KYCStatus, DocumentStatus } from '../types/client'

interface KYCDocumentsProps {
  client: Client
  onUploadDocument: (type: string) => void
  onVerifyDocument: (documentId: string) => void
}

export const KYCDocuments = ({ client, onUploadDocument, onVerifyDocument }: KYCDocumentsProps) => {
  const getKYCStatusColor = (status: KYCStatus) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    }
    return colors[status]
  }

  const getDocumentStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* KYC Status Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">KYC Status</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getKYCStatusColor(client.kyc.status)}`}>
              {client.kyc.status.replace('_', ' ').toUpperCase()}
            </div>
            <span className="text-sm text-gray-500">
              Last Updated: {new Date(client.kyc.lastUpdated).toLocaleDateString()}
            </span>
          </div>
          {client.kyc.status === 'completed' && (
            <span className="text-sm text-gray-500">
              Verified on: {client.kyc.verifiedOn}
            </span>
          )}
        </div>

        {/* KYC Details */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900">PAN Card</h3>
            <p className="mt-1 text-sm text-gray-500">{client.kyc.panCard}</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900">Aadhar Card</h3>
            <p className="mt-1 text-sm text-gray-500">{client.kyc.aadharCard}</p>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Documents</h2>
          <button
            onClick={() => onUploadDocument('new')}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </button>
        </div>

        <div className="space-y-4">
          {client.documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getDocumentStatusIcon(doc.status)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Uploaded: {new Date(doc.uploadedOn).toLocaleDateString()}</span>
                    {doc.verifiedOn && (
                      <>
                        <span className="mx-2">•</span>
                        <span>Verified: {new Date(doc.verifiedOn).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View
                </a>
                {doc.status === 'submitted' && (
                  <button
                    onClick={() => onVerifyDocument(doc.id)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Verify
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 