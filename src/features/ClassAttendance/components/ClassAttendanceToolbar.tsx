import { FormikProvider, useFormik } from "formik";
import Button from "@/components/common/Button";
import FormRowVertical from "@/components/common/FormRowVerticle";
import Input from "@/components/common/Input";
import EntitySelect from "@/components/common/EntitySelect";
import { ClassAttendanceToolbarProps } from "../types/attendance-components.types";

const ClassAttendanceToolbar = ({
  onFilterChange,
  selectedClassId,
  selectedDate,
}: ClassAttendanceToolbarProps) => {
  const formik = useFormik({
    initialValues: {
      classId: selectedClassId || "",
      date: selectedDate || new Date().toISOString().split("T")[0],
    },
    onSubmit: (values) => {
      if (values.classId && values.date) {
        onFilterChange(values.classId, values.date);
      }
    },
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Class Attendance
        </h2>
        <p className="text-gray-500 text-sm">
          Select a class and date to view and mark attendance.
        </p>
      </div>

      <FormikProvider value={formik}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
          className="flex gap-4 items-end"
        >
          <div className="flex-1">
            <FormRowVertical label="Class" name="classId">
              <EntitySelect
                entity="class"
                value={formik.values.classId}
                onChange={(value) => formik.setFieldValue("classId", value || "")}
                placeholder="Select a class"
              />
            </FormRowVertical>
          </div>

          <div className="flex-1">
            <FormRowVertical label="Date" name="date">
              <Input
                type="date"
                {...formik.getFieldProps("date")}
                max={new Date().toISOString().split("T")[0]}
              />
            </FormRowVertical>
          </div>

          <div>
            <Button
              type="submit"
              disabled={!formik.values.classId || !formik.values.date}
            >
              Get Students
            </Button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};

export default ClassAttendanceToolbar;

