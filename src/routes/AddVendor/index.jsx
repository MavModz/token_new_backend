import React, { useLayoutEffect } from "react";

const AddVendor = () => {
  useLayoutEffect(() => {
    document.title = "Add Vendor";
  }, []);
  return (
    <div>
      <h5> Add Vendor</h5>
    </div>
  );
};

export default AddVendor;
