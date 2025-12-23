import { Edit } from "lucide-react";
import Tooltip from "./Tooltip";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <Tooltip text="Edit">
      <button
        onClick={onClick}
        className="p-1 text-green-600 hover:text-green-900 transition-colors"
      >
        <Edit className="h-4 w-4" />
      </button>
    </Tooltip>
  );
};

export default EditButton;

