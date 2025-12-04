import { Settings } from "./settings.types";

export interface CreateSettingsFormProps {
  settingsToEdit?: Settings | null;
  onClose?: () => void;
}

export interface ManageSettingsModalProps {
  isManageSettingsModalOpen: boolean;
  onManageSettingsModalClose: () => void;
  settingsToEdit?: Settings | null;
}

