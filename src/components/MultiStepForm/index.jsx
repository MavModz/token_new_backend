// // import React, { useState } from "react";
// // import "./index.css";

// // const MultiStepForm = () => {
// //   const [compony, setCompony] = useState(false);
// //   const [owner, setOwner] = useState(false);
// //   return (
// //     <div className="card">
// //       <div className="card-body">
// //         <h4 className="card-title mb-4">Basic pills Wizard</h4>
// //         <div className="twitter-bs-wizard">
// //           <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
// //             <li className="nav-item">
// //               <a className={`${compony ? "active nav-link" : " nav-link"}`}>
// //                 <span className="step-number" onClick={() => setCompony(true)}>
// //                   01
// //                 </span>
// //                 <span className="step-title">Company Details</span>
// //               </a>
// //             </li>
// //             <li className="nav-item">
// //               <a className={`${owner ? "active nav-link" : " nav-link"}`}>
// //                 <span className="step-number" onCanPlay={() => setOwner(true)}>
// //                   02
// //                 </span>
// //                 <span className="step-title">Owner Details</span>
// //               </a>
// //             </li>
// //             <li className="nav-item">
// //               <a className="active nav-link">
// //                 <span className="step-number">03</span>
// //                 <span className="step-title">Product Listing</span>
// //               </a>
// //             </li>
// //             <li className="nav-item">
// //               <a className="active nav-link">
// //                 <span className="step-number">04</span>
// //                 <span className="step-title">Coupon Code Value</span>
// //               </a>
// //             </li>
// //           </ul>
// //           <form className="tab-content twitter-bs-wizard-tab-content">
// //             <div className={`${"tab-pane active"}`}>
// //               {compony ? (
// //                 <div className="dashboard-form">
// //                   <div className="form-row">
// //                     <div className="form-col">
// //                       <input
// //                         type="text"
// //                         id="firstName"
// //                         name="companyName"
// //                         placeholder="Company Name"
// //                         // value={formData.companyName}
// //                         // onChange={handleChange}
// //                         required
// //                       />
// //                     </div>
// //                     <div className="form-col">
// //                       <input
// //                         type="text"
// //                         id="lastName"
// //                         name="companyAddress"
// //                         placeholder="Company Address"
// //                         // value={formData.companyAddress}
// //                         // onChange={handleChange}
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                   <div className="form-row">
// //                     <div className="form-col">
// //                       <label htmlFor="companyLogo">Company Logo:</label>
// //                       <input
// //                         type="file"
// //                         id="firstName"
// //                         name="companyLogo"
// //                         accept="image/*"
// //                         // onChange={handleChange}
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 ""
// //               )}
// //             </div>

