import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar({ navigation, role }) {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null)

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name)
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
        <div className="flex h-16 items-center justify-center px-4">
          <h1 className="text-xl font-bold text-gray-900 uppercase text-center">
            {role} Portal
          </h1>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            // ✅ Use "startsWith" instead of exact match
            let isActive = false;

            // Normal items
            if (item.href) {
              isActive = location.pathname.startsWith(item.href);
            }
            // Parent dropdown items
            if (item.children) {
              isActive = item.children.some((child) =>
                location.pathname.startsWith(child.href)
              );
            }

            if (item.children) {
              const isOpen = openMenu === item.name;

              return (
                <div key={item.name}>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`group flex w-full items-center justify-between px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    <div className="flex items-center">
                      <item.icon
                        className={`mr-3 h-5 w-5 transition ${isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-gray-700"
                          }`}
                      />
                      {item.name}
                    </div>

                    {isOpen ? (
                      <FiChevronDown className="h-4 w-4" />
                    ) : (
                      <FiChevronUp className="h-4 w-4" />
                    )}
                  </button>

                  {/* Dropdown children */}
                  {isOpen && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.name}
                          to={child.href}
                          className={({ isActive }) =>
                            `block px-2 py-1 text-sm rounded-md ${isActive
                              ? "text-primary font-semibold"
                              : "text-gray-600 hover:bg-gray-50"
                            }`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 transition ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-700"
                    }`}
                />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
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


