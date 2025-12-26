import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiUrl } from "../common/https";
import { toast } from "react-toastify";
import Layout from "../common/Layout";
import logo from "../../assets/images/logo.png";

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    // Email get karein from location state
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      // Agar email nahi mila toh register page pe bhejein
      navigate("/account/register");
    }
  }, [location, navigate]);

  useEffect(() => {
    // Timer setup karein
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace handle karein
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter 6-digit OTP");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/account/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otpString,
        }),
      });

      const result = await response.json();

      if (result.status === 200) {
        toast.success(result.message);
        navigate("/account/login", {
          state: { message: "Email verified successfully. Please login." },
        });
      } else {
        toast.error(result.message || "Verification failed");
        // Reset OTP on error
        setOtp(["", "", "", "", "", ""]);
        document.getElementById("otp-0").focus();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setIsResending(true);

    try {
      const response = await fetch(`${apiUrl}/account/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.status === 200) {
        toast.success(result.message);
        setTimer(60);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        document.getElementById("otp-0").focus();
      } else {
        toast.error(result.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Layout>
      <div className="otp-verification-page">
        <div className="otp-card">
          {/* LOGO */}
          <div className="text-center mb-3">
            <img src={logo} alt="Logo" className="otp-logo" />
          </div>

          <h3 className="text-center mb-3">Verify Your Email</h3>
          
          <p className="text-center text-muted mb-4">
            We have sent a 6-digit OTP to <strong>{email}</strong>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label d-block text-center mb-3">
                Enter OTP
              </label>
              
              <div className="otp-input-container d-flex justify-content-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="form-control text-center otp-digit"
                    style={{ width: "50px", height: "60px", fontSize: "24px" }}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            <div className="text-center mb-3">
              {!canResend ? (
                <p className="text-muted">
                  Resend OTP in <strong>{formatTime(timer)}</strong>
                </p>
              ) : (
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={handleResendOTP}
                  disabled={isResending}
                >
                  {isResending ? "Resending..." : "Resend OTP"}
                </button>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading || otp.join("").length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </button>

            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => navigate("/account/register")}
              >
                Use different email
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default OTPVerification;