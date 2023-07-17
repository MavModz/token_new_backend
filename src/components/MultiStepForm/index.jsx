// import React, { useState } from "react";
// import "./index.css";
// import { LuCheckCircle } from "react-icons/lu";
// import { addVendor } from "../../Api/adminApi";
// import { useToasts } from "react-toast-notifications";
// import { setFetching } from "../../redux/reducer/fetching";
// const MultiStepForm = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     companyName: "",
//     companyOwner: "",
//     name: "",
//     // companyLogo: null,
//     phoneNumber: "",
//     email: "",
//     // ownerProfileImage: null,
//     productName: "",
//     // productDescription: "",
//     // productImage: null,
//     // productPrice: "",
//     cash: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: files[0],
//     }));
//   };

//   const handleNext = () => {
//     setCurrentStep((prevStep) => prevStep + 1);
//   };

//   const handlePrevious = () => {
//     setCurrentStep((prevStep) => prevStep - 1);
//   };

//   const renderStep = (stepNumber, content) => {
//     return (
//       <div className={`tab-pane ${currentStep === stepNumber ? "active" : ""}`}>
//         {content}
//       </div>
//     );
//   };
//   const { addToast } = useToasts();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);

//     // try {
//     //   const response = await addVendor(formData);
//     //   if (response.status === 201) {
//     //     addToast("Vendor added Successfully", {
//     //       appearance: "success",
//     //     });
//     //   }
//     // } catch (error) {
//     //   addToast("Vendor added Successfully", {
//     //     appearance: "error",
//     //   });
//     // }
//   };

//   return (
//     <div className="card table-container">
//       <div className="table-wrapper">
//         <div className="card-body">
//           <div className="center">
//             <h4 className="card-title mb-4">Vendor Details</h4>
//           </div>
//           <div className="twitter-bs-wizard">
//             <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
//               <li className="nav-item">
//                 <a
//                   className={`nav-link ${currentStep === 1 ? "active" : ""}`}
//                   onClick={() => setCurrentStep(1)}
//                 >
//                   <span className="step-number">01</span>
//                   <span className="step-title">Company Details</span>
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   className={`nav-link ${currentStep === 2 ? "active" : ""}`}
//                   onClick={() => setCurrentStep(2)}
//                 >
//                   <span className="step-number">02</span>
//                   <span className="step-title">Owner Details</span>
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   className={`nav-link ${currentStep === 3 ? "active" : ""}`}
//                   onClick={() => setCurrentStep(3)}
//                 >
//                   <span className="step-number">03</span>
//                   <span className="step-title">Product Listing</span>
//                 </a>
//               </li>
//               {/* <li className="nav-item">
//                 <a
//                   className={`nav-link ${currentStep === 4 ? "active" : ""}`}
//                   onClick={() => setCurrentStep(4)}
//                 >
//                   <span className="step-number">04</span>
//                   <span className="step-title">Coupon Code Value</span>
//                 </a>
//               </li> */}
//               <li className="nav-item">
//                 <a
//                   className={`nav-link ${currentStep === 4 ? "active" : ""}`}
//                   onClick={() => setCurrentStep(4)}
//                 >
//                   <span className="step-number">04</span>
//                   <span className="step-title">Finish</span>
//                 </a>
//               </li>
//             </ul>
//             <form
//               className="tab-content twitter-bs-wizard-tab-content"
//               onSubmit={handleSubmit}
//             >
//               {renderStep(
//                 1,
//                 <div>
//                   <div className="form-row">
//                     <div className="form-col">
//                       <input
//                         type="text"
//                         id="firstName"
//                         name="companyName"
//                         placeholder="Company Name"
//                         value={formData.companyName}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="form-col">
//                       <input
//                         type="text"
//                         id="lastName"
//                         name="companyOwner"
//                         placeholder="Company Owner"
//                         value={formData.companyOwner}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="form-row">
//                     <div className="form-col">
//                       {/* <input
//                         type="file"
//                         id="firstName"
//                         name="companyLogo"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         required
//                       /> */}
//                       {/* <label htmlFor="companyLogo">Company Logo:</label> */}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {renderStep(
//                 2,
//                 <div>
//                   <div className="form-row">
//                     <div className="form-col">
//                       <input
//                         type="text"
//                         id="firstName"
//                         name="name"
//                         placeholder="Owner Name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="form-col">
//                       <input
//                         type="email"
//                         id="lastName"
//                         name="email"
//                         placeholder="Owner Email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="form-row">
//                     <div className="form-col">
//                       <input
//                         type="text"
//                         id="firstName"
//                         name="phoneNumber"
//                         placeholder="Mobile Number"
//                         value={formData.phoneNumber}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     {/* <div className="form-col"> */}
//                     {/* <input
//                         type="file"
//                         id="firstName"
//                         name="ownerProfileImage"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         required
//                       /> */}
//                     {/* <label htmlFor="ownerProfileImage">
//                         Owner Profile Image:
//                       </label> */}
//                     {/* </div> */}
//                   </div>
//                 </div>
//               )}

