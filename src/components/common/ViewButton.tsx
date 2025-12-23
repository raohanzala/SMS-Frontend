import { Eye } from "lucide-react";
import Tooltip from "./Tooltip";
import { useNavigate } from "react-router-dom";

interface ViewButtonProps {
  navigateTo: string;
}

const ViewButton = ({ navigateTo }: ViewButtonProps) => {
  const navigate = useNavigate()
  return (
    <Tooltip text="View">
      <button
        onClick={() => navigate(navigateTo)}
        className="p-1 text-blue-600 hover:text-blue-900 transition-colors"
      >
        <Eye className="h-4 w-4" />
      </button>
    </Tooltip >
  );
};

export default ViewButton;

