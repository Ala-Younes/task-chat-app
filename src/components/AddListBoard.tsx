import { MdAdd } from "react-icons/md";
import Button from "./Button";
import Icon from "./Icon";

type Props = {};

const AddListBoard = (props: Props) => {
  return (
    <>
      <Button text="Add New ListBoard" className="hidden md:flex" />
      <Icon
        IconName={MdAdd}
        className="bock md:hidden"
        reduceOpacityOnHover={false}
      />
    </>
  );
};

export default AddListBoard;
