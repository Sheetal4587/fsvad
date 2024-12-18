import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  BellRing, 
  Settings,
  Menu,
  X,
  Calendar,
  AlertCircle,
  UserCircle,
  MessageSquare,
  Mail
} from 'lucide-react'

interface NavigationProps {
  isMobile: boolean
}

const navItems = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Clients', to: '/clients', icon: Users },
  { name: 'Employees', to: '/employees', icon: UserCircle },
  { name: 'Special Day', to: '/special-day', icon: Calendar },
  { 
    name: 'Emergency', 
    to: '/emergency', 
    icon: AlertCircle,
    className: 'text-red-600 hover:bg-red-50 font-semibold' 
  },
  { name: 'Broadcasts', to: '/broadcasts', icon: BellRing },
  { name: 'Test SMS', to: '/test-sms', icon: MessageSquare },
  { name: 'Test Email', to: '/test-email', icon: Mail },
  { name: 'Settings', to: '/settings', icon: Settings }
]

export const Navigation = ({ isMobile }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getNavItemClassName = (isActive: boolean, item: typeof navItems[0]) => {
    const baseClass = "flex items-center px-4 py-3 text-sm font-medium rounded-md"
    const defaultColors = isActive
      ? 'bg-blue-50 text-blue-600'
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    
    return item.className 
      ? `${baseClass} ${item.className}`
      : `${baseClass} ${defaultColors}`
  }

  if (isMobile) {
    return (
      <>
        {/* Mobile header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-900">FinanceApp</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white pt-16">
            <nav className="px-4 py-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => getNavItemClassName(isActive, item)}
                >
                  <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </>
    )
  }

  // Desktop navigation
  return (
    <nav className="space-y-1 px-2">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className={({ isActive }) => getNavItemClassName(isActive, item)}
        >
          <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
          {item.name}
        </NavLink>
      ))}
    </nav>
  )
} 