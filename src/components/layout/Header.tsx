import { useState, useRef, useEffect } from "react";
import { Menu, Bell, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { usePageTitle } from "../../hooks/usePageTitle";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  user: {
    name?: string;
    email?: string;
    role?: string;
    profileImage?: string;
    profile?: {
      name?: string;
      role?: string;
    };
  } | null;
}

export default function Header({ setSidebarOpen, user }: HeaderProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pageTitle = usePageTitle();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    setShowLogoutModal(false);
    navigate("/login");
  };

  // Get user display name
  const userName = user?.name || user?.profile?.name || "User";
  const userRole = user?.role || user?.profile?.role || "";
  const userEmail = user?.email || "";
  const userImage = user?.profileImage;

  // Get user initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-border bg-bg-main px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        {/* Mobile Menu Button */}
        <button
          type="button"
          className="-m-2.5 p-2.5 text-text-secondary hover:text-text-primary lg:hidden transition-colors"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Page Title */}
        <div className="flex flex-1 items-center">
          <h1 className="text-xl font-sora font-semibold text-text-primary">{pageTitle}</h1>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-x-3 lg:gap-x-4">
          {/* Notifications */}
          <button
            type="button"
            className="relative p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-bg-secondary"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {/* Notification Badge */}
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-error opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-status-error"></span>
            </span>
          </button>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-bg-secondary transition-colors"
            >
              {/* Avatar */}
              {userImage ? (
                <img
                  src={userImage}
                  alt={userName}
                  className="h-9 w-9 rounded-full object-cover border-2 border-border"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-text-white text-sm font-semibold border-2 border-border">
                  {getInitials(userName)}
                </div>
              )}
              
              {/* User Info - Desktop Only */}
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-text-primary leading-tight">
                  {userName}
                </p>
                <p className="text-xs text-text-secondary capitalize">
                  {userRole}
                </p>
              </div>

              {/* Dropdown Icon */}
              <ChevronDown
                className={`hidden lg:block h-4 w-4 text-text-tertiary transition-transform ${
                  showUserMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-bg-main shadow-lg border border-border py-2 z-50 animate-in fade-in slide-in-from-top-2">
                {/* User Info Section */}
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-semibold text-text-primary">{userName}</p>
                  {userEmail && (
                    <p className="text-xs text-text-secondary mt-0.5 truncate">{userEmail}</p>
                  )}
                  <p className="text-xs text-text-tertiary capitalize mt-1">{userRole}</p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      // Navigate to profile page if exists
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>View Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      // Navigate to settings page if exists
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                </div>

                {/* Logout Section */}
                <div className="border-t border-border pt-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      setShowLogoutModal(true);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-status-error hover:bg-status-error/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Logout"
        message="Are you sure you want to logout? You will need to sign in again to access your account."
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleLogout}
        type="warning"
        confirmButtonVariant="danger"
      />
    </>
  );
}
