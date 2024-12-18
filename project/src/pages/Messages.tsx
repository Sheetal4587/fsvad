import React, { useState, useEffect } from 'react';
import { Globe2, Send, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface MessageContent {
  hindi: string;
  english: string;
  regional: string;
}

interface Message {
  id: string;
  clientId: string;
  clientName: string;
  content: MessageContent;
  type: 'birthday' | 'anniversary';
  status: 'pending' | 'sent' | 'failed';
  language: 'english' | 'hindi' | 'regional';
  isRural: boolean;
  scheduledDate: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'hindi' | 'regional'>('english');
  const [filter, setFilter] = useState<'all' | 'pending' | 'sent' | 'failed'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/messages');
      setMessages(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch messages. Please try again later.');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (messageId: string) => {
    try {
      const response = await axios.put(`/api/messages/${messageId}/status`, {
        status: 'sent'
      });
      
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId ? { ...msg, status: 'sent' } : msg
        )
      );
    } catch (err) {
      console.error('Error sending message:', err);
      // Update UI to show error state
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId ? { ...msg, status: 'failed' } : msg
        )
      );
    }
  };

  const filteredMessages = messages.filter(msg => 
    filter === 'all' ? true : msg.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'text-green-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Mail className="h-5 w-5 text-yellow-500" />;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading messages...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Globe2 className="h-5 w-5 text-gray-500" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as 'english' | 'hindi' | 'regional')}
              className="form-input py-1"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="regional">Regional</option>
            </select>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'sent' | 'failed')}
            className="form-input py-1"
          >
            <option value="all">All Messages</option>
            <option value="pending">Pending</option>
            <option value="sent">Sent</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold">{message.clientName}</h3>
                  {message.isRural && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Rural
                    </span>
                  )}
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {message.type === 'birthday' ? 'Birthday' : 'Anniversary'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Language: {message.language.charAt(0).toUpperCase() + message.language.slice(1)}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {getStatusIcon(message.status)}
                {message.status === 'pending' && (
                  <button
                    onClick={() => handleSendMessage(message.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send</span>
                  </button>
                )}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
              {message.content[selectedLanguage]}
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Scheduled for: {new Date(message.scheduledDate).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
