// ! Maybe create a .d file for types/interface => more leger :)
type setLoadingType = React.Dispatch<
  React.SetStateAction<{
    signUp: boolean;
    signIn: boolean;
  }>
>;
type registerType = {
  email: string;
  password: string;
  confirmPassword: string;
};
type loginType = Omit<registerType, "confirmPassword">;

type userType = {
  id: string;
  img: string;
  isOnline: boolean;
  name: string;
  email: string;
  bio?: string;
  creationTime?: string;
  lastSeen?: string;
};
export type { setLoadingType, registerType, loginType, userType };
