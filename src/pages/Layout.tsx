import { Outlet } from "react-router-dom";
import Header from "../components/Header";

type Props = {};

const Layout = (props: Props) => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="bg-pattern flex-1 max-h-[90%] overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
