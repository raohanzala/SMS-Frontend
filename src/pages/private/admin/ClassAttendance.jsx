import ClassAttendanceTable from "../../../features/ClassAttendance/ClassAttendanceTable";
import ClassAttendanceToolbar from "../../../features/ClassAttendance/ClassAttendanceToolbar";

const ClassAttendance = () => {

  return (
    <div className="space-y-6">
      <ClassAttendanceToolbar />
        {/* Attendance Table */}
        <ClassAttendanceTable />

        {/* Save Button */}
        {/* {students?.length > 0 && (
          <div className="flex justify-end mt-4">
            <Button type="button" onClick={handleSave}>
              Save Attendance
            </Button>
          </div>
        )} */}
    </div>
  );
};

export default ClassAttendance;
