import { useState } from "react";
import TableOperations from "../../../components/common/TableOperations";
import StudentsTable from "../../../features/students/StudentsTable";

const AdminStudents = () => {
  const [isShowModal, setIsShowModal] = useState(false);


  return (
    <div className="space-y-6">
      {/* Header */}
      <TableOperations
        operationTitle="Students Management"
        operationDesc="Manage all students in the school"
        onClick={() => setIsShowModal(true)}
        buttonText="Add Student"
      />

      {/* Filters and Search */}


      {/* Students Table */}
      <StudentsTable isShowModal={isShowModal} setIsShowModal={setIsShowModal} />

    </div >
  );
};

export default AdminStudents;
