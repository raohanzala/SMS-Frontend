import { useSearchParams } from "react-router-dom";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterProps {
  paramKey: string;
  options?: FilterOption[];
  className?: string;
}

const Filter = ({
  paramKey,
  options = [],
  className = "",
}: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(paramKey) || "";

  const handleChange = (newValue: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (newValue) {
      newParams.set(paramKey, newValue);
    } else {
      newParams.delete(paramKey);
    }
    setSearchParams(newParams);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <select
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-primary/50"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;

