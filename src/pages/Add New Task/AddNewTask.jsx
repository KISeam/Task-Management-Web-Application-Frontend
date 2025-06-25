import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TasksContext } from "../../context/TasksContext";
import { IoCalendarOutline } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import Main from "../../components/Main";

const AddNewTask = () => {
  const { addTask } = useContext(TasksContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    status: "Pending",
    category: "Arts and Craft",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const categoryRef = useRef();
  const statusRef = useRef();

  const statusOptions = ["Pending", "Ongoing", "Done", "Collaborative Task"];
  const categoryOptions = [
    "Arts and Craft",
    "Nature",
    "Family",
    "Sport",
    "Friends",
    "Meditation",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setIsStatusOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ ...formData, id: Date.now().toString() });
    navigate("/dashboard");
  };

  return (
    <div>
      <Main />
      <div className="h-[85%] lg:h-[70vh] absolute lg:top-[63%] lg:left-1/2 top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 p-6 bg-white rounded-3xl shadow-2xl py-12 overflow-y-auto">
        <div className="flex flex-col items-center justify-center gap-6">
          <h2 className="text-2xl font-semibold text-black text-center">
            Create New Task
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Task Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600 transition duration-200"
                placeholder="Enter task title"
                required
                aria-required="true"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600 transition duration-200 resize-none"
                placeholder="Enter task description"
                rows="4"
                required
                aria-required="true"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <div className="relative">
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600 transition duration-200 appearance-none"
                  required
                  aria-required="true"
                />
                <IoCalendarOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative" ref={statusRef}>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <div
                  id="status"
                  className="flex items-center justify-between px-2.5 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-200"
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                  role="combobox"
                  aria-expanded={isStatusOpen}
                  aria-controls="status-options"
                >
                  <span className="text-gray-700">{formData.status}</span>
                  <FiChevronDown
                    className={`text-gray-600 transition-transform duration-200 ${
                      isStatusOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {isStatusOpen && (
                  <div
                    id="status-options"
                    className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto w-full"
                  >
                    {statusOptions.map((option, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-700 transition duration-150"
                        onClick={() => {
                          setFormData({ ...formData, status: option });
                          setIsStatusOpen(false);
                        }}
                        role="option"
                        aria-selected={formData.status === option}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative" ref={categoryRef}>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <div
                  id="category"
                  className="flex items-center justify-between px-2.5 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-200"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  role="combobox"
                  aria-expanded={isCategoryOpen}
                  aria-controls="category-options"
                >
                  <span className="text-gray-700">{formData.category}</span>
                  <FiChevronDown
                    className={`text-gray-600 transition-transform duration-200 ${
                      isCategoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {isCategoryOpen && (
                  <div
                    id="category-options"
                    className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto w-full"
                  >
                    {categoryOptions.map((option, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-700 transition duration-150"
                        onClick={() => {
                          setFormData({ ...formData, category: option });
                          setIsCategoryOpen(false);
                        }}
                        role="option"
                        aria-selected={formData.category === option}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Upload Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-600 hover:bg-green-50 transition duration-200"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Task preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4">
                      <svg
                        className="w-10 h-10 mb-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      <p className="mb-1 text-sm font-medium text-gray-600">
                        Drop your image here, or{" "}
                        <span className="text-green-600">click to browse</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, or JPEG (Max 5MB)
                      </p>
                    </div>
                  )}
                  <input
                    id="image"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                    aria-describedby="image-help"
                  />
                </label>
              </div>
              <p id="image-help" className="mt-2 text-xs text-gray-500">
                Upload an image to associate with your task (optional).
              </p>
            </div>

            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none transition duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-2.5 bg-[#60E5AE] text-black rounded-lg font-medium hover:bg-[#4ddf9b] focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-200 cursor-pointer"
              >
                Save Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewTask;
