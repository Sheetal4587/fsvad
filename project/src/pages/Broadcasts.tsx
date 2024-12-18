import { BroadcastMessage } from '../components/BroadcastMessage'
import CustomizedMessages from '../components/CustomizedMessages'

const Broadcasts = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Broadcast Messages</h1>
      </div>
      
      {/* General Broadcast Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">General Broadcast</h2>
        <BroadcastMessage />
      </div>

      {/* Customized Messages Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <CustomizedMessages />
      </div>
    </div>
  )
}

export default Broadcasts 