import { Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import Layout from "../pages/Layout";
import ListPage from "../pages/ListPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/auth" element={<LoginPage />} />
      {/* // ! Nested Routes */}
      <Route path="/dashboard" element={<Layout />}>
        {/* // The default nested route is designed by the index ==> default nested */}
        <Route index element={<ListPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to={"/dashboard"} />} />
    </Routes>
  );
};

export default Routing;
