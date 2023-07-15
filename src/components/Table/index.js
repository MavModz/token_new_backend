import React, { useState, useEffect } from "react";
import "./index.css";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineClockCircle,
} from "react-icons/ai";
import {
  MdOutlineThumbUpOffAlt,
  MdOutlineThumbDownOffAlt,
  MdDeleteOutline,
} from "react-icons/md";
import { BsHourglassSplit, BsDot } from "react-icons/bs";
import {
  getAllVendors,
  vendorUpdate,
  vendorApprove,
  vendorReject,
  vendorDelete,
} from "../../Api/adminApi";
import { setFetching } from "../../redux/reducer/fetching";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [vendors, setVendors] = useState([]);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    // const token = localStorage.getItem("auth_token");
    dispatch(setFetching(true));

    try {
      const response = await getAllVendors();

      if (response.status === 200) {
        const data = response.data.vendors;
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
  const currentData = vendors.slice(firstIndex, lastIndex);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleApprove = async (id) => {
    const token = localStorage.getItem("auth_token");
    console.log("Approve", id);
    dispatch(setFetching(true));

    try {
      const response = await vendorApprove(id, token);
      console.log(response);
      if (response.status === 200) {
        console.log(response);
        // const data = response.data.vendors;
        // setVendors(data);
        dispatch(setFetching(false));
        addToast("Vendors Successfully updated!", {
          appearance: "success",
        });
        fetchVendors();
      }
    } catch (error) {
      console.log(error);
      dispatch(setFetching(false));
      addToast("vendor not found!", {
        appearance: "error",
      });
    }
    // Handle the approval logic here
  };

  // const handleReject = async (_id) => {
  //   console.log("Reject", _id);
  //   // Handle the rejection logic here
  //   const token = localStorage.getItem("auth_token");
  //   dispatch(setFetching(true));

  //   try {
  //     const response = await vendorReject(_id, token);
  //     console.log(response);
  //     if (response.status === 200) {
  //       console.log(response);
  //       // const data = response.data.vendors;
  //       // setVendors(data);
  //       dispatch(setFetching(false));
  //       addToast("Vendors Successfully updated!", {
  //         appearance: "success",
  //       });
  //     }
  //   } catch (error) {
  //     dispatch(setFetching(false));
  //     addToast("vendor not found!", {
  //       appearance: "error",
  //     });
  //   }
  //   // Handle the approval logic here
  // };

  const handleDelete = async (_id) => {
    console.log("Delete", _id);
    // Handle the rejection logic here
    const token = localStorage.getItem("auth_token");
    dispatch(setFetching(true));

    try {
      const response = await vendorDelete(_id, token);
      console.log(response);
      if (response.status === 200) {
        console.log(response);
        // const data = response.data.vendors;
        // setVendors(data);
        dispatch(setFetching(false));
        addToast("Vendors Successfully updated!", {
          appearance: "success",
        });
        fetchVendors();
      }
    } catch (error) {
      dispatch(setFetching(false));
      addToast("vendor not found!", {
        appearance: "error",
      });
    }
    // Handle the delete logic here
  };

  return (
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
              <th>Email</th>
              <th>Phone Number</th>
              <th>Company</th>
              <th>Status</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {vendors.length > 0 ? (
              currentData.map((user, index) => (
                <tr className="body-tr" key={index}>
                  <td>
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.companyName}</td>
                  <td>
                    {user.status === "compeleted" && (
                      <span className="status-text-approved">
                        <MdOutlineThumbUpOffAlt />
                        &nbsp;Approved
                      </span>
                    )}

                    {user.status === "pending" && (
                      <span className="status-text-pending">
                        <AiOutlineClockCircle />
                        &nbsp;Pending
                      </span>
                    )}
                    {user.status === "Reject" && (
                      <span className="status-text-reject">
                        <MdOutlineThumbDownOffAlt />
                        &nbsp;Reject
                      </span>
                    )}
                  </td>
                  <td>
                    {user.status === "pending" && (
                      <button
                        className="status-button-approved"
                        onClick={() => handleApprove(user._id)}
                      >
                        <MdOutlineThumbUpOffAlt />
                        &nbsp;Approve
                      </button>
                    )}
                  </td>
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
        {vendors.length > 0 && (
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
              length: Math.ceil(vendors.length / itemsPerPage),
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
                currentPage === Math.ceil(vendors.length / itemsPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={() =>
                currentPage !== Math.ceil(vendors.length / itemsPerPage) &&
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
