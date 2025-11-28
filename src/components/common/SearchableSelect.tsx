import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  value: string | string[] | Option | Option[] | null;
  onChange: (value: string | null) => void;
  fetchOptions: (search: string) => Promise<Option[]>;
  fetchById: (id: string) => Promise<Option | null>;
  placeholder?: string;
  isClearable?: boolean;
  isMulti?: boolean;
  isDisabled?: boolean;
}

function SearchableSelect({
  value,
  onChange,
  fetchOptions,
  fetchById,
  placeholder = "Search...",
  isClearable = true,
  isMulti = false,
  isDisabled = false,
}: SearchableSelectProps) {
  const [selected, setSelected] = useState<Option | Option[] | null>(null);

  console.log("selected", selected, value);


  // Load initial value(s)
  useEffect(() => {
    const loadInitialValue = async () => {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        setSelected(isMulti ? [] : null);
        return;
      }

      // MULTI SELECT
      if (isMulti && Array.isArray(value)) {
        const fetched = await Promise.all(value.map((id) => fetchById(id)));
        const validOptions = fetched.filter(Boolean) as Option[];
        setSelected(validOptions);
        return;
      }

      // SINGLE SELECT
      if (!isMulti && typeof value === "string") {
        const option = await fetchById(value);
        console.log("option in single select", option);
        setSelected(option || null);
        return;
      }
    };

    loadInitialValue();
  }, [value, fetchById, isMulti]);

  const handleChange = (option: any) => {
    setSelected(option);

    if (isMulti) {
      const ids = option?.map((o: Option) => o.value) || [];
      onChange(ids); // returns string[]
    } else {
      console.log("option", option);
      onChange(option?.value || null); // returns string
    }
  };

  return (
    <div className="mt-1">
      <AsyncSelect
        cacheOptions
        defaultOptions
        isMulti={isMulti}
        isClearable={isClearable}
        loadOptions={(inputValue) => fetchOptions(inputValue || "")}
        value={selected}
        onChange={handleChange}
        isDisabled={isDisabled}
        placeholder={placeholder}
      />
    </div>
  );
}


export default SearchableSelect;
