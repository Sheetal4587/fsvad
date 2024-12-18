import React, { createContext, useContext, useState, useEffect } from 'react';

export interface MarketCondition {
  sector: string;
  trend: 'up' | 'down' | 'stable';
  opportunity?: string;
  risk?: string;
  lastUpdated: Date;
}

export interface BroadcastUpdate {
  id: string;
  type: 'market' | 'product' | 'general';
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
}

interface MarketContextType {
  marketConditions: MarketCondition[];
  broadcasts: BroadcastUpdate[];
  updateMarketCondition: (condition: MarketCondition) => void;
  addBroadcast: (broadcast: BroadcastUpdate) => void;
  lastUpdate: Date;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [marketConditions, setMarketConditions] = useState<MarketCondition[]>([
    {
      sector: 'Technology',
      trend: 'up',
      opportunity: 'AI and Cloud Computing growth',
      lastUpdated: new Date()
    },
    {
      sector: 'Healthcare',
      trend: 'stable',
      opportunity: 'Aging population demographics',
      lastUpdated: new Date()
    },
    {
      sector: 'Real Estate',
      trend: 'down',
      risk: 'High interest rates impact',
      lastUpdated: new Date()
    },
    {
      sector: 'Green Energy',
      trend: 'up',
      opportunity: 'Government incentives and global focus',
      lastUpdated: new Date()
    }
  ]);

  const [broadcasts, setBroadcasts] = useState<BroadcastUpdate[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const updateMarketCondition = (condition: MarketCondition) => {
    setMarketConditions(prev => {
      const index = prev.findIndex(c => c.sector === condition.sector);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...condition, lastUpdated: new Date() };
        return updated;
      }
      return [...prev, { ...condition, lastUpdated: new Date() }];
    });
    setLastUpdate(new Date());
  };

  const addBroadcast = (broadcast: BroadcastUpdate) => {
    setBroadcasts(prev => [{ ...broadcast, timestamp: new Date() }, ...prev]);
    setLastUpdate(new Date());
  };

  return (
    <MarketContext.Provider
      value={{
        marketConditions,
        broadcasts,
        updateMarketCondition,
        addBroadcast,
        lastUpdate
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
}; 