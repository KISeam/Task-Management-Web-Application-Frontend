import React from "react";
import headerImg from "../../assets/images/ResetPassword_Image.png";
import errorImg from "../../assets/images/404_Page_Image.png";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div className="bg-[#fafafa] min-h-screen">
        <div className="relative h-screen">
          <div
            className="h-30 lg:h-80 bg-cover bg-center"
            style={{
              backgroundImage: `url(${headerImg})`,
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="h-[85%] lg:h-[80vh] absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 p-6 bg-white rounded-3xl shadow-2xl py-12 overflow-y-auto">
            <div className="flex flex-col items-center justify-center gap-12">
              <div>
                <img src={errorImg} alt="Error Image" />
              </div>
              <div className="max-w-2xl">
                <Link
                  to="/"
                  className="block text-center bg-[#60E5AE] rounded-lg text-[#1F1F1F] px-6 py-4 w-full cursor-pointer font-semibold hover:bg-[#4ddf9b] transition duration-300"
                >
                  Back To Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
