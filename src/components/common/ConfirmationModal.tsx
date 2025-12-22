import Modal from './Modal'
import Button from './Button';

type ModalType = 'warning' | 'danger' | 'info' | 'success';
type ModalSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  isOpen,
  onClose,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
  type = 'warning',
  confirmButtonVariant = 'primary',
  cancelButtonVariant = 'outline',
}: ConfirmationModalProps) => {
  if (!isOpen) return null;


  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose} >

      <div>
        <p className="py-4 text-gray-600">
          {message}
        </p>
      </div>

      <div className="pt-3 rounded-b-lg flex items-center justify-between gap-3">
        <Button
          variant={cancelButtonVariant}
          onClick={() => {
            if (onCancel) onCancel();
            onClose();
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

