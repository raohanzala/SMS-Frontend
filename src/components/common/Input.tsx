import { useState, InputHTMLAttributes } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

type InputSize = "medium" | "large";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  name?: string;
  size?: InputSize;
}

const Input = ({ name, type = "text", size = "medium", value, onChange, onBlur, ...props }: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const sizes: Record<InputSize, string> = {
      medium: "py-[10px] rounded-lg",
      large: "py-[12px] rounded-lg",
    };

  return (
    <div className="relative w-full">
      <input
        id={name}
        name={name}
        type={type === "password" && isPasswordVisible ? "text" : type}
        className={`w-full mt-1 text-sm px-4 py-3 border border-border bg-bg-main text-text-primary placeholder:text-text-tertiary focus:outline-none ${sizes[size]} focus:ring-1 focus:ring-primary`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      {type === "password" && (
        <div
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-text-tertiary hover:text-text-secondary"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
        >
          {isPasswordVisible ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
        </div>
      )}
    </div>
  );
};


export default Input;

