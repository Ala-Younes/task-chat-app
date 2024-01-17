import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

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

  const handleLoginClick = () => {
    const loginData = { email: formData.email, password: formData.password };
    console.log("%c LoginData : ", "color: green", loginData);
  };

  const handleRegisterClick = () => {
    const registerData = {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };
    console.log("%c RegisterData : ", "color: green", registerData);
  };
  return (
    <div className="w-full md:w-[450px]">
      <h1 className="text-white text-center font-bold text-4xl md:text-6xl mb-10">
        {isLogin ? "Login" : "Register"}
      </h1>
      <form className="flex flex-col gap-3 bg-white p-6 min-h-[150px] w-full rounded-xl drop-shadow-xl">
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
            <Button text="Login" onClick={handleLoginClick} />
            <Button
              loading={false}
              text="Register"
              secondary
              onClick={() => setIsLogin(false)}
            />
          </>
        ) : (
          <>
            <Button text="Register" onClick={handleRegisterClick} />
            <Button text="Login" onClick={() => setIsLogin(true)} secondary />
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
