import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { toastErr } from "../utils/toast";
import CatchErr from "../utils/catchErrors";
import {
  loginType,
  registerType,
  setLoadingType,
  updateUserType,
  userType,
} from "../types/types";
import { NavigateFunction } from "react-router-dom";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { defaultUser, setUser } from "../redux/userSlice";
import { AppDispatch } from "../redux/store";
import { ConvertTime } from "../utils/convertTime";
import { AvatarGenerator } from "../utils/avatarGenerator";

// ! Maybe a file for constants
const databaseCollections = {
  users: "users",
  task: "tasks",
  tasksList: "taskList",
  chats: "chats",
  messages: "messages",
};

// ! its better to have an async, await function that return a value upon success
// ! and another upon fail so we can reset the form when success .then(() => rest)
const firestore_SignUp = (
  { email, password, confirmPassword }: registerType,
  setLoading: setLoadingType,
  reset: () => void,
  navigateTo: NavigateFunction,
  dispatch: AppDispatch
) => {
  setLoading((prevState) => ({ ...prevState, signUp: true }));
  if (email && password) {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          const { uid, email, photoURL } = user;
          const userName = email?.split("@")[0];
          const userImage = AvatarGenerator(userName);

          const userInfo = await addUserToCollection(
            uid,
            email ?? "",
            userName ?? "",
            photoURL ?? userImage
          );

          // ! So after interacting with our UI, than firebase logic,
          // ! We put our data in the store how ?? =>
          dispatch(setUser(userInfo));
          // ! Set user info in the store and localStorage
          setLoading((prevState) => ({ ...prevState, signUp: false }));

          reset();
          navigateTo("/dashboard");
        })
        .catch((error) => {
          setLoading((prevState) => ({ ...prevState, signUp: false }));
          CatchErr(error);
        });
      console.log("Success");
    } else {
      toastErr("Password !== confirmPassword", setLoading);
    }
  } else {
    toastErr("Empty Fields", setLoading);
  }
};

const firestore_SignIn = (
  { email, password }: loginType,
  setLoading: setLoadingType,
  reset: () => void,
  navigateTo: NavigateFunction,
  dispatch: AppDispatch
) => {
  setLoading((prevState) => ({ ...prevState, signIn: true }));
  signInWithEmailAndPassword(auth, email, password)
    .then(async ({ user }) => {
      // ! Update user isOnline property
      await updateUserInfos({
        id: user.uid,
        isOnline: true,
      });

      // ! get user Info
      const userInfo = await getUserInfo(user.uid);
      // ! Set user info in the store and localStorage
      dispatch(setUser(userInfo));

      setLoading((prevState) => ({ ...prevState, signIn: false }));
      reset();
      navigateTo("/dashboard");
    })
    .catch((error) => {
      setLoading((prevState) => ({ ...prevState, signIn: false }));
      CatchErr(error);
    });
};

const firestore_SignOut = (
  dispatch: AppDispatch,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  signOut(auth)
    .then(async () => {
      await updateUserInfos({ isOnline: false, isOffline: true });
      // set the user in  the state to empty
      dispatch(setUser(defaultUser));

      // Remove data from local storage
      localStorage.removeItem("chat_app_user");
      setLoading(false);
    })
    .catch((err) => console.log("%c Err update info : ", "color: red", err));
};

const addUserToCollection = async (
  userId: string,
  userEmail: string,
  userName: string,
  userImg: string
) => {
  // ! Create a new user
  await setDoc(doc(db, databaseCollections.users, userId), {
    isOnline: true,
    email: userEmail,
    name: userName,
    img: userImg,
    creationTime: serverTimestamp(), // From firestore
    lastSeen: serverTimestamp(),
    bio: `Hi my name is ${userName}, nice to meet u ....`,
  });
  // ! than return the new created user infos
  return getUserInfo(userId);
};

const getUserInfo = async (uid: string): Promise<userType> => {
  const userRef = doc(db, databaseCollections.users, uid);
  const user = await getDoc(userRef);
  if (user.exists()) {
    const { isOnline, email, name, img, creationTime, lastSeen, bio } =
      user.data();
    return {
      id: user.id,
      img,
      isOnline,
      name,
      email,
      bio,
      // ! Whats better to add the time good or to add it as a timestamp and transform it
      creationTime: creationTime
        ? ConvertTime(creationTime.toDate())
        : "no creationTime : userInfo",
      lastSeen: lastSeen
        ? ConvertTime(lastSeen.toDate())
        : "no lastSeen : userInfo",
    };
  } else {
    toastErr("Get userInfo : User Not Found");
    return defaultUser;
  }
};

const updateUserInfos = async ({
  name,
  img,
  isOnline,
  isOffline,
  id,
}: updateUserType) => {
  if (!id) {
    id = getStorageUser().id;
  }
  if (id) {
    console.log("%c IsOnline : ", "color: green", isOnline);
    await updateDoc(doc(db, databaseCollections.users, id), {
      ...(name && { name }),
      ...(isOnline && { isOnline }),
      ...(isOffline && { isOffline }),
      ...(img && { img }),
      lastSeen: serverTimestamp(),
    });
  }
};

// ! this is .... (i we have the user in the store why use localStorage)
// ! No very typescript getStorageUser().id (id ????)
const getStorageUser = () => {
  const user = localStorage.getItem("chat_app_user");
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};

export { firestore_SignUp, firestore_SignIn, firestore_SignOut, getStorageUser };
