import axios from "axios";
import React, { useEffect, useState } from "react";

function VendorList() {
  const [vendors, setVendors] = useState([]);
  const getAllVendors = async (token) => {
    try {
      const response = await axios.get("http://localhost:4200/admin/vendor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200) {
        console.log(response.data.vendors);
        setVendors(response.data.vendors);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    console.log(token);
    getAllVendors(token);

    return () => {};
  }, []);

  return (
    <div class="overflow-scroll">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Company</th>
          
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => {
            return (
              <tr>
                <td>{vendor.name}</td>
                <td>{vendor.phoneNumber}</td>
                <td>{vendor.email}</td>
                <td>{vendor.companyName}</td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default VendorList;
