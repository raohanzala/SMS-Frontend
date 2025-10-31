import PageToolbar from "@/components/common/PageToolbar";
import Button from "@/components/common/Button";
import FormRowVertical from "@/components/common/FormRowVerticle";
import EntitySelect from "@/components/common/EntitySelect";
import Input from "@/components/common/Input";
import { FormikProvider, useFormik } from "formik";
import { useSearchParams } from "react-router-dom";

function ClassAttendanceToolbar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const formik = useFormik({
    initialValues: {
      classId: searchParams.get("classId") || "",
      date: searchParams.get("date") || "",
    },
    onSubmit: (values) => {
      setSearchParams({
        classId: values.classId,
        date: values.date,
      });
    },
  });

  return (
    <PageToolbar>
      <div className="flex justify-between w-full bg-white p-6 rounded-xl">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Class Attendance
          </h2>
          <p className="text-gray-500 text-sm">
            Select a class and date to view and mark attendance.
          </p>
        </div>

        {/* Form Section */}
        <FormikProvider value={formik}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
            className="flex gap-5 "
          >
            {/* <div className="flex gap-2 "> */}
              <FormRowVertical label="Class" name="classId">
                <EntitySelect
                  entity="class"
                  value={formik.values.classId}
                  onChange={(classId) =>
                    formik.setFieldValue("classId", classId)
                  }
                />
              </FormRowVertical>

              <FormRowVertical label="Date" name="date">
                <Input type="date" {...formik.getFieldProps("date")} />
              </FormRowVertical>
            {/* </div> */}

            <Button
              type="submit"
              // disabled={}
            >
              Get Students
            </Button>
          </form>
        </FormikProvider>
      </div>
    </PageToolbar>
  );
}

export default ClassAttendanceToolbar;
