import React, { useState, useEffect, useRef } from 'react';
import { useMarket } from '../context/MarketContext';
import { AlertCircle, Send, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

// Market data simulation
const MARKET_SECTORS = [
  { name: 'Technology', baseline: 100, volatility: 0.8 },
  { name: 'Healthcare', baseline: 80, volatility: 0.6 },
  { name: 'Finance', baseline: 120, volatility: 0.9 },
  { name: 'Real Estate', baseline: 90, volatility: 0.7 },
  { name: 'Energy', baseline: 110, volatility: 1.0 }
] as const;

interface NewMessage {
  title: string;
  content: string;
  type: 'general' | 'market' | 'product';
  priority: 'low' | 'medium' | 'high';
}

export const BroadcastMessage = () => {
  const { addBroadcast, broadcasts, marketConditions, updateMarketCondition } = useMarket();
  const [newMessage, setNewMessage] = useState<NewMessage>({
    title: '',
    content: '',
    type: 'general',
    priority: 'medium'
  });
  
  const lastUpdateTimeRef = useRef<Date>(new Date());
  const [nextUpdateTime, setNextUpdateTime] = useState<Date>(new Date(Date.now() + 5 * 60 * 1000));

  useEffect(() => {
    const generateMarketUpdate = () => {
      const currentTime = new Date();
      if (currentTime.getTime() - lastUpdateTimeRef.current.getTime() >= 5 * 60 * 1000) {
        MARKET_SECTORS.forEach(sector => {
          const change = (Math.random() - 0.5) * 2 * sector.volatility;
          const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';
          
          updateMarketCondition({
            sector: sector.name,
            trend,
            opportunity: trend === 'up' ? 'Growth potential in ' + sector.name : undefined,
            risk: trend === 'down' ? 'Market volatility in ' + sector.name : undefined,
            lastUpdated: currentTime
          });

          if (Math.abs(change) > 1) {
            addBroadcast({
              id: Date.now().toString() + sector.name,
              type: 'market',
              title: `${sector.name} Sector Update`,
              content: `${sector.name} sector is ${trend === 'up' ? 'showing positive momentum' : 'experiencing downward pressure'} with ${Math.abs(change).toFixed(1)}% movement. ${
                trend === 'up' 
                  ? 'Consider reviewing portfolio allocation for growth opportunities.' 
                  : 'Monitor positions and review risk management strategies.'
              }`,
              priority: Math.abs(change) > 2 ? 'high' : 'medium',
              timestamp: currentTime
            });
          }
        });
        
        lastUpdateTimeRef.current = currentTime;
        setNextUpdateTime(new Date(currentTime.getTime() + 5 * 60 * 1000));
      }
    };

    generateMarketUpdate();
    const interval = setInterval(generateMarketUpdate, 60 * 1000);
    return () => clearInterval(interval);
  }, [updateMarketCondition, addBroadcast]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.title.trim() || !newMessage.content.trim()) return;

    addBroadcast({
      id: Date.now().toString(),
      title: newMessage.title,
      content: newMessage.content,
      type: newMessage.type,
      priority: newMessage.priority,
      timestamp: new Date()
    });

    setNewMessage({
      title: '',
      content: '',
      type: 'general',
      priority: 'medium'
    });
  };

  return (
    <div className="space-y-6">
      {/* Market Updates Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Market Updates</h2>
          <div className="flex items-center text-sm text-gray-500">
            <RefreshCw className="h-4 w-4 mr-2" />
            <span>Next update: {nextUpdateTime.toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="grid gap-4">
          {marketConditions.map((condition) => (
            <div
              key={condition.sector}
              className={`p-4 rounded-lg border-l-4 ${
                condition.trend === 'up' 
                  ? 'border-green-500 bg-green-50' 
                  : condition.trend === 'down'
                  ? 'border-red-500 bg-red-50'
                  : 'border-yellow-500 bg-yellow-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {condition.trend === 'up' ? (
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                  ) : condition.trend === 'down' ? (
                    <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
                  ) : (
                    <span className="h-5 w-5 mr-2">→</span>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{condition.sector}</h3>
                    <p className="text-sm text-gray-600">
                      {condition.opportunity || condition.risk || 'Market is stable'}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(condition.lastUpdated).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Broadcast Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Message Title
          </label>
          <input
            type="text"
            id="title"
            value={newMessage.title}
            onChange={(e) => setNewMessage(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter message title"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Message Content
          </label>
          <textarea
            id="content"
            value={newMessage.content}
            onChange={(e) => setNewMessage(prev => ({ ...prev, content: e.target.value }))}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your message"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Message Type
            </label>
            <select
              id="type"
              value={newMessage.type}
              onChange={(e) => setNewMessage(prev => ({ ...prev, type: e.target.value as NewMessage['type'] }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="general">General Update</option>
              <option value="market">Market Update</option>
              <option value="product">Product Update</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              value={newMessage.priority}
              onChange={(e) => setNewMessage(prev => ({ ...prev, priority: e.target.value as NewMessage['priority'] }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Broadcast
          </button>
        </div>
      </form>

      {/* All Broadcasts History */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Broadcasts</h3>
        <div className="space-y-4">
          {broadcasts.map((broadcast) => (
            <div
              key={broadcast.id}
              className={`bg-white p-4 rounded-lg shadow border-l-4 ${
                broadcast.type === 'market'
                  ? broadcast.priority === 'high'
                    ? 'border-red-500'
                    : 'border-orange-500'
                  : broadcast.priority === 'high'
                  ? 'border-purple-500'
                  : broadcast.priority === 'medium'
                  ? 'border-blue-500'
                  : 'border-green-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-2">
                  {broadcast.priority === 'high' && (
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  )}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900">{broadcast.title}</h4>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        broadcast.type === 'market' 
                          ? 'bg-orange-100 text-orange-800'
                          : broadcast.type === 'product'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {broadcast.type}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{broadcast.content}</p>
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      <span>{new Date(broadcast.timestamp).toLocaleString()}</span>
                      <span className="capitalize">{broadcast.priority} Priority</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 