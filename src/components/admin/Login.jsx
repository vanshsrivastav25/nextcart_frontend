import React, { useContext } from "react";
import Layout from "../common/Layout";
import { useForm } from "react-hook-form";
import { apiUrl } from "../common/https";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuth";

import logo from "../../assets/images/logo.png"; // 👈 YOUR WEBSITE LOGO

const Login = () => {
  const { login } = useContext(AdminAuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await fetch(`${apiUrl}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          const adminInfo = {
            token: result.token,
            id: result.id,
            name: result.name,
          };

          localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
          login(adminInfo);
          navigate("/admin/dashboard");
        } else {
          toast.error(result.message);
        }
      });
  };

  return (
    <Layout>
      <div className="admin-login-page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login-card">
            {/* LOGO */}
            <div className="text-center mb-3">
              <img src={logo} alt="Logo" className="admin-login-logo" />
            </div>

            <h3 className="text-center mb-4">Admin Login</h3>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                {...register('email', {
                  required: 'The email field is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="text"
                className={`form-control ${errors.email && 'is-invalid'}`}
                placeholder="Enter Email"
              />
              {errors.email && (
                <div className="invalid-feedback">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                {...register('password', {
                  required: 'The password field is required',
                })}
                type="password"
                className={`form-control ${errors.password && 'is-invalid'}`}
                placeholder="Enter Password"
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            <button className="btn btn-primary w-100">
              Login
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
};

export default Login;
