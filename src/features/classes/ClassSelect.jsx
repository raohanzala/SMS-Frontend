import SearchableSelect from "@/components/common/SearchableSelect";
import { getAllClasses, getClassById } from "@/api/classes";

function ClassSelect({ value, onChange }) {
  const fetchOptions = async (search) => {
    const { data } = await getAllClasses({ page: 1, limit: 10, search });
    return (
      data?.classes?.map((c) => ({
        value: c._id,
        label: c.name,
      })) || []
    );
  };

  const fetchById = async (id) => {
    if (!id) return null;
    const { data } = await getClassById(id);
    return data ? { value: data._id, label: data.name } : null;
  };

  return (
    <SearchableSelect
      value={value}
      onChange={onChange}
      fetchOptions={fetchOptions}
      fetchById={fetchById}
      placeholder="Search classes..."
    />
  );
}

export default ClassSelect;
