import { Link, useNavigate } from "react-router-dom"; 
import { useState } from "react";
import axios from "axios";

let baseUrl = import.meta.env.VITE_BASE_URL;

function Signup() {
  const navigate = useNavigate(); 
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});

  const validateForm = () => {
    const formError = {};

    if (!signUpData.name.trim()) {
      formError.name = "Name is required";
    }

    if (!signUpData.email.trim()) {
      formError.email = "Email is required";
    }

    if (!signUpData.password) {
      formError.password = "Password is required";
    }

    if (!signUpData.confirmPassword) {
      formError.confirmPassword = "Confirm Password is required";
    } else if (signUpData.password !== signUpData.confirmPassword) {
      formError.confirmPassword = "Passwords do not match";
    }

    return formError; 
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const currentErrors = validateForm();
    setError(currentErrors);

    
    if (Object.keys(currentErrors).length === 0) {
      axios
        .post(`${baseUrl}/signup`, signUpData)
        .then((res) => {
          let{success,message,token} = res.data

          if(success){
            alert(message)
            localStorage.setItem("auth_token",token)

            navigate("/admin"); 

          }
          
        })
        .catch((err) => {
          console.error("API Error:", err.response?.data || err.message);
          let  {success,message} = err.response.data;
          if(success===false){
            alert(message)
          }
         
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
    
    if (error[name]) {
      setError({ ...error, [name]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-xl md:grid-cols-2">
          <div className="hidden bg-blue-600 px-10 py-12 text-white md:flex md:flex-col md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Create your account</h1>
              <p className="mt-4 text-sm leading-6 text-blue-100">
                Sign up to access your dashboard, manage your details, and stay connected.
              </p>
            </div>

            <div className="rounded-md border border-blue-400 bg-blue-500/40 p-5">
              <p className="text-sm font-semibold">Already registered?</p>
              <p className="mt-2 text-sm text-blue-100">
                Use your existing credentials to continue from where you left off.
              </p>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Signup</h2>
              <p className="mt-2 text-sm text-slate-500">
                Fill in your information to get started.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={signUpData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {error.name && (
                  <p className="mt-1 text-sm text-red-500">{error.name}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={signUpData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {error.email && (
                  <p className="mt-1 text-sm text-red-500">{error.email}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={signUpData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {error.password && (
                  <p className="mt-1 text-sm text-red-500">{error.password}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={signUpData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {error.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{error.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                className="h-11 w-full rounded-md bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Sign Up
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/" className="font-semibold text-blue-600 hover:text-blue-700">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;