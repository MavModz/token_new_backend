import React from "react";
import "./index.css";

const Cards = ({ data }) => {
  return (
    <div className="table-wrapper">
      <div style={{ margin: "4px" }}>
        <div className="cards-grid">
          {data?.map((item, index) => (
            <div className="cards" key={index}>
              <div className="cards-content">
                <h3 className="cards-title">{item.title}</h3>
                <p className="cards-value">{item.value}</p>
              </div>
              <div className="cards-icon">{item.icon}</div>
            </div>
          ))}
          {/* <div className="cards">
            <div className="cards-content">
              <h3 className="cards-title">{title}</h3>
              <p className="cards-value">{value}</p>
            </div>
            <div className="cards-icon">{icon}</div>
          </div>
          <div className="cards">
            <div className="cards-content">
              <h3 className="cards-title">{title}</h3>
              <p className="cards-value">{value}</p>
            </div>
            <div className="cards-icon">{icon}</div>
          </div>
          <div className="cards">
            <div className="cards-content">
              <h3 className="cards-title">{title}</h3>
              <p className="cards-value">{value}</p>
            </div>
            <div className="cards-icon">{icon}</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Cards;
