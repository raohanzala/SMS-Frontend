export interface SaaSSettings {
  _id?: string;
  maintenanceMode: boolean;
  allowRegistrations: boolean;
  defaultTrialDays: number;
  supportEmail?: string;
  maxFileUploadMB: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateSaaSSettingsInput {
  maintenanceMode?: boolean;
  allowRegistrations?: boolean;
  defaultTrialDays?: number;
  supportEmail?: string;
  maxFileUploadMB?: number;
}

