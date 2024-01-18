import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { firestore_SignUp } from "../backend/queries";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const initialFormState = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = () => {
    const { email, password } = formData;
    const loginData = { email, password };
    console.log("%c LoginData : ", "color: green", loginData);
  };

  const handleRegister = () => {
    firestore_SignUp(formData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ! if i handle login and register here depending on isLogin value they well be triggered directly
    // ! because isLogin is already changed ...
  };

  return (
    <div className="w-full md:w-[450px]">
      <h1 className="text-white text-center font-bold text-4xl md:text-6xl mb-10">
        {isLogin ? "Login" : "Register"}
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-3 bg-white p-6 min-h-[150px] w-full rounded-xl drop-shadow-xl"
      >
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        <Input
          name="password"
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
        />
        {!isLogin && (
          <Input
            name={"confirm password"}
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
          />
        )}
        {isLogin ? (
          <>
            <Button text="Login" onClick={handleLogin} />
            <Button
              loading={false}
              text="Register"
              secondary
              onClick={() => setIsLogin(false)}
            />
          </>
        ) : (
          <>
            <Button text="Register" onClick={handleRegister} />
            <Button text="Login" onClick={() => setIsLogin(true)} secondary />
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
