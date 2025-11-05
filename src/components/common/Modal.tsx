import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import Tooltip from "./Tooltip";
import { useOutsideClick } from "@/hooks/useOutsideClick";

type ModalSize = "sm" | "md" | "lg" | "xl";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
}

export default function Modal({ isOpen, onClose, children, footer, size = "md" }: ModalProps) {
  const ref = useOutsideClick(onClose)

  if (!isOpen) return null;

  const sizeClasses: Record<ModalSize, string> = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return createPortal(
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 transition-all duration-300"
        data-modal="backdrop"
      />

      <div
        ref={ref}
        data-modal="container"
        onClick={(e) => e.stopPropagation()} // prevents click from reaching outer listener
        className={`fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 
        bg-white rounded-lg shadow-2xl max-h-[90%] w-[90%] ${sizeClasses[size]} transition-all duration-300 modal-container`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-md hover:bg-gray-100 transition"
        >
          <Tooltip text="Close">
            <HiXMark className="w-6 h-6 text-gray-500" />
          </Tooltip>
        </button>

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

