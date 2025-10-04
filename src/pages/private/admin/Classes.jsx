import React, { useState } from 'react';
import ClassesTable from '@/features/classes/ClassesTable';
import PageToolbar from '@/components/common/PageToolbar';

const AdminClasses = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <PageToolbar
        operationTitle="Classes Management"
        operationDesc="Manage all classes in the school"
        onClick={() => setIsShowModal(true)}
        buttonText="Add Class"
      />

      <ClassesTable isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    </div>
  );
};

export default AdminClasses; 