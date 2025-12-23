import { FiArrowRight, FiUsers } from "react-icons/fi";
import Button from "@/components/common/Button";
import EntitySelect from "@/components/common/EntitySelect";
import FormRowVertical from "@/components/common/FormRowVerticle";
import { PromotionPanelProps } from "../../types/promotion-components.types";

const PromotionPanel = ({
  selectedStudentIds,
  sourceClassIds,
  sourceSessionId,
  targetSessionId,
  targetClassIds,
  useAutoPromotion,
  onTargetSessionChange,
  onTargetClassesChange,
  onUseAutoPromotionChange,
  onPromote,
  isPromoting = false,
  disabled = false,
}: PromotionPanelProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <FiUsers className="text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Promote Students ({selectedStudentIds.length} selected)
        </h2>
      </div>

      <div className="space-y-4 mb-6">
        <FormRowVertical label="To Session" name="targetSession">
          <EntitySelect
            entity="session"
            value={targetSessionId}
            onChange={(sessionId) => onTargetSessionChange(sessionId as string | null)}
            placeholder="Select target session"
            isDisabled={isPromoting || disabled}
          />
        </FormRowVertical>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="useAutoPromotion"
            checked={useAutoPromotion}
            onChange={(e) => onUseAutoPromotionChange(e.target.checked)}
            disabled={isPromoting || disabled}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="useAutoPromotion" className="text-sm font-medium text-gray-700">
            Use automatic class promotion (promote to next class level)
          </label>
        </div>

        {!useAutoPromotion && (
          <FormRowVertical label="To Class(es)" name="targetClasses">
            <EntitySelect
              entity="class"
              value={targetClassIds}
              onChange={(classIds) => onTargetClassesChange(classIds as string[])}
              placeholder="Select one or more target classes"
              isMulti={true}
              isDisabled={isPromoting || disabled || useAutoPromotion}
            />
          </FormRowVertical>
        )}

        {useAutoPromotion && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              Students will be automatically promoted to the next class level based on their current class.
            </p>
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <Button
          onClick={onPromote}
          loading={isPromoting}
          disabled={disabled || selectedStudentIds.length === 0 || !targetSessionId || (!useAutoPromotion && targetClassIds.length === 0)}
          startIcon={<FiArrowRight />}
          fullWidth
          
        >
          Promote {selectedStudentIds.length} Student{selectedStudentIds.length !== 1 ? "s" : ""}
        </Button>
      </div>
    </div>
  );
};

export default PromotionPanel;
