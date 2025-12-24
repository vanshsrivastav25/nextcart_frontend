import React, { useContext } from 'react'
import Layout from '../common/Layout'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../common/https'
import { toast } from 'react-toastify';

import logo from '../../assets/images/logo.png';
import { AuthContext } from '../contexts/UserAuth';

const UserLogin = () => {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {login} = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = async (data) => {

    const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((result) => {

        if (result.status == 200) {
            const userInfo = {
                token: result.token,
                id: result.id,
                name: result.name,
            };

            localStorage.setItem("userInfo",JSON.stringify(userInfo));
            login(userInfo);
            navigate("/");
        } else {
            toast.error(result.message);
        }
    });
};

  return (
    <Layout>
        <div className="user-login-page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="login-card">
                    {/* LOGO */}
                    <div className="text-center mb-3">
                        <img src={logo} alt="Logo" className="user-login-logo" />
                    </div>
        
                    <h3 className="text-center mb-4">Login</h3>
        
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

                    <div className="d-flex pt-3 justify-content-center">
                        Don't have an account ? &nbsp; <Link to="/account/register">Register</Link>
                    </div>
                </div>
            </form>
        </div>
    </Layout>
  )
}

export default UserLogin