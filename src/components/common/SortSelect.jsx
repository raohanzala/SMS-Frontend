import React from "react";
import { useSearchParams } from "react-router-dom";

const SortSelect = ({
  paramKey = "sort", // query param key
  options = [],
  placeholder = "Sort by...",
  className = "",
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(paramKey) || "";

  const handleChange = (newValue) => {
    const newParams = new URLSearchParams(searchParams);
    if (newValue) {
      newParams.set(paramKey, newValue);
    } else {
      newParams.delete(paramKey);
    }
    setSearchParams(newParams);
  };

  return (
    <select
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      className={`border rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-primary/50 ${className}`}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default SortSelect;
