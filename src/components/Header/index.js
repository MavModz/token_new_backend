import React, { useState, useEffect } from "react";
import "./index.css";
import { RiMenu2Fill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { RiWallet3Line, RiShutDownLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import LogoDark from "../../assets/header/Ride-Dost-Small.png";
import LogoLight from "../../assets/header/logo-sm-light.png";
import LogoNazoxDark from "../../assets/header/logo-dark.png";
import LogoNazoxLight from "../../assets/header/Ride-Dost.png";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/reducer/sidebar";
const Header = ({ onLogout }) => {
  const [show, setShow] = useState(true);
  const [searchBar, setSearchBar] = useState(false);
  const { addToast } = useToasts();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const logout = () => {
    localStorage.removeItem("auth_token"); // Uncomment this line to clear the auth_token from localStorage
    onLogout(); // Call the onLogout function passed from the parent component
    navigate("/login");
    addToast("Logout Successfully!", {
      appearance: "success",
    });
  };

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const role = useSelector((state) => state.role);
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };
  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          <div
            className={`${
              isOpen ? "navbar-brand-box" : "navbar-brand-box-hide"
            }`}
          >
            <a className="logo logo-dark">
              {isOpen ? (
                <span className="logo-lg">
                  <img src={LogoNazoxLight} alt="" width={110} />
                </span>
              ) : (
                <span className="logo-sm">
                  <img src={LogoDark} alt="" height="20" />
                </span>
              )}
            </a>
            {/* <a className="logo logo-light">
              <span className="logo-sm">
                <img src={LogoLight} alt="" />
              </span>
              <span className="logo-lg">
                <img src={LogoNazoxDark} alt="" />
              </span>
            </a> */}
          </div>
          <button
            onClick={handleToggleSidebar}
            className="px-3 font-size-24 header-item waves-effect btn btn-none btn-sm"
          >
            <RiMenu2Fill fontSize={28} />
          </button>
          <form className="app-search d-none d-lg-block">
            <div className="position-relative">
              <input
                placeholder="Search"
                className="form-control form-control"
              />
              <span>
                <CiSearch />
              </span>
            </div>
          </form>
        </div>
        <div className="d-flex">
          <div className="dropdown d-inline-block d-lg-none ms-2">
            <button
              onClick={() => setSearchBar(!searchBar)}
              className="btn header-item noti-icon waves-effect"
            >
              <CiSearch fontSize={24} />
            </button>
            <div
              className={`${
                searchBar
                  ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                  : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
              }`}
            >
              <form className="p-3">
                <div className="m-0 form-group">
                  <div className="input-group">
                    <input
                      placeholder="Search"
                      className="form-control form-control"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary">
                        <FiSearch fontSize={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className={`${
              show
                ? "d-inline-block user-dropdown dropdown"
                : "d-inline-block user-dropdown dropdown show"
            }`}
            style={{ marginRight: "100px" }}
          >
            <button
              className="btn header-item waves-effect"
              onClick={() => setShow(!show)}
            >
              <CgProfile
                fontSize={24}
                className="rounded-circle header-profile-user me-2"
              />
              <span
                style={{ fontSize: "0.8rem" }}
                className="d-none d-xl-inline-block ms-1 text-transform"
              >
                {role.admin === true ? "Admin" : "User"}
              </span>
              <IoIosArrowDown
                className="d-none ms-1 d-xl-inline-block ms-2"
                fontSize={15}
              />
            </button>
            <div
              className={`${
                show
                  ? "dropdown-menu-end dropdown-menu"
                  : "dropdown-menu-end dropdown-menu show"
              }`}
            >
              <Link className="dropdown-item">
                <RiWallet3Line className="align-middle me-2" fontSize={16} />
                My Wallet
              </Link>
              <div className="dropdown-divider"></div>
              <span
                onClick={handleLogout}
                className="text-danger  dropdown-item"
              >
                <RiShutDownLine
                  className="align-middle me-2 text-danger "
                  fontSize={16}
                />
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;

// import React, { useState, useEffect } from "react";
// import "./index.css";
// import { RiMenu2Fill } from "react-icons/ri";
// import { CiSearch } from "react-icons/ci";
// import { IoIosArrowDown } from "react-icons/io";
// import {
//   RiApps2Line,
//   RiFullscreenLine,
//   RiNotification3Line,
//   RiShoppingCartLine,
//   RiWallet3Line,
//   RiShutDownLine,
// } from "react-icons/ri";
// import { AiOutlineClockCircle } from "react-icons/ai";
// import { CgProfile } from "react-icons/cg";
// import LogoDark from "../../assets/header/logo-sm-dark.png";
// import LogoLight from "../../assets/header/logo-sm-light.png";
// import LogoNazoxDark from "../../assets/header/logo-dark.png";
// import LogoNazoxLight from "../../assets/header/logo-light.png";
// import { Link } from "react-router-dom";
// import { useToasts } from "react-toast-notifications";
// import { useNavigate } from "react-router-dom";

// const Header = () => {
//   const [show, setShow] = useState(true);
//   const [searchBar, setSearchBar] = useState(false);
//   const { addToast } = useToasts();

//   const navigate = useNavigate();
//   const handleLogout = (e) => {
//     addToast("Logout Successfully!", {
//       appearance: "success",
//     });
//     localStorage.removeItem("accessToken");
//     navigate("/login");
//   };
//   // const handleLogout = (e) => {
//   //   e.preventDefault();
//   //   addToast("Logout Successfully!", {
//   //     appearance: "success",
//   //   });
//   //   localStorage.clear();
//   //   navigate("/");
//   // };

//   return (
//     <header id="page-topbar">
//       <div className="navbar-header">
//         <div className="d-flex">
//           <div className="navbar-brand-box">
//             <a className="logo logo-dark">
//               <span className="logo-sm">
//                 <img src={LogoDark} alt="" height="20" />
//               </span>
//               <span className="logo-lg">
//                 <img src={LogoNazoxLight} alt="" width={110} />
//               </span>
//             </a>
//             <a className="logo logo-light">
//               <span className="logo-sm">
//                 <img src={LogoLight} alt="" />
//               </span>
//               <span className="logo-lg">
//                 <img src={LogoNazoxDark} alt="" />
//               </span>
//             </a>
//           </div>
//           <button className="px-3 font-size-24 header-item waves-effect btn btn-none btn-sm">
//             <RiMenu2Fill fontSize={28} />
//           </button>
//           <form className="app-search d-none d-lg-block">
//             <div className="position-relative">
//               <input
//                 placeholder="Search"
//                 className="form-control form-control"
//               />
//               <span>
//                 <CiSearch />
//               </span>
//             </div>
//           </form>
//           {/* <div className="dropdown-mega">
//             <button className="">
//               <IoIosArrowDown />
//             </button>
//             <div className="dropdown-megamenu dropdown-menu">
//               <div className="row">
//                 <div className="col-sm-8">
//                   <div className="row">
//                     <div className="col-md-4">
//                       <h4 className="font-size-14 mt-0">UI Components</h4>
//                       <ul className="list-unstyled megamenu-list">
//                         <li>
//                           <a href="">Lightbox</a>
//                         </li>
//                         <li>
//                           <a href="">Range Slider</a>
//                         </li>
//                         <li>
//                           <a href="">Sweet Alert</a>
//                         </li>
//                         <li>
//                           <a href="">Rating</a>
//                         </li>
//                         <li>
//                           <a href="">Forms</a>
//                         </li>
//                         <li>
//                           <a href="">Tables</a>
//                         </li>
//                         <li>
//                           <a href="">Charts</a>
//                         </li>
//                       </ul>
//                     </div>
//                     <div className="col-md-4">
//                       <h4 className="font-size-14 mt-0">Applications</h4>
//                       <ul className="list-unstyled megamenu-list">
//                         <li>
//                           <a href="">Ecommerce</a>
//                         </li>
//                         <li>
//                           <a href="">Calendar</a>
//                         </li>
//                         <li>
//                           <a href="">Email</a>
//                         </li>
//                         <li>
//                           <a href="">Projects</a>
//                         </li>
//                         <li>
//                           <a href="">Tasks</a>
//                         </li>
//                         <li>
//                           <a href="">Contacts</a>
//                         </li>
//                       </ul>
//                     </div>
//                     <div className="col-md-4">
//                       <h4 className="font-size-14 mt-0">Extra Pages</h4>
//                       <ul className="list-unstyled megamenu-list">
//                         <li>
//                           <a href="">Light Sidebar</a>
//                         </li>
//                         <li>
//                           <a href="">Compact Sidebar</a>
//                         </li>
//                         <li>
//                           <a href="">Horizontal layout</a>
//                         </li>
//                         <li>
//                           <a href="">Maintenance</a>
//                         </li>
//                         <li>
//                           <a href="">Coming Soon</a>
//                         </li>
//                         <li>
//                           <a href="">Timeline</a>
//                         </li>
//                         <li>
//                           <a href="">FAQs</a>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-sm-4">
//                   <div className="row">
//                     <div className="col-sm-6">
//                       <h4 className="font-size-14 mt-0">UI Components</h4>
//                       <ul className="list-unstyled megamenu-list">
//                         <li>
//                           <a href="">Lightbox</a>
//                         </li>
//                         <li>
//                           <a href="">Range Slider</a>
//                         </li>
//                         <li>
//                           <a href="">Sweet Alert</a>
//                         </li>
//                         <li>
//                           <a href="">Rating</a>
//                         </li>
//                         <li>
//                           <a href="">Forms</a>
//                         </li>
//                         <li>
//                           <a href="">Tables</a>
//                         </li>
//                         <li>
//                           <a href="">FAQs</a>
//                         </li>
//                         <li>
//                           <a href="">Charts</a>
//                         </li>
//                       </ul>
//                     </div>
//                     <div className="col-sm-5">
//                       <div>
//                         <img className="img-fluid mx-auto d-block" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div> */}
//         </div>

//         <div className="d-flex">
//           <div className="dropdown d-inline-block d-lg-none ms-2">
//             <button
//               onClick={() => setSearchBar(!searchBar)}
//               className="btn header-item noti-icon waves-effect"
//             >
//               <CiSearch fontSize={24} />
//             </button>
//             <div
//               className={`${
//                 searchBar
//                   ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
//                   : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
//               }`}
//             >
//               <form className="p-3">
//                 <div className="m-0 form-group">
//                   <div className="input-group">
//                     <input
//                       placeholder="Search"
//                       className="form-control form-control"
//                     />
//                     <div className="input-group-append">
//                       <button className="btn btn-primary">
//                         <CiSearch fontSize={35} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//           {/* <div className="d-none d-sm-inline-block dropdown">
//             <button className="btn header-item waves-effect">
//               <img />
//             </button>
//             <div className="dropdown-menu-end dropdown-menu">
//               <button className="notify-item dropdown-item active">
//                 <img className="me-1" />
//                 <span className="align-middle">English</span>
//               </button>
//               <button className="notify-item dropdown-item">
//                 <img className="me-1" />
//                 <span className="align-middle">Spanish</span>
//               </button>
//               <button className=" notify-item dropdown-item">
//                 <img className="me-1" />
//                 <span className="align-middle">German</span>
//               </button>
//               <button className=" notify-item dropdown-item">
//                 <img className="me-1" />
//                 <span className="align-middle">Italian</span>
//               </button>
//               <button className=" notify-item dropdown-item">
//                 <img className="me-1" />
//                 <span className="align-middle">Russian</span>
//               </button>
//             </div>
//           </div> */}
//           {/* <div className="d-none d-lg-inline-block ms-1 dropdown">
//             <button className="btn header-item noti-icon waves-effect">
//               <RiApps2Line fontSize={30} />
//             </button>
//             <div className="dropdown-menu-lg dropdown-menu-end dropdown-menu">
//               <div className="px-lg-2">
//                 <div className="g-0 row">
//                   <div className="col">
//                     <a className="dropdown-icon-item">
//                       <img />
//                       <span>GitHub</span>
//                     </a>
//                   </div>
//                   <div className="col">
//                     <a className="dropdown-icon-item">
//                       <img />
//                       <span>Bitbucket</span>
//                     </a>
//                   </div>
//                   <div className="col">
//                     <a className="dropdown-icon-item">
//                       <img />
//                       <span>Dribbble</span>
//                     </a>
//                   </div>
//                 </div>
//                 <div className="g-0 row">
//                   <div className="col">
//                     <a className="dropdown-icon-item">
//                       <img />
//                       <span>Dropbox</span>
//                     </a>
//                   </div>
//                   <div className="col">
//                     <a className="dropdown-icon-item">
//                       <img />
//                       <span>Mail Chimp</span>
//                     </a>
//                   </div>
//                   <div className="col">
//                     <a className="dropdown-icon-item">
//                       <img />
//                       <span>Slack</span>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div> */}
//           {/* <div className="dropdown d-none d-lg-inline-block ms-1">
//             <button className="header-item noti-icon waves-effect btn btn-none">
//               <RiFullscreenLine fontSize={30} />
//             </button>
//           </div> */}
//           {/* <div className="d-inline-block dropdown">
//             <button className="btn header-item noti-icon waves-effect">
//               <RiNotification3Line fontSize={30} />
//               <sapn className="noti-dot"></sapn>
//             </button>
//             <div className="dropdown-menu-end dropdown-menu-lg p-0 dropdown-menu">
//               <div className="p-3">
//                 <div className="align-items-center row">
//                   <div className="col">
//                     <h6 className="m-0">Notifications</h6>
//                   </div>
//                   <div className="col-auto">
//                     <a className="small">View All</a>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="simplebar-wrapper">
//                   <div className="simplebar-height-auto-observer-wrapper">
//                     <div className="simplebar-height-auto-observer"></div>
//                   </div>
//                 </div>
//                 <div className="simplebar-mask">
//                   <div className="simplebar-offset">
//                     <div className="simplebar-content-wrapper">
//                       <div className="simplebar-content">
//                         <a href="" className="text-reset notification-item">
//                           <div className="d-flex">
//                             <div className="avatar-xs me-3">
//                               <span className="avatar-title bg-primary rounded-circle font-size-16">
//                                 <RiShoppingCartLine fontSize={25} />
//                               </span>
//                             </div>
//                             <div className="flex-1">
//                               <h6 className="mt-0 mb-1"></h6>
//                               <div className="font-size-12 text-muted">
//                                 <p className="mb-1">
//                                   If several languages coalesce the grammar
//                                 </p>
//                                 <p className="mb-0">
//                                   <AiOutlineClockCircle fontSize={10} />
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </a>
//                         <a href="" className="text-reset notification-item"></a>
//                         <a href="" className="text-reset notification-item"></a>
//                         <a href="" className="text-reset notification-item"></a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="simplebar-placeholder"></div>
//               </div>
//             </div>
//           </div> */}
//           <div
//             className={`${
//               show
//                 ? "d-inline-block user-dropdown dropdown"
//                 : "d-inline-block user-dropdown dropdown show"
//             }`}
//             style={{ marginRight: "100px" }}
//           >
//             <button
//               className="btn header-item waves-effect"
//               onClick={() => setShow(!show)}
//             >
//               <CgProfile
//                 fontSize={24}
//                 className="rounded-circle header-profile-user me-2"
//               />
//               <span
//                 style={{ fontSize: "0.8rem" }}
//                 className="d-none d-xl-inline-block ms-1 text-transform"
//               >
//                 Admin
//               </span>
//               <IoIosArrowDown
//                 className="d-none ms-1 d-xl-inline-block ms-2"
//                 fontSize={15}
//               />
//             </button>
//             <div
//               className={`${
//                 show
//                   ? "dropdown-menu-end dropdown-menu"
//                   : "dropdown-menu-end dropdown-menu show"
//               }`}
//             >
//               <Link className="dropdown-item">
//                 <RiWallet3Line className="align-middle me-2" fontSize={16} />
//                 My Wallet
//               </Link>
//               <div className="dropdown-divider"></div>
//               <span
//                 // to={"/"}
//                 onClick={handleLogout}
//                 className="text-danger  dropdown-item"
//               >
//                 <RiShutDownLine
//                   className="align-middle me-2 text-danger "
//                   fontSize={16}
//                 />
//                 Logout
//               </span>
//             </div>
//             {/* <div className="dropdown d-inline-block">
//               <button></button>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
