import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

let baseUrl = import.meta.env.VITE_BASE_URL;

export default function Login() {
  let navigate = useNavigate();
  let [loginData, setLoginData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  let [error, setError] = useState({});

  let handleChange = (e) => {
    let{ name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

let validateForm = () => {
    const formError = {};

    if (!loginData.email) {
      formError.email = "Email is required";
    }

    if (!loginData.password) {
      formError.password = "Password is required";
    }
if (!loginData.confirmPassword) {
      formError.confirmPassword ="Confirm Password is required";
    }
  else{

    axios.post(`${baseUrl}/login`,loginData)
     .then((res) => {
          let{success,message,token,role,email} = res.data

          if(role==="employee"){
            alert(message)
            localStorage.setItem("auth_token",token)
            navigate("/employee",{state:email}); 

          }
          else{
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
    // console.log("Login successful");
    // navigate("/admin");
  }
    return formError;
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    let formError = validateForm();
    setError(formError);

    
    
    if (Object.keys(formError).length === 0) {
      console.log("Login successful")
    }
  };



  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-white px-6 py-8 shadow-xl sm:px-10">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900">Login</h1>
            <p className="mt-2 text-sm text-slate-500">
              Enter your details to continue.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
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
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              {error.password && (
                <p className="mt-1 text-sm text-red-500">{error.password}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                confirm Password
              </label>
              <input
                type="confirmPassword"
                name="confirmPassword"
                value={loginData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your password"
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
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/signuppage"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
