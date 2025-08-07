import React from 'react';
import {
  FiUser,
  FiCheckCircle,
  FiAlertCircle,
  FiBarChart2,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiBookOpen,
} from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const ParentDashboard = () => {
  // Mock data for charts
  const attendanceData = [
    { month: 'Jan', present: 22, absent: 2 },
    { month: 'Feb', present: 20, absent: 4 },
    { month: 'Mar', present: 23, absent: 1 },
    { month: 'Apr', present: 21, absent: 3 },
    { month: 'May', present: 24, absent: 0 },
    { month: 'Jun', present: 22, absent: 2 },
  ];

  const performanceData = [
    { subject: 'Mathematics', score: 85, grade: 'A' },
    { subject: 'English', score: 78, grade: 'B+' },
    { subject: 'Science', score: 92, grade: 'A+' },
    { subject: 'History', score: 88, grade: 'A' },
    { subject: 'Computer Science', score: 95, grade: 'A+' },
  ];

  const feeData = [
    { month: 'Jan', paid: 500, due: 0 },
    { month: 'Feb', paid: 500, due: 0 },
    { month: 'Mar', paid: 500, due: 0 },
    { month: 'Apr', paid: 500, due: 0 },
    { month: 'May', paid: 500, due: 0 },
    { month: 'Jun', paid: 500, due: 0 },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'homework',
      title: 'Mathematics homework submitted',
      date: '2024-01-10',
      time: '2 hours ago',
      icon: FiBookOpen,
    },
    {
      id: 2,
      type: 'exam',
      title: 'Science exam completed',
      date: '2024-01-08',
      time: '1 day ago',
      icon: FiBarChart2,
    },
    {
      id: 3,
      type: 'attendance',
      title: 'Present in all classes',
      date: '2024-01-07',
      time: '2 days ago',
      icon: FiCheckCircle,
    },
    {
      id: 4,
      type: 'fee',
      title: 'Monthly fee paid',
      date: '2024-01-05',
      time: '4 days ago',
      icon: FiDollarSign,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      date: '2024-01-20',
      time: '3:00 PM',
      type: 'meeting',
    },
    {
      id: 2,
      title: 'Annual Sports Day',
      date: '2024-01-25',
      time: '9:00 AM',
      type: 'event',
    },
    {
      id: 3,
      title: 'Mid-term Exams',
      date: '2024-01-30',
      time: '10:00 AM',
      type: 'exam',
    },
  ];

  const quickStats = [
    {
      title: 'Child\'s Attendance',
      value: '92%',
      icon: FiCheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'Average Grade',
      value: 'A-',
      icon: FiBarChart2,
      color: 'bg-blue-500',
    },
    {
      title: 'Fee Status',
      value: 'Paid',
      icon: FiDollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Upcoming Events',
      value: '3',
      icon: FiCalendar,
      color: 'bg-purple-500',
    },
  ];

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'text-green-600';
    if (grade.includes('B')) return 'text-blue-600';
    if (grade.includes('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'event':
        return 'bg-green-100 text-green-800';
      case 'exam':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
        <p className="text-gray-600">Welcome! Here's your child's academic overview.</p>
      </div>

      {/* Child Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              className="h-16 w-16 rounded-full"
              src="https://via.placeholder.com/64"
              alt="Child"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Alice Johnson</h2>
            <p className="text-gray-600">Class 3A • Roll Number: ST001</p>
            <p className="text-sm text-gray-500">Age: 8 years • Admission Date: 2023-09-01</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color} text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Attendance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#10B981" name="Present" />
              <Bar dataKey="absent" fill="#EF4444" name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fee Payment Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Fee Payment History</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={feeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="paid"
                stroke="#10B981"
                strokeWidth={2}
                name="Paid"
              />
              <Line
                type="monotone"
                dataKey="due"
                stroke="#EF4444"
                strokeWidth={2}
                name="Due"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {performanceData.map((subject, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{subject.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{subject.score}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getGradeColor(subject.grade)}`}>
                      {subject.grade}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Excellent
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activities and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <activity.icon className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FiCalendar className="mr-2 h-4 w-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <FiClock className="mr-2 h-4 w-4" />
                    {event.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiDollarSign className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Pay Fees</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiBarChart2 className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">View Results</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiCheckCircle className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">View Attendance</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiUser className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Contact Teacher</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard; 