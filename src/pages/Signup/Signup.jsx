import React, { useState } from "react";
import signupImg from "../../assets/images/Signup_Image.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../utils/axios";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Start loading

    // Validate email and password
    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    if (password.length > 20) {
      setError("Password must not exceed 20 characters.");
      setLoading(false);
      return;
    }
    if (!/^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|-]+$/.test(password)) {
      setError(
        "Password can only contain letters, numbers, and special characters."
      );
      setLoading(false);
      return;
    }
    if (password.includes(" ")) {
      setError("Password cannot contain spaces.");
      setLoading(false);
      return;
    }
    if (password === email) {
      setError("Password cannot be the same as your email.");
      setLoading(false);
      return;
    }
    if (password === "password") {
      setError(
        "Password cannot be 'password'. Please choose a stronger password."
      );
      setLoading(false);
      return;
    }
    if (password === "qwerty") {
      setError(
        "Password cannot be 'qwerty'. Please choose a stronger password."
      );
      setLoading(false);
      return;
    }
    if (password === "letmein") {
      setError(
        "Password cannot be 'letmein'. Please choose a stronger password."
      );
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/register", {
        name: fullName,
        email,
        password,
      });

      setLoading(false);
      navigate("/login");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Something went wrong";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fafafa]">
      <div className="flex items-center justify-center lg:h-screen overflow-hidden">
        <div className="lg:w-1/2 w-full h-full hidden lg:block">
          <img
            src={signupImg}
            alt="Sign up Image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="lg:w-1/2 w-full py-30 lg:py-0">
          <div>
            <h1 className="text-4xl font-bold text-center mb-4 text-black">
              Sign Up
            </h1>
            <p className="text-center font-medium text-[#667085] mb-6">
              To Create Account, Please Fill in the Form Below.
            </p>

            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center space-y-4 md:w-150 mx-auto"
            >
              <div className="space-y-2.5 w-full">
                <p className="text-start text-black font-semibold">Full Name</p>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="rounded-lg border border-gray-300 p-2.5 px-5 text-gray-700 w-full focus:outline-none"
                />
              </div>

              <div className="space-y-2.5 w-full">
                <p className="text-start text-black font-semibold">
                  Email Address
                </p>
                <input
                  type="email"
                  placeholder="abcd@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border border-gray-300 p-2.5 px-5 text-gray-700 w-full focus:outline-none"
                />
              </div>

              <div className="space-y-2.5 w-full">
                <p className="text-start text-black font-semibold">Password</p>
                <div className="flex items-center justify-between p-2.5 px-5 border border-gray-300 rounded-lg">
                  <input
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

              <div className="space-y-2.5 w-full">
                <p className="text-start text-black font-semibold">
                  Confirm Password
                </p>
                <div className="flex items-center justify-between p-2.5 px-5 border border-gray-300 rounded-lg">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Retype password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full text-gray-700 focus:outline-none"
                  />
                  <span
                    onClick={toggleConfirmPasswordVisibility}
                    className="cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <FaEye className="text-gray-500 text-lg" />
                    ) : (
                      <FaEyeSlash className="text-gray-500 text-lg" />
                    )}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`bg-[#60E5AE] rounded-lg text-[#1F1F1F] px-6 py-4 md:w-150 cursor-pointer font-semibold transition duration-300 ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-[#4ddf9b]"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing Up...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <div className="flex items-center justify-center mt-6 space-x-4 w-120 mx-auto">
              <div className="h-0.5 w-full bg-gray-400"></div>
              <p className="text-[#667085]">Or</p>
              <div className="h-0.5 w-full bg-gray-400"></div>
            </div>

            <p className="mt-10 text-[#667085] text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-black font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
