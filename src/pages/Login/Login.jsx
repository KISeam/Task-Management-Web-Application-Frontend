import React, { useState } from "react";
import loginImg from "../../assets/images/Login_Image.png";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    document.getElementById("password").focus(); // Focus on password field
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    if (password.length > 20) {
      alert("Password must not exceed 20 characters.");
      return;
    }
    if (!/^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|-]+$/.test(password)) {
      alert(
        "Password can only contain letters, numbers, and special characters."
      );
      return;
    }
    if (password.includes(" ")) {
      alert("Password cannot contain spaces.");
      return;
    }
    if (password === email) {
      alert("Password cannot be the same as your email.");
      return;
    }
    if (password === "password") {
      alert(
        "Password cannot be 'password'. Please choose a stronger password."
      );
      return;
    }
    if (password === "qwerty") {
      alert("Password cannot be 'qwerty'. Please choose a stronger password.");
      return;
    }
    if (password === "letmein") {
      alert("Password cannot be 'letmein'. Please choose a stronger password.");
      return;
    }

    try {
      // Send POST request to backend to authenticate the user
      const response = await api.post("/login", {
        email,
        password,
      });

      // Save the user data to localStorage after successful login
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");

      alert(error.response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <div className="bg-[#fafafa]">
      <div className="flex items-center justify-center lg:h-screen overflow-hidden">
        <div className="lg:w-1/2 w-full h-full hidden lg:block">
          <img
            src={loginImg}
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="lg:w-1/2 w-full">
          <div className="lg:w-[60%] w-full py-30 lg:py-0 mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4 text-black">
              Login
            </h1>
            <p className="text-center font-medium text-[#667085] mb-10">
              Welcome Back, Please Enter Your Details to Log In.
            </p>
            <form
              className="flex flex-col items-center space-y-4 w-full mx-auto"
              onSubmit={handleLogin}
            >
              <div className="space-y-2.5 w-full">
                <p className="text-start text-black font-semibold">
                  Email Address
                </p>
                <input
                  type="email"
                  placeholder="abcd@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border border-gray-300 p-2.5 px-5 text-gray-700 mb-4 w-full focus:outline-none"
                />
              </div>
              <div className="space-y-2.5 w-full">
                <p className="text-start text-black font-semibold">Password</p>
                <div className="flex items-center justify-between p-2.5 px-5 border border-gray-300 rounded-lg gap-10">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-gray-700 focus:outline-none"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="cursor-pointer"
                  >
                    {showPassword ? (
                      <FaEye className="text-gray-500 text-lg" />
                    ) : (
                      <FaEyeSlash className="text-gray-500 text-lg" />
                    )}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 flex items-center justify-between w-full">
                <label className="label text-[#667085]">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-white border-[#667085] text-black"
                  />
                  Remember me
                </label>
                <Link
                  to="/resetPassword"
                  className="text-[#667085] hover:underline pb-1"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="bg-[#60E5AE] rounded-lg text-[#1F1F1F] px-6 py-4 w-full cursor-pointer font-semibold hover:bg-[#4ddf9b] transition duration-300"
              >
                Login
              </button>
            </form>

            <div className="flex items-center justify-center mt-6 space-x-4 w-120 mx-auto">
              <div className="h-0.5 w-full bg-gray-400"></div>
              <p className="text-[#667085]">Or</p>
              <div className="h-0.5 w-full bg-gray-400"></div>
            </div>

            <p className="mt-10 text-[#667085] text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-black font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
