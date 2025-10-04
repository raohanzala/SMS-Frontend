import { useState } from "react";

export default function Tooltip({ children, text }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative flex items-center z-50"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className="absolute bottom-full mb-2 px-3 py-1.5 text-xs rounded 
          bg-gray-800/70 backdrop-blur-sm text-white whitespace-nowrap shadow 
          transition-opacity duration-200"
        >
          {text}
        </div>
      )}
    </div>
  );
}
