import React from 'react';
import {
  FiBookOpen,
  FiUsers,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiBarChart2,
  FiMessageSquare,
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

const TeacherDashboard = () => {
  // Mock data for charts
  const attendanceData = [
    { class: 'Class 3A', present: 28, absent: 2 },
    { class: 'Class 4B', present: 25, absent: 5 },
    { class: 'Class 5A', present: 30, absent: 0 },
  ];

  const performanceData = [
    { month: 'Jan', average: 85 },
    { month: 'Feb', average: 82 },
    { month: 'Mar', average: 88 },
    { month: 'Apr', average: 90 },
    { month: 'May', average: 87 },
    { month: 'Jun', average: 92 },
  ];

  const assignedClasses = [
    {
      id: 1,
      name: 'Class 3A',
      subject: 'Mathematics',
      students: 30,
      nextLesson: 'Today, 10:00 AM',
      room: 'Room 101',
      attendance: '93%',
    },
    {
      id: 2,
      name: 'Class 4B',
      subject: 'Mathematics',
      students: 30,
      nextLesson: 'Today, 2:00 PM',
      room: 'Room 102',
      attendance: '83%',
    },
    {
      id: 3,
      name: 'Class 5A',
      subject: 'Mathematics',
      students: 30,
      nextLesson: 'Tomorrow, 9:00 AM',
      room: 'Room 103',
      attendance: '100%',
    },
  ];

  const recentHomework = [
    {
      id: 1,
      class: 'Class 3A',
      subject: 'Mathematics',
      title: 'Algebra Practice Problems',
      dueDate: '2024-01-15',
      submitted: 25,
      total: 30,
      status: 'pending',
    },
    {
      id: 2,
      class: 'Class 4B',
      subject: 'Mathematics',
      title: 'Geometry Quiz',
      dueDate: '2024-01-12',
      submitted: 28,
      total: 30,
      status: 'completed',
    },
    {
      id: 3,
      class: 'Class 5A',
      subject: 'Mathematics',
      title: 'Calculus Assignment',
      dueDate: '2024-01-18',
      submitted: 15,
      total: 30,
      status: 'pending',
    },
  ];

  const upcomingLessons = [
    {
      id: 1,
      class: 'Class 3A',
      subject: 'Mathematics',
      topic: 'Introduction to Fractions',
      time: '10:00 AM - 11:00 AM',
      room: 'Room 101',
    },
    {
      id: 2,
      class: 'Class 4B',
      subject: 'Mathematics',
      topic: 'Geometry Basics',
      time: '2:00 PM - 3:00 PM',
      room: 'Room 102',
    },
    {
      id: 3,
      class: 'Class 5A',
      subject: 'Mathematics',
      topic: 'Advanced Algebra',
      time: '9:00 AM - 10:00 AM',
      room: 'Room 103',
    },
  ];

  const quickStats = [
    {
      title: 'Total Students',
      value: '90',
      icon: FiUsers,
      color: 'bg-blue-500',
    },
    {
      title: 'Classes Today',
      value: '3',
      icon: FiBookOpen,
      color: 'bg-green-500',
    },
    {
      title: 'Pending Homework',
      value: '2',
      icon: FiAlertCircle,
      color: 'bg-yellow-500',
    },
    {
      title: 'Average Performance',
      value: '87%',
      icon: FiBarChart2,
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your teaching overview.</p>
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

      {/* Assigned Classes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">My Assigned Classes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assignedClasses.map((classItem) => (
            <div key={classItem.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-gray-900">{classItem.name}</h4>
                <span className="text-sm text-gray-500">{classItem.subject}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <FiUsers className="mr-2 h-4 w-4" />
                  {classItem.students} students
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FiClock className="mr-2 h-4 w-4" />
                  {classItem.nextLesson}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FiBookOpen className="mr-2 h-4 w-4" />
                  {classItem.room}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FiCheckCircle className="mr-2 h-4 w-4" />
                  Attendance: {classItem.attendance}
                </div>
              </div>
              <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                Take Attendance
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Class Attendance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="class" />
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
          <h3 className="text-lg font-medium text-gray-900 mb-4">Student Performance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="average"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Average Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Homework and Upcoming Lessons */}
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
                <p className="text-sm text-gray-600 mb-2">{homework.class} - {homework.subject}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Due: {new Date(homework.dueDate).toLocaleDateString()}</span>
                  <span>{homework.submitted}/{homework.total} submitted</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(homework.submitted / homework.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Lessons */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Lessons</h3>
          <div className="space-y-4">
            {upcomingLessons.map((lesson) => (
              <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{lesson.topic}</h4>
                  <span className="text-sm text-gray-500">{lesson.class}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{lesson.subject}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <FiClock className="mr-1 h-4 w-4" />
                    {lesson.time}
                  </span>
                  <span className="flex items-center">
                    <FiBookOpen className="mr-1 h-4 w-4" />
                    {lesson.room}
                  </span>
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
            <FiCheckCircle className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Take Attendance</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiBookOpen className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Assign Homework</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiBarChart2 className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Enter Marks</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiMessageSquare className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Send Message</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard; 