type Props = {};

import { BsFillChatFill } from "react-icons/bs";
import logo from "../assets/logo.png";
import AddListBoard from "./AddListBoard";
import Icon from "./Icon";
import { FiList } from "react-icons/fi";
import UserHeaderProfile from "./UserHeaderProfile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { firestore_SignOut } from "../backend/queries";
import { useState } from "react";
import Spinner from "./Spinner";

const Header = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);

  const goTo = useNavigate();
  const dispatch = useDispatch();

  const handleGoToPage = (page: string) => {
    goTo("/dashboard/" + page);
    setCurrentPage(page);
  };

  // ! Get an element from the store useSelector
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  function handleSignOut(): void {
    firestore_SignOut(dispatch, setLogoutLoading);
    goTo("/auth");
  }

  const setCurrentPage = (page: string) => {
    localStorage.setItem("chat_app-page", page);
  };

  // ! Display elements depending on which page we are ...
  const getCurrentPage = () => {
    return localStorage.getItem("chat_app-page");
  };

  return (
    <div className="flex flex-wrap z-10 sm:flex-row gap-5 items-center justify-between drop-shadow-md bg-gradient-to-r from-customBlue to-customPink px-5 py-5 md:py-2 text-white">
      <img
        className="w-[70px] drop-shadow-md cursor-pointer"
        src={logo}
        alt="logo"
      />
      <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">
        {getCurrentPage() === "chat" ? (
          <Icon
            IconName={FiList}
            onClick={() => handleGoToPage("")}
            reduceOpacityOnHover={false}
          />
        ) : getCurrentPage() === "profile" ? (
          <>
            <Icon
              reduceOpacityOnHover={false}
              IconName={FiList}
              onClick={() => handleGoToPage("")}
            />
            <Icon
              IconName={BsFillChatFill}
              ping
              onClick={() => handleGoToPage("chat")}
              reduceOpacityOnHover={false}
            />
          </>
        ) : (
          <>
            <AddListBoard />
            <Icon
              IconName={BsFillChatFill}
              ping
              onClick={() => handleGoToPage("chat")}
              reduceOpacityOnHover={false}
            />
          </>
        )}

        <div className="group relative">
          <UserHeaderProfile user={currentUser} />
          <div className="absolute pt-5 hidden group-hover:block w-full min-w-max">
            <ul className="w-full bg-white overflow-hidden rounded-md shadow-md text-gray-700 pt-1">
              <p
                onClick={() => handleGoToPage("profile")}
                className="hover:bg-gray-200 py-2 px-4 block cursor-pointer"
              >
                Profile
              </p>
              <button
                onClick={() => !logoutLoading && handleSignOut()}
                // onClick={!logoutLoading ? handleSignOut : undefined}
                className={`hover:bg-gray-200 w-full py-2 px-4 cursor-pointer flex items-center gap-4`}
              >
                Logout
                {logoutLoading && <Spinner />}
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
