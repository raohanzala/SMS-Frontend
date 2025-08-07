import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiBookOpen,
  FiCalendar,
  FiClipboard,
  FiDollarSign,
  FiFileText,
  FiBarChart2,
  FiBell,
  FiSettings,
} from 'react-icons/fi';
import { useSelector } from 'react-redux';
import Layout from './Layout';

const AdminLayout = () => {
  // const { user, logout } = useAuth();
  const { user } = useSelector((state) => state.auth)

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: FiHome },
    { name: 'Students', href: '/admin/students', icon: FiUsers },
    { name: 'Teachers', href: '/admin/teachers', icon: FiUserCheck },
    { name: 'Classes', href: '/admin/classes', icon: FiBookOpen },
    { name: 'Timetable', href: '/admin/timetable', icon: FiCalendar },
    { name: 'Attendance', href: '/admin/attendance', icon: FiClipboard },
    { name: 'Fees', href: '/admin/fees', icon: FiDollarSign },
    { name: 'Exams', href: '/admin/exams', icon: FiFileText },
    { name: 'Results', href: '/admin/results', icon: FiBarChart2 },
    { name: 'Noticeboard', href: '/admin/noticeboard', icon: FiBell },
    { name: 'Settings', href: '/admin/settings', icon: FiSettings },
  ];

  return (
    <Layout user={user} navigation={navigation} />
  );
};

export default AdminLayout; 