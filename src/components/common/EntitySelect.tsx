import { getAllParentsApi, getParentByIdApi } from "@/api/parents";
import SearchableSelect from "./SearchableSelect";
import { getClassByIdApi, getClassesApi } from "@/api/classes";
import { getAllTeachersApi, getTeacherByIdApi } from "@/api/teachers";
import { getAllStudentsApi, getStudentByIdApi } from "@/api/students";
import { getSessionsApi, getSessionByIdApi } from "@/api/sessions";
import { getAllCampusesApi, getCampusByIdApi } from "@/api/campuses";
import { useCallback } from "react";

type EntityType = "parent" | "class" | "teacher" | "student" | "session" | "campus" | "static";

interface Option {
  value: string;
  label: string;
}

interface EntitySelectProps {
  entity: EntityType;
  value: string | string[] | null;
  onChange: (value: string | string[] | null) => void;
  placeholder?: string;
  isMulti?: boolean;
  staticOptions?: Option[];
  isDisabled?: boolean;
}

function EntitySelect({
  entity = "static",
  value,
  onChange,
  placeholder,
  isMulti = false,
  staticOptions = [],
  isDisabled = false,
}: EntitySelectProps) {
  const apiMap = {
    parent: {
      fetchList: async (search: string): Promise<Option[]> => {
        const { data } = await getAllParentsApi({ page: 1, limit: 10, search });
        return (
          data?.parents?.map((p: any) => ({
            value: p._id,
            label: `${p.name} (${p.email})`,
          })) || []
        );
      },
      fetchById: async (id: string): Promise<Option | null> => {
        if (!id) return null;
        const { data } = await getParentByIdApi(id);
        return data
          ? { value: data._id, label: `${data.name} (${data.email})` }
          : null;
      },
    },

    class: {
      fetchList: async (search: string): Promise<Option[]> => {
        const { data } = await getClassesApi({ page: 1, limit: 10, search });
        return (
          data?.classes?.map((c: any) => ({
            value: c._id,
            label: c.name,
          })) || []
        );
      },
      fetchById: async (id: string): Promise<Option | null> => {
        if (!id) return null;
        const { data } = await getClassByIdApi(id);
        return data ? { value: data._id, label: data.name } : null;
      },
    },

    teacher: {
      fetchList: async (search: string): Promise<Option[]> => {
        const { data } = await getAllTeachersApi({
          page: 1,
          limit: 10,
          search,
        });
        return (
          data?.teachers?.map((t: any) => ({
            value: t._id,
            label: `${t.name} (${t.education})`,
          })) || []
        );
      },
      fetchById: async (id: string): Promise<Option | null> => {
        if (!id) return null;
        const { data } = await getTeacherByIdApi(id);
        return data
          ? {
              value: data.teacher._id,
              label: `${data.teacher.name} (${data.teacher.education})`,
            }
          : null;
      },
    },
    student: {
      fetchList: async (search: string): Promise<Option[]> => {
        const { data } = await getAllStudentsApi({
          page: 1,
          limit: 10,
          search,
        });
        return (
          data?.students?.map((s: any) => ({
            value: s._id,
            label: `${s.name}${s.rollNumber ? ` (${s.rollNumber})` : ""}${
              s.email ? ` - ${s.email}` : ""
            }`,
          })) || []
        );
      },
      fetchById: async (id: string): Promise<Option | null> => {
        if (!id) return null;
        const { data } = await getStudentByIdApi(id);
        return data
          ? {
              value: data._id,
              label: `${data.name}${
                data.rollNumber ? ` (${data.rollNumber})` : ""
              }${data.email ? ` - ${data.email}` : ""}`,
            }
          : null;
      },
    },
    session: {
      fetchList: async (search: string): Promise<Option[]> => {
        const { data } = await getSessionsApi({ page: 1, limit: 10, search });
        return (
          data?.sessions?.map((s: any) => ({
            value: s._id,
            label: s.name,
          })) || []
        );
      },
      fetchById: async (id: string): Promise<Option | null> => {
        if (!id) return null;
        const { data } = await getSessionByIdApi(id);
        return data?.data
          ? { value: data.data._id, label: data.data.name }
          : null;
      },
    },
    campus: {
      fetchList: async (search: string): Promise<Option[]> => {
        const response = await getAllCampusesApi();
        const campuses = response.data || [];
        return (
          campuses
            .filter((c) => 
              !search || 
              c.name.toLowerCase().includes(search.toLowerCase()) ||
              c.code.toLowerCase().includes(search.toLowerCase())
            )
            .map((c) => ({
              value: c._id,
              label: `${c.name} (${c.code})`,
            })) || []
        );
      },
      fetchById: async (id: string): Promise<Option | null> => {
        if (!id) return null;
        const response = await getCampusByIdApi(id);
        return response.data
          ? { value: response.data._id, label: `${response.data.name} (${response.data.code})` }
          : null;
      },
    },
  };

  const getApiFunctions = () => {
    if (entity === "static") {
      return {
        fetchList: async (search: string) => {
          if (!search) return staticOptions;
          return staticOptions.filter((option) =>
            option.label.toLowerCase().includes(search.toLowerCase())
          );
        },
        fetchById: async (id: string) => {
          return staticOptions.find((option) => option.value === id) || null;
        },
      };
    }
    return apiMap[entity as keyof typeof apiMap] || { 
      fetchList: async () => [], 
      fetchById: async () => null 
    };
  };

  const { fetchList, fetchById } = getApiFunctions();
  
  const memoFetchList = useCallback(fetchList, [entity, staticOptions]);
  const memoFetchById = useCallback(fetchById, [entity, staticOptions]);

  return (
    <SearchableSelect
      value={value}
      isMulti={isMulti}
      onChange={onChange}
      fetchOptions={memoFetchList}
      fetchById={memoFetchById}
      placeholder={placeholder || (entity === "static" ? "Select..." : `Search ${entity}...`)}
      isDisabled={isDisabled}
      forceRefreshKey={entity === "static" ? staticOptions.length : undefined}
    />
  );
}

export default EntitySelect;