// //             <div className={`${"tab-pane active"}`}>
// //               {owner ? (
// //                 <div className="dashboard-form">
// //                   <div className="form-row">
// //                     <div className="form-col">
// //                       <input
// //                         type="text"
// //                         id="firstName"
// //                         name="ownerName"
// //                         placeholder="Owner Name"
// //                         // value={formData.ownerName}
// //                         // onChange={handleChange}
// //                         required
// //                       />
// //                     </div>
// //                     <div className="form-col">
// //                       <input
// //                         type="text"
// //                         id="lastName"
// //                         name="ownerAddress"
// //                         placeholder="Owner Address"
// //                         // value={formData.ownerAddress}
// //                         // onChange={handleChange}
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                   <div className="form-row">
// //                     <div className="form-col">
// //                       <label htmlFor="ownerProfileImage">
// //                         Owner Profile Image:
// //                       </label>
// //                       <input
// //                         type="file"
// //                         id="firstName"
// //                         name="ownerProfileImage"
// //                         accept="image/*"
// //                         // onChange={handleChange}
// //                         required
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 ""
// //               )}
// //             </div>
// //             <div className={`${"tab-pane active" && "tab-pane "}`}>
// //               <div className="dashboard-form">
// //                 <div className="form-row">
// //                   <div className="form-col">
// //                     <input
// //                       type="text"
// //                       id="firstName"
// //                       name="productName"
// //                       placeholder="Product Name"
// //                       // value={formData.productName}
// //                       // onChange={handleChange}
// //                       required
// //                     />
// //                   </div>
// //                   <div className="form-col">
// //                     <textarea
// //                       id="lastName"
// //                       name="productDescription"
// //                       placeholder="Product Description"
// //                       // value={formData.productDescription}
// //                       // onChange={handleChange}
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="form-row">
// //                   <div className="form-col">
// //                     <label htmlFor="productImage" className="file-input-label">
// //                       Product Image
// //                     </label>
// //                     <input
// //                       type="file"
// //                       id="firstName"
// //                       name="productImage"
// //                       accept="image/*"
// //                       // onChange={handleChange}
// //                       required
// //                     />
// //                   </div>
// //                   <div className="form-col">
// //                     <input
// //                       type="text"
// //                       id="lastName"
// //                       name="productPrice"
// //                       placeholder="Product Price"
// //                       // value={formData.productPrice}
// //                       // onChange={handleChange}
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className={`${"tab-pane active" && "tab-pane "}`}>
// //               <div className="dashboard-form">
// //                 <div className="form-row">
// //                   <div className="form-col">
// //                     <input
// //                       type="text"
// //                       id="firstName"
// //                       name="couponCodeValue"
// //                       placeholder="Coupon Code Value"
// //                       // value={formData.couponCodeValue}
// //                       // onChange={handleChange}
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </form>
// //           <ul className="pager wizard twitter-bs-wizard-pager-link">
// //             <li className="save-btn">Previous</li>
// //             <li className="save-btn">Next</li>
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MultiStepForm;

// import React, { useState } from "react";
// import "./index.css";
// import { LuCheckCircle } from "react-icons/lu";
// const MultiStepForm = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     companyName: "",
//     companyAddress: "",
//     companyLogo: null,
//     ownerName: "",
//     ownerAddress: "",
//     ownerProfileImage: null,
//     productName: "",
//     productDescription: "",
//     productImage: null,
//     productPrice: "",
//     couponCodeValue: "",
//   });
//   console.log(formData);
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

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };
//   return (
//     <div className="card">
//       <div className="table-wrapper">
//         <div className="card-body">
//           <div className="center">
//             <h4 className="card-title mb-4">Basic pills Wizard</h4>
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
//               <li className="nav-item">
//                 <a
//                   className={`nav-link ${currentStep === 4 ? "active" : ""}`}
//                   onClick={() => setCurrentStep(4)}
//                 >
//                   <span className="step-number">04</span>
//                   <span className="step-title">Coupon Code Value</span>
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   className={`nav-link ${currentStep === 5 ? "active" : ""}`}
//                   onClick={() => setCurrentStep(5)}
//                 >
//                   <span className="step-number">05</span>
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
//                         name="companyAddress"
//                         placeholder="Company Address"
//                         value={formData.companyAddress}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="form-row">
//                     <div className="form-col">
//                       <label htmlFor="companyLogo">Company Logo:</label>
//                       <input
//                         type="file"
//                         id="firstName"
//                         name="companyLogo"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         required
//                       />
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
//                         name="ownerName"
//                         placeholder="Owner Name"
//                         value={formData.ownerName}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="form-col">
//                       <input
//                         type="text"
//                         id="lastName"
//                         name="ownerAddress"
//                         placeholder="Owner Address"
//                         value={formData.ownerAddress}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="form-row">
//                     <div className="form-col">
//                       <label htmlFor="ownerProfileImage">
//                         Owner Profile Image:
//                       </label>
//                       <input
//                         type="file"
//                         id="firstName"
//                         name="ownerProfileImage"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {renderStep(
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
//                       <textarea
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
//                       <label
//                         htmlFor="productImage"
//                         className="file-input-label"
//                       >
//                         Product Image
//                       </label>
//                       <input
//                         type="file"
//                         id="firstName"
//                         name="productImage"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         required
//                       />
//                     </div>
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
//                   </div>
//                 </div>
//               )}

