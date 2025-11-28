import { FiArrowRight, FiUsers } from "react-icons/fi";
import Button from "@/components/common/Button";
import EntitySelect from "@/components/common/EntitySelect";
import FormRowVertical from "@/components/common/FormRowVerticle";
import { PromotionPanelProps } from "../../types/promotion-components.types";

const PromotionPanel = ({
  selectedStudentIds,
  fromClassId,
  fromSession,
  toClassId,
  toSession,
  onToClassChange,
  onToSessionChange,
  onPromote,
  isPromoting = false,
  disabled = false,
}: PromotionPanelProps) => {
  // Generate session options (e.g., 2020-2021 to current year + 1)
  const currentYear = new Date().getFullYear();
  const sessionOptions = [];
  for (let year = 2020; year <= currentYear + 1; year++) {
    sessionOptions.push(`${year}-${year + 1}`);
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <FiUsers className="text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Promote Students ({selectedStudentIds.length} selected)
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <FormRowVertical label="To Class" name="toClass">
          <EntitySelect
            entity="class"
            value={toClassId}
            onChange={onToClassChange}
            placeholder="Select new class"
            isDisabled={isPromoting || disabled}
          />
        </FormRowVertical>

        <FormRowVertical label="To Session" name="toSession">
          <EntitySelect
            entity="static"
            staticOptions={sessionOptions.map((session) => ({
              value: session,
              label: session,
            }))}
            value={toSession}
            onChange={(session) => onToSessionChange(session as string)}
            placeholder="Select new session"
            isDisabled={isPromoting || disabled}
          />
        </FormRowVertical>
      </div>

      <div className="border-t pt-4">
        <Button
          onClick={onPromote}
          loading={isPromoting}
          disabled={disabled || selectedStudentIds.length === 0}
          startIcon={<FiArrowRight />}
          fullWidth
          size="lg"
        >
          Promote {selectedStudentIds.length} Student{selectedStudentIds.length !== 1 ? "s" : ""}
        </Button>
      </div>
    </div>
  );
};

export default PromotionPanel;

