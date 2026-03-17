// src/components/Button.tsx
type Props = {
  text: string;
  onClick: () => void;
};

const Button = ({ text, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-black text-white py-3 rounded-lg mt-4 hover:bg-gray-800 transition"
    >
      {text}
    </button>
  );
};

export default Button;