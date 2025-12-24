import React from "react";
import Layout from "../common/Layout";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../common/https"
import logo from "../../assets/images/logo.png"; 
import { toast } from "react-toastify";

const UserRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((result) => {
        if (result.status === 200) {
            toast.success(result.message);
            navigate('/account/login');
        } else {
            const formErrors = result.errors;
            Object.keys(formErrors).forEach((field) => {
            setError(field, { message: formErrors[field][0] });
            })
        }
    });
  };

  return (
    <Layout>
        <div className="user-register-page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="register-card">
                    {/* LOGO */}
                    <div className="text-center mb-3">
                        <img src={logo} alt="Logo" className="user-register-logo" />
                    </div>
        
                    <h3 className="text-center mb-4">Register</h3>

                    <div className="mb-4">
                        <label className="form-label">Name</label>
                        <input
                        {...register('name', {
                            required: 'The name field is required',
                        })}
                        type="text"
                        className={`form-control ${errors.name && 'is-invalid'}`}
                        placeholder="Enter Name"
                        />
                        {errors.name && (
                        <div className="invalid-feedback">
                            {errors.name.message}
                        </div>
                        )}
                    </div>
        
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
                        Register
                    </button>

                    <div className="d-flex pt-3 justify-content-center">
                        Already have an account ? &nbsp; <Link to="/account/login">Login</Link>
                    </div>
                </div>
            </form>
        </div>
    </Layout>
  )
};

export default UserRegister;
