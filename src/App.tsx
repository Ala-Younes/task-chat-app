import "./App.css";
import Login from "./components/Login";

function App() {
  return (
    <div className="h-screen flex items-center justify-center ">
      <Login />
      <div className="h-full w-full bg-gradient-to-r from-customBlue to-customPink opacity-70 absolute top-0 -z-10" />
      <div className="h-full w-full absolute bg-pattern -z-20 top-0" />
    </div>
  );
}

export default App;
