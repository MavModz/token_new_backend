import React, { useLayoutEffect } from "react";
import MultiStepForm from "../../components/MultiStepForm";
const AddVendor = () => {
  useLayoutEffect(() => {
    document.title = "Add Vendor";
  }, []);
  return (
    <div>
      <h5> Add Vendor</h5>
      <div className="table-container">
        <MultiStepForm />
      </div>
    </div>
  );
};

export default AddVendor;
