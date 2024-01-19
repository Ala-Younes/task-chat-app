import { userType } from "../types/types";

import defaultAvatar from "../assets/defaultAvatar.png";
type UserHeaderProfileProps = {
  user?: userType;
  onClick?: () => void;
};

const UserHeaderProfile = ({ user, onClick }: UserHeaderProfileProps) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center space-x-4 cursor-pointer"
    >
      <div className="relative">
        <img
          src={defaultAvatar || user?.img}
          alt=""
          className="w-11 h-11 rounded-full ring-2 ring-white p-[2px]"
        />
        <span className="absolute w-4 h-4 border-2 border-gray-800 -top-1 left-7 rounded-full bg-green-400"></span>
      </div>
      <div className="hidden md:block">
        <div className="-mb-1">{user?.name}</div>
        <div className="text-sm text-gray-300">
          Joined in {user?.creationTime}
        </div>
      </div>
    </div>
  );
};

export default UserHeaderProfile;
