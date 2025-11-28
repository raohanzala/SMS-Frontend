import { FiSearch } from "react-icons/fi";
import Button from "@/components/common/Button";
import EntitySelect from "@/components/common/EntitySelect";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Input from "@/components/common/Input";
import { FilterPanelProps } from "../../types/promotion-components.types";

const FilterPanel = ({
  selectedClassId,
  selectedSession,
  onClassChange,
  onSessionChange,
  onSearch,
  isLoading = false,
}: FilterPanelProps) => {
  // Generate session options (e.g., 2020-2021 to current year + 1)
  const currentYear = new Date().getFullYear();
  const sessionOptions = [];
  for (let year = 2020; year <= currentYear + 1; year++) {
    sessionOptions.push(`${year}-${year + 1}`);
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Students</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormRowVertical label="From Class" name="fromClass">
          <EntitySelect
            entity="class"
            value={selectedClassId}
            onChange={onClassChange}
            placeholder="Select class"
            isDisabled={isLoading}
          />
        </FormRowVertical>

        <FormRowVertical label="Session" name="session">
          <EntitySelect
            entity="static"
            staticOptions={sessionOptions.map((session) => ({
              value: session,
              label: session,
            }))}
            value={selectedSession}
            onChange={(session) => onSessionChange(session as string)}
            placeholder="Select session"
            isDisabled={isLoading}
          />
        </FormRowVertical>

        <div className="flex items-end">
          <Button
            onClick={onSearch}
            // loading={isLoading}
            // disabled={!selectedClassId || !selectedSession}
            startIcon={<FiSearch />}
            fullWidth
          >
            Search Students
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;

