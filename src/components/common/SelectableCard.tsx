import React, { useState } from "react";

interface SelectableCardProps {
  children: React.ReactNode;
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onClick?: () => void;
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

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative bg-white rounded-xl shadow p-4 hover:shadow-md transition ${
        onClick ? "cursor-pointer" : ""
      } ${isSelectable && isSelected ? "ring-2 ring-primary" : ""} ${className}`}
    >
      {isSelectable && (isHovered || isSelected) && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="absolute top-3 left-3 h-5 w-5 cursor-pointer text-primary focus:ring-primary border-gray-300 rounded"
          onClick={(e) => e.stopPropagation()}
        />
      )}

      {children}
    </div>
  );
};


