import { useSearchParams } from "react-router-dom";

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key, defaultValue = null) => {
    return searchParams.get(key) || defaultValue;
  };

  const setParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === null || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const removeParam = (key) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams);
  };

  return { getParam, setParam, removeParam, searchParams };
}
