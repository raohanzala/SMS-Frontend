import { useEffect } from "react";
import { FiGrid, FiList } from "react-icons/fi";
import Tooltip from "./Tooltip";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function ViewToggle() {
  const { getParam, setParam } = useQueryParams();
  const view = getParam("view");

  useEffect(() => {
    if (!view) setParam("view", "card");
  }, [view, setParam]);

  return (
    <div className="flex rounded-md shadow-sm border z-0">
      <Tooltip text="Switch to Table View">
        <button
          onClick={() => setParam("view", "table")}
          className={`flex items-center gap-2 px-2 rounded-l py-1.5 text-sm font-medium transition-colors
          ${view === "table"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
        >
          <FiList className="w-4 h-4" />
        </button>
      </Tooltip>

      <Tooltip text="Switch to Card View">
        <button
          onClick={() => setParam("view", "card")}
          className={`flex items-center gap-2 rounded-r px-2 py-1.5 text-sm font-medium transition-colors
          ${view === "card"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
        >
          <FiGrid className="w-4 h-4" />
        </button>
      </Tooltip>
    </div>
  );
}

