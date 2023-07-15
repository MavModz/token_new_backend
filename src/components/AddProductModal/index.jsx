import React from "react";
import "./index.css";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

const AddProductModal = ({
  newProduct,
  setNewProduct,
  handleAddProduct,
  setShowAddModal,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="distance-between justifyBetween">
          <h4>Add Product</h4>
          <button
            className="status-button-delete"
            onClick={() => setShowAddModal(false)}
          >
            <AiOutlineClose fontSize={20} />
          </button>
        </div>
        <div style={{ marginTop: "30px" }}>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="Name"
          />
          <input
            type="text"
            value={newProduct.rating}
            onChange={(e) =>
              setNewProduct({ ...newProduct, rating: e.target.value })
            }
            placeholder="Rating"
          />
          <input
            type="text"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            placeholder="Price"
          />
          <div className="distance-between ">
            <button className="status-edit-delete " onClick={handleAddProduct}>
              <AiOutlinePlus fontSize={20} />
              &nbsp; Add
            </button>
            <button
              className="status-button-delete"
              onClick={() => setShowAddModal(false)}
            >
              <AiOutlineClose fontSize={20} />
              &nbsp; Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
