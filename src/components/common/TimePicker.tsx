import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ModernTimePicker({ value, onChange }: TimePickerProps) {
  const times = [];

  for (let hour = 1; hour <= 12; hour++) {
    for (let min of ["00", "15", "30", "45"]) {
      times.push(`${hour}:${min} AM`);
      times.push(`${hour}:${min} PM`);
    }
  }

  return (
    <Popover className="relative w-full">
      <PopoverButton className="w-full text-left border px-3 py-2 rounded-lg shadow-sm bg-white">
        {value || "Select time"}
      </PopoverButton>

      <PopoverPanel className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto bg-white border rounded-lg shadow-lg">
        {times.map((t) => (
          <div
            key={t}
            onClick={() => onChange(t)}
            className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
          >
            {t}
          </div>
        ))}
      </PopoverPanel>
    </Popover>
  );
}
