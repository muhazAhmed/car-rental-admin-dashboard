import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, useState, FC } from "react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  label?: string;
}

const PasswordInput: FC<PasswordInputProps> = ({
  value,
  onChange,
  id = "password",
  label = "Password",
  ...rest
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="pr-10"
        {...rest}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
        tabIndex={-1}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};

export default PasswordInput;
