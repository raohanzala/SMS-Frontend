import { FiAlertTriangle } from "react-icons/fi";

export default function ErrorMessage({ message = "Something went wrong", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 bg-red-50 border border-red-200 rounded-lg text-center">
      <FiAlertTriangle className="w-10 h-10 text-red-500 mb-3" />
      <h3 className="text-lg font-medium text-red-700">{message}</h3>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-600 text-white text-sm rounded-lg shadow hover:bg-red-700 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
}
