import React, { useLayoutEffect } from "react";
import AnimatedButton from "../../components/AnimatedButton";
import DashboardForm from "../../components/DashboardForm";
import MultiStepForm from "../../components/MultiStepForm";

const Dashborad = () => {
  useLayoutEffect(() => {
    document.title = "Dashborad";
  }, []);

  return (
    <div>
      <h5>Dashborad</h5>
      {/* <DashboardForm /> */}
      <div className="form-container">
        <MultiStepForm />
      </div>
    </div>
  );
};

export default Dashborad;
