import React, { useContext, useEffect, useRef, useState } from "react";
import Main from "../../components/Main";
import { TasksContext } from "../../context/TasksContext";
import { useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { MdNoteAdd } from "react-icons/md";
import taskListImg from "../../assets/images/TaskList_Image.png";

const Home = () => {
  const navigate = useNavigate();
  const { tasks } = useContext(TasksContext);
  const [selectedStatus, setSelectedStatus] = useState("All Task");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const categoryRef = useRef();
  const statusRef = useRef();

  const statusOptions = [
    "All Task",
    "Ongoing",
    "Pending",
    "Collaborative Task",
    "Done",
  ];

  const categoryOptions = [
    "All Categories",
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
        setCategoryOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setStatusOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      selectedStatus === "All Task" || task.status === selectedStatus;
    const categoryMatch =
      selectedCategory === "All Categories" ||
      task.category === selectedCategory;
    return statusMatch && categoryMatch;
  });

  return (
    <>
      <div>
        <div>
          <Main />
          <div className="h-[85%] lg:h-[80vh] absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 p-6 bg-white rounded-3xl shadow-2xl py-12 overflow-y-auto">
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="flex flex-wrap justify-between items-center gap-6 w-full">
                <h2 className="text-black text-2xl font-semibold">
                  All Task List
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <div className="relative" ref={categoryRef}>
                    <div
                      className="flex items-center justify-between border border-gray-300 rounded-lg p-2.5 cursor-pointer min-w-[200px]"
                      onClick={() => setCategoryOpen(!categoryOpen)}
                    >
                      <input
                        type="text"
                        readOnly
                        value={selectedCategory}
                        className="w-full focus:outline-none text-gray-700 cursor-pointer"
                      />
                      <FiChevronDown className="text-gray-600 ml-2" />
                    </div>
                    {categoryOpen && (
                      <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg z-10 w-full">
                        {categoryOptions.map((option, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setSelectedCategory(option);
                              setCategoryOpen(false);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative" ref={statusRef}>
                    <div
                      className="flex items-center justify-between border border-gray-300 rounded-lg p-2.5 cursor-pointer min-w-[160px]"
                      onClick={() => setStatusOpen(!statusOpen)}
                    >
                      <input
                        type="text"
                        readOnly
                        value={selectedStatus}
                        className="w-full focus:outline-none text-gray-700 cursor-pointer"
                      />
                      <FiChevronDown className="text-gray-600 ml-2" />
                    </div>
                    {statusOpen && (
                      <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg z-10 w-full">
                        {statusOptions.map((option, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setSelectedStatus(option);
                              setStatusOpen(false);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className="flex items-center justify-center gap-2 bg-[#60E5AE] rounded-lg text-[#1F1F1F] px-6 py-4 cursor-pointer font-semibold hover:bg-[#4ddf9b] transition duration-300"
                    onClick={() => navigate("/addTask")}
                  >
                    <MdNoteAdd />
                    <p>Add New Task</p>
                  </div>
                </div>
              </div>
              <div className="col-span-full flex items-center justify-center flex-col gap-4">
                <img src={taskListImg} alt="No Task Image" />
                <p className="text-center py-10 text-black text-lg font-semibold">
                  No Task is Available yet, Please Add your New Task
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
