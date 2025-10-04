import React from 'react';
import { FormikProvider, useFormik } from 'formik';
import FormRowVertical from '@/components/common/FormRowVerticle';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

import { useCreateAttendance } from './useCreateAttendance';
import { useStudents } from '../students/useStudents';
import { useClasses } from '../classes/useClasses';
// import { useSessions } from '../sessions/useSessions';

function CreateAttendanceForm({ onClose }) {
  const { createAttendance, isCreating } = useCreateAttendance();
  const { students } = useStudents();
  const { classes } = useClasses();
  // const { sessions } = useSessions();

  const formik = useFormik({
    initialValues: {
      student: '',
      classId: '',
      sessionId: '',
      date: '',
      status: 'Present',
    },
    onSubmit: async (values) => {
      createAttendance(values, {
        onSuccess: () => onClose?.(),
      });
    },
  });

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
        className="space-y-4"
      >
        {/* Student */}
        <FormRowVertical label="Student" name="student">
          <select
            id="student"
            name="student"
            className="block w-full px-4 py-2 border rounded-lg"
            {...formik.getFieldProps('student')}
          >
            <option value="">Select Student</option>
            {students?.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        </FormRowVertical>

        {/* Class */}
        <FormRowVertical label="Class" name="classId">
          <select
            id="classId"
            name="classId"
            className="block w-full px-4 py-2 border rounded-lg"
            {...formik.getFieldProps('classId')}
          >
            <option value="">Select Class</option>
            {classes?.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
        </FormRowVertical>

        {/* Session */}
        <FormRowVertical label="Session" name="sessionId">
          <select
            id="sessionId"
            name="sessionId"
            className="block w-full px-4 py-2 border rounded-lg"
            {...formik.getFieldProps('sessionId')}
          >
            <option value="">Select Session</option>
            {/* {sessions?.map((session) => (
              <option key={session._id} value={session._id}>
                {session.name}
              </option>
            ))} */}
          </select>
        </FormRowVertical>

        {/* Date */}
        <FormRowVertical label="Date" name="date">
          <Input
            type="date"
            id="date"
            name="date"
            {...formik.getFieldProps('date')}
          />
        </FormRowVertical>

        {/* Status */}
        <FormRowVertical label="Status" name="status">
          <select
            id="status"
            name="status"
            className="block w-full px-4 py-2 border rounded-lg"
            {...formik.getFieldProps('status')}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
          </select>
        </FormRowVertical>

        {/* Submit */}
        <div>
          <Button fullWidth type="submit" disabled={formik.isSubmitting} loading={isCreating}>
            Mark Attendance
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
}

export default CreateAttendanceForm;
