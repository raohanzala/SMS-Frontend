import { Calendar, Building2 } from "lucide-react";
import Input from "@/components/common/Input";
import FormRowVertical from "@/components/common/FormRowVerticle";
import EntitySelect from "@/components/common/EntitySelect";

interface CampusDateFilterProps {
  selectedCampusId: string | null;
  selectedDate: string;
  onCampusChange: (campusId: string | null) => void;
  onDateChange: (date: string) => void;
}

const CampusDateFilter = ({
  selectedCampusId,
  selectedDate,
  onCampusChange,
  onDateChange,
}: CampusDateFilterProps) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm p-4 mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 w-full sm:w-auto">
          <FormRowVertical
            label="Campus"
            name="campus"
            icon={<Building2 className="inline w-4 h-4" />}
          >
            <EntitySelect
              entity="campus"
              value={selectedCampusId}
              onChange={(value) =>
                onCampusChange(Array.isArray(value) ? value[0] || null : value)
              }
              placeholder="Select campus"
            />
          </FormRowVertical>
        </div>

        <div className="flex-1 w-full sm:w-auto">
          <FormRowVertical
            label="Date"
            name="date"
            icon={<Calendar className="inline w-4 h-4" />}
          >
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              max={today}
            />
          </FormRowVertical>
        </div>
      </div>
    </div>
  );
};

export default CampusDateFilter;

