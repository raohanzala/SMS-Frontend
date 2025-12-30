import React, { Suspense, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Spinner from "../common/Spinner";

interface NavigationItem {
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: Array<{ name: string; href: string }>;
}

interface LayoutProps {
  navigation: NavigationItem[];
}

export default function Layout({ navigation }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);


  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      {/* Responsive Sidebar */}
      <Sidebar 
        navigation={navigation} 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
        <Header
          setSidebarOpen={setSidebarOpen}
        />

        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <Spinner />
          </div>
        }>
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