//               {/* {renderStep(
//                 3,
//                 <div>
//                   <div className="form-row">
//                     <div className="form-col">
//                       <input
//                         type="text"
//                         id="firstName"
//                         name="productName"
//                         placeholder="Product Name"
//                         value={formData.productName}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="form-col">
//                       <input
//                         type="text"
//                         id="lastName"
//                         name="productDescription"
//                         placeholder="Product Description"
//                         value={formData.productDescription}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="form-row">
//                     <div className="form-col">
//                       <input
//                         type="text"
//                         id="lastName"
//                         name="productPrice"
//                         placeholder="Product Price"
//                         value={formData.productPrice}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="form-col">
//                       <input
//                         type="file"
//                         id="firstName"
//                         name="productImage"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         required
//                       />
//                       <label
//                         htmlFor="productImage"
//                         className="file-input-label"
//                       >
//                         Product Image
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               )} */}

//               {renderStep(
//                 3,
//                 <div>
//                   <div className="form-row">
//                     <div className="form-col">
//                       <input
//                         type="text"
//                         id="firstName"
//                         name="cash"
//                         placeholder="Coupon Code Value"
//                         value={formData.cash}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {renderStep(
//                 4,
//                 <div>
//                   <div className="row justify-content-center">
//                     <div className="col-lg-6">
//                       <div className="text-center">
//                         <div className="mb-4">
//                           <LuCheckCircle fontSize={40} color="#1cbb8c" />
//                         </div>
//                         <div>
//                           <h5 className="text-muted">Confirm Detail</h5>
//                           <p className="text-muted">
//                             If several languages coalesce, the grammar of the
//                             resulting
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               <ul className="pager wizard twitter-bs-wizard-pager-link">
//                 {currentStep > 1 && (
//                   <li className="save-btn" onClick={handlePrevious}>
//                     Previous
//                   </li>
//                 )}
//                 <br />
//                 {currentStep < 3 && (
//                   <li className="save-btn" onClick={handleNext}>
//                     Next
//                   </li>
//                 )}
//                 {currentStep === 3 && <li className="save-btn">Submit</li>}
//               </ul>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MultiStepForm;

import React, { useState } from "react";
import "./index.css";
import { LuCheckCircle } from "react-icons/lu";
import { addVendor } from "../../Api/adminApi";
import { useToasts } from "react-toast-notifications";
import { setFetching } from "../../redux/reducer/fetching";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    companyOwner: "",
    name: "",
    phoneNumber: "",
    email: "",
    // productName: "",
    cash: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderStep = (stepNumber, content) => {
    return (
      <div className={`tab-pane ${currentStep === stepNumber ? "active" : ""}`}>
        {content}
      </div>
    );
  };

  const { addToast } = useToasts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await addVendor(formData);
      console.warn(response);
      if (response.status === 201) {
        addToast("Vendor added Successfully", {
          appearance: "success",
        });
      }
    } catch (error) {
      addToast("Vendor addition failed", {
        appearance: "error",
      });
    }
  };

  return (
    <div className="card table-container">
      <div className="table-wrapper">
        <div className="card-body">
          <div className="center">
            <h4 className="card-title mb-4">Vendor Details</h4>
          </div>
          <div className="twitter-bs-wizard">
            <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
              <li className="nav-item">
                <a
                  className={`nav-link ${currentStep === 1 ? "active" : ""}`}
                  onClick={() => setCurrentStep(1)}
                >
                  <span className="step-number">01</span>
                  <span className="step-title">Company Details</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${currentStep === 2 ? "active" : ""}`}
                  onClick={() => setCurrentStep(2)}
                >
                  <span className="step-number">02</span>
                  <span className="step-title">Owner Details</span>
                </a>
              </li>
              {/* <li className="nav-item">
                <a
                  className={`nav-link ${currentStep === 3 ? "active" : ""}`}
                  onClick={() => setCurrentStep(3)}
                >
                  <span className="step-number">03</span>
                  <span className="step-title">Product Listing</span>
                </a>
              </li> */}
              <li className="nav-item">
                <a
                  className={`nav-link ${currentStep === 3 ? "active" : ""}`}
                  onClick={() => setCurrentStep(3)}
                >
                  <span className="step-number">03</span>
                  <span className="step-title">Cash</span>
                </a>
              </li>
            </ul>
            <form
              className="tab-content twitter-bs-wizard-tab-content"
              onSubmit={handleSubmit}
            >
              {renderStep(
                1,
                <div>
                  <div className="form-row">
                    <div className="form-col">
                      <input
                        type="text"
                        id="firstName"
                        name="companyName"
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-col">
                      <input
                        type="text"
                        id="lastName"
                        name="companyOwner"
                        placeholder="Company Owner"
                        value={formData.companyOwner}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {renderStep(
                2,
                <div>
                  <div className="form-row">
                    <div className="form-col">
                      <input
                        type="text"
                        id="firstName"
                        name="name"
                        placeholder="Owner Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-col">
                      <input
                        type="email"
                        id="lastName"
                        name="email"
                        placeholder="Owner Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-col">
                      <input
                        type="text"
                        id="firstName"
                        name="phoneNumber"
                        placeholder="Mobile Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {renderStep(
                3,
                <div>
                  <div className="form-row">
                    <div className="form-col">
                      <input
                        type="text"
                        id="firstName"
                        name="cash"
                        placeholder="Coupon Code Value"
                        value={formData.cash}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <ul className="pager wizard twitter-bs-wizard-pager-link">
                {currentStep > 1 && (
                  <li className="save-btn" onClick={handlePrevious}>
                    Previous
                  </li>
                )}
                <br />
                {currentStep < 3 && (
                  <li className="save-btn" onClick={handleNext}>
                    Next
                  </li>
                )}
                {currentStep === 3 && (
                  <li className="save-btn" onClick={handleSubmit}>
                    Submit
                  </li>
                )}
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
