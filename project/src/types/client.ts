export type ClientStatus = 'lead' | 'prospect' | 'active' | 'inactive' | 'churned'
export type MeetingStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'
export type CommunicationChannel = 'email' | 'phone' | 'meeting' | 'video_call' | 'other'
export type RiskProfile = 'Conservative' | 'Moderate' | 'Aggressive'
export type KYCStatus = 'pending' | 'in_progress' | 'completed' | 'rejected'
export type DocumentStatus = 'pending' | 'submitted' | 'verified' | 'rejected'

export interface KYCDetails {
  status: KYCStatus
  panCard: string
  aadharCard: string
  verifiedOn?: string
  remarks?: string
  lastUpdated: string
}

export interface Document {
  id: string
  type: string
  name: string
  status: DocumentStatus
  uploadedOn: string
  verifiedOn?: string
  remarks?: string
  url: string
}

export interface Investment {
  id: string
  type: string
  productName: string
  amount: number
  purchaseDate: string
  currentValue: number
  returns: number
  units?: number
  nav?: number
  lastUpdated: string
}

export interface Portfolio {
  totalInvestment: number
  currentValue: number
  returns: number
  assetAllocation: {
    equity: number
    debt: number
    gold: number
    others: number
  }
  investments: Investment[]
  lastUpdated: string
}

export interface Client {
  id: string
  name: string
  age: number
  dateOfBirth: string
  accountOpenDate: string
  company: string
  city: string
  interestedProduct: string
  status: ClientStatus
  assignedTo: Employee
  contactInfo: {
    email: string
    phone: string
    address?: string
  }
  progress: {
    currentStage: string
    completedSteps: string[]
    nextSteps: string[]
    lastUpdated: string
  }
  meetings: Meeting[]
  communications: Communication[]
  createdAt: string
  updatedAt: string
  investmentCapacity: string
  riskProfile: RiskProfile
  kyc: KYCDetails
  documents: Document[]
  portfolio: Portfolio
  monthlyIncome: number
  taxBracket: string
  financialGoals: {
    type: string
    targetAmount: number
    targetDate: string
    currentProgress: number
  }[]
}

export interface Employee {
  id: string
  name: string
  role: string
  email: string
  phone: string
  clients: string[] // Client IDs
  activeDeals: number
}

export interface Meeting {
  id: string
  clientId: string
  employeeId: string
  title: string
  description: string
  date: string
  time: string
  status: MeetingStatus
  location: string
  notes?: string
  followUpActions?: string[]
}

export interface Communication {
  id: string
  clientId: string
  employeeId: string
  channel: CommunicationChannel
  date: string
  summary: string
  outcome: string
  nextAction?: string
  followUpDate?: string
}

export interface Report {
  id: string
  clientId: string
  type: 'monthly' | 'quarterly' | 'annual'
  date: string
  portfolioSnapshot: Portfolio
  kycStatus: KYCStatus
  pendingDocuments: Document[]
  recentTransactions: Investment[]
  recommendations: string[]
  riskAssessment: string
  nextSteps: string[]
}