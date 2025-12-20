import axiosInstance from "./axiosInstance";

export interface CreateSchoolInput {
  name: string;
  code?: string;
}

export const createSchoolApi = async (schoolData: CreateSchoolInput) => {
  const { data } = await axiosInstance.post("/schools", schoolData);
  return data;
};

