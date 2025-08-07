import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../../hooks/useOutsideClick";

export default function Modal({ isOpen, onClose, children }) {
  const ref = useOutsideClick()

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 transition-all duration-300" />

      {/* Modal Box */}
      <div
        ref={ref}
        className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 
        bg-white rounded-lg shadow-2xl p-8 w-[90%] max-w-lg transition-all duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-md hover:bg-gray-100 transition"
        >
          <HiXMark className="w-6 h-6 text-gray-500" />
        </button>

        {/* Content */}
        <div>{children}</div>
      </div>
    </>,
    document.body
  );
}
