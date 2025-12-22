import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
}

export default function Modal({ 
  isOpen, 
  title, 
  onClose, 
  children, 
  footer, 
  size = "md",
  showCloseButton = true,
  closeOnBackdrop = true
}: ModalProps) {
  const ref = useOutsideClick(closeOnBackdrop ? onClose : () => {});

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses: Record<ModalSize, string> = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-7xl",
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        className={`relative z-50 w-full ${sizeClasses[size]} bg-bg-main rounded-2xl shadow-2xl border border-border transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            {title && (
              <h3 
                id="modal-title"
                className="text-xl font-semibold text-text-primary"
              >
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="ml-auto p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(100vh-12rem)] px-6 py-6 scrollbar-hide">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-border bg-bg-secondary px-6 py-4 rounded-b-2xl">
            <div className="flex justify-end gap-3">
              {footer}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

