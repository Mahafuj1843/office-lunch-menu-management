import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorToast, IsEmail, IsEmpty, IsPassword } from '../helpers/formHelper';
import { LoginRequest } from '../apiRequests/authRequest';

const LoginPage = () => {
    const [show, setShow] = useState(false)
    const [user, setUser] = useState({
        email: "",
        pass: "",
    });

    const handleChange = (e) => {
        setUser((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (IsEmail(user.email)) {
            ErrorToast("Invalid email address.")
        }
        else {
            const result = await LoginRequest(user)
            const intendedRoute = localStorage.getItem("intendedRoute") || "/";
            setTimeout(() => {
                if (result) window.location.href = intendedRoute;
            }, 1500)
        }
    }


    return (
        <Fragment>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 overflow-auto">
                    <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                        LunchHub
                    </Link>
                    <form onSubmit={handleSubmit} className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Sign in to your account
                            </h1>
                            <div className="space-y-2 md:space-y-4">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                    <input onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 " placeholder="e.g. name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="pass" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                            <label onClick={() => setShow(!show)} className="hover:bg-gray-200 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" for="toggle">
                                                {show ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" /> <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" /> <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                                    </svg>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-eye" viewBox="0 0 16 16">
                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" /> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                    </svg>
                                                }
                                            </label>
                                        </div>
                                        <input onChange={handleChange} type={show ? "text" : "password"} name="pass" id="pass" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 " required="" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="checkbox w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-black " required="" />
                                        </div>
                                        <div className="ml-1 md:ml-3 text-sm">
                                            <label for="remember" className="text-xs md:text-sm text-gray-500 ">Remember me</label>
                                        </div>
                                    </div>
                                    <Link to="/forgetPassword" className="text-xs md:text-sm font-medium text-black hover:underline ">Forgot password?</Link>
                                </div>
                                <button type="submit" className="w-full text-white bg-black hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                                <p className="text-sm font-light text-gray-500 ">
                                    Don’t have an account yet? <Link to="/register" className="font-medium text-black hover:underline ">Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </Fragment>
    )
}

export default LoginPage