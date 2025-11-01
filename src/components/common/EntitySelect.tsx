import SearchableSelect from "./SearchableSelect";
import { getAllTeachers, getTeacherById } from "../../api/teachers";
import { getAllClasses, getClassById } from "../../api/classes";
import { getAllParents, getParentById } from "../../api/parents";

type EntityType = 'parent' | 'class' | 'teacher';

interface Option {
  value: string;
  label: string;
}

interface EntitySelectProps {
  entity: EntityType;
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
}

function EntitySelect({ entity, value, onChange, placeholder }: EntitySelectProps) {

  const apiMap = {
    parent: {
      fetchList: async (search: string): Promise<Option[]> => {
        const { data } = await getAllParents({ page: 1, limit: 10, search });
        return (
          data?.parents?.map((p: any) => ({
            value: p._id,
            label: `${p.name} (${p.email})`,
          })) || []
        );
      },
      fetchById: async (id: string): Promise<Option | null> => {
        if (!id) return null;
        const { data } = await getParentById(id);
        return data ? { value: data._id, label: `${data.name} (${data.email})` } : null;
      },
    },

    class: {
      fetchList: async (search: string): Promise<Option[]> => {
        const { data } = await getAllClasses({ page: 1, limit: 10, search });
        return (
          data?.classes?.map((c: any) => ({
            value: c._id,
            label: c.name,
          })) || []
        );
      },
      fetchById: async (id: string): Promise<Option | null> => {
        if (!id) return null;
        const { data } = await getClassById(id);
        return data ? { value: data._id, label: data.name } : null;
      },
    },

    teacher: {
      fetchList: async (search: string): Promise<Option[]> => {
        const { data } = await getAllTeachers({ page: 1, limit: 10, search });
        return (
          data?.teachers?.map((t: any) => ({
            value: t._id,
            label: `${t.name} (${t.email})`,
          })) || []
        );
      },
      fetchById: async (id: string): Promise<Option | null> => {
        if (!id) return null;
        const { data } = await getTeacherById(id);
        return data ? { value: data._id, label: `${data.name} (${data.email})` } : null;
      },
    },
  };

  const { fetchList, fetchById } = apiMap[entity];

  return (
    <SearchableSelect
      value={value}
      onChange={onChange}
      fetchOptions={fetchList}
      fetchById={fetchById}
      placeholder={placeholder || `Search ${entity}...`}
    />
  );
}

export default EntitySelect;

