import React from 'react';
import {
  FiBookOpen,
  FiCheckCircle,
  FiAlertCircle,
  FiBarChart2,
  FiCalendar,
  FiClock,
  FiUser,
  FiAward,
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

const StudentDashboard = () => {
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

  const recentHomework = [
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Algebra Practice Problems',
      dueDate: '2024-01-15',
      status: 'pending',
      description: 'Complete exercises 1-20 from Chapter 5',
    },
    {
      id: 2,
      subject: 'English',
      title: 'Essay Writing',
      dueDate: '2024-01-12',
      status: 'completed',
      description: 'Write a 500-word essay on Shakespeare',
    },
    {
      id: 3,
      subject: 'Science',
      title: 'Lab Report',
      dueDate: '2024-01-18',
      status: 'pending',
      description: 'Submit lab report for Chemistry experiment',
    },
  ];

  const upcomingExams = [
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Mid-term Exam',
      date: '2024-01-20',
      time: '10:00 AM',
      room: 'Room 101',
    },
    {
      id: 2,
      subject: 'English',
      title: 'Literature Quiz',
      date: '2024-01-22',
      time: '2:00 PM',
      room: 'Room 102',
    },
    {
      id: 3,
      subject: 'Science',
      title: 'Physics Test',
      date: '2024-01-25',
      time: '9:00 AM',
      room: 'Room 103',
    },
  ];

  const quickStats = [
    {
      title: 'Attendance Rate',
      value: '92%',
      icon: FiCheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'Average Grade',
      value: 'A-',
      icon: FiAward,
      color: 'bg-blue-500',
    },
    {
      title: 'Pending Homework',
      value: '2',
      icon: FiAlertCircle,
      color: 'bg-yellow-500',
    },
    {
      title: 'Upcoming Exams',
      value: '3',
      icon: FiCalendar,
      color: 'bg-purple-500',
    },
  ];

  const getStatusBadge = (status) => {
    return status === 'completed' ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Completed
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        Pending
      </span>
    );
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'text-green-600';
    if (grade.includes('B')) return 'text-blue-600';
    if (grade.includes('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your academic overview.</p>
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

        {/* Performance Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Subject Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#3B82F6" name="Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Current Grades</h3>
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
                      Good
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Homework and Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Homework */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Homework</h3>
          <div className="space-y-4">
            {recentHomework.map((homework) => (
              <div key={homework.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{homework.title}</h4>
                  {getStatusBadge(homework.status)}
                </div>
                <p className="text-sm text-gray-600 mb-2">{homework.subject}</p>
                <p className="text-sm text-gray-500 mb-2">{homework.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <FiClock className="mr-1 h-4 w-4" />
                  Due: {new Date(homework.dueDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Exams</h3>
          <div className="space-y-4">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{exam.title}</h4>
                  <span className="text-sm text-gray-500">{exam.subject}</span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FiCalendar className="mr-2 h-4 w-4" />
                    {new Date(exam.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <FiClock className="mr-2 h-4 w-4" />
                    {exam.time}
                  </div>
                  <div className="flex items-center">
                    <FiUser className="mr-2 h-4 w-4" />
                    {exam.room}
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
            <FiBookOpen className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">View Homework</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiBarChart2 className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">View Results</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiCheckCircle className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">View Attendance</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiUser className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Update Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 