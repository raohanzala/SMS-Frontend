import { Suspense, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../common/Spinner";

export default function Layout({ navigation }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth)


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
      />

      {/* Desktop Sidebar */}
      <Sidebar navigation={navigation} role={user?.role} />

      {/* Main Content */}
      <div className="lg:pl-64">
        <Header
          setSidebarOpen={setSidebarOpen}
          user={user}
        />

        <Suspense fallback={<Spinner />}>
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </Suspense>
      </div>
    </div>
  );
}
