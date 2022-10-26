import { useState } from "react";

const useToggle = () => {
  const [el, setEl] = useState(null);
  const open = Boolean(el);

  //set el state ie true
  const handleClick = (event) => {
    setEl(event.currentTarget);
  };

  //set el state to null ie false
  const handleClose = () => {
    setEl(null);
  };

  return {
    el,
    open,
    handleClick,
    handleClose,
  };
};

export default useToggle;
