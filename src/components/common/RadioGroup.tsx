import React from "react";

interface RadioOption {
  label: string;
  value: string;
}

const radioOptions: Record<string, RadioOption[]> = {
  gender: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ],

  relation: [
    { label: "Father", value: "Father" },
    { label: "Mother", value: "Mother" },
    { label: "Guardian", value: "Guardian" },
  ],

  teacherLevel: [
    { label: "Level 1", value: "1" },
    { label: "Level 2", value: "2" },
    { label: "Level 3", value: "3" },
  ],

  status: [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ],
};

interface RadioGroupProps {
  label?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  const options: RadioOption[] | undefined = radioOptions[name];

  if (!options) {
    console.warn(`⚠ No radio options defined for "${name}"`);
    return null;
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="flex items-center gap-6">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="h-4 w-4"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
