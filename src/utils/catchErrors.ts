import { toastErr, toastInfo } from "./toast";

// ! So error is an object {...error} with fields code , name ...
// ! Must destructure error object with keeping the same objects names (code, name) ...
const CatchErr = (err: { code?: string; name?: string }) => {
  const { code, name } = err;
  if (code === "auth/invalid-email") toastErr(`${name} : invalid email`);
  else if (code === "auth/weak-password")
    toastErr(`${name} : password should be at least 6 characters`);
  else if (code === "auth/user-not-found") toastErr(`${name} : user not found`);
  else if (code === "auth/email-already-in-use")
    toastErr(`${name} : email already exists`);
  else if (code === "auth/wrong-password") toastErr(`${name} : wrong password`);
  else if (code === "auth/requires-recent-login")
    toastInfo(`${name} : logout and login before updating your profile`);
  else if (code === "unavailable")
    toastErr(`${name} : firebase client is offline`);
  else if (code === "auth/invalid-login-credentials")
    toastErr(`${name} : invalid credentials`);
  else if (code === `${name} : auth/operation-not-allowed`)
    toastErr(`${name} : Can't change email now!`);
  else toastErr(`${name} : An error occurred!`);
  console.log("%c Error : ", "color: red", err.code);
};

export default CatchErr;
