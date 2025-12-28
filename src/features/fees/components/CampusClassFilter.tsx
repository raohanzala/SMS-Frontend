import { Building2, Book } from "lucide-react";
import FormRowVertical from "@/components/common/FormRowVerticle";
import EntitySelect from "@/components/common/EntitySelect";
import Card from "@/components/common/Card";

interface CampusClassFilterProps {
  selectedCampusId: string | null;
  selectedClassId: string | null;
  onCampusChange: (campusId: string | null) => void;
  onClassChange: (classId: string | null) => void;
}

const CampusClassFilter = ({
  selectedCampusId,
  selectedClassId,
  onCampusChange,
  onClassChange,
}: CampusClassFilterProps) => {
  return (
    <Card>
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
            label="Class"
            name="class"
            icon={<Book className="inline w-4 h-4" />}
          >
            <EntitySelect
              entity="class"
              value={selectedClassId}
              onChange={(value) =>
                onClassChange(Array.isArray(value) ? value[0] || null : value)
              }
              placeholder="Select class (optional)"
            />
          </FormRowVertical>
        </div>
      </div>
    </Card>
  );
};

export default CampusClassFilter;

