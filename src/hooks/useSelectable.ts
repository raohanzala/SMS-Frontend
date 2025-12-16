import { useState, useCallback, useMemo } from "react";

// T must have _id property
export function useSelectable<T extends { _id: string }>(data: T[]) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // Toggle one item
  const handleToggleSelect = useCallback((id: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  }, []);

  // Select all
  const handleSelectAll = useCallback(() => {
    setSelectedItems(new Set(data.map(item => item._id)));
  }, [data]);

  // Deselect all
  const handleDeselectAll = useCallback(() => {
    setSelectedItems(new Set());
  }, []);

  // Derived states
  const allSelected = useMemo(() => data.length > 0 && data.every(item => selectedItems.has(item._id)), [data, selectedItems]);
  const someSelected = useMemo(() => data.some(item => selectedItems.has(item._id)), [data, selectedItems]);

  return {
    selectedItems,
    handleToggleSelect,
    handleSelectAll,
    handleDeselectAll,
    allSelected,
    someSelected,
    setSelectedItems,
  };
}