//               {renderStep(
//                 4,
//                 <div>
//                   <div className="form-row">
//                     <div className="form-col">
//                       <input
//                         type="text"
//                         id="firstName"
//                         name="couponCodeValue"
//                         placeholder="Coupon Code Value"
//                         value={formData.couponCodeValue}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {renderStep(
//                 5,
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
//                 {currentStep < 5 && (
//                   <li className="save-btn" onClick={handleNext}>
//                     Next
//                   </li>
//                 )}
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

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    companyLogo: null,
    ownerName: "",
    ownerAddress: "",
    ownerProfileImage: null,
    productName: "",
    productDescription: "",
    productImage: null,
    productPrice: "",
    couponCodeValue: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="card">
      <div className="table-wrapper">
        <div className="card-body">
          <div className="center">
            <h4 className="card-title mb-4">Basic pills Wizard</h4>
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
              <li className="nav-item">
                <a
                  className={`nav-link ${currentStep === 3 ? "active" : ""}`}
                  onClick={() => setCurrentStep(3)}
                >
                  <span className="step-number">03</span>
                  <span className="step-title">Product Listing</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${currentStep === 4 ? "active" : ""}`}
                  onClick={() => setCurrentStep(4)}
                >
                  <span className="step-number">04</span>
                  <span className="step-title">Coupon Code Value</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${currentStep === 5 ? "active" : ""}`}
                  onClick={() => setCurrentStep(5)}
                >
                  <span className="step-number">05</span>
                  <span className="step-title">Finish</span>
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
                        name="companyAddress"
                        placeholder="Company Address"
                        value={formData.companyAddress}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-col">
                      <input
                        type="file"
                        id="firstName"
                        name="companyLogo"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                      <label htmlFor="companyLogo">Company Logo:</label>
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
                        name="ownerName"
                        placeholder="Owner Name"
                        value={formData.ownerName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-col">
                      <input
                        type="text"
                        id="lastName"
                        name="ownerAddress"
                        placeholder="Owner Address"
                        value={formData.ownerAddress}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-col">
                      <input
                        type="file"
                        id="firstName"
                        name="ownerProfileImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                      <label htmlFor="ownerProfileImage">
                        Owner Profile Image:
                      </label>
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
                        name="productName"
                        placeholder="Product Name"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-col">
                      <textarea
                        id="lastName"
                        name="productDescription"
                        placeholder="Product Description"
                        value={formData.productDescription}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-col">
                      <input
                        type="file"
                        id="firstName"
                        name="productImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                      <label
                        htmlFor="productImage"
                        className="file-input-label"
                      >
                        Product Image
                      </label>
                    </div>
                    <div className="form-col">
                      <input
                        type="text"
                        id="lastName"
                        name="productPrice"
                        placeholder="Product Price"
                        value={formData.productPrice}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {renderStep(
                4,
                <div>
                  <div className="form-row">
                    <div className="form-col">
                      <input
                        type="text"
                        id="firstName"
                        name="couponCodeValue"
                        placeholder="Coupon Code Value"
                        value={formData.couponCodeValue}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {renderStep(
                5,
                <div>
                  <div className="row justify-content-center">
                    <div className="col-lg-6">
                      <div className="text-center">
                        <div className="mb-4">
                          <LuCheckCircle fontSize={40} color="#1cbb8c" />
                        </div>
                        <div>
                          <h5 className="text-muted">Confirm Detail</h5>
                          <p className="text-muted">
                            If several languages coalesce, the grammar of the
                            resulting
                          </p>
                        </div>
                      </div>
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
                {currentStep < 5 && (
                  <li className="save-btn" onClick={handleNext}>
                    Next
                  </li>
                )}
                {currentStep === 5 && <li className="save-btn">Submit</li>}
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
