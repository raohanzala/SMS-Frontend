import { useState } from 'react';
import TeachersTable from '@/features/teachers/TeachersTable';
import TeachersToolbar from '@/features/teachers/TeachersToolbar';

const AdminTeachers = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <TeachersToolbar onClick={() => setIsShowModal(true)} />

      {/* Teachers Table */}
      <TeachersTable isShowModal={isShowModal} setIsShowModal={setIsShowModal} />

    </div>
  );
};

export default AdminTeachers;