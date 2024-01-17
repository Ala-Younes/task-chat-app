import { ButtonHTMLAttributes, MouseEvent } from "react";
import Spinner from "./Spinner";

type ButtonProps = {
  text?: string;
  className?: string;
  secondary?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  text = "Button",
  className = "",
  secondary = false,
  onClick,
  loading = false,
  ...rest
}: ButtonProps) => {
  const baseClasses =
    "flex justify-center items-center gap-3 py-2 px-9 rounded-full text-white border-2 border-white hover:opacity-80 transition-all hover:drop-shadow-lg";

  const secondaryClass = secondary ? "bg-customPink" : "bg-customBlue";
  const loadingClass = loading ? "cursor-wait" : "";

  return (
    <button
      className={`${baseClasses} ${secondaryClass} ${loadingClass} ${className}`}
      onClick={onClick}
      {...rest}
      disabled={loading}
    >
      {loading && <Spinner />}
      {text}
    </button>
  );
};

Button.defaultProps = {
  className: "",
};

export default Button;
