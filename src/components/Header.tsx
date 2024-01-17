type Props = {};
import logo from "../assets/logo.png";
import Button from "./Button";

const Header = ({}: Props) => {
  return (
    <div className="flex flex-wrap z-10 sm:flex-row gap-5 items-center justify-between drop-shadow-md bg-gradient-to-r from-customBlue to-customPink px-5 py-5 md:py-2 text-white">
      <img
        className="w-[70px] drop-shadow-md cursor-pointer"
        src={logo}
        alt="logo"
      />
      <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">
        <Button text="Add New ListBoard" />
        {/* <div className="group relative">
          <div className="absolute pt-5 hidden group-hover:block w-full min-w-max">
            <ul className="w-full bg-white overflow-hidden rounded-md shadow-md text-gray-700 pt-1">
              <p className="hover:bg-gray-200 py-2 px-4 block cursor-pointer">
                Profile
              </p>
              <button
                className={`hover:bg-gray-200 w-full py-2 px-4 cursor-pointer flex items-center gap-4`}
              >
                Logout
              </button>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
