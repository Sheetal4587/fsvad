import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import ClientDetail from './pages/ClientDetail'
import Broadcasts from './pages/Broadcasts'
import Settings from './pages/Settings'
import SpecialDay from './pages/SpecialDay'
import Emergency from './pages/Emergency'
import EmployeeManagement from './pages/EmployeeManagement'
import Messages from './pages/Messages'
import TestSMS from './pages/TestSMS'
import TestEmail from './pages/TestEmail'
import { MarketProvider } from './context/MarketContext'

function App() {
  return (
    <MarketProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:id" element={<ClientDetail />} />
          <Route path="/special-day" element={<SpecialDay />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/broadcasts" element={<Broadcasts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/employees" element={<EmployeeManagement />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/test-sms" element={<TestSMS />} />
          <Route path="/test-email" element={<TestEmail />} />
        </Routes>
      </Layout>
    </MarketProvider>
  )
}

export default App