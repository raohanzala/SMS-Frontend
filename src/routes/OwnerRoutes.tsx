// src/routes/OwnerRoutes.jsx
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "@/features/dashboard/admin/pages/AdminDashboard";
import StudentsPage from "@/features/students/pages/StudentsPage";
import CampusesPage from "@/features/campuses/pages/CampusesPage";
import Layout from "@/components/layout/Layout";
import { adminNav } from "@/utils/navigationConfig";

const OwnerRoutes = () => (
  <Routes>
    <Route element={<Layout navigation={adminNav} />}>
      <Route index element={<AdminDashboard />} />
      <Route path="students" element={<StudentsPage />} />
      <Route path="settings/campuses" element={<CampusesPage />} />
    </Route>
  </Routes>
);

export default OwnerRoutes;
