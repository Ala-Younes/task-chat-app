import { toast } from "react-toastify";
import { setLoadingType } from "../types/types";

const showToast = (type: string, msg: string, setLoading?: setLoadingType) => {
  setTimeout(() => {
    setLoading && setLoading(() => ({ signIn: false, signUp: false }));
  }, 1000);
  switch (type) {
    case "error":
      toast.error(msg);
      break;
    case "success":
      toast.success(msg);
      break;
    case "warn":
      toast.warn(msg);
      break;
    case "info":
      toast.info(msg);
      break;
    default:
      toast(msg);
  }
};

export const toastErr = (msg: string, setLoading?: setLoadingType) => {
  showToast("error", msg, setLoading);
};

export const toastSucc = (msg: string, setLoading?: setLoadingType) => {
  showToast("success", msg, setLoading);
};

export const toastWarn = (msg: string, setLoading?: setLoadingType) => {
  showToast("warn", msg, setLoading);
};

export const toastInfo = (msg: string, setLoading?: setLoadingType) => {
  showToast("info", msg, setLoading);
};
