import React, { useState, useEffect } from 'react';
import { Client } from '../types/client';
import { mockClients } from '../data/mockClients';
import { useMarket } from '../context/MarketContext';

interface NewProduct {
  name: string;
  type: string;
  minInvestment: number;
  riskLevel: string;
  expectedReturns: string;
  suitableFor: string[];
}

// Mock new products
const newProducts: NewProduct[] = [
  {
    name: 'Green Energy Growth Fund',
    type: 'Mutual Fund',
    minInvestment: 25000,
    riskLevel: 'Moderate',
    expectedReturns: '12-15%',
    suitableFor: ['Moderate', 'Aggressive']
  },
  {
    name: 'Tech Innovation Portfolio',
    type: 'ETF',
    minInvestment: 50000,
    riskLevel: 'Aggressive',
    expectedReturns: '15-20%',
    suitableFor: ['Aggressive']
  },
  {
    name: 'Capital Protection Bond',
    type: 'Bond',
    minInvestment: 100000,
    riskLevel: 'Conservative',
    expectedReturns: '7-8%',
    suitableFor: ['Conservative']
  }
];

const CustomizedMessages = () => {
  const [messages, setMessages] = useState<{ clientId: string; message: string }[]>([]);
  const { marketConditions, broadcasts, lastUpdate } = useMarket();

  const generateCustomMessage = (client: Client) => {
    let message = '';
    const portfolio = client.portfolio;
    const riskProfile = client.riskProfile;

    // Check portfolio composition
    const hasEquity = portfolio.assetAllocation.equity > 0;
    const hasDebt = portfolio.assetAllocation.debt > 0;
    const totalInvestment = portfolio.totalInvestment;

    // Find relevant market conditions
    const relevantMarketConditions = marketConditions.filter(condition => {
      return client.portfolio.investments.some(inv => 
        inv.type.toLowerCase().includes(condition.sector.toLowerCase())
      );
    });

    // Find relevant broadcasts
    const relevantBroadcasts = broadcasts
      .filter(broadcast => {
        // Filter based on client's portfolio and risk profile
        if (broadcast.type === 'market') {
          return client.portfolio.investments.some(inv => 
            broadcast.content.toLowerCase().includes(inv.type.toLowerCase())
          );
        }
        if (broadcast.type === 'product') {
          return broadcast.content.toLowerCase().includes(riskProfile.toLowerCase());
        }
        return broadcast.priority === 'high';
      })
      .slice(0, 2); // Only include the 2 most recent relevant broadcasts

    // Find suitable new products
    const suitableProducts = newProducts.filter(product => 
      product.suitableFor.includes(riskProfile) && 
      totalInvestment >= product.minInvestment
    );

    // Generate personalized message
    message = `Dear ${client.name},\n\n`;

    // Portfolio performance insights
    message += `Based on your current portfolio performance (${portfolio.returns > 0 ? '+' : ''}${portfolio.returns}% returns), `;
    
    // Market condition alerts
    if (relevantMarketConditions.length > 0) {
      message += 'here are some market insights relevant to your investments:\n\n';
      relevantMarketConditions.forEach(condition => {
        message += `• ${condition.sector} sector is trending ${condition.trend}${condition.opportunity ? ' - ' + condition.opportunity : ''}${condition.risk ? ' - ' + condition.risk : ''}\n`;
      });
      message += '\n';
    }

    // Include relevant broadcasts
    if (relevantBroadcasts.length > 0) {
      message += 'Important Updates:\n\n';
      relevantBroadcasts.forEach(broadcast => {
        message += `• ${broadcast.title}\n  ${broadcast.content}\n`;
      });
      message += '\n';
    }

    // Product recommendations
    if (suitableProducts.length > 0) {
      message += 'Based on your risk profile and investment capacity, we recommend considering:\n\n';
      suitableProducts.forEach(product => {
        message += `• ${product.name} (${product.type})\n`;
        message += `  Expected Returns: ${product.expectedReturns}\n`;
        message += `  Minimum Investment: ₹${product.minInvestment.toLocaleString()}\n\n`;
      });
    }

    // Portfolio rebalancing suggestions
    if (hasEquity && portfolio.assetAllocation.equity > 70 && riskProfile !== 'Aggressive') {
      message += 'Consider rebalancing your portfolio to reduce equity exposure and maintain risk alignment.\n\n';
    } else if (hasDebt && portfolio.assetAllocation.debt > 80 && riskProfile !== 'Conservative') {
      message += 'Consider increasing equity exposure to align with your risk profile and potentially enhance returns.\n\n';
    }

    message += 'Would you like to schedule a meeting to discuss these opportunities in detail?\n\n';
    message += 'Best regards,\nYour Financial Advisor';

    return message;
  };

  useEffect(() => {
    const generatedMessages = mockClients.map(client => ({
      clientId: client.id,
      message: generateCustomMessage(client)
    }));
    setMessages(generatedMessages);
  }, [marketConditions, broadcasts, lastUpdate]); // Regenerate messages when market conditions or broadcasts change

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Customized Client Messages</h2>
        <span className="text-sm text-gray-500">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </span>
      </div>
      <div className="grid gap-6">
        {messages.map(({ clientId, message }) => {
          const client = mockClients.find(c => c.id === clientId);
          return (
            <div key={clientId} className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{client?.name}</h3>
                  <p className="text-sm text-gray-500">Risk Profile: {client?.riskProfile}</p>
                </div>
                <span className={`px-2 py-1 text-sm rounded-full ${
                  client?.riskProfile === 'Aggressive' ? 'bg-red-100 text-red-800' :
                  client?.riskProfile === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {client?.riskProfile}
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                  {message}
                </pre>
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Edit Message
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Send Message
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomizedMessages; 