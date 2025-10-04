import { getAllParents, getParentById } from "@/api/parents";
import SearchableSelect from "@/components/common/SearchableSelect";

function ParentSelect({ value, onChange }) {
  const fetchOptions = async (search) => {
    const { data } = await getAllParents({ page: 1, limit: 10, search });
    return (
      data?.parents?.map((p) => ({
        value: p._id,
        label: `${p.name} (${p.email})`,
      })) || []
    );
  };

  const fetchById = async (id) => {
    if (!id) return null;
    const { data } = await getParentById(id);
    return data
      ? { value: data._id, label: `${data.name} (${data.email})` }
      : null;
  };

  return (
    <SearchableSelect
      value={value}
      onChange={onChange}
      fetchOptions={fetchOptions}
      fetchById={fetchById}
      placeholder="Search parents..."
    />
  );
}

export default ParentSelect;
