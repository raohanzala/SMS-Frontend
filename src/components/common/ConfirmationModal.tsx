import {
  FaExclamationTriangle,
  FaQuestionCircle,
  FaInfoCircle,
  FaCheckCircle
} from 'react-icons/fa'
import Modal from './Modal'
import Button from './Button';

type ModalType = 'warning' | 'danger' | 'info' | 'success';
type ModalSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';

interface ConfirmationModalProps {
  isStudentDeleteModalOpen: boolean;
  onStudentDeleteModalClose: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  type?: ModalType;
  size?: ModalSize;
  showIcon?: boolean;
  confirmButtonVariant?: ButtonVariant;
  cancelButtonVariant?: ButtonVariant;
  className?: string;
}

const ConfirmationModal = ({
  isStudentDeleteModalOpen,
  onStudentDeleteModalClose,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
  type = 'warning',
  size = 'md',
  showIcon = true,
  confirmButtonVariant = 'primary',
  cancelButtonVariant = 'outline',
  className = ''
}: ConfirmationModalProps) => {
  if (!isStudentDeleteModalOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <FaExclamationTriangle className="w-6 h-6 text-red-500" />;
      case 'info':
        return <FaInfoCircle className="w-6 h-6 text-blue-500" />;
      case 'success':
        return <FaCheckCircle className="w-6 h-6 text-green-500" />;
      default:
        return <FaQuestionCircle className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm';
      case 'lg':
        return 'max-w-lg';
      default:
        return 'max-w-md';
    }
  };

  return (
    <Modal isOpen={isStudentDeleteModalOpen} onClose={onStudentDeleteModalClose} className='p-3'>
      {/* Header */}
      <div className="pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {showIcon && getIcon()}
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div>
        <p className="py-4 text-gray-600">
          {message}
        </p>
      </div>

      {/* Footer */}
      <div className="pt-3 rounded-b-lg flex items-center justify-between gap-3">
        <Button
          variant={cancelButtonVariant}
          onClick={() => {
            if (onCancel) onCancel();
            onStudentDeleteModalClose();
          }}
          disabled={isLoading}
          loading={isLoading}
        >
          {cancelText}
        </Button>
        <Button
          variant={confirmButtonVariant}
          onClick={onConfirm}
          disabled={isLoading}
          className={type === 'danger' ? 'bg-red-600 hover:bg-red-700' : ''}
          loading={isLoading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmationModal;

