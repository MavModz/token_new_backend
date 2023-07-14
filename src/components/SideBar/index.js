import React, { useState } from "react";
import "./index.css";
import { MdOutlineDashboard, MdOutlinePeopleAlt } from "react-icons/md";
import { AiOutlineShoppingCart, AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiShoppingCartLine, RiChat1Line } from "react-icons/ri";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [active, setActive] = useState(""); // Initialize active state as an empty string
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  const handleClick = (menuItem) => {
    setActive(menuItem); // Set the clicked menu item as active
  };

  return (
    <div className={`${isOpen ? "vertical-menu" : "vertical-menu-hide"}`}>
      <div className="h-100 mm-active">
        <div className="mm-active">
          <ul className="metismenu list-unstyled mm-show mm-active">
            <li className="menu-title">Menu</li>
            <li className="">
              <NavLink
                to="dashboard"
                onClick={() => handleClick("dashboard")}
                className="sidebar-route"
              >
                <MdOutlineDashboard
                  fontSize={20}
                  className={active === "dashboard" ? "isActive" : "inActive"}
                />
                <span className="badge rounded-pill bg-success float-end"></span>
                <span
                  className={`${
                    active === "dashboard" ? "isActive ms-3" : "inActive ms-3"
                  } ${isOpen ? "" : "display-none"}`}
                >
                  Dashboard
                </span>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="manageteam"
                onClick={() => handleClick("manageteam")}
                className="sidebar-route"
              >
                <MdOutlinePeopleAlt
                  fontSize={20}
                  className={active === "manageteam" ? "isActive" : "inActive"}
                />
                <span className="badge rounded-pill bg-success float-end"></span>
                <span
                  className={`${
                    active === "manageteam" ? "isActive ms-3" : "inActive ms-3"
                  } ${isOpen ? "" : "display-none"}`}
                >
                  Manage Team
                </span>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="profileform"
                onClick={() => handleClick("profileform")}
                className="sidebar-route"
              >
                <RiChat1Line
                  fontSize={20}
                  className={active === "profileform" ? "isActive" : "inActive"}
                />
                <span className="badge rounded-pill bg-success float-end"></span>
                <span
                  className={`${
                    active === "profileform" ? "isActive ms-3" : "inActive ms-3"
                  } ${isOpen ? "" : "display-none"}`}
                >
                  Profile Form
                </span>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="invoicebalance"
                onClick={() => handleClick("invoicebalance")}
                className="sidebar-route"
              >
                <LiaFileInvoiceDollarSolid
                  fontSize={20}
                  className={
                    active === "invoicebalance" ? "isActive" : "inActive"
                  }
                />
                <span className="badge rounded-pill bg-success float-end"></span>
                <span
                  className={`${
                    active === "invoicebalance"
                      ? "isActive ms-3"
                      : "inActive ms-3"
                  } ${isOpen ? "" : "display-none"}`}
                >
                  Invoice Balance
                </span>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="addvendor"
                onClick={() => handleClick("addvendor")}
                className="sidebar-route"
              >
                <AiOutlineUsergroupAdd
                  fontSize={20}
                  className={active === "addvendor" ? "isActive" : "inActive"}
                />
                <span className="badge rounded-pill bg-success float-end"></span>
                <span
                  className={`${
                    active === "addvendor" ? "isActive ms-3" : "inActive ms-3"
                  } ${isOpen ? "" : "display-none"}`}
                >
                  Add Vendor
                </span>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="vendorslist"
                onClick={() => handleClick("vendorslist")}
                className="sidebar-route"
              >
                <FaUsers
                  fontSize={20}
                  className={active === "vendorslist" ? "isActive" : "inActive"}
                />
                <span className="badge rounded-pill bg-success float-end"></span>
                <span
                  className={`${
                    active === "vendorslist" ? "isActive ms-3" : "inActive ms-3"
                  } ${isOpen ? "" : "display-none"}`}
                >
                  Vendor List
                </span>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="productlist"
                onClick={() => handleClick("productlist")}
                className="sidebar-route"
              >
                <AiOutlineShoppingCart
                  fontSize={20}
                  className={active === "productlist" ? "isActive" : "inActive"}
                />
                <span className="badge rounded-pill bg-success float-end"></span>
                <span
                  className={`${
                    active === "productlist" ? "isActive ms-3" : "inActive ms-3"
                  } ${isOpen ? "" : "display-none"}`}
                >
                  Product List
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
