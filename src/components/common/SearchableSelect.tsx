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
  forceRefreshKey?: number;
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
  forceRefreshKey,
}: SearchableSelectProps) {
  const [selected, setSelected] = useState<Option | Option[] | null>(null);

  // console.log("selected", selected, value);


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
        // console.log("option in single select", option);
        setSelected(option || null);
        return;
      }
    };

    loadInitialValue();
  }, [value, fetchById, isMulti]);

  const handleChange = (option: Option) => {
    setSelected(option);

    if (isMulti) {
      const ids = option?.map((o: Option) => o.value) || [];
      onChange(ids); // returns string[]
    } else {
      // console.log("option", option);
      onChange(option?.value || null); // returns string
    }
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: '#E5E7EB', // same as Input border
      color: '#1C1C1C', // text-text-primary
      minHeight: '40px',
      borderRadius: '0.5rem', // rounded-lg
      padding: '0 4px', // px-4
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#1E59FF',
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '20px',
      padding: '0 0px',
      color: '#9ca3af', // placeholder text-text-tertiary
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '0.5rem',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
      border: '0.5px solid #E5E7EB',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#E0F2FF' : 'white',
      color: '#1C1C1C',
      padding: '8px 12px',
      cursor: 'pointer',
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#E0F2FF',
      borderRadius: '0.25rem',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: '#2563EB',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: '#2563EB',
      ':hover': { backgroundColor: '#2563EB', color: 'white' },
    }),
  };

  return (
    <div className="mt-1">
      <AsyncSelect
      key={forceRefreshKey}
        cacheOptions={false}
        defaultOptions
        isMulti={isMulti}
        isClearable={isClearable}
        loadOptions={(inputValue) => fetchOptions(inputValue || "")}
        value={selected}
        onChange={handleChange}
        isDisabled={isDisabled}
        placeholder={placeholder}
        styles={customStyles}
      />
    </div>
  );
}


export default SearchableSelect;
