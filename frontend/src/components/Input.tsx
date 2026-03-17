// src/components/Input.tsx
type Props = {
  placeholder: string;
  type?: string;
  onChange: (e: any) => void;
};

const Input = ({ placeholder, type = "text", onChange }: Props) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full border-b border-gray-300 p-3 outline-none focus:border-black transition mb-4"
    />
  );
};

export default Input;