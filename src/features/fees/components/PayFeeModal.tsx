import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/common/Input";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { StudentFee, PayFeeInput } from "../types/fee.types";
import { DollarSign } from "lucide-react";

interface PayFeeModalProps {
  fee: StudentFee | null;
  onClose: () => void;
  onSubmit: (data: PayFeeInput) => void;
  isSubmitting: boolean;
}

const PayFeeModal = ({
  fee,
  onClose,
  onSubmit,
  isSubmitting,
}: PayFeeModalProps) => {
  if (!fee) return null;

  const remainingAmount = fee.amount - fee.paidAmount;

  const validationSchema = Yup.object({
    paidAmount: Yup.number()
      .required("Payment amount is required")
      .min(0.01, "Payment amount must be greater than 0")
      .max(remainingAmount, `Payment amount cannot exceed remaining amount (${remainingAmount.toLocaleString()} PKR)`),
  });

  const formik = useFormik({
    initialValues: {
      paidAmount: remainingAmount,
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        paidAmount: values.paidAmount,
      });
    },
  });

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Record Payment"
    >
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Total Amount:</span>
            <span className="ml-2 font-semibold">{fee.amount.toLocaleString()} PKR</span>
          </div>
          <div>
            <span className="text-gray-600">Paid Amount:</span>
            <span className="ml-2 font-semibold">{fee.paidAmount.toLocaleString()} PKR</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-600">Remaining Amount:</span>
            <span className="ml-2 font-semibold text-red-600">
              {remainingAmount.toLocaleString()} PKR
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormRowVertical
          label="Payment Amount (PKR)"
          name="paidAmount"
          error={formik.errors.paidAmount}
          required
          icon={<DollarSign className="inline w-4 h-4" />}
          helperText={`Maximum: ${remainingAmount.toLocaleString()} PKR`}
        >
          <Input
            type="number"
            name="paidAmount"
            value={formik.values.paidAmount}
            onChange={(e) => formik.setFieldValue("paidAmount", parseFloat(e.target.value) || 0)}
            onBlur={formik.handleBlur}
            placeholder="Enter payment amount"
            disabled={isSubmitting}
            min="0.01"
            max={remainingAmount}
            step="0.01"
          />
        </FormRowVertical>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Record Payment
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PayFeeModal;

