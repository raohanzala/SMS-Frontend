import { useState } from "react";
import TableOperations from "../../../components/common/TableOperations";
import ParentsTable from "../../../features/Parents/ParentsTable";

const AdminParents = () => {
  const [isShowModal, setIsShowModal] = useState(false);


  return (
    <div className="space-y-6">
      {/* Header */}
      <TableOperations
        operationTitle="Parents Management"
        operationDesc="Manage all parents in the school"
        onClick={() => setIsShowModal(true)}
        buttonText="Add Parent"
      />

      {/* Filters and Search */}


      {/* Students Table */}
      <ParentsTable isShowModal={isShowModal} setIsShowModal={setIsShowModal} />

    </div >
  );
};

export default AdminParents;
