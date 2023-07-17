import React, { useState, useEffect } from "react";
import "./index.css";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";
import {
  getAllProducts,
  addProducts,
  editProducts,
  deleteProducts,
} from "../../Api/adminApi";
import { setFetching } from "../../redux/reducer/fetching";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import AddProductModal from "../../components/AddProductModal";
import EditProductModal from "../../components/EditProductModal";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [vendors, setVendors] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState("");
  const [user, setUser] = useState({});
  const [newProduct, setNewProduct] = useState({
    name: "",
    rating: "",
    price: "",
  });
  const [editProduct, setEditProduct] = useState({
    name: "",
    rating: "",
    price: "",
  });
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    document.title = "Product List";
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const token = localStorage.getItem("auth_token");
    dispatch(setFetching(true));

    try {
      const response = await getAllProducts(token);

      if (response.status === 200) {
        const data = response.data.products;
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

  const handleAddProduct = async () => {
    const token = localStorage.getItem("auth_token");
    dispatch(setFetching(true));
    try {
      const response = await addProducts(token, newProduct);
      console.warn(response);
      if (response.status === 201) {
        addToast("Product added successfully!", {
          appearance: "success",
        });
        fetchVendors();
      } else {
        addToast("Error adding product. Please try again later!", {
          appearance: "error",
        });
      }
    } catch (error) {
      addToast("Error adding product. Please try again later!", {
        appearance: "error",
      });
    } finally {
      dispatch(setFetching(false));
      setShowAddModal(false);
      setNewProduct({
        name: "",
        rating: "",
        price: "",
      });
    }
  };

  const handleEditProduct = async (id) => {
    const token = localStorage.getItem("auth_token");
    dispatch(setFetching(true));
    try {
      const response = await editProducts(token, id, editProduct);
      if (response.status === 200) {
        setShowEditModal(false);
        addToast("Product edited successfully!", {
          appearance: "success",
        });
        fetchVendors();
      } else {
        addToast("Error editing product. Please try again later!", {
          appearance: "error",
        });
      }
    } catch (error) {
      addToast("Error editing product. Please try again later!", {
        appearance: "error",
      });
    } finally {
      dispatch(setFetching(false));
      setEditProductId("");
      setEditProduct({
        name: "",
        rating: "",
        price: "",
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem("auth_token");
    dispatch(setFetching(true));
    try {
      const response = await deleteProducts(token, id);
      if (response.status === 200) {
        addToast("Product deleted successfully!", {
          appearance: "success",
        });
        fetchVendors();
      } else {
        addToast("Error deleting product. Please try again later!", {
          appearance: "error",
        });
      }
    } catch (error) {
      addToast("Error deleting product. Please try again later!", {
        appearance: "error",
      });
    } finally {
      dispatch(setFetching(false));
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const allRowIds = vendors.map((user) => user._id);
      setSelectedRows(allRowIds);
    }
    setSelectAll(!selectAll);
  };

  const handleEditButtonClick = (user, id) => {
    setUser(user);
    setEditProductId(id);
    setShowEditModal(true);
  };
  console.log(user);
  return (
    <div className="table-subContainer">
      <div
        className="distance-between"
        style={{ justifyContent: "space-between" }}
      >
        <h5>Product List</h5>
        <button
          className="status-edit-delete"
          onClick={() => setShowAddModal(true)}
        >
          <AiOutlinePlus fontSize={20} /> Add Product
        </button>
      </div>
      <div className="table-container">
        <div className="table-wrapper">
          <table className="tables">
            <thead className="table-head">
              <tr className="head-tr">
                <th>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>ID</th>
                <th>Name</th>
                <th>Rating</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {vendors?.length > 0 ? (
                currentData?.map((user, index) => (
                  <tr className="body-tr" key={index}>
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox"
                        id={`checkbox-${index}`}
                        checked={selectedRows.includes(user._id)}
                        onChange={() => handleSelectRow(user._id)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.rating}</td>
                    <td>{user.price}</td>
                    <td className="distance-between">
                      <button
                        className="status-edit-delete"
                        onClick={() => {
                          handleEditButtonClick(user, user._id);
                        }}
                      >
                        <AiOutlineEdit fontSize={18} />
                      </button>
                      &nbsp; &nbsp; &nbsp;
                      <button
                        className="status-button-delete"
                        onClick={() => handleDeleteProduct(user._id)}
                      >
                        <MdDeleteOutline fontSize={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="body-tr">
                  <td colSpan="6" className="no-data">
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
      {showAddModal && (
        <AddProductModal
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleAddProduct={handleAddProduct}
          setShowAddModal={setShowAddModal}
        />
      )}
      {showEditModal && (
        <EditProductModal
          user={user}
          editProductId={editProductId}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
          handleEditProduct={handleEditProduct}
          setShowEditModal={setShowEditModal}
        />
      )}
    </div>
  );
};

export default ProductList;
