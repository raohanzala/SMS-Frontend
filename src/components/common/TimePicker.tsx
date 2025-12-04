import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

interface TimePickerProps {
  value: string; // stored as "HH:MM"
  onChange: (value: string) => void;
}

export default function ModernTimePicker({ value, onChange }: TimePickerProps) {
  // Convert 24-hr → 12-hr for display
  const formatDisplayTime = (time: string) => {
    if (!time) return "Select time";

    let [h, m] = time.split(":").map(Number);
    const suffix = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;

    return `${h}:${m.toString().padStart(2, "0")} ${suffix}`;
  };

  // Convert 12-hr → 24-hr
  const convertTo24Hour = (t: string) => {
    let [time, modifier] = t.split(" ");
    let [h, m] = time.split(":").map(Number);

    if (modifier === "PM" && h !== 12) h += 12;
    if (modifier === "AM" && h === 12) h = 0;

    return `${h.toString().padStart(2, "0")}:${m}`;
  };

  // Generate time list
  const displayTimes: string[] = [];

  for (let hour = 1; hour <= 12; hour++) {
    for (let min of ["00", "15", "30", "45"]) {
      displayTimes.push(`${hour}:${min} AM`);
      displayTimes.push(`${hour}:${min} PM`);
    }
  }

  return (
    <Popover className="relative w-full">
      <PopoverButton className="w-full text-left border px-3 py-2 rounded-lg shadow-sm bg-white hover:bg-gray-50">
        {formatDisplayTime(value)}
      </PopoverButton>

      <PopoverPanel className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto bg-white border rounded-lg shadow-lg">
        {displayTimes.map((t) => (
          <div
            key={t}
            onClick={() => onChange(convertTo24Hour(t))}
            className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
          >
            {t}
          </div>
        ))}
      </PopoverPanel>
    </Popover>
  );
}
