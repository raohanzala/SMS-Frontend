import React from "react";
import { APP_NAME } from "@/utils/constants";
import { useState, useEffect } from "react";
import { ChevronRight, X, ChevronLeft, Menu } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

interface NavigationItem {
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: Array<{ name: string; href: string }>;
}

interface SidebarProps {
  navigation: NavigationItem[];
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
}

export default function Sidebar({ 
  navigation, 
  sidebarOpen = false, 
  setSidebarOpen,
  isCollapsed = false,
  setIsCollapsed
}: SidebarProps) {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const match = navigation.find((item) =>
      item.children?.some((child) =>
        location.pathname.startsWith(child.href)
      )
    );
    if (match) {
      setOpenMenu(match.name);
    }
  }, [location.pathname, navigation]);

  const toggleMenu = (name: string) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen?.(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isCollapsed ? "w-20" : "w-72"
        } ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col flex-grow bg-[#000033] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent-purple/10 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col h-full">
          <div className={`${isCollapsed ? 'px-2' : 'px-6'} py-6 border-b border-sidebar-border/50`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center flex-col gap-3' : 'justify-between gap-3'}`}>
              {!isCollapsed ? (
                <div className="flex items-center gap-3 flex-1">
                  <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-2xl font-bold text-text-white">S</span>
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-xl font-sora font-bold text-text-white leading-tight truncate">
                      {APP_NAME}
                    </h1>
                    <p className="text-xs text-text-white/60 mt-0.5 font-sora truncate">Management Portal</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-text-white">S</span>
                  </div>
                </div>
              )}
              
              {/* Desktop Collapse Toggle & Mobile Close Button */}
              <div className={`flex items-center ${isCollapsed ? 'w-full justify-center' : 'gap-2'}`}>
                {/* Desktop Collapse Toggle - Always visible on desktop */}
                <button
                  onClick={() => setIsCollapsed?.(!isCollapsed)}
                  className="hidden lg:flex p-2 text-text-white/70 hover:text-text-white hover:bg-white/5 rounded-lg transition-colors"
                  aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {isCollapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </button>
                {/* Mobile Close Button */}
                <button
                  onClick={() => setSidebarOpen?.(false)}
                  className="lg:hidden p-2 text-text-white/70 hover:text-text-white hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="Close sidebar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
        </div>

        {/* Navigation */}
          <nav className="flex-1 px-3 py-6 overflow-y-auto scrollbar-hide">
            <div className="space-y-2">
            {navigation.map((item) => {
              // Determine active state
              let isActive = false;
              if (item.href) {
                isActive = location.pathname === item.href || 
                  (item.href !== "/admin/dashboard" && location.pathname.startsWith(item.href));
              }
              if (item.children) {
                isActive = item.children.some((child) =>
                  location.pathname.startsWith(child.href)
                );
              }

                // Dropdown items - Hide when collapsed
              if (item.children) {
                  if (isCollapsed) {
                    // Show only icon when collapsed
                    return (
                      <div key={item.name} className="relative group">
                        <button
                          type="button"
                          onClick={() => {
                            if (!isCollapsed) toggleMenu(item.name);
                          }}
                          className={`w-full flex items-center justify-center p-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-primary text-text-white shadow-lg shadow-primary/20"
                              : "text-text-white/80 hover:bg-white/5 hover:text-text-white"
                          }`}
                          title={item.name}
                        >
                          <item.icon
                            className={`h-5 w-5 transition-colors ${
                              isActive
                                ? "text-text-white"
                                : "text-text-white/70 group-hover:text-accent-purple-light"
                            }`}
                          />
                        </button>
                        {/* Tooltip for collapsed state */}
                        {isCollapsed && (
                          <div className="absolute left-full ml-2 px-3 py-2 bg-text-primary text-text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                            {item.name}
                            {item.children && item.children.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-text-white/20">
                                {item.children.map((child) => (
                                  <div key={child.name} className="text-xs py-1">
                                    {child.name}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }

                const isOpen = openMenu === item.name;

                return (
                    <div key={item.name} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => toggleMenu(item.name)}
                        className={`group flex w-full items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        isActive
                            ? "bg-primary text-text-white font-semibold shadow-lg shadow-primary/20"
                            : "text-text-white/80 hover:bg-white/5 hover:text-text-white"
                      }`}
                    >
                        <div className="flex items-center gap-3">
                        <item.icon
                            className={`h-5 w-5 transition-colors flex-shrink-0 ${
                            isActive
                                ? "text-text-white"
                                : "text-text-white/70 group-hover:text-accent-purple-light"
                          }`}
                        />
                          <span className="truncate">{item.name}</span>
                      </div>
                        <ChevronRight
                          className={`h-4 w-4 transition-all duration-200 flex-shrink-0 ${
                          isOpen ? "rotate-90" : ""
                        } ${
                            isActive ? "text-text-white" : "text-text-white/60 group-hover:text-accent-teal"
                        }`}
                      />
                    </button>

                    {/* Dropdown children */}
                    <div
                        className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.children.map((child) => {
                        const isChildActive = location.pathname.startsWith(child.href);
                        return (
                          <NavLink
                            key={child.name}
                            to={child.href}
                              onClick={() => setSidebarOpen?.(false)}
                              className={`block px-4 py-2.5 text-sm rounded-lg transition-all duration-200 relative ${
                              isChildActive
                                  ? "bg-primary/20 text-text-white font-semibold border-l-2 border-accent-purple-light pl-3"
                                  : "text-text-white/70 hover:bg-white/5 hover:text-accent-purple-light hover:pl-4"
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                {isChildActive && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-accent-purple-light"></div>
                                )}
                                <span className="truncate">{child.name}</span>
                              </span>
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // Regular nav items
                if (!item.href) return null;
                
                if (isCollapsed) {
                  // Show only icon when collapsed
                  return (
                    <div key={item.name} className="relative group">
                      <NavLink
                        to={item.href}
                        onClick={() => setSidebarOpen?.(false)}
                        className={`w-full flex items-center justify-center p-3 rounded-xl transition-all duration-200 relative ${
                          isActive
                            ? "bg-primary text-text-white shadow-lg shadow-primary/20"
                            : "text-text-white/80 hover:bg-white/5 hover:text-text-white"
                        }`}
                        title={item.name}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent-purple-light rounded-r-full"></div>
                        )}
                        <item.icon
                          className={`h-5 w-5 transition-colors ${
                            isActive
                              ? "text-text-white"
                              : "text-text-white/70 group-hover:text-accent-teal"
                          }`}
                        />
                        {isActive && (
                          <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-accent-purple-light"></div>
                        )}
                      </NavLink>
                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-3 py-2 bg-text-primary text-text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                          {item.name}
                        </div>
                      )}
                    </div>
                  );
                }
                
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                    onClick={() => setSidebarOpen?.(false)}
                    className={`group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative ${
                    isActive
                        ? "bg-primary text-text-white font-semibold shadow-lg shadow-primary/20"
                        : "text-text-white/80 hover:bg-white/5 hover:text-text-white"
                  }`}
                >
                  {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent-purple-light rounded-r-full"></div>
                  )}
                  <item.icon
                      className={`h-5 w-5 transition-colors flex-shrink-0 ${
                      isActive
                          ? "text-text-white"
                          : "text-text-white/70 group-hover:text-accent-teal"
                    }`}
                  />
                    <span className="truncate">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-accent-purple-light flex-shrink-0"></div>
                    )}
                </NavLink>
              );
            })}
          </div>
        </nav>

          {/* Footer - Matching login page style */}
          {!isCollapsed && (
            <div className="px-6 py-4 border-t border-sidebar-border/50">
              <div className="flex items-center gap-2 text-xs text-text-white/60">
                <div className="h-1.5 w-1.5 rounded-full bg-accent-purple-light"></div>
                <span>© {new Date().getFullYear()} {APP_NAME}</span>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
}
