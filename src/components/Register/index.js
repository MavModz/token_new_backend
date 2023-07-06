import React, { useState } from "react";
import { useSelector } from "react-redux";
import { register } from "../../Api/api";
import { useToasts } from "react-toast-notifications";
const Register = () => {
  const mobileNumber = useSelector((state) => state.mobileNumber.number);
  // console.log(mobileNumber);
  const convertedNumber = mobileNumber.replace("+91", "");
  const [user, setUser] = useState({
    mob: "",
    name: "",
    DOB: "",
    email: "",
  });
  const { addToast } = useToasts();
  const getUserData = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const dobParts = user.DOB.split("-");
    const day = dobParts[0];
    const month = dobParts[1];
    const year = dobParts[2];
    const DOB = `${day}-${month}-${year}`;
    const mob = convertedNumber;

    // Create a new object with the updated user data
    const updatedUser = { ...user, mob, DOB };

    // Perform the registration logic with the updated user data
    // ...

    // Reset the form after registration
    setUser({ mob: "", name: "", DOB: "", email: "" });
    register(updatedUser)
      .then((response) => {
        if (response.status === 201) {
          addToast("User successfully created!", { appearance: "success" });
        }
      })
      .catch((error) => {
        addToast("User already exists!", { appearance: "error" });
      });
    // Print the updated user data
    console.log(updatedUser);
  };

  // console.log(user);
  return (
    <div className="form-items">
      <h3>Get more things done with Register platform.</h3>
      <p>
        Access to the most powerful tool in the entire design and web industry.
      </p>
      <form onSubmit={handleRegister}>
        <input
          className="form-control"
          type="text"
          name="name"
          placeholder="Enter Username"
          value={user.name}
          onChange={getUserData}
          required
        />
        <input
          className="form-control"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={getUserData}
          required
        />
        <input
          className="form-control"
          type="text"
          name="DOB"
          placeholder="Enter Date of Birth (DD-MM-YYYY)"
          value={user.DOB}
          onChange={getUserData}
          required
        />
        <input
          className="form-control"
          type="text"
          name="number"
          placeholder="Enter Phone Number"
          defaultValue={mobileNumber}
          disabled={true}
          required
        />

        <div className="form-button">
          <button id="submit" type="submit" className="ibtn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
