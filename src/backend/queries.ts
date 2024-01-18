import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import { toastErr } from "../utils/toast";
import CatchErr from "../utils/catchErrors";

type registerData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const firestore_SignUp = ({
  email,
  password,
  confirmPassword,
}: registerData) => {
  if (email && password) {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("%c Credentials : ", "color: green", userCredential);
        })
        .catch((error) => {
          CatchErr(error);
          // ..
        });
      console.log("Success");
    } else {
      toastErr("Password !== confirmPassword");
    }
  } else {
    toastErr("Empty Fields");
  }
};

export { firestore_SignUp };
