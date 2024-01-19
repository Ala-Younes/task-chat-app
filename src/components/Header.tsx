type Props = {};
import { BsFillChatFill } from "react-icons/bs";
import logo from "../assets/logo.png";
import AddListBoard from "./AddListBoard";
import Icon from "./Icon";
import { FiList } from "react-icons/fi";

const Header = ({}: Props) => {
  return (
    <div className="flex flex-wrap z-10 sm:flex-row gap-5 items-center justify-between drop-shadow-md bg-gradient-to-r from-customBlue to-customPink px-5 py-5 md:py-2 text-white">
      <img
        className="w-[70px] drop-shadow-md cursor-pointer"
        src={logo}
        alt="logo"
      />
      <div className="flex flex-wrap flex-row-reverse md:flex-row items-center justify-center gap-5">
        <AddListBoard />
        <Icon IconName={BsFillChatFill} reduceOpacityOnHover={false} ping />
        <Icon IconName={FiList} reduceOpacityOnHover={false} />
      </div>
    </div>
  );
};

export default Header;
