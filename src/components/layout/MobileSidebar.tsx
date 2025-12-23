import { X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

export default function MobileSidebar({ sidebarOpen, setSidebarOpen, navigation }) {
  const location = useLocation();

  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-75"
        onClick={() => setSidebarOpen(false)}
      />
      <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-gray-900">Parent Portal</h1>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation?.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
                  ? 'bg-orange-100 text-orange-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
