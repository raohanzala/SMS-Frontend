import React, { useState } from 'react';
import TableOperations from '../../../components/common/TableOperations';
import SubjectsTable from '../../../features/subjects/SubjectsTable';

const AdminClasses = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <TableOperations
        operationTitle="Subjects Management"
        operationDesc="Manage all subjects in the school"
        onClick={() => setIsShowModal(true)}
        buttonText="Add subject"
      />

      <SubjectsTable isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    </div>
  );
};

export default AdminClasses; 