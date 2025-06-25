import React, { useState } from "react";
import headerImg from "../../assets/images/ResetPassword_Image.png";
import clockImg from "../../assets/images/Reset Password Image.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !oldPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await api.post("/resetPassword", {
        email,
        oldPassword,
        newPassword,
      });

      setMessage(response.data.message || "Password reset successful.");

      navigate("/dashboard");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred while resetting the password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <div className="relative lg:h-screen overflow-hidden">
        <img src={headerImg} alt="Header" className="w-full" />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 p-6 bg-white rounded-3xl shadow-2xl py-12">
          <div className="flex items-center justify-center mb-12">
            <img src={clockImg} alt="Clock" />
          </div>

          <h1 className="text-4xl font-bold text-center mb-4 text-black">
            Reset Password
          </h1>
          <p className="text-center font-medium text-[#667085] mb-10 text-lg">
            Strong passwords include numbers, letters, and punctuation marks.
          </p>

          {message && (
            <p className="text-center text-red-500 font-medium mb-4">{message}</p>
          )}
          {loading && (
            <p className="text-center text-gray-500 font-medium mb-4">
              Resetting password...
            </p>
          )}

          <form
            className="flex flex-col items-center space-y-4 w-150 mx-auto"
            onSubmit={handleSubmit}
          >
            {/* Email */}
            <div className="space-y-2.5 w-full">
              <p className="text-start text-black font-semibold">Email Address</p>
              <input
                type="email"
                placeholder="abcd@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border border-gray-300 p-2.5 px-5 text-gray-700 w-full focus:outline-none"
              />
            </div>

            {/* Old Password */}
            <div className="space-y-2.5 w-full">
              <p className="text-start text-black font-semibold">Old Password</p>
              <div className="flex items-center justify-between p-2.5 px-5 border border-gray-300 rounded-lg">
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full text-gray-700 focus:outline-none"
                />
                <span
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="cursor-pointer"
                >
                  {showOldPassword ? (
                    <FaEye className="text-gray-500 text-lg" />
                  ) : (
                    <FaEyeSlash className="text-gray-500 text-lg" />
                  )}
                </span>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2.5 w-full">
              <p className="text-start text-black font-semibold">New Password</p>
              <div className="flex items-center justify-between p-2.5 px-5 border border-gray-300 rounded-lg">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full text-gray-700 focus:outline-none"
                />
                <span
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="cursor-pointer"
                >
                  {showNewPassword ? (
                    <FaEye className="text-gray-500 text-lg" />
                  ) : (
                    <FaEyeSlash className="text-gray-500 text-lg" />
                  )}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2.5 w-full">
              <p className="text-start text-black font-semibold">Confirm Password</p>
              <div className="flex items-center justify-between p-2.5 px-5 border border-gray-300 rounded-lg">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Retype Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full text-gray-700 focus:outline-none"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#60E5AE] rounded-lg text-[#1F1F1F] px-6 py-4 w-150 cursor-pointer font-semibold hover:bg-[#4ddf9b] transition duration-300"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
