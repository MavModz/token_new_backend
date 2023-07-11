import React, { useLayoutEffect } from "react";
import Table from "../../components/Table";
import "./index.css";
const ManageTeam = () => {
  useLayoutEffect(() => {
    document.title = "Manage-Team";
  }, []);
  return (
    <div className="table-subContainer">
      <h5>Manage-Team</h5>
      <Table />
    </div>
  );
};

export default ManageTeam;
