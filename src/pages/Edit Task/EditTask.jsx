import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TasksContext } from "../../context/TasksContext";
import { IoCalendarOutline, IoCreateOutline } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import Main from "../../components/Main";
import congratulationsImg from "../../assets/images/Successfully Completed the Task Image.png";
import deleteImg from "../../assets/images/Task Delete Image.png";
import Confetti from "react-confetti";

const EditTask = () => {
  const { id } = useParams();
  const { tasks, addTask, updateTask, deleteTask } = useContext(TasksContext);
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
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
    if (id && tasks.length > 0) {
      const taskToEdit = tasks.find((task) => String(task.id) === id);

      if (taskToEdit) {
        setFormData({
          title: taskToEdit.title || "",
          description: taskToEdit.description || "",
          date: taskToEdit.date || "",
          status: taskToEdit.status || "Pending",
          category: taskToEdit.category || "Arts and Craft",
          image: taskToEdit.image || null,
        });
        setImagePreview(taskToEdit.image || null);
      } else {
        navigate("/dashboard");
      }
    }
  }, [id, tasks, navigate]);

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

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      const updatedTask = {
        ...tasks.find((task) => task.id === id),
        ...formData,
        id,
      };
      updateTask(updatedTask);

      if (formData.status === "Done") {
        setShowConfetti(true);
        document.getElementById("congratulations_modal").showModal();
      } else {
        navigate("/dashboard");
      }
    } else {
      addTask({ ...formData, id: Date.now().toString() });
      navigate("/dashboard");
    }
  };

  const handleDelete = () => {
    if (id) {
      deleteTask(id);
    }
    navigate("/dashboard");
  };

  const closeCongratulations = () => {
    setShowConfetti(false);
    navigate("/dashboard");
  };

  return (
    <div>
      <Main />
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.1}
        />
      )}
      <div className="h-[85%] lg:h-[70vh] absolute lg:top-[63%] lg:left-1/2 top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 p-6 bg-white rounded-3xl shadow-2xl py-12 overflow-y-auto">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex justify-between w-full items-center">
            <h2 className="text-2xl font-semibold text-black">
              {id ? "Edit Task" : "Create New Task"}
            </h2>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-20 py-3.5 bg-[#60E5AE] text-black rounded-lg font-medium hover:bg-[#4ddf9b] focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-200 cursor-pointer"
            >
              Back
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            {id && (
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="text-4xl">🎨</div>
                <div className="text-gray-600">
                  <h3 className="text-lg font-semibold">{formData.category}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        formData.status === "Pending"
                          ? "bg-[#FFA500]"
                          : formData.status === "Ongoing"
                          ? "bg-[#3B82F6]"
                          : formData.status === "Done"
                          ? "bg-[#10B981]"
                          : formData.status === "Collaborative Task"
                          ? "bg-[#8B5CF6]"
                          : "bg-[#E343E6]"
                      }`}
                    />
                    <span className="text-sm font-medium">
                      {formData.status}
                    </span>
                  </div>
                </div>
              </div>
            )}

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
                          setFormData((prev) => ({ ...prev, status: option }));
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
                          setFormData((prev) => ({
                            ...prev,
                            category: option,
                          }));
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
                onClick={() =>
                  document.getElementById("delete_modal").showModal()
                }
                className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 focus:ring-2 focus:ring-red-300 focus:outline-none transition duration-200 cursor-pointer"
              >
                <RiDeleteBinLine className="text-lg" />
                Delete Task
              </button>

              <button
                type="submit"
                className="w-full px-6 py-2.5 bg-[#60E5AE] hover:bg-[#4ddf9b] text-black rounded-lg font-medium focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-200 cursor-pointer"
              >
                Update Task
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box bg-white">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-col items-center justify-center gap-6">
            <div>
              <img src={deleteImg} alt="Delete Image" />
            </div>
            <h3 className="text-4xl font-semibold text-black">Are you sure?</h3>
            <h4 className="text-xl text-gray-600">
              Do you want to delete this task?
            </h4>
            <div className="flex items-center justify-center gap-6">
              <button
                className="px-6 py-2.5 bg-[#60E5AE] text-black rounded-lg font-medium hover:bg-[#4ddf9b] focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-200 cursor-pointer"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="px-6 py-2.5 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 focus:ring-2 focus:ring-red-300 focus:outline-none transition duration-200 cursor-pointer"
                onClick={() => document.getElementById("delete_modal").close()}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </dialog>

      {/* Congratulations Modal */}
      <dialog id="congratulations_modal" className="modal">
        <div className="modal-box bg-white">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeCongratulations}
            >
              ✕
            </button>
          </form>
          <div className="flex flex-col items-center justify-center gap-6">
            <div>
              <img src={congratulationsImg} alt="Congratulations Image" />
            </div>
            <h3 className="text-2xl font-semibold text-black">
              Successfully Completed the Task!
            </h3>
            <p className="text-lg text-gray-600">
              Congratulations! you have successfully completed the task.
            </p>
            <button
              className="px-6 py-2.5 bg-[#60E5AE] text-black rounded-lg font-medium hover:bg-[#4ddf9b] focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-200 cursor-pointer"
              onClick={closeCongratulations}
            >
              Ok
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditTask;
