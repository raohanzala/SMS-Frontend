import axiosInstance from "./axiosInstance";

export const getClassesApi = async (params = {}) => {
  const res = await axiosInstance.get(`/classes`, { params });
  return res.data;
};

export const getClassByIdApi = async (classId: string) => {
  const { data } = await axiosInstance.get(`/classes/${classId}`);
  return data;
};

export const addClassApi = async ({addClassInput}: {addClassInput: any}) => {
  const res = await axiosInstance.post(`/classes`, addClassInput);
  return res.data;
};

export const updateClassApi = async ({ classId, updateClassInput }: { classId: string, updateClassInput: any }) => {
  const res = await axiosInstance.put(`/classes/${classId}`, updateClassInput);
  return res.data;
};

export const deleteClassApi = async (classId: string) => {
  const res = await axiosInstance.delete(`/classes/${classId}`);
  return res.data;
};

export const bulkDeleteClassesApi = async (classIds: string[]) => {
  const res = await axiosInstance.delete(`/classes/bulk`, {
    data: { classIds },
  });
  return res.data;
};

export const assignTeacherToClassApi = async ({ classId, teacherId }: { classId: string, teacherId: string }) => {
  const res = await axiosInstance.patch(`/classes/${classId}/assign-teacher`, { teacherId });
  return res.data;
};
