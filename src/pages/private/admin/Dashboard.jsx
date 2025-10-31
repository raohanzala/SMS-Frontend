import React from 'react';
import {
  FiUsers,
  FiUserCheck,
  FiDollarSign,
  FiTrendingUp,
  FiBell,
  FiBookOpen,
  FiClipboard,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const AdminDashboard = () => {
  // Mock data for charts
  const attendanceData = [
    { month: 'Jan', present: 95, absent: 5 },
    { month: 'Feb', present: 92, absent: 8 },
    { month: 'Mar', present: 88, absent: 12 },
    { month: 'Apr', present: 90, absent: 10 },
    { month: 'May', present: 94, absent: 6 },
    { month: 'Jun', present: 91, absent: 9 },
  ];

  const feeCollectionData = [
    { month: 'Jan', collected: 45000, pending: 5000 },
    { month: 'Feb', collected: 48000, pending: 2000 },
    { month: 'Mar', collected: 52000, pending: 3000 },
    { month: 'Apr', collected: 49000, pending: 6000 },
    { month: 'May', collected: 55000, pending: 1000 },
    { month: 'Jun', collected: 53000, pending: 4000 },
  ];

  const studentDistribution = [
    { name: 'Class 1', value: 45, color: '#3B82F6' },
    { name: 'Class 2', value: 42, color: '#10B981' },
    { name: 'Class 3', value: 38, color: '#F59E0B' },
    { name: 'Class 4', value: 35, color: '#EF4444' },
    { name: 'Class 5', value: 32, color: '#8B5CF6' },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'student',
      action: 'New student registered',
      name: 'Alice Johnson',
      time: '2 hours ago',
      icon: FiUsers,
    },
    {
      id: 2,
      type: 'fee',
      action: 'Fee payment received',
      name: 'Bob Smith',
      amount: '$500',
      time: '3 hours ago',
      icon: FiDollarSign,
    },
    {
      id: 3,
      type: 'attendance',
      action: 'Attendance marked',
      name: 'Class 3A',
      time: '4 hours ago',
      icon: FiClipboard,
    },
    {
      id: 4,
      type: 'exam',
      action: 'Exam scheduled',
      name: 'Mid-term Mathematics',
      time: '5 hours ago',
      icon: FiBookOpen,
    },
  ];

  const stats = [
    {
      title: 'Total Students',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: FiUsers,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Teachers',
      value: '45',
      change: '+5%',
      changeType: 'positive',
      icon: FiUserCheck,
      color: 'bg-green-500',
    },
    {
      title: 'Fee Collected',
      value: '$45,678',
      change: '+8%',
      changeType: 'positive',
      icon: FiDollarSign,
      color: 'bg-yellow-500',
    },
    {
      title: 'Attendance Rate',
      value: '92%',
      change: '+2%',
      changeType: 'positive',
      icon: FiTrendingUp,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
            <div className="mt-4">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stat.changeType === 'positive'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
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

        {/* Fee Collection Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Fee Collection Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={feeCollectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="collected"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Collected"
              />
              <Line
                type="monotone"
                dataKey="pending"
                stroke="#F59E0B"
                strokeWidth={2}
                name="Pending"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Student Distribution and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Student Distribution by Class</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={studentDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {studentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
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
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.name}
                    {activity.amount && ` - ${activity.amount}`}
                  </p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
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
            <FiUsers className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Student</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiUserCheck className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Teacher</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiDollarSign className="h-8 w-8 text-yellow-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Generate Invoice</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiBell className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Send Notice</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 