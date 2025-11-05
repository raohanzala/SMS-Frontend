import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  value: string | Option | null;
  onChange: (value: string | null) => void;
  fetchOptions: (search: string) => Promise<Option[]>;
  fetchById: (id: string) => Promise<Option | null>;
  placeholder?: string;
  isClearable?: boolean;
}

function SearchableSelect({
  value,
  onChange,
  fetchOptions,
  fetchById,
  placeholder = "Search...",
  isClearable = true,
}: SearchableSelectProps) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  useEffect(() => {
    const syncOption = async () => {
      if (!value) {
        setSelectedOption(null);
        return;
      }

      // if value is already a full option object
      if (typeof value === "object" && value.value && value.label) {
        setSelectedOption(value);
        return;
      }

      const option = await fetchById(value as string);
      if (option) setSelectedOption(option);
    };

    syncOption();
  }, [value, fetchById]);

  const handleChange = (option: Option | null) => {
    setSelectedOption(option);
    onChange(option?.value || null);
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      isClearable={isClearable}
      loadOptions={(inputValue) => fetchOptions(inputValue || "")}
      value={selectedOption}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}

export default SearchableSelect;

