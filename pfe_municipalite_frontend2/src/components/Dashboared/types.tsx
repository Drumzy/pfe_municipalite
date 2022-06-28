import React from "react";
import "./overwrite.module.css"
export type ResizeHandleAxis = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne';

export type ResizeHandleProps = {
  handleAxis: ResizeHandleAxis;
}

export const MyHandle = React.forwardRef<HTMLDivElement, ResizeHandleProps>(({ handleAxis }, ref) => {
  return (
    <div ref={ref}
      className={`react-resizable-handle react-resizable-handle-${handleAxis}`}
    >
    </div>
  );
});