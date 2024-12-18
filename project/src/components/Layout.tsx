import { Navigation } from './Navigation'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen bg-gray-100 w-full">
      {/* Mobile Navigation - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm md:hidden">
        <Navigation isMobile={true} />
      </div>

      <div className="flex min-h-screen">
        {/* Desktop Sidebar - Fixed at left */}
        <div className="hidden md:block md:fixed md:inset-y-0 md:left-0 md:z-50 md:w-64 md:bg-white md:border-r md:border-gray-200">
          <div className="flex flex-col h-full">
            <div className="flex items-center flex-shrink-0 h-16 px-4 border-b border-gray-200">
              <span className="text-xl font-semibold text-gray-900">FinanceApp</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Navigation isMobile={false} />
            </div>
          </div>
        </div>

        {/* Main Content - Pushed right on desktop */}
        <div className="flex-1 w-full md:pl-64">
          <div className="pt-16 md:pt-0"> {/* Space for mobile nav */}
            <main className="px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
} 