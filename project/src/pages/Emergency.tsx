import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, Phone, Send, Clock, PhoneCall, MessageCircle } from 'lucide-react';
import { mockClients } from '../data/mockClients';
import { Client } from '../types/client';

interface EmergencyMessage {
  id: string;
  clientId: string;
  clientName: string;
  message: string;
  timestamp: Date;
  status: 'pending' | 'processing' | 'forwarded' | 'calling';
  assignedTo: string;
  isHelp: boolean;
}

const HELP_KEYWORDS = ['help', 'emergency', 'urgent', 'medical', 'hospital', 'accident', 'critical'];

const Emergency = () => {
  const [clientId, setClientId] = useState('');
  const [message, setMessage] = useState('');
  const [emergencyMessages, setEmergencyMessages] = useState<EmergencyMessage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [emergencyMessages]);

  const isEmergencyMessage = (text: string): boolean => {
    return HELP_KEYWORDS.some(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const initiateEmergencyCall = (client: Client) => {
    setIsCalling(true);
    console.log('INITIATING EMERGENCY CALL:', {
      assignedTo: client.assignedTo.name,
      phone: client.assignedTo.phone,
      client: client.name,
      clientPhone: client.contactInfo.phone
    });

    // Simulate call connection
    setTimeout(() => {
      console.log('Emergency call connected');
      setIsCalling(false);
    }, 2000);
  };

  const handleClientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setClientId(id);
    const client = mockClients.find(c => c.id === id);
    setSelectedClient(client || null);
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedClient) return;

    setIsSubmitting(true);
    const isHelp = isEmergencyMessage(message);

    const emergencyMessage: EmergencyMessage = {
      id: `EM${Date.now()}`,
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      message,
      timestamp: new Date(),
      status: isHelp ? 'calling' : 'pending',
      assignedTo: selectedClient.assignedTo.name,
      isHelp
    };

    // Add message immediately
    setEmergencyMessages(prev => [...prev, emergencyMessage]);
    
    // If it's a help message, initiate emergency call
    if (isHelp) {
      initiateEmergencyCall(selectedClient);
    }

    // Simulate processing
    setTimeout(() => {
      setEmergencyMessages(prev => 
        prev.map(msg => 
          msg.id === emergencyMessage.id 
            ? { ...msg, status: isHelp ? 'forwarded' : 'processed' }
            : msg
        )
      );
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Emergency Assistance</h1>
        <div className="flex items-center text-red-600">
          <AlertCircle className="h-6 w-6 mr-2" />
          <span className="font-medium">24/7 Emergency Support</span>
        </div>
      </div>

      {/* Client Selection */}
      <div className="bg-white shadow rounded-lg p-4">
        <select
          value={clientId}
          onChange={handleClientSelect}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
          required
        >
          <option value="">Select a client to start chat</option>
          {mockClients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name} - {client.contactInfo.phone}
            </option>
          ))}
        </select>
      </div>

      {selectedClient && (
        <>
          {/* Chat Interface */}
          <div className="bg-white shadow rounded-lg flex flex-col h-[500px]">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between bg-red-50">
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="font-medium">{selectedClient.name}</span>
              </div>
              {isCalling && (
                <div className="flex items-center text-green-600">
                  <PhoneCall className="h-5 w-5 animate-pulse mr-2" />
                  <span className="text-sm font-medium">Connecting emergency call...</span>
                </div>
              )}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {emergencyMessages
                .filter(em => em.clientId === selectedClient.id)
                .map((em) => (
                  <div
                    key={em.id}
                    className={`p-3 rounded-lg max-w-[80%] ${
                      em.isHelp 
                        ? 'bg-red-50 border-l-4 border-red-500' 
                        : 'bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">
                        {em.isHelp && <AlertCircle className="h-4 w-4 text-red-600 inline mr-1" />}
                        {em.message}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(em.timestamp).toLocaleTimeString()}</span>
                      {em.isHelp && (
                        <span className={`ml-2 px-2 py-1 rounded-full ${
                          em.status === 'calling' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {em.status === 'calling' ? 'Initiating Call' : 'Call Connected'}
                        </span>
                      )}
                    </div>
                  </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleMessageSubmit} className="p-4 border-t">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type 'help' for immediate emergency assistance..."
                  className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Clock className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Emergency Contact Info */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Emergency Contact</h3>
                <p className="text-sm text-gray-500">
                  Assigned to: {selectedClient.assignedTo.name}
                </p>
              </div>
              <div className="flex items-center text-red-600">
                <Phone className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">{selectedClient.assignedTo.phone}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Emergency; 