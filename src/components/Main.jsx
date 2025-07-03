import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { TasksContext } from "../context/TasksContext";
import headerImg from "../assets/images/ResetPassword_Image.png";
import logoImg from "../assets/images/logo.png";
import { LuNotepadText } from "react-icons/lu";
import { PiSpinnerBallDuotone } from "react-icons/pi";
import api from "../utils/axios";

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tokens, clearToken, clearAllTokens } = useContext(TasksContext);
  const [users, setUsers] = useState([]); // Change user to users array
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data when tokens change
  useEffect(() => {
    const fetchUserData = async () => {
      if (!tokens.length) {
        console.log("No tokens found, clearing user data");
        setUsers([]);
        localStorage.removeItem("users");
        return;
      }

      setIsLoading(true);
      setError(null);

      const storedUsers = localStorage.getItem("users");
      if (storedUsers && storedUsers !== "undefined") {
        try {
          const parsedUsers = JSON.parse(storedUsers);
          if (Array.isArray(parsedUsers)) {
            setUsers(parsedUsers);
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.error("Invalid JSON in localStorage:", err);
          localStorage.removeItem("users");
        }
      }

      try {
        const response = await api.get("/user", {
          headers: {
            Authorization: `Bearer ${tokens[0]}`,
          },
        });

        if (response.data && response.data.user) {
          const userArray = [
            { name: response.data.user.name, email: response.data.user.email },
          ];
          setUsers(userArray);
          localStorage.setItem("users", JSON.stringify(userArray));
        } else {
          throw new Error("Invalid user data from server");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user data");
        setUsers([]);
        localStorage.removeItem("users");
        clearAllTokens();
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [tokens, clearAllTokens, navigate]);

  const handleLogout = async () => {
    try {
      // Call backend logout API to clear session
      await api.post("/logout", null, {
        headers: {
          Authorization: `Bearer ${tokens[0]}`, // Send token for authorization if required
        },
      });

      // Clear frontend data
      clearAllTokens();
      localStorage.removeItem("user");
      localStorage.removeItem("users");
      setUsers([]);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      // Optionally, handle errors, e.g., show a message to the user
    }
  };

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <div className="relative h-screen">
        <div
          className="h-44 lg:h-80 bg-cover bg-center"
          style={{
            backgroundImage: `url(${headerImg})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="md:w-11/12 mx-auto">
            <div className="navbar py-8">
              <div className="navbar-start">
                {/* Mobile Hamburger */}
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost md:hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  </div>
                  <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                      <div className="text-base flex items-center gap-2">
                        <LuNotepadText />
                        <p>Task list</p>
                      </div>
                    </li>
                    {/* <li>
                      <div className="text-base flex items-center gap-2">
                        <PiSpinnerBallDuotone />
                        <p>Spin</p>
                      </div>
                    </li> */}
                  </ul>
                </div>

                {/* Logo */}
                <div className="w-28 lg:w-36">
                  <Link to="/" className="flex items-center justify-center">
                    <img src={logoImg} alt="Logo" className="w-full h-full" />
                  </Link>
                </div>
              </div>

              {/* Desktop Nav */}
              <div className="navbar-center hidden md:flex">
                <div className="flex items-center gap-6">
                  <Link
                    to="/dashboard"
                    className={`text-lg flex items-center gap-2 transition duration-300 ${
                      location.pathname === "/dashboard"
                        ? "text-[#60E5AE]"
                        : "hover:text-[#60E5AE]"
                    }`}
                  >
                    <LuNotepadText />
                    <p className="text-lg">Task list</p>
                  </Link>
                  {/* <Link
                    to="/spin"
                    className={`text-lg flex items-center gap-2 transition duration-300 ${
                      location.pathname === "/spin"
                        ? "text-[#60E5AE]"
                        : "hover:text-[#60E5AE]"
                    }`}
                  >
                    <PiSpinnerBallDuotone />
                    <p className="text-lg">Spin</p>
                  </Link> */}
                </div>
              </div>

              {/* User / Login */}
              <div className="navbar-end">
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : users.length > 0 ? (
                  <div className="dropdown dropdown-end">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <div className="rounded-full w-14 h-14 overflow-hidden">
                        <img
                          alt="User Avatar"
                          src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label
                        tabIndex={0}
                        className="btn bg-transparent border-0 hover:bg-transparent shadow-none"
                      >
                        <p className="text-base font-medium text-nowrap">
                          {users[0].name} {/* Display first user's name */}
                        </p>
                      </label>
                    </div>
                    <div className="dropdown-content mt-3 p-2 shadow bg-white text-black rounded-box w-52">
                      <ul className="menu menu-sm w-full">
                        <li>
                          <button
                            onClick={handleLogout}
                            className="text-base text-left"
                          >
                            Logout
                          </button>
                        </li>
                        <li>
                          <Link to="/resetPassword" className="text-base">
                            Reset Password
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="btn bg-[#60E5AE] hover:bg-[#4ed8a0] text-black font-semibold px-5 py-2 rounded"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>

            {/* Welcome Message */}
            <div className="w-11/12 mx-auto md:w-full hidden lg:block">
              <div className="mt-8">
                <p className="text-lg md:text-2xl font-semibold text-[#60E5AE] mb-3">
                  {isLoading
                    ? "Loading..."
                    : users.length > 0
                    ? `Hi ${users[0].name}`
                    : "Welcome!"}
                </p>
                <h1 className="text-2xl md:text-5xl font-semibold text-white">
                  Welcome to Your Dashboard
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
