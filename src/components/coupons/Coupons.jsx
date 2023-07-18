import axios from "axios";
import React, { useEffect, useState } from "react";

function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const getAllCoupons = async (token) => {
    console.log("this is token", token);
    const response = await axios.get("http://localhost:4200/admin/coupons", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status == 200) {
      setCoupons(response.data.newCoupons);
    }
  };
  console.log(coupons);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    console.log(token);
    getAllCoupons(token);

    return () => {};
  }, []);

  return (
    <div>
      <table className="table">
        <tbody>
          {coupons.map((item) => {
            return (
              <tr>
               
                <td>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <span>{item.couponCode}</span>
                        {/* <span>{'jo'}</span> */}
                    </div>
                </td>

                <td>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <span>{item.point}</span>
                        <span>Point</span>
                    </div>
                </td>
               
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Coupons;
