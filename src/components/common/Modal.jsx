import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Tooltip from "./Tooltip";

export default function Modal({ isOpen, onClose, children, footer, size = "md" }) {
  const ref = useOutsideClick()

  if (!isOpen) return null;

  // ✅ Dynamically control width based on size prop
  const sizeClasses = {
    sm: "max-w-md", // small
    md: "max-w-lg", // default (existing modals unaffected)
    lg: "max-w-2xl", // medium-large
    xl: "max-w-4xl", // large (for tables like attendance)
  };

  return createPortal(
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 transition-all duration-300" />

      {/* Modal Box */}
      <div
        ref={ref}
        className={`fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 
        bg-white rounded-lg shadow-2xl max-h-[90%] w-[90%] ${sizeClasses[size]} transition-all duration-300`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-md hover:bg-gray-100 transition"
        >
          <Tooltip text="Close">
            <HiXMark className="w-6 h-6 text-gray-500" />
          </Tooltip>
        </button>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-6 py-8 scrollbar-hide min-h-[60vh]">
          {children}
        </div>
        {footer && (
          <div className="border-t bg-white bottom-0 left-0 right-0 px-6 py-4 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </>,
    document.body
  );
}
