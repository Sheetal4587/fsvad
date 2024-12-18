import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users } from 'lucide-react'
import type { Client } from '../types/client'
import { getClients, saveClients } from '../data/mockClients'
import { ClientList } from '../components/ClientList'

const Clients = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [selectedProduct, setSelectedProduct] = useState<string>('all')
  const [clients, setClients] = useState<Client[]>([])

  // Load clients from localStorage on mount
  useEffect(() => {
    setClients(getClients())
  }, [])

  const cities = Array.from(new Set(clients.map(client => client.city))).sort()
  const products = Array.from(new Set(clients.map(client => client.interestedProduct))).sort()

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       client.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCity = selectedCity === 'all' || client.city === selectedCity
    const matchesProduct = selectedProduct === 'all' || client.interestedProduct === selectedProduct
    return matchesSearch && matchesCity && matchesProduct
  })

  const handleDeleteClient = (clientId: string) => {
    const updatedClients = clients.filter(client => client.id !== clientId)
    setClients(updatedClients)
    saveClients(updatedClients)
  }

  const handleAddClient = (newClient: Client) => {
    const updatedClients = [...clients, newClient]
    setClients(updatedClients)
    saveClients(updatedClients)
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-1">
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="all">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="all">All Products</option>
            {products.map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Client List */}
      <ClientList 
        clients={filteredClients}
        onDeleteClient={handleDeleteClient}
        onAddClient={handleAddClient}
        onClientClick={(clientId) => navigate(`/clients/${clientId}`)}
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Clients"
          value={clients.length.toString()}
          icon={<Users className="h-6 w-6 text-blue-600" />}
        />
        <StatCard
          title="Active Clients"
          value={clients.filter(c => c.status === 'active').length.toString()}
          icon={<Users className="h-6 w-6 text-green-600" />}
        />
        <StatCard
          title="Leads"
          value={clients.filter(c => c.status === 'lead').length.toString()}
          icon={<Users className="h-6 w-6 text-yellow-600" />}
        />
        <StatCard
          title="Average Investment"
          value={`₹${Math.floor(clients.reduce((acc, client) => 
            acc + parseInt(client.investmentCapacity.replace(/[^\d]/g, '')), 0) / clients.length)}L`}
          icon={<Users className="h-6 w-6 text-purple-600" />}
        />
      </div>
    </div>
  )
}

const StatCard = ({ 
  title, 
  value, 
  icon 
}: { 
  title: string
  value: string
  icon: React.ReactNode 
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="ml-4">
          <h4 className="text-sm font-medium text-gray-500">{title}</h4>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default Clients 