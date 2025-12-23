import { Trash2 } from "lucide-react";
import Tooltip from "./Tooltip";

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <Tooltip text="Delete">
      <button
        onClick={onClick}
        className="p-1 text-red-600 hover:text-red-900 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </Tooltip>
  );
};

export default DeleteButton;

