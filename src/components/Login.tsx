import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { firestore_SignIn, firestore_SignUp } from "../backend/queries";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { registerType } from "../types/types";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const initialFormState = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  // ! Maybe a hook to return result, error, loading from firebase
  // ! A useFirebaseLogin, a useFirebaseSignUp
  const [isLoading, setIsLoading] = useState({
    signUp: false,
    signIn: false,
  });

  const navigateTo = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAuthentication = (
    authData: Partial<registerType>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionFunction: any
  ) => {
    actionFunction(authData, setIsLoading, resetForm, navigateTo, dispatch);
  };

  const handleLogin = () => {
    const { email, password } = formData;
    const loginData = { email, password };
    handleAuthentication(loginData, firestore_SignIn);
  };

  const handleRegister = () => {
    handleAuthentication(formData, firestore_SignUp);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ! if i handle login and register here depending on isLogin value they well be triggered directly
    // ! because isLogin is already changed ...
  };

  const resetForm = () => {
    setFormData({ email: "", password: "", confirmPassword: "" });
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
            <Button
              text="Login"
              onClick={handleLogin}
              loading={isLoading.signIn}
            />
            <Button
              loading={false}
              text="Register"
              secondary
              onClick={() => setIsLogin(false)}
            />
          </>
        ) : (
          <>
            <Button
              text="Register"
              onClick={handleRegister}
              loading={isLoading.signUp}
            />
            <Button text="Login" onClick={() => setIsLogin(true)} secondary />
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
