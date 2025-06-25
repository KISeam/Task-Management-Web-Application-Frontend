import React from "react";
import { Link } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import deleteImg from "../assets/images/Task Delete Image.png";

const TaskListCard = ({
  id,
  cardImg,
  title,
  description,
  date,
  status,
  onDelete = () => {},
}) => {
  const getStatusColor = () => {
    const normalizedStatus = status?.toLowerCase() || "";

    if (normalizedStatus.includes("pending"))
      return "bg-[#FFA500] text-[#FFA500]";
    if (normalizedStatus.includes("ongoing"))
      return "bg-[#3B82F6] text-[#3B82F6]";
    if (normalizedStatus.includes("done")) return "bg-[#10B981] text-[#10B981]";
    if (normalizedStatus.includes("collaborative"))
      return "bg-[#8B5CF6] text-[#8B5CF6]";

    return "bg-[#E343E6] text-[#E343E6]";
  };

  const statusColors = getStatusColor();
  const [bgColor, textColor] = statusColors.split(" ");

  // Generate unique modal ID based on task ID
  const modalId = `delete_modal_${id}`;

  const handleDelete = (e) => {
    e.stopPropagation();
    document.getElementById(modalId).showModal();
  };

  const confirmDelete = (e) => {
    e.stopPropagation();
    onDelete(id);
    document.getElementById(modalId).close();
  };

  return (
    <div className="border border-gray-300 rounded-2xl py-5 px-6 flex flex-col gap-6 hover:shadow-md transition-shadow">
      <div className="relative flex gap-3.5 w-full">
        {cardImg ? (
          <img
            src={cardImg}
            alt={title || "Task image"}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16 flex items-center justify-center text-gray-400 text-xs text-center p-2">
            No Image
          </div>
        )}

        <div className="flex flex-col flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-black truncate">
            {title || "Untitled Task"}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2 break-words">
            {description || "No description provided"}
          </p>
        </div>

        <div className="absolute top-0 right-0 flex items-center gap-2">
          <Link
            to={`/addTask/${id}`}
            className="text-2xl text-gray-600 hover:text-blue-600 cursor-pointer transition duration-300"
            aria-label="Edit task"
          >
            <CiEdit />
          </Link>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="text-xl text-red-600 hover:text-red-700 cursor-pointer transition duration-300"
            aria-label="Delete task"
          >
            <RiDeleteBinLine />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 w-full">
        <div className="flex items-center gap-2 text-black">
          <IoCalendarOutline />
          <p className="text-sm">{date || "No date specified"}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${bgColor}`} />
          <p className={`text-sm font-medium ${textColor}`}>
            {status || "No status"}
          </p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <dialog id={modalId} className="modal">
        <div className="modal-box bg-white">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById(modalId).close();
              }}
            >
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
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="px-6 py-2.5 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 focus:ring-2 focus:ring-red-300 focus:outline-none transition duration-200 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById(modalId).close();
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TaskListCard;
