import React from "react";
import "./index.css";

const AnimatedButton = ({ text, onClick }) => {
  return (
    <button className="animated-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default AnimatedButton;
