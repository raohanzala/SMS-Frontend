import { FiSearch } from "react-icons/fi";
import Button from "@/components/common/Button";
import EntitySelect from "@/components/common/EntitySelect";
import FormRowVertical from "@/components/common/FormRowVerticle";
import { FilterPanelProps } from "../../types/promotion-components.types";

const FilterPanel = ({
  sourceSessionId,
  selectedClassIds,
  onSourceSessionChange,
  onClassesChange,
  onSearch,
  isLoading = false,
}: FilterPanelProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Source</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormRowVertical label="From Session" name="sourceSession">
          <EntitySelect
            entity="session"
            value={sourceSessionId}
            onChange={(sessionId) => onSourceSessionChange(sessionId as string | null)}
            placeholder="Select source session"
            isDisabled={isLoading}
          />
        </FormRowVertical>

        <FormRowVertical label="From Class(es)" name="sourceClasses">
          <EntitySelect
            entity="class"
            value={selectedClassIds}
            onChange={(classIds) => onClassesChange(classIds as string[])}
            placeholder="Select one or more classes"
            isMulti={true}
            isDisabled={isLoading || !sourceSessionId}
          />
        </FormRowVertical>

        <div className="flex items-end">
          <Button
            onClick={onSearch}
            disabled={!sourceSessionId || selectedClassIds.length === 0}
            startIcon={<FiSearch />}
            fullWidth
          >
            Load Students
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
