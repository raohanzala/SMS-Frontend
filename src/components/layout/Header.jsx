import { FiMenu, FiBell, FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

export default function Header({ setSidebarOpen, user }) {
  const dispatch = useDispatch();

  return (
    <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <FiMenu className="h-6 w-6" />
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1"></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
            <FiBell className="h-6 w-6" />
          </button>

          <div className="relative flex items-center space-x-3">
            {/* <img
              className="h-8 w-8 rounded-full"
              src={user?.u || 'https://via.placeholder.com/32'}
              alt="User Avatar"
            /> */}
            <div className="size-8 rounded-full flex justify-center items-center bg-primary text-white">
              {user.name.charAt(0)}
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <button
              onClick={() => dispatch(logout())}
              className="flex items-center text-gray-400 hover:text-gray-600"
            >
              <FiLogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
