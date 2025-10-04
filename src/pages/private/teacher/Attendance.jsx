import React, { useState } from 'react'
import AttendanceTable from '@/features/attendance/AttendanceTable'
import TableOperations from '@/components/common/TableOperations'

function Attendance() {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <div className='space-y-6'>
      <TableOperations
        operationTitle="Attendance Management"
        operationDesc="Manage all attendance in the school"
        onClick={() => setIsShowModal(true)}
        buttonText="Add Attendance"
      />

      <AttendanceTable isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    </div>
  )
}

export default Attendance