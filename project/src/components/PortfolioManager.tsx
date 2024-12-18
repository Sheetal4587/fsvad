import { PieChart, BarChart, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import type { Client, Investment } from '../types/client'

interface PortfolioManagerProps {
  client: Client
}

export const PortfolioManager = ({ client }: PortfolioManagerProps) => {
  const { portfolio } = client
  const totalReturns = ((portfolio.currentValue - portfolio.totalInvestment) / portfolio.totalInvestment) * 100

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getReturnColor = (returns: number) => {
    return returns >= 0 ? 'text-green-600' : 'text-red-600'
  }

  const getReturnIcon = (returns: number) => {
    return returns >= 0 ? 
      <ArrowUpRight className="h-4 w-4 text-green-600" /> :
      <ArrowDownRight className="h-4 w-4 text-red-600" />
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Portfolio Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Investment</h3>
            <p className="mt-2 text-xl font-semibold text-gray-900">
              {formatCurrency(portfolio.totalInvestment)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Current Value</h3>
            <p className="mt-2 text-xl font-semibold text-gray-900">
              {formatCurrency(portfolio.currentValue)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Returns</h3>
            <div className="mt-2 flex items-center">
              {getReturnIcon(totalReturns)}
              <span className={`text-xl font-semibold ${getReturnColor(totalReturns)}`}>
                {totalReturns.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Asset Allocation</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(portfolio.assetAllocation).map(([asset, percentage]) => (
            <div key={asset} className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 capitalize">{asset}</h3>
              <p className="mt-2 text-lg font-semibold text-gray-900">{percentage}%</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment List */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Investments</h2>
        <div className="space-y-4">
          {portfolio.investments.map((investment) => (
            <InvestmentCard key={investment.id} investment={investment} />
          ))}
        </div>
      </div>

      {/* Financial Goals */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Financial Goals</h2>
        <div className="space-y-4">
          {client.financialGoals.map((goal, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{goal.type}</h3>
                  <p className="text-sm text-gray-500">Target: {formatCurrency(goal.targetAmount)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Target Date: {goal.targetDate}</p>
                  <p className="text-sm font-medium text-blue-600">
                    Progress: {((goal.currentProgress / goal.targetAmount) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2"
                  style={{ width: `${(goal.currentProgress / goal.targetAmount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const InvestmentCard = ({ investment }: { investment: Investment }) => {
  const returns = ((investment.currentValue - investment.amount) / investment.amount) * 100

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <TrendingUp className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900">{investment.productName}</h4>
          <div className="flex items-center text-sm text-gray-500">
            <span>Invested: ₹{investment.amount.toLocaleString()}</span>
            <span className="mx-2">•</span>
            <span>Current: ₹{investment.currentValue.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {returns >= 0 ? (
          <ArrowUpRight className="h-4 w-4 text-green-600" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-red-600" />
        )}
        <span className={`text-sm font-medium ${returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {returns.toFixed(2)}%
        </span>
      </div>
    </div>
  )
} 