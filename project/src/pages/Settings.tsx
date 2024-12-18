import { useState } from 'react'
import { Save } from 'lucide-react'

const Settings = () => {
  const [settings, setSettings] = useState({
    broadcastPreferences: {
      marketUpdateInterval: 5, // minutes
      emailEnabled: true,
      smsEnabled: true,
      autoSendMarketUpdates: true,
      workingHoursOnly: true,
      workingHoursStart: '09:00',
      workingHoursEnd: '17:00',
      minimumPortfolioValue: 100000,
    }
  })

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings))
    alert('Settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

      {/* Broadcast Settings */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Broadcast Preferences</h2>
        
        <div className="space-y-6">
          {/* Market Updates */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Market Updates</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Update Interval (minutes)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={settings.broadcastPreferences.marketUpdateInterval}
                  onChange={(e) => setSettings({
                    ...settings,
                    broadcastPreferences: {
                      ...settings.broadcastPreferences,
                      marketUpdateInterval: parseInt(e.target.value)
                    }
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Portfolio Value (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={settings.broadcastPreferences.minimumPortfolioValue}
                  onChange={(e) => setSettings({
                    ...settings,
                    broadcastPreferences: {
                      ...settings.broadcastPreferences,
                      minimumPortfolioValue: parseInt(e.target.value)
                    }
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Communication Channels */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Communication Channels</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailEnabled"
                  checked={settings.broadcastPreferences.emailEnabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    broadcastPreferences: {
                      ...settings.broadcastPreferences,
                      emailEnabled: e.target.checked
                    }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="emailEnabled" className="ml-2 block text-sm text-gray-700">
                  Enable Email Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="smsEnabled"
                  checked={settings.broadcastPreferences.smsEnabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    broadcastPreferences: {
                      ...settings.broadcastPreferences,
                      smsEnabled: e.target.checked
                    }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="smsEnabled" className="ml-2 block text-sm text-gray-700">
                  Enable SMS Notifications
                </label>
              </div>
            </div>
          </div>

          {/* Automation Settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Automation</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoSendMarketUpdates"
                  checked={settings.broadcastPreferences.autoSendMarketUpdates}
                  onChange={(e) => setSettings({
                    ...settings,
                    broadcastPreferences: {
                      ...settings.broadcastPreferences,
                      autoSendMarketUpdates: e.target.checked
                    }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="autoSendMarketUpdates" className="ml-2 block text-sm text-gray-700">
                  Automatically Send Market Updates
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="workingHoursOnly"
                  checked={settings.broadcastPreferences.workingHoursOnly}
                  onChange={(e) => setSettings({
                    ...settings,
                    broadcastPreferences: {
                      ...settings.broadcastPreferences,
                      workingHoursOnly: e.target.checked
                    }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="workingHoursOnly" className="ml-2 block text-sm text-gray-700">
                  Send Updates Only During Working Hours
                </label>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Working Hours</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  value={settings.broadcastPreferences.workingHoursStart}
                  onChange={(e) => setSettings({
                    ...settings,
                    broadcastPreferences: {
                      ...settings.broadcastPreferences,
                      workingHoursStart: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="time"
                  value={settings.broadcastPreferences.workingHoursEnd}
                  onChange={(e) => setSettings({
                    ...settings,
                    broadcastPreferences: {
                      ...settings.broadcastPreferences,
                      workingHoursEnd: e.target.value
                    }
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings 