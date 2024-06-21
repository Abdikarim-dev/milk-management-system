import { forwardRef } from "react";

const Preview = forwardRef((props, ref) => {
  const { data, totals } = props;
  return (
    <div ref={ref} className="">
      <div className="">
        <img src="./ishub logo.png" alt="logo" className="w-1/2" />
      </div>
    </div>
  );
});

export default Preview;
