import React from "react";
import {CgArrowsExpandLeft} from "react-icons/cg"

const CustomHandle = (props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => (
  <div className="react-resizable-handle react-resizable-handle-se"
    {...props}
  />
);

const BottomRightHandle = () => (
  <CustomHandle>
    <CgArrowsExpandLeft />
  </CustomHandle>
);

export default BottomRightHandle;