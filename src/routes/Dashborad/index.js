import React, { useLayoutEffect } from "react";

const Dashborad = () => {
  useLayoutEffect(() => {
    document.title = "Dashborad";
  }, []);
  return (
    <section>
      <h5>Dashborad</h5>
    </section>
  );
};

export default Dashborad;
