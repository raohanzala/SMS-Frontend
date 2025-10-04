import { FiEdit } from "react-icons/fi";
import Tooltip from "@/components/common/Tooltip";

const EditButton = ({ onClick }) => {
  return (
    <Tooltip text="Edit">
      <button
        onClick={onClick}
        className="p-1 text-green-600 hover:text-green-900 transition-colors"
      >
        <FiEdit className="h-4 w-4" />
      </button>
    </Tooltip>
  );
};

export default EditButton;
