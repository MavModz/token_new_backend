// import React, { useState } from "react";
// import "./index.css";
// import { MdOutlineDashboard } from "react-icons/md";
// import { AiOutlineCalendar, AiOutlineMail } from "react-icons/ai";
// import { RiShoppingCartLine, RiChat1Line } from "react-icons/ri";
// import { Link } from "react-router-dom";
// const Sidebar = () => {
//   const [active, setActive] = useState(false);
//   return (
//     <div className="vertical-menu">
//       <div className="h-100 mm-active">
//         <div className="mm-active">
//           <ul className="metismenu list-unstyled mm-show mm-active">
//             <li className="menu-title">Menu</li>
//             <li className={`${active ? "mm-active" : ""}`}>
//               <Link
//                 to=""
//                 onClick={() => setActive(true)}
//                 className="sidebar-route"
//               >
//                 <MdOutlineDashboard fontSize={20} />
//                 <span className="badge rounded-pill bg-success float-end"></span>
//                 <span className="ms-3">Dashboard</span>
//               </Link>
//             </li>
//             <li className={`${active ? "mm-active" : ""}`}>
//               <Link
//                 to=""
//                 onClick={() => setActive(true)}
//                 className="sidebar-route"
//               >
//                 <AiOutlineCalendar fontSize={20} />
//                 <span className="badge rounded-pill bg-success float-end"></span>
//                 <span className="ms-3">Calendar</span>
//               </Link>
//             </li>
//             <li className={`${active ? "mm-active" : ""}`}>
//               <Link
//                 to=""
//                 onClick={() => setActive(true)}
//                 className="sidebar-route"
//               >
//                 <RiChat1Line fontSize={20} />
//                 <span className="badge rounded-pill bg-success float-end"></span>
//                 <span className="ms-3">Chat</span>
//               </Link>
//             </li>
//             <li className={`${active ? "mm-active" : ""}`}>
//               <Link
//                 to=""
//                 onClick={() => setActive(true)}
//                 className="sidebar-route"
//               >
//                 <RiShoppingCartLine fontSize={20} />
//                 <span className="badge rounded-pill bg-success float-end"></span>
//                 <span className="ms-3">Ecommerce</span>
//               </Link>
//             </li>
//             <li className={`${active ? "mm-active" : ""}`}>
//               <Link
//                 to=""
//                 onClick={() => setActive(true)}
//                 className="sidebar-route"
//               >
//                 <AiOutlineMail fontSize={20} />
//                 <span className="badge rounded-pill bg-success float-end"></span>
//                 <span className="ms-3">Email</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import "./index.css";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineCalendar, AiOutlineMail } from "react-icons/ai";
import { RiShoppingCartLine, RiChat1Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState(""); // Initialize active state as an empty string

  const handleClick = (menuItem) => {
    setActive(menuItem); // Set the clicked menu item as active
  };

  return (
    <div className="vertical-menu">
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
                  className={active === "dashboard" ? "isActive " : "inActive "}
                />
                <span className="badge rounded-pill bg-success float-end"></span>
                <span
                  className={
                    active === "dashboard" ? "isActive ms-3" : "inActive ms-3"
                  }
                >
                  Dashboard
                </span>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="calendar"
                onClick={() => handleClick("calendar")}
                className="sidebar-route"
              >
                <AiOutlineCalendar
                  fontSize={20}
                  className={active === "calendar" ? "isActive " : "inActive "}
                />
                <span className="badge rounded-pill bg-success float-end"></span>
                <span
                  className={
                    active === "calendar" ? "isActive ms-3" : "inActive ms-3"
                  }
                >
                  Calendar
                </span>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to=""
                onClick={() => handleClick("chat")}
                className="sidebar-route"
              >
                <RiChat1Line
                  fontSize={20}
                  className={active === "chat" ? "isActive " : "inActive "}
                />
                <span className="badge rounded-pill bg-success float-end"></span>
                <span
                  className={
                    active === "chat" ? "isActive ms-3" : "inActive ms-3"
                  }
                >
                  Chat
                </span>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to=""
                onClick={() => handleClick("ecommerce")}
                className="sidebar-route"
              >
                <RiShoppingCartLine
                  fontSize={20}
                  className={active === "ecommerce" ? "isActive " : "inActive "}
                />
                <span className="badge rounded-pill bg-success float-end"></span>
                <span
                  className={
                    active === "ecommerce" ? "isActive ms-3" : "inActive ms-3"
                  }
                >
                  Ecommerce
                </span>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to=""
                onClick={() => handleClick("email")}
                className="sidebar-route"
              >
                <AiOutlineMail
                  fontSize={20}
                  className={active === "email" ? "isActive " : "inActive "}
                />
                <span className="badge rounded-pill bg-success float-end"></span>
                <span
                  className={
                    active === "email" ? "isActive ms-3" : "inActive ms-3"
                  }
                >
                  Email
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
