import { IconType } from "react-icons";
import Spinner from "./Spinner";

type IconProps = {
  IconName: IconType;
  size?: number;
  className?: string;
  loading?: boolean;
  ping?: boolean;
  reduceOpacityOnHover?: boolean;
  onClick?: () => void;
};

function Icon({
  IconName,
  className,
  loading,
  onClick,
  ping,
  reduceOpacityOnHover = true,
  size = 20,
}: IconProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`relative p-3 rounded-full cursor-pointer transition-all hover:bg-customBlue ${
        reduceOpacityOnHover
          ? "hover:bg-opacity-30"
          : "bg-customBlue hover:bg-customPink text-white border-2 border-white hover:drop-shadow-lg"
      } ${loading && "cursor-wait"} ${className}`}
    >
      {loading ? <Spinner /> : <IconName size={size} />}

      {ping && (
        <>
          <span className="absolute -top-1 left-7 w-3 h-3 border-2 border-gray-800 rounded-full bg-customPink"></span>
          <span className="animate-ping absolute -top-1 left-7 w-3 h-3 border-gray-800 rounded-full bg-customPink"></span>
        </>
      )}
    </button>
  );
}

export default Icon;
