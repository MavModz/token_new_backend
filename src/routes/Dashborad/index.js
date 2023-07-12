import React, { useLayoutEffect } from "react";
import AnimatedButton from "../../components/AnimatedButton";
import DashboardForm from "../../components/DashboardForm";
import MultiStepForm from "../../components/MultiStepForm";
import Cards from "../../components/Cards";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { FiCalendar } from "react-icons/fi";
import EarningTable from "../../components/EarningTable";
import { useSelector } from "react-redux";
const Dashborad = () => {
  useLayoutEffect(() => {
    document.title = "Dashborad";
  }, []);

  // const token = localStorage.getItem("auth_token");
  // console.log(token);
  const data = [
    {
      title: "Card 1",
      icon: <AiOutlineUser />,
      value: "123",
    },
    {
      title: "Card 2",
      icon: <BsFillHeartFill />,
      value: "456",
    },
    {
      title: "Card 3",
      icon: <FiCalendar />,
      value: "789",
    },
    {
      title: "Card 4",
      icon: <FiCalendar />,
      value: "789",
    },
    {
      title: "Card 5",
      icon: <FiCalendar />,
      value: "789",
    },
  ];

  return (
    <div>
      <h5>Dashborad</h5>
      {/* <DashboardForm /> */}
      {/* <div className="form-container"> */}
      {/* <MultiStepForm /> */}
      <Cards data={data} />
      {/* </div> */}
      {/* <EarningTable /> */}
    </div>
  );
};

export default Dashborad;
