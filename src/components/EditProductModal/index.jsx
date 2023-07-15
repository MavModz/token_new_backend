import React from "react";
import "./index.css";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
const EditProductModal = ({
  user,
  editProductId,
  editProduct,
  setEditProduct,
  handleEditProduct,
  setShowEditModal,
}) => {
  console.log(user.name);
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="distance-between justifyBetween">
          <h4>Edit Product</h4>
          <button
            className="status-button-delete"
            onClick={() => setShowEditModal(false)}
          >
            <AiOutlineClose fontSize={20} />
          </button>
        </div>
        <div style={{ marginTop: "30px" }}>
          <input
            type="text"
            defaultValue={editProduct.name || user.name}
            onChange={(e) =>
              setEditProduct({ ...editProduct, name: e.target.value })
            }
            placeholder="Name"
          />
          <input
            type="text"
            defaultValue={editProduct.rating || user.rating}
            onChange={(e) =>
              setEditProduct({ ...editProduct, rating: e.target.value })
            }
            placeholder="Rating"
          />
          <input
            type="text"
            defaultValue={editProduct.price || user.price}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: e.target.value })
            }
            placeholder="Price"
          />
          <div className="distance-between ">
            <button
              className="status-edit-delete "
              onClick={() => handleEditProduct(editProductId)}
            >
              <AiOutlineSave fontSize={20} /> &nbsp; Save
            </button>
            <button
              className="status-button-delete"
              onClick={() => setShowEditModal(false)}
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

export default EditProductModal;
