import React, { useState } from "react";
import "./index.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  MdOutlineThumbUpOffAlt,
  MdOutlineThumbDownOffAlt,
} from "react-icons/md";
import { BsHourglassSplit, BsDot } from "react-icons/bs";
const Table = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = data.slice(firstIndex, lastIndex);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    // <div className="table-container">
    //   <table className="tables">
    //     <thead className="table-head">
    //       <tr className="head-tr">
    //         <th>
    //           <input type="checkbox" id="checkbox" />
    //         </th>
    //         <th>ID</th>
    //         <th>Name</th>
    //         <th>Age</th>
    //         <th>Phone Number</th>
    //         <th>Email</th>
    //         <th>Status</th>
    //       </tr>
    //     </thead>
    //     <tbody className="table-body">
    //       {currentData.map((row) => (
    //         <tr className="body-tr" key={row.id}>
    //           <td>
    //             <input type="checkbox" id="checkbox" />
    //           </td>
    //           <td>{row.id}</td>
    //           <td>{row.column1}</td>
    //           <td>{row.column2}</td>
    //           <td>{row.column3}</td>
    //           <td>{row.column3}</td>
    //           <td>
    //             {/* <button className="status-button-approved">
    //               <MdOutlineThumbUpOffAlt />
    //               &nbsp; Approve
    //             </button> */}
    //             <button className="status-button-pending">
    //               <BsHourglassSplit />
    //               &nbsp; Pending
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   <div className="pagination">
    //     {data.length > 0 && (
    //       <ul className="pagination-list">
    //         <li
    //           className={`pagination-item ${
    //             currentPage === 1 ? "disabled" : ""
    //           }`}
    //           onClick={() => currentPage !== 1 && paginate(currentPage - 1)}
    //         >
    //           <AiOutlineLeft />
    //         </li>
    //         {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
    //           (_, index) => (
    //             <li
    //               key={index}
    //               className={`pagination-item ${
    //                 currentPage === index + 1 ? "active" : ""
    //               }`}
    //               onClick={() => paginate(index + 1)}
    //             >
    //               {index + 1}
    //             </li>
    //           )
    //         )}
    //         <li
    //           className={`pagination-item ${
    //             currentPage === Math.ceil(data.length / itemsPerPage)
    //               ? "disabled"
    //               : ""
    //           }`}
    //           onClick={() =>
    //             currentPage !== Math.ceil(data.length / itemsPerPage) &&
    //             paginate(currentPage + 1)
    //           }
    //         >
    //           <AiOutlineRight />
    //         </li>
    //       </ul>
    //     )}
    //   </div>
    // </div>
    <div className="table-container">
      <div className="table-wrapper">
        <table className="tables">
          <thead className="table-head">
            <tr className="head-tr">
              <th>
                <input type="checkbox" id="checkbox" />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Componey</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {data.length > 0 ? (
              data.map((user, index) => (
                <tr className="body-tr" key={index}>
                  {console.log(user)}
                  <td>
                    <input type="checkbox" id="checkbox" />
                  </td>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.companyName}</td>
                  <td>
                    {user.status == "compeleted" ? (
                      <span className="status-text-approved">
                        <MdOutlineThumbUpOffAlt />
                        &nbsp; Approved
                      </span>
                    ) : (
                      <span className="status-text-pending">
                        <BsDot fontSize={20} />
                        &nbsp; Active
                      </span>
                    )}
                  </td>
                  <td>
                    {user.status == "compeleted" ? (
                      <button className="status-button-approved">
                        <MdOutlineThumbUpOffAlt />
                        &nbsp; Approve
                      </button>
                    ) : (
                      <button className="status-button-pending">
                        <MdOutlineThumbDownOffAlt />
                        &nbsp; Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr
                className="body-tr"
                style={{ position: "relative", background: "none" }}
              >
                <td style={{ position: "absolute", top: "12px", left: "50%" }}>
                  <span style={{ color: "red" }}>No Data</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {data.length > 0 && (
          <ul className="pagination-list">
            <li
              className={`pagination-item ${
                currentPage === 1 ? "disabled" : ""
              }`}
              onClick={() => currentPage !== 1 && paginate(currentPage - 1)}
            >
              <AiOutlineLeft />
            </li>
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
              (_, index) => (
                <li
                  key={index}
                  className={`pagination-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </li>
              )
            )}
            <li
              className={`pagination-item ${
                currentPage === Math.ceil(data.length / itemsPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={() =>
                currentPage !== Math.ceil(data.length / itemsPerPage) &&
                paginate(currentPage + 1)
              }
            >
              <AiOutlineRight />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Table;
