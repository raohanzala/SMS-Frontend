import { FiEye } from "react-icons/fi";
import Tooltip from "@/components/common/Tooltip";
import { useNavigate } from "react-router-dom";

const ViewButton = ({ navigateTo }) => {
  const navigate = useNavigate()
  return (
    <Tooltip text="View">
      <button
        onClick={() => navigate(navigateTo)}
        className="p-1 text-blue-600 hover:text-blue-900 transition-colors"
      >
        <FiEye className="h-4 w-4" />
      </button>
    </Tooltip >
  );
};

export default ViewButton;
