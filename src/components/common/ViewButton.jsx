import { FiEye } from "react-icons/fi";
import Tooltip from "@/components/common/Tooltip";

const ViewButton = ({ onClick }) => {
  return (
    <Tooltip text="View">
      <button
        onClick={onClick}
        className="p-1 text-blue-600 hover:text-blue-900 transition-colors"
      >
        <FiEye className="h-4 w-4" />
      </button>
    </Tooltip>
  );
};

export default ViewButton;
