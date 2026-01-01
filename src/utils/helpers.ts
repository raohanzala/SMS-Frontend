import { toast } from "sonner";

export const formatShortDate = (isoDate: string): string => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatLongDate = (isoDate: string): string => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export const formatDateTime = (isoDate: string): string => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const toastSuccess = (msg?: string) => {
  toast.success(msg || "Success");
};

export const toastError = (err?: Error & { response?: { data?: { message?: string } } }, fallback = "Something went wrong") => {
  const message =
    err?.response?.data?.message ||
    err?.message ||
    fallback;

  toast.error(message);
};
