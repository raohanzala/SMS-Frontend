import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";

function SearchableSelect({
  value,
  onChange,
  fetchOptions,
  fetchById,
  placeholder = "Search...",
  isClearable = true,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

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

      // otherwise fetch by id
      const option = await fetchById(value);
      if (option) setSelectedOption(option);
    };

    syncOption();
  }, [value, fetchById]);

  const handleChange = (option) => {
    setSelectedOption(option);
    onChange(option?.value || null); // only pass back ID (or null)
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions // will call fetchOptions("") on mount
      isClearable={isClearable}
      loadOptions={(inputValue) => fetchOptions(inputValue || "")}
      value={selectedOption}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}

export default SearchableSelect;
