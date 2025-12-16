import React, { useState } from "react";

interface SelectableCardProps {
  children: React.ReactNode;
  /**
   * When provided together with onToggleSelect, enables selectable behavior
   */
  isSelected?: boolean;
  /**
   * When provided, a checkbox will appear on hover/selected and this handler will be called on toggle
   */
  onToggleSelect?: () => void;
  /**
   * Optional click handler for the whole card (excluding the checkbox)
   */
  onClick?: () => void;
  /**
   * Extra class names to append to the base card styles
   */
  className?: string;
}

export const SelectableCard: React.FC<SelectableCardProps> = ({
  isSelected = false,
  onToggleSelect,
  children,
  onClick,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isSelectable = typeof onToggleSelect === "function";

	// console.log

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative bg-white rounded-xl shadow p-4 hover:shadow-md transition ${
        onClick ? "cursor-pointer" : ""
      } ${isSelectable && isSelected ? "ring-2 ring-indigo-500" : ""} ${className}`}
    >
      {isSelectable && (isHovered || isSelected) && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="absolute top-3 left-3 h-5 w-5 cursor-pointer text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          onClick={(e) => e.stopPropagation()}
        />
      )}

      {children}
    </div>
  );
};


