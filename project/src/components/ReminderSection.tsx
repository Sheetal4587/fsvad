import { Calendar, Phone, Clock, AlertCircle, MessageSquare } from 'lucide-react'
import type { Meeting, Communication } from '../types/client'

interface ReminderSectionProps {
  meetings: Meeting[]
  communications: Communication[]
  onScheduleMeeting?: () => void
  onScheduleCall?: () => void
}

export const ReminderSection = ({ 
  meetings, 
  communications,
  onScheduleMeeting,
  onScheduleCall 
}: ReminderSectionProps) => {
  const today = new Date()
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

  // Filter upcoming meetings and calls
  const upcomingMeetings = meetings
    .filter(meeting => {
      const meetingDate = new Date(meeting.date)
      return meetingDate >= today && meetingDate <= nextWeek && meeting.status !== 'cancelled'
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const upcomingCalls = communications
    .filter(comm => {
      if (!comm.followUpDate) return false
      const followUpDate = new Date(comm.followUpDate)
      return followUpDate >= today && followUpDate <= nextWeek
    })
    .sort((a, b) => new Date(a.followUpDate!).getTime() - new Date(b.followUpDate!).getTime())

  const formatDate = (dateString: string, timeString?: string) => {
    const date = new Date(dateString)
    const formattedDate = new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)

    if (timeString) {
      return `${formattedDate.split(',')[0]} at ${timeString}`
    }
    return formattedDate
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Upcoming Reminders</h2>
        <div className="flex space-x-4">
          <button
            onClick={onScheduleMeeting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meeting
          </button>
          <button
            onClick={onScheduleCall}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
          >
            <Phone className="h-4 w-4 mr-2" />
            Schedule Call
          </button>
        </div>
      </div>
      
      {/* Meetings Section */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-500 mb-4">
          Upcoming Meetings ({upcomingMeetings.length})
        </h3>
        <div className="space-y-4">
          {upcomingMeetings.map((meeting) => (
            <div key={meeting.id} className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{meeting.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{meeting.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{formatDate(meeting.date, meeting.time)}</span>
                    {meeting.location && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{meeting.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                meeting.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' : 
                meeting.status === 'completed' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
              </div>
            </div>
          ))}
          {upcomingMeetings.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No upcoming meetings this week</p>
              <button
                onClick={onScheduleMeeting}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Schedule a meeting
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Follow-up Calls Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-4">
          Follow-up Calls ({upcomingCalls.length})
        </h3>
        <div className="space-y-4">
          {upcomingCalls.map((call) => (
            <div key={call.id} className="flex items-center justify-between bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {call.channel === 'phone' ? (
                    <Phone className="h-6 w-6 text-purple-600" />
                  ) : (
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{call.summary}</p>
                  <p className="text-sm text-gray-500 mt-1">{call.outcome}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Follow-up: {formatDate(call.followUpDate!)}</span>
                    <span className="mx-2">•</span>
                    <span className="capitalize">{call.channel}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center text-purple-600">
                <AlertCircle className="h-5 w-5" />
              </div>
            </div>
          ))}
          {upcomingCalls.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Phone className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No follow-up calls scheduled</p>
              <button
                onClick={onScheduleCall}
                className="mt-2 text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                Schedule a call
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 