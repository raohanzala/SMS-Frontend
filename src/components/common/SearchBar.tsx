import { useEffect, useState, InputHTMLAttributes } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useDebounce } from "../../hooks/useDebounce";
import { useQueryParams } from "../../hooks/useQueryParams";

interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  placeholder?: string;
  fullWidth?: boolean;
  debounceDelay?: number;
  className?: string;
  paramKey?: string;
}

const SearchBar = ({
  placeholder = "Search...",
  fullWidth = false,
  debounceDelay = 500,
  className = "",
  paramKey = "query",
  ...props
}: SearchBarProps) => {
  const { getParam, setParam, removeParam } = useQueryParams();
  const initialValue = getParam(paramKey, "");

  const [searchValue, setSearchValue] = useState(initialValue);
  const debouncedValue = useDebounce(searchValue, debounceDelay);

  useEffect(() => {
    if (debouncedValue) {
      setParam(paramKey, debouncedValue);
    } else {
      removeParam(paramKey);
    }
  }, [debouncedValue]);

  return (
    <div
      className={`relative flex items-center border rounded-lg px-3 py-[10px] bg-white shadow-sm  focus-within:ring-primary/70 focus-within:ring-2 duration-150
        ${fullWidth ? "w-full" : "w-64"} ${className}`}
    >
      <FiSearch className="text-gray-400 mr-2" />

      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 outline-none border-none focus:outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
        {...props}
      />

      {searchValue && (
        <button
          type="button"
          onClick={() => setSearchValue("")}
          className="ml-2 text-gray-400 hover:text-gray-600"
        >
          <FiX />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

