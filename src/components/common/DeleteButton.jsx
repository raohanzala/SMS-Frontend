import { FiTrash2 } from "react-icons/fi";
import Tooltip from "@/components/common/Tooltip";

const DeleteButton = ({ onClick }) => {
  return (
    <Tooltip text="Delete">
      <button
        onClick={onClick}
        className="p-1 text-red-600 hover:text-red-900 transition-colors"
      >
        <FiTrash2 className="h-4 w-4" />
      </button>
    </Tooltip>
  );
};

export default DeleteButton;
