import { Client, ClientStatus } from '../types/client'

const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
  'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur'
]

const financialProducts = [
  'Mutual Funds', 'Life Insurance', 'Health Insurance', 'Fixed Deposits',
  'Stocks', 'Tax Saving ELSS', 'Personal Loan', 'Home Loan', 'Term Insurance',
  'Pension Plans', 'Child Education Plan', 'Business Loan'
]

const companies = [
  'TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra', 'Reliance Industries',
  'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'State Bank of India',
  'Bharti Airtel', 'ITC Limited', 'Hindustan Unilever'
]

const employeeNames = [
  'Priya Sharma', 'Rahul Verma', 'Anjali Gupta', 'Vikram Malhotra',
  'Deepika Patel', 'Arjun Singh', 'Neha Kapoor', 'Rajesh Kumar'
]

// Generate random Indian names
const firstNames = [
  'Aarav', 'Vihaan', 'Arjun', 'Vivaan', 'Aditya', 'Riya', 'Aadhya', 'Ananya',
  'Diya', 'Saanvi', 'Rajesh', 'Amit', 'Priya', 'Neha', 'Rahul', 'Rohit',
  'Sanjay', 'Vijay', 'Shweta', 'Pooja', 'Krishna', 'Aryan', 'Ishaan', 'Advait',
  'Kabir', 'Kavya', 'Sahil', 'Tanvi', 'Zara', 'Dev'
]

const lastNames = [
  'Sharma', 'Verma', 'Patel', 'Kumar', 'Singh', 'Yadav', 'Gupta', 'Malhotra',
  'Kapoor', 'Mehta', 'Shah', 'Chopra', 'Reddy', 'Nair', 'Menon', 'Iyer',
  'Pillai', 'Desai', 'Joshi', 'Chatterjee', 'Banerjee', 'Das', 'Bose', 'Dutta'
]

const employees = employeeNames.map((name, index) => ({
  id: `EMP${index + 1}`,
  name,
  role: ['Account Manager', 'Financial Advisor', 'Relationship Manager'][index % 3],
  email: `${name.toLowerCase().replace(' ', '.')}@company.com`,
  phone: `+91 98765${(40000 + index).toString().padStart(5, '0')}`,
  clients: [],
  activeDeals: Math.floor(Math.random() * 8) + 2
}))

