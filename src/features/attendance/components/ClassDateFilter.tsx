import { useEffect } from "react";
import EntitySelect from "@/components/common/EntitySelect";
import Input from "@/components/common/Input";
import { Calendar, Users } from "lucide-react";
import FormRowVertical from "@/components/common/FormRowVerticle";

interface ClassDateFilterProps {
  selectedClassId: string | null;
  selectedDate: string;
  onClassChange: (classId: string | null) => void;
  onDateChange: (date: string) => void;
}

const ClassDateFilter = ({
  selectedClassId,
  selectedDate,
  onClassChange,
  onDateChange,
}: ClassDateFilterProps) => {
  // Format today's date as YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  // Set default date to today if not set
  useEffect(() => {
    if (!selectedDate) {
      onDateChange(today);
    }
  }, [selectedDate, today, onDateChange]);

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm p-4 mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 w-full sm:w-auto">
          <FormRowVertical
            label="Class"
            name="class"
            icon={<Users className="inline w-4 h-4" />}
          >
            <EntitySelect
              entity="class"
              value={selectedClassId}
              onChange={(value) =>
                onClassChange(Array.isArray(value) ? value[0] || null : value)
              }
              placeholder="Select class"
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

export default ClassDateFilter;
