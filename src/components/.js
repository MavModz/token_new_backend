import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [vendor, setVendor] = useState([]);

  async function getData() {
    const res = await axios.get("http://localhost:4200/admin/vendor", {
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGE4ZjA4MGFiNDA4NDlkZWNkNjA5NTQiLCJpYXQiOjE2ODg3OTMyODh9.ZyVASwcIj_Y2xFWfT7-OAla1zn5vn5Y2kNiICHwoEnY",
      },
    });
    console.log(res.data.vendors);
    setVendor(res.data.vendors);
  }
  useEffect(() => {
    getData();
  }, []);

  const handleClick = async (ele) => {
    const { _id } = ele;
    console.log(_id);
    const res = await fetch(`http://localhost:4200/admin/approval/${_id}`, {
      method: "PATCH",
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGE4ZjA4MGFiNDA4NDlkZWNkNjA5NTQiLCJpYXQiOjE2ODg3OTMyODh9.ZyVASwcIj_Y2xFWfT7-OAla1zn5vn5Y2kNiICHwoEnY",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen! Here are all the Vendor</h2>
      {vendor.map((ele) => {
        return (
          <>
            <h1>{ele.name}</h1>
            <button onClick={() => handleClick(ele)}>approve</button>
          </>
        );
      })}
    </div>
  );
}
