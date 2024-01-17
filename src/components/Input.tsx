type InputProps = {
  name: string;
  value?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const Input = ({
  name,
  value,
  type = "text",
  onChange,
  className,
  onKeyDown,
  disabled,
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={`Enter ${name}`}
      disabled={disabled}
      className={`flex-1 placeholder-gray-300 bg-transparent px-3 py-2 border-2 border-gray-300 rounded-full ${className}`}
    />
  );
};

export default Input;
