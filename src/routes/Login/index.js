import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import Image from "../../assets/logo-light.svg";
import { auth } from "../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useToasts } from "react-toast-notifications";
import Register from "../../components/Register";
import { useDispatch } from "react-redux";
import { setMobileNumber } from "../../redux/reducer/mobileNumber";
import { setFetching } from "../../redux/reducer/fetching";
import { checkIfUserExists } from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../../constant";

const Login = () => {
  const { addToast } = useToasts();
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [user, setUser] = useState(false);
  const [inputEnable, setInputEnable] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = useState(false);
  const recaptchaVerifierRef = useRef(null);
  const confirmationResultRef = useRef(null);

  // const fetching = useSelector((state) => state.fetching);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    recaptchaVerifierRef.current = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );
  }, []);

  const isIndianPhoneNumber = (phoneNumber) => {
    const regex = /^\+91[6-9]\d{9}$/;
    return regex.test(phoneNumber) && phoneNumber.length >= 10;
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    let phoneNumber = value.trim(); // Trim whitespace from the phone number

    // Remove any existing "+91" country code
    phoneNumber = phoneNumber.replace("+91", "");

    // Add the "+91" country code if the phone number is not empty
    const formattedPhoneNumber = phoneNumber ? `+91${phoneNumber}` : "";

    setPhoneNumber(formattedPhoneNumber);
    const isValid = isIndianPhoneNumber(formattedPhoneNumber); // Check validity with country code
    setIsValid(isValid);
  };

  const handleOtpChange = (event) => {
    const { value } = event.target;
    setOtp(value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const onSignup = async (e) => {
    if (e) {
      e.preventDefault();
    }
    dispatch(setFetching(true));
    const formatPh = phoneNumber;
    const convertedNumber = formatPh.replace("+91", "");
    try {
      const response = await checkIfUserExists(convertedNumber);
      console.log(response);
      if (response.status === 200) {
        addToast("Congratulations! You have successfully logged in!", {
          appearance: "success",
        });
        dispatch(setFetching(false));
        const authToken = response.data.token;
        localStorage.setItem(AUTH_TOKEN_KEY, authToken);
        // console.log(authToken);
        if (authToken) {
          navigate("/account");
        }
      }
    } catch (error) {
      addToast("User does not exist in the database", {
        appearance: "error",
      });
      sendOTP(formatPh);
    }
  };

  const sendOTP = (formatPh) => {
    const appVerifier = recaptchaVerifierRef.current;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        confirmationResultRef.current = confirmationResult;
        // Assign confirmationResult to confirmationResultRef.current
        dispatch(setFetching(false));
        addToast("OTP sent successfully!", {
          appearance: "success",
        });
        setInputEnable(false);
        setShow(true);
      })
      .catch((error) => {
        console.log("Firebase error:", error.message, error);
        // Handle error while sending OTP
        addToast("Failed to send OTP. Please try again later.", {
          appearance: "error",
        });
        dispatch(setFetching(false));
      });
  };

  const onOTPVerify = (e) => {
    dispatch(setFetching(true));
    e.preventDefault();
    if (confirmationResultRef.current) {
      // Check if confirmationResultRef.current is not null
      if (otp.length === 6 && /^\d+$/.test(otp)) {
        confirmationResultRef.current
          .confirm(otp)
          .then(async (res) => {
            console.log(res);
            addToast("Mobile OTP Verified Successfully!", {
              appearance: "success",
            });
            dispatch(setFetching(false));
            dispatch(setMobileNumber(phoneNumber));
            setUser(res.user);
          })
          .catch((err) => {
            console.log(err);
            addToast("Invalid OTP. Please enter the correct code.", {
              appearance: "error",
            });
          });
      } else {
        addToast("Please enter a valid 6-digit OTP.", {
          appearance: "error",
        });
      }
    } else {
      console.log("No confirmation result available");
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    onSignup();
  };

  return (
    <div className="form-body">
      <div className="website-logo">
        <div className="recaptcha-container" id="recaptcha-container"></div>
        <a href="index.html">
          <div className="logo">
            <img className="logo-size" src={Image} alt="" />
          </div>
        </a>
      </div>
      <div className="row">
        <div className="img-holder">
          <div className="bg"></div>
          <div className="info-holder"></div>
        </div>
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              {user ? (
                <Register phoneNumber={phoneNumber} />
              ) : (
                <>
                  <h3>Get more things done with Loggin platform.</h3>
                  <p>
                    Access to the most powerful tool in the entire design and
                    web industry.
                  </p>
                  <form>
                    <input
                      className="form-control"
                      type="text"
                      name="number"
                      placeholder="Enter Phone Number"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      disabled={!inputEnable}
                      required
                    />
                    {isFocused && !isValid && (
                      <span style={{ color: "red" }}>
                        Please enter a valid phone number.
                      </span>
                    )}
                    <input
                      className="form-control"
                      type="number"
                      name="otp"
                      onChange={handleOtpChange}
                      placeholder="Enter OTP"
                      disabled={inputEnable}
                      required
                    />

                    <div className="form-button">
                      {show ? (
                        <button
                          id="submit"
                          type="submit"
                          className="ibtn"
                          onClick={onOTPVerify}
                        >
                          Verify OTP
                        </button>
                      ) : (
                        <button
                          id="submit"
                          type="submit"
                          className="ibtn"
                          disabled={!isValid}
                          onClick={handleSignupClick}
                        >
                          Send OTP
                        </button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
