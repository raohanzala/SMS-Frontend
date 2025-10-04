import SearchableSelect from "@/components/common/SearchableSelect";
import { getAllTeachers, getTeacherById } from "@/api/teachers";
import { getAllClasses, getClassById } from "@/api/classes";
import { getAllParents, getParentById } from "@/api/parents";

function EntitySelect({ entity, value, onChange, placeholder }) {

  const apiMap = {
    parent: {
      fetchList: async (search) => {
        const { data } = await getAllParents({ page: 1, limit: 10, search });
        return (
          data?.parents?.map((p) => ({
            value: p._id,
            label: `${p.name} (${p.email})`,
          })) || []
        );
      },
      fetchById: async (id) => {
        if (!id) return null;
        const { data } = await getParentById(id);
        return data ? { value: data._id, label: `${data.name} (${data.email})` } : null;
      },
    },

    class: {
      fetchList: async (search) => {
        const { data } = await getAllClasses({ page: 1, limit: 10, search });
        return (
          data?.classes?.map((c) => ({
            value: c._id,
            label: c.name,
          })) || []
        );
      },
      fetchById: async (id) => {
        if (!id) return null;
        const { data } = await getClassById(id);
        return data ? { value: data._id, label: data.name } : null;
      },
    },

    teacher: {
      fetchList: async (search) => {
        const { data } = await getAllTeachers({ page: 1, limit: 10, search });
        return (
          data?.teachers?.map((t) => ({
            value: t._id,
            label: `${t.name} (${t.email})`,
          })) || []
        );
      },
      fetchById: async (id) => {
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
