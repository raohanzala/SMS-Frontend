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
      medium: "py-[10px]",
      large: "py-[12px]",
    };

  return (
    <div className="relative w-full">
      <input
        id={name}
        name={name}
        type={type === "password" && isPasswordVisible ? "text" : type}
        className={`w-full mt-1 text-sm px-4 py-3 border rounded-md ${sizes[size]}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      {type === "password" && (
        <div
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-700"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
        >
          {isPasswordVisible ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
        </div>
      )}
    </div>
  );
};


export default Input;

