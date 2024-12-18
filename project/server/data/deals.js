export const deals = [
  {
    id: 'DEAL001',
    customerId: 'CUST001',
    customerName: 'Aarav Patel',
    type: 'mutual_funds',
    stage: 'needs_analysis',
    priority: 'high',
    value: 500000,
    probability: 70,
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    expectedCloseDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: {
      id: 'EMP001',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      role: 'advisor'
    },
    notes: [
      {
        id: 'NOTE001',
        content: 'Initial discussion about mutual fund investment options',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 'Rajesh Kumar'
      }
    ],
    activities: [
      {
        id: 'ACT001',
        type: 'meeting',
        title: 'Initial Consultation',
        description: 'Discuss investment goals and risk appetite',
        scheduledAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        outcome: 'Client interested in balanced mutual funds',
        nextSteps: 'Prepare investment proposal'
      }
    ],
    documents: []
  },
  {
    id: 'DEAL002',
    customerId: 'CUST002',
    customerName: 'Ananya Sharma',
    type: 'insurance',
    stage: 'proposal',
    priority: 'medium',
    value: 300000,
    probability: 60,
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    expectedCloseDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: {
      id: 'EMP002',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      role: 'advisor'
    },
    notes: [],
    activities: [],
    documents: []
  }
];