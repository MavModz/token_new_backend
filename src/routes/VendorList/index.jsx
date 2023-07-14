import React, { useState, useEffect } from "react";
import "./index.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  MdOutlineThumbUpOffAlt,
  MdOutlineThumbDownOffAlt,
  MdDeleteOutline,
} from "react-icons/md";
import { BsHourglassSplit, BsDot } from "react-icons/bs";
import { vendorsList } from "../../Api/userApi";
import { setFetching } from "../../redux/reducer/fetching";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";

const VendorList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [vendors, setVendors] = useState([]);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    document.title = "Vendors List";
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const token = localStorage.getItem("auth_token");
    dispatch(setFetching(true));

    try {
      const response = await vendorsList(token);

      if (response.status === 200) {
        console.log(response);
        const data = response.data.Admins;
        console.log(data);
        setVendors(data);
      }
    } catch (error) {
      addToast("Error fetching data. Please try again later!", {
        appearance: "error",
      });
    } finally {
      dispatch(setFetching(false));
    }
  };

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = vendors?.slice(firstIndex, lastIndex) || [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleApprove = (id) => {
    console.log("Approve", id);
    // Handle the approval logic here
  };

  const handleReject = (id) => {
    console.log("Reject", id);
    // Handle the rejection logic here
  };

  const handleDelete = (id) => {
    console.log("Delete", id);
    // Handle the delete logic here
  };
  console.log(vendors);
  return (
    <div className="table-subContainer">
      <h5>Vendors List</h5>
      <div className="table-container">
        <div className="table-wrapper">
          <table className="tables">
            <thead className="table-head">
              <tr className="head-tr">
                <th>
                  <input type="checkbox" className="checkbox" />
                </th>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {vendors?.length > 0 ? (
                currentData?.map((user, index) => (
                  <tr className="body-tr" key={index}>
                    <td>
                      <input type="checkbox" className="checkbox" />
                    </td>

                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.cash}</td>
                    <td>
                      <button
                        className="status-button-delete"
                        onClick={() => handleDelete(user._id)}
                      >
                        <MdDeleteOutline fontSize={18} />
                        &nbsp;Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="body-tr">
                  <td colSpan="9" className="no-data">
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {vendors?.length > 0 && (
            <ul className="pagination-list">
              <li
                className={`pagination-item ${
                  currentPage === 1 ? "disabled" : ""
                }`}
                onClick={() => currentPage !== 1 && paginate(currentPage - 1)}
              >
                <AiOutlineLeft />
              </li>
              {Array.from({
                length: Math.ceil(vendors?.length / itemsPerPage),
              }).map((_, index) => (
                <li
                  key={index}
                  className={`pagination-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </li>
              ))}
              <li
                className={`pagination-item ${
                  currentPage === Math.ceil(vendors?.length / itemsPerPage)
                    ? "disabled"
                    : ""
                }`}
                onClick={() =>
                  currentPage !== Math.ceil(vendors?.length / itemsPerPage) &&
                  paginate(currentPage + 1)
                }
              >
                <AiOutlineRight />
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorList;
