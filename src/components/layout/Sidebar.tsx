import { useState, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar({ navigation, role }) {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  // Auto-open dropdown on page load if current path is inside its children
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

  const toggleMenu = (name) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:z-30">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
        {/* Header */}
        <div className="flex h-16 items-center justify-center px-4 border-b border-gray-200 bg-gray-50">
          <h1 className="text-lg font-semibold text-gray-800 text-center">
            {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Portal` : "Portal"}
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
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

              // Dropdown items
              if (item.children) {
                const isOpen = openMenu === item.name;

                return (
                  <div key={item.name}>
                    <button
                      type="button"
                      onClick={() => toggleMenu(item.name)}
                      className={`group flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-gray-100 text-gray-900 font-semibold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={`mr-3 h-5 w-5 transition-colors ${
                            isActive
                              ? "text-gray-900"
                              : "text-gray-400 group-hover:text-gray-600"
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      <FiChevronRight
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? "rotate-90" : ""
                        } ${
                          isActive ? "text-gray-700" : "text-gray-400"
                        }`}
                      />
                    </button>

                    {/* Dropdown children */}
                    <div
                      className={`mt-1 ml-4 space-y-1 overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.children.map((child) => {
                        const isChildActive = location.pathname.startsWith(child.href);
                        return (
                          <NavLink
                            key={child.name}
                            to={child.href}
                            className={`block px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                              isChildActive
                                ? "bg-gray-100 text-gray-900 font-semibold border-l-2 border-gray-400"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            {child.name}
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // Regular nav items
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative ${
                    isActive
                      ? "bg-gray-100 text-primary font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                  )}
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} School Management
          </div>
        </div>
      </div>
    </div>
  );
}
// import { useEffect, useState } from "react";
// import { useLocation, NavLink } from "react-router-dom";
// import { FiChevronDown, FiChevronRight } from "react-icons/fi";

// export default function Sidebar({ navigation, role }) {
//   const location = useLocation();
//   const [openMenu, setOpenMenu] = useState(null);

//   // ✅ Auto-open dropdown on page load if current path is inside its children
//   useEffect(() => {
//     const match = navigation.find((item) =>
//       item.children?.some((child) =>
//         location.pathname.startsWith(child.href)
//       )
//     );
//     if (match) {
//       setOpenMenu(match.name);
//     }
//   }, [location.pathname, navigation]);

//   const toggleMenu = (name) => {
//     setOpenMenu((prev) => (prev === name ? null : name));
//   };

//   console.log("navigation:", navigation);

//   return (
//     <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
//       <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
//         <div className="flex h-16 items-center justify-center px-4">
//           <h1 className="text-xl font-bold text-gray-900 uppercase text-center">
//             {role} Portal
//           </h1>
//         </div>

//         <nav className="flex-1 space-y-1 px-2 py-4">
//           {navigation.map((item) => {
//             // ✅ Determine active state safely
//             let isActive = false;
//             if (item.href) {
//               isActive = location.pathname.startsWith(item.href);
//             }
//             if (item.children) {
//               isActive = item.children.some((child) =>
//                 location.pathname.startsWith(child.href)
//               );
//             }

//             // ✅ Dropdown items
//             if (item.children) {
//               const isOpen = openMenu === item.name;

//               return (
//                 <div key={item.name}>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       console.log("Clicked menu:", item.name);
//                       toggleMenu(item.name)
//                     }}
//                     className={`group flex w-full items-center justify-between px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive
//                       ? "bg-primary text-white shadow-sm"
//                       : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                       }`}
//                   >
//                     <div className="flex items-center">
//                       <item.icon
//                         className={`mr-3 h-5 w-5 transition ${isActive
//                           ? "text-white"
//                           : "text-gray-400 group-hover:text-gray-700"
//                           }`}
//                       />
//                       {item.name}
//                     </div>

//                     {isOpen ? (
//                       <FiChevronDown
//                         className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-400"
//                           }`}
//                       />
//                     ) : (
//                       <FiChevronRight
//                         className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-400"
//                           }`}
//                       />
//                     )}
//                   </button>

//                   {isOpen && (
//                     <div className="ml-8 mt-1 space-y-1">
//                       {item.children.map((child) => (
//                         <NavLink
//                           key={child.name}
//                           to={child.href}
//                           className={({ isActive }) =>
//                             `block px-2 py-1 text-sm rounded-md transition-colors ${isActive
//                               ? "bg-primary text-white"
//                               : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                             }`
//                           }
//                         >
//                           {child.name}
//                         </NavLink>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               );
//             }

//             // ✅ Regular nav items
//             return (
//               <NavLink
//                 key={item.name}
//                 to={item.href}
//                 className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive
//                   ? "bg-primary text-white shadow-sm"
//                   : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                   }`}
//               >
//                 <item.icon
//                   className={`mr-3 h-5 w-5 transition ${isActive
//                     ? "text-white"
//                     : "text-gray-400 group-hover:text-gray-700"
//                     }`}
//                 />
//                 {item.name}
//               </NavLink>
//             );
//           })}
//         </nav>
//       </div>
//     </div>
//   );
// }