function generateRandomClient(index: number): Client {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  const fullName = `${firstName} ${lastName}`
  
  // Generate random birth date between 25 and 60 years ago
  const today = new Date()
  const minAge = 25
  const maxAge = 60
  const randomAge = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge
  const birthYear = today.getFullYear() - randomAge
  const birthMonth = Math.floor(Math.random() * 12)
  const birthDay = Math.floor(Math.random() * 28) + 1
  const dateOfBirth = new Date(birthYear, birthMonth, birthDay)
  
  // Generate random account open date in the last 5 years
  const minAccountAge = 0
  const maxAccountAge = 5
  const randomAccountAge = Math.random() * maxAccountAge
  const accountOpenDate = new Date(today.getTime() - (randomAccountAge * 365 * 24 * 60 * 60 * 1000))

  const age = randomAge
  const city = indianCities[Math.floor(Math.random() * indianCities.length)]
  const company = companies[Math.floor(Math.random() * companies.length)]
  const assignedEmployee = employees[Math.floor(Math.random() * employees.length)]
  const product = financialProducts[Math.floor(Math.random() * financialProducts.length)]

  const statuses: ClientStatus[] = ['lead', 'prospect', 'active', 'inactive', 'churned']
  const status = statuses[Math.floor(Math.random() * statuses.length)]

  const date = new Date()
  date.setDate(date.getDate() - Math.floor(Math.random() * 365))

  // Generate random meetings
  const meetings = [
    {
      id: `MTG${index}1`,
      clientId: `CLI${(index + 1).toString().padStart(3, '0')}`,
      employeeId: assignedEmployee.id,
      title: 'Investment Portfolio Review',
      description: 'Quarterly review of investment performance and strategy',
      date: new Date(Date.now() + Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      time: '10:00 AM',
      status: ['scheduled', 'completed', 'cancelled', 'rescheduled'][Math.floor(Math.random() * 4)] as const,
      location: 'Virtual Meeting',
      notes: 'Review portfolio performance and discuss rebalancing options',
      followUpActions: ['Update investment strategy', 'Send performance report']
    },
    {
      id: `MTG${index}2`,
      clientId: `CLI${(index + 1).toString().padStart(3, '0')}`,
      employeeId: assignedEmployee.id,
      title: 'KYC Document Collection',
      description: 'Collect and verify remaining KYC documents',
      date: new Date(Date.now() + Math.floor(Math.random() * 5 * 24 * 60 * 60 * 1000)).toISOString(),
      time: '02:30 PM',
      status: 'scheduled' as const,
      location: 'Office',
      notes: 'Collect address proof and income documents',
      followUpActions: ['Verify documents', 'Update KYC status']
    }
  ]

  // Generate random communications
  const communications = [
    {
      id: `COM${index}1`,
      clientId: `CLI${(index + 1).toString().padStart(3, '0')}`,
      employeeId: assignedEmployee.id,
      channel: 'phone' as const,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      summary: 'Discussed investment options',
      outcome: 'Client interested in mutual funds',
      nextAction: 'Send mutual fund recommendations',
      followUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: `COM${index}2`,
      clientId: `CLI${(index + 1).toString().padStart(3, '0')}`,
      employeeId: assignedEmployee.id,
      channel: 'email' as const,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      summary: 'Sent tax saving investment proposals',
      outcome: 'Awaiting client review',
      nextAction: 'Follow up on proposal',
      followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  return {
    id: `CLI${(index + 1).toString().padStart(3, '0')}`,
    name: fullName,
    age,
    company,
    city,
    interestedProduct: product,
    status,
    assignedTo: assignedEmployee,
    contactInfo: {
      email: `${fullName.toLowerCase().replace(' ', '.')}@${company.toLowerCase().replace(' ', '')}.com`,
      phone: `+91 98765${(10000 + index).toString().padStart(5, '0')}`,
      address: `${Math.floor(Math.random() * 1000) + 1}, ${['Park Street', 'MG Road', 'Civil Lines', 'Jubilee Hills'][Math.floor(Math.random() * 4)]}, ${city}`
    },
    progress: {
      currentStage: ['Initial Contact', 'Product Discussion', 'Documentation', 'Final Review'][Math.floor(Math.random() * 4)],
      completedSteps: ['Initial Contact', 'KYC Verification'].slice(0, Math.floor(Math.random() * 3)),
      nextSteps: ['Product Selection', 'Documentation', 'Final Approval'].slice(0, Math.floor(Math.random() * 3)),
      lastUpdated: date.toISOString().split('T')[0]
    },
    meetings,
    communications,
    createdAt: date.toISOString(),
    updatedAt: new Date().toISOString(),
    investmentCapacity: `₹${(Math.floor(Math.random() * 50) + 1)}L`,
    riskProfile: ['Conservative', 'Moderate', 'Aggressive'][Math.floor(Math.random() * 3)] as const,
    kyc: {
      status: ['pending', 'in_progress', 'completed', 'rejected'][Math.floor(Math.random() * 4)] as const,
      panCard: `ABCDE${1234 + index}F`,
      aadharCard: `9876 ${5432 + index} ${1234 + index}`,
      verifiedOn: Math.random() > 0.5 ? new Date().toISOString() : undefined,
      lastUpdated: new Date().toISOString()
    },
    documents: [
      {
        id: `DOC${index}1`,
        type: 'Identity Proof',
        name: 'PAN Card',
        status: ['pending', 'submitted', 'verified', 'rejected'][Math.floor(Math.random() * 4)] as const,
        uploadedOn: new Date().toISOString(),
        verifiedOn: Math.random() > 0.5 ? new Date().toISOString() : undefined,
        url: '#'
      },
      {
        id: `DOC${index}2`,
        type: 'Address Proof',
        name: 'Aadhar Card',
        status: ['pending', 'submitted', 'verified', 'rejected'][Math.floor(Math.random() * 4)] as const,
        uploadedOn: new Date().toISOString(),
        verifiedOn: Math.random() > 0.5 ? new Date().toISOString() : undefined,
        url: '#'
      }
    ],
    portfolio: {
      totalInvestment: Math.floor(Math.random() * 5000000) + 1000000,
      currentValue: Math.floor(Math.random() * 6000000) + 1000000,
      returns: Math.floor(Math.random() * 30) - 10,
      assetAllocation: {
        equity: Math.floor(Math.random() * 60) + 20,
        debt: Math.floor(Math.random() * 40) + 10,
        gold: Math.floor(Math.random() * 20) + 5,
        others: Math.floor(Math.random() * 10) + 5
      },
      investments: [
        {
          id: `INV${index}1`,
          type: 'Mutual Fund',
          productName: 'Large Cap Fund',
          amount: Math.floor(Math.random() * 1000000) + 500000,
          purchaseDate: new Date(date.getTime() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString(),
          currentValue: Math.floor(Math.random() * 1200000) + 500000,
          returns: Math.floor(Math.random() * 30) - 10,
          units: Math.floor(Math.random() * 10000) + 1000,
          nav: Math.floor(Math.random() * 100) + 50,
          lastUpdated: new Date().toISOString()
        }
      ],
      lastUpdated: new Date().toISOString()
    },
    monthlyIncome: Math.floor(Math.random() * 500000) + 100000,
    taxBracket: ['20%', '30%'][Math.floor(Math.random() * 2)],
    financialGoals: [
      {
        type: 'Retirement',
        targetAmount: Math.floor(Math.random() * 10000000) + 5000000,
        targetDate: new Date(date.getFullYear() + 20, 0, 1).toISOString(),
        currentProgress: Math.floor(Math.random() * 3000000)
      }
    ],
    dateOfBirth: dateOfBirth.toISOString(),
    accountOpenDate: accountOpenDate.toISOString()
  }
}

// Function to create a new client with default values
export const createNewClient = (partialClient: Partial<Client>): Client => {
  const assignedEmployee = employees[0] // Assign to first employee by default
  const now = new Date().toISOString()
  
  return {
    id: `CLI${Date.now()}`,
    name: partialClient.name || '',
    age: partialClient.age || 0,
    company: partialClient.company || '',
    city: partialClient.city || '',
    status: partialClient.status || 'lead',
    interestedProduct: partialClient.interestedProduct || '',
    assignedTo: assignedEmployee,
    contactInfo: {
      email: partialClient.contactInfo?.email || '',
      phone: partialClient.contactInfo?.phone || '',
      address: partialClient.contactInfo?.address || ''
    },
    progress: {
      currentStage: 'Initial Contact',
      completedSteps: [],
      nextSteps: ['KYC Verification', 'Product Selection', 'Documentation'],
      lastUpdated: now
    },
    meetings: [],
    communications: [],
    createdAt: now,
    updatedAt: now,
    investmentCapacity: partialClient.investmentCapacity || '₹0L',
    riskProfile: partialClient.riskProfile || 'Moderate',
    kyc: {
      status: 'pending',
      panCard: '',
      aadharCard: '',
      lastUpdated: now
    },
    documents: [],
    portfolio: {
      totalInvestment: 0,
      currentValue: 0,
      returns: 0,
      assetAllocation: {
        equity: 0,
        debt: 0,
        gold: 0,
        others: 0
      },
      investments: [],
      lastUpdated: now
    },
    monthlyIncome: partialClient.monthlyIncome || 0,
    taxBracket: partialClient.taxBracket || '',
    financialGoals: [],
    dateOfBirth: partialClient.dateOfBirth || '',
    accountOpenDate: partialClient.accountOpenDate || ''
  }
}

// Function to get clients from localStorage or initialize with mock data
export const getClients = (): Client[] => {
  try {
    const storedClients = localStorage.getItem('clients')
    if (storedClients) {
      return JSON.parse(storedClients)
    }
    const initialClients = Array.from({ length: 100 }, (_, i) => generateRandomClient(i))
    localStorage.setItem('clients', JSON.stringify(initialClients))
    return initialClients
  } catch (error) {
    console.error('Error accessing localStorage:', error)
    return Array.from({ length: 100 }, (_, i) => generateRandomClient(i))
  }
}

// Function to save clients to localStorage
export const saveClients = (clients: Client[]) => {
  try {
    localStorage.setItem('clients', JSON.stringify(clients))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

// Add 5 specific rural clients with birth dates and account open dates
const ruralClients: Client[] = [
  {
    id: 'RURAL001',
    name: 'Ramesh Patel',
    age: 45,
    dateOfBirth: new Date(1979, 5, 15).toISOString(),
    accountOpenDate: new Date(2022, 3, 10).toISOString(),
    email: 'ramesh.patel@gmail.com',
    phone: '+91 9876543001',
    address: '123, Village Square, Bhavnagar',
    city: 'Bhavnagar',
    interestedProduct: 'Fixed Deposits',
    status: 'active',
    assignedTo: employees[0],
    contactInfo: {
      email: 'ramesh.patel@gmail.com',
      phone: '+91 9876543001',
      address: '123, Village Square, Bhavnagar'
    },
    progress: {
      currentStage: 'Product Discussion',
      completedSteps: ['Initial Contact', 'KYC Verification'],
      nextSteps: ['Documentation'],
      lastUpdated: new Date().toISOString()
    },
    meetings: [],
    communications: [],
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: new Date().toISOString(),
    investmentCapacity: '₹5L',
    riskProfile: 'Conservative',
    kyc: {
      status: 'completed',
      panCard: 'ABCDE1234F',
      aadharCard: '9876 5432 1001',
      verifiedOn: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    },
    documents: [],
    portfolio: {
      totalInvestment: 500000,
      currentValue: 525000,
      returns: 5,
      assetAllocation: {
        equity: 20,
        debt: 60,
        gold: 15,
        others: 5
      },
      investments: [],
      lastUpdated: new Date().toISOString()
    },
    monthlyIncome: 40000,
    taxBracket: '20%',
    financialGoals: []
  },
  {
    id: 'RURAL002',
    name: 'Lakshmi Devi',
    age: 52,
    dateOfBirth: new Date(1986, 8, 20).toISOString(),
    accountOpenDate: new Date(2023, 1, 15).toISOString(),
    email: 'lakshmi.devi@gmail.com',
    phone: '+91 9876543002',
    address: '45, Milk Colony, Anand',
    city: 'Anand',
    interestedProduct: 'Life Insurance',
    status: 'active',
    assignedTo: employees[1],
    contactInfo: {
      email: 'lakshmi.devi@gmail.com',
      phone: '+91 9876543002',
      address: '45, Milk Colony, Anand'
    },
    progress: {
      currentStage: 'Documentation',
      completedSteps: ['Initial Contact', 'KYC Verification', 'Product Discussion'],
      nextSteps: ['Final Review'],
      lastUpdated: new Date().toISOString()
    },
    meetings: [],
    communications: [],
    createdAt: '2023-03-20T10:00:00Z',
    updatedAt: new Date().toISOString(),
    investmentCapacity: '₹3L',
    riskProfile: 'Conservative',
    kyc: {
      status: 'completed',
      panCard: 'FGHIJ5678K',
      aadharCard: '9876 5432 1002',
      verifiedOn: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    },
    documents: [],
    portfolio: {
      totalInvestment: 300000,
      currentValue: 315000,
      returns: 5,
      assetAllocation: {
        equity: 15,
        debt: 65,
        gold: 15,
        others: 5
      },
      investments: [],
      lastUpdated: new Date().toISOString()
    },
    monthlyIncome: 35000,
    taxBracket: '20%',
    financialGoals: []
  },
  {
    id: 'RURAL003',
    name: 'Suresh Kumar',
    age: 38,
    dateOfBirth: new Date(1984, 2, 12).toISOString(),
    accountOpenDate: new Date(2022, 6, 20).toISOString(),
    email: 'suresh.kumar@gmail.com',
    phone: '+91 9876543003',
    address: '78, Market Road, Nashik',
    city: 'Nashik',
    interestedProduct: 'Mutual Funds',
    status: 'active',
    assignedTo: employees[2],
    contactInfo: {
      email: 'suresh.kumar@gmail.com',
      phone: '+91 9876543003',
      address: '78, Market Road, Nashik'
    },
    progress: {
      currentStage: 'Product Discussion',
      completedSteps: ['Initial Contact'],
      nextSteps: ['KYC Verification', 'Documentation'],
      lastUpdated: new Date().toISOString()
    },
    meetings: [],
    communications: [],
    createdAt: '2023-06-10T10:00:00Z',
    updatedAt: new Date().toISOString(),
    investmentCapacity: '₹8L',
    riskProfile: 'Moderate',
    kyc: {
      status: 'in_progress',
      panCard: 'LMNOP9012Q',
      aadharCard: '9876 5432 1003',
      lastUpdated: new Date().toISOString()
    },
    documents: [],
    portfolio: {
      totalInvestment: 800000,
      currentValue: 840000,
      returns: 5,
      assetAllocation: {
        equity: 40,
        debt: 40,
        gold: 15,
        others: 5
      },
      investments: [],
      lastUpdated: new Date().toISOString()
    },
    monthlyIncome: 60000,
    taxBracket: '20%',
    financialGoals: []
  },
  {
    id: 'RURAL004',
    name: 'Meena Singh',
    age: 42,
    dateOfBirth: new Date(1980, 9, 25).toISOString(),
    accountOpenDate: new Date(2022, 8, 5).toISOString(),
    email: 'meena.singh@gmail.com',
    phone: '+91 9876543004',
    address: '34, Craft Street, Kutch',
    city: 'Kutch',
    interestedProduct: 'Tax Saving ELSS',
    status: 'active',
    assignedTo: employees[0],
    contactInfo: {
      email: 'meena.singh@gmail.com',
      phone: '+91 9876543004',
      address: '34, Craft Street, Kutch'
    },
    progress: {
      currentStage: 'Initial Contact',
      completedSteps: [],
      nextSteps: ['KYC Verification', 'Product Discussion'],
      lastUpdated: new Date().toISOString()
    },
    meetings: [],
    communications: [],
    createdAt: '2023-08-05T10:00:00Z',
    updatedAt: new Date().toISOString(),
    investmentCapacity: '₹4L',
    riskProfile: 'Moderate',
    kyc: {
      status: 'pending',
      panCard: 'RSTUV3456W',
      aadharCard: '9876 5432 1004',
      lastUpdated: new Date().toISOString()
    },
    documents: [],
    portfolio: {
      totalInvestment: 400000,
      currentValue: 420000,
      returns: 5,
      assetAllocation: {
        equity: 30,
        debt: 50,
        gold: 15,
        others: 5
      },
      investments: [],
      lastUpdated: new Date().toISOString()
    },
    monthlyIncome: 45000,
    taxBracket: '20%',
    financialGoals: []
  },
  {
    id: 'RURAL005',
    name: 'Rajesh Sharma',
    age: 48,
    dateOfBirth: new Date(1974, 4, 10).toISOString(),
    accountOpenDate: new Date(2022, 4, 25).toISOString(),
    email: 'rajesh.sharma@gmail.com',
    phone: '+91 9876543005',
    address: '56, Main Road, Wardha',
    city: 'Wardha',
    interestedProduct: 'Fixed Deposits',
    status: 'active',
    assignedTo: employees[1],
    contactInfo: {
      email: 'rajesh.sharma@gmail.com',
      phone: '+91 9876543005',
      address: '56, Main Road, Wardha'
    },
    progress: {
      currentStage: 'Documentation',
      completedSteps: ['Initial Contact', 'KYC Verification', 'Product Discussion'],
      nextSteps: ['Final Review'],
      lastUpdated: new Date().toISOString()
    },
    meetings: [],
    communications: [],
    createdAt: '2023-04-25T10:00:00Z',
    updatedAt: new Date().toISOString(),
    investmentCapacity: '₹6L',
    riskProfile: 'Conservative',
    kyc: {
      status: 'completed',
      panCard: 'WXYZ7890A',
      aadharCard: '9876 5432 1005',
      verifiedOn: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    },
    documents: [],
    portfolio: {
      totalInvestment: 600000,
      currentValue: 630000,
      returns: 5,
      assetAllocation: {
        equity: 25,
        debt: 55,
        gold: 15,
        others: 5
      },
      investments: [],
      lastUpdated: new Date().toISOString()
    },
    monthlyIncome: 50000,
    taxBracket: '20%',
    financialGoals: []
  }
];

// Combine regular mock clients with rural clients
export const mockClients: Client[] = [...Array.from({ length: 15 }, (_, i) => generateRandomClient(i)), ...ruralClients];

// Update employee client lists
mockClients.forEach(client => {
  const employee = employees.find(emp => emp.id === client.assignedTo.id)
  if (employee && !employee.clients.includes(client.id)) {
    employee.clients.push(client.id)
  }
})

export const mockEmployees = employees