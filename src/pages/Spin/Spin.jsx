import React, { useState, useRef } from "react";
import Main from "../../components/Main";

const Spin = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);

  const categories = [
    "Arts & Craft",
    "Nature",
    "Family",
    "Friends",
    "Sport",
    "Meditation",
  ];
  const segmentAngle = 360 / categories.length;

  const handleSpin = () => {
    if (isSpinning) return;

    const randomIndex = Math.floor(Math.random() * categories.length);
    const newRotation = 3600 + randomIndex * segmentAngle;
    setRotation(newRotation);
    setIsSpinning(true);

    setTimeout(() => {
      setSelectedCategory(categories[randomIndex]);
      setIsSpinning(false);
    }, 4000);
  };

  const getSegmentColor = (index) => {
    const colors = [
      "#14b8a6",
      "#3b82f6",
      "#f97316",
      "#e11d48",
      "#6366f1",
      "#10b981",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 font-sans overflow-hidden">
      <Main />
      <div className="h-[85%] lg:h-[80vh] absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 p-6 bg-white rounded-3xl shadow-2xl py-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Category Selector Wheel
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Wheel Container */}
              <div className="relative mx-auto w-full max-w-md">
                <div className="relative aspect-square w-full">
                  <svg
                    ref={wheelRef}
                    viewBox="0 0 100 100"
                    className="w-full h-full ease-out cursor-pointer hover:scale-[1.02] transition-all duration-300"
                    style={{ transform: `rotate(${rotation}deg)` }}
                    onClick={handleSpin}
                  >
                    <defs>
                      <filter
                        id="wheelShadow"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                      >
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                        <feOffset dx="0" dy="2" result="offsetblur" />
                        <feFlood floodColor="rgba(0,0,0,0.1)" />
                        <feComposite in2="offsetblur" operator="in" />
                        <feMerge>
                          <feMergeNode />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <linearGradient
                        id="goldGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#fcd34d" />
                        <stop offset="50%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>

                    {/* Wheel base */}
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="#f8fafc"
                      stroke="#e2e8f0"
                      strokeWidth="0.5"
                    />

                    {/* Segments */}
                    {categories.map((category, index) => {
                      const start = index * segmentAngle;
                      const end = (index + 1) * segmentAngle;
                      const largeArc = segmentAngle > 180 ? 1 : 0;

                      const x1 =
                        50 + 45 * Math.cos(((start - 90) * Math.PI) / 180);
                      const y1 =
                        50 + 45 * Math.sin(((start - 90) * Math.PI) / 180);
                      const x2 =
                        50 + 45 * Math.cos(((end - 90) * Math.PI) / 180);
                      const y2 =
                        50 + 45 * Math.sin(((end - 90) * Math.PI) / 180);

                      return (
                        <g key={index} filter="url(#wheelShadow)">
                          <path
                            d={`M50 50 L${x1} ${y1} A45 45 0 ${largeArc} 1 ${x2} ${y2} Z`}
                            fill={getSegmentColor(index)}
                            stroke="#fff"
                            strokeWidth="0.8"
                          />
                          <text
                            x="50"
                            y="50"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            transform={`rotate(${
                              start + segmentAngle / 2
                            } 50 50) translate(0 -32)`}
                            fontSize="3.2"
                            fill="#fff"
                            fontWeight="bold"
                            className="drop-shadow-md"
                          >
                            {category}
                          </text>
                        </g>
                      );
                    })}

                    {/* Center circle with gradient */}
                    <circle
                      cx="50"
                      cy="50"
                      r="8"
                      fill="url(#goldGradient)"
                      stroke="#d1d5db"
                      strokeWidth="0.5"
                    />
                    <circle cx="50" cy="50" r="3" fill="#fff" />
                  </svg>

                  {/* Pointer */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                    <div className="relative">
                      <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-b-[28px] border-l-transparent border-r-transparent border-b-slate-800 shadow-lg" />
                      <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full z-20" />
                    </div>
                  </div>

                  {/* Decorative rings */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[92%] h-[92%] rounded-full border-2 border-white/30 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full border border-white/20 pointer-events-none" />
                </div>

                <div className="text-center mt-6">
                  <button
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className={`px-8 py-3 rounded-full text-black font-medium transition-all duration-300 shadow-lg transform hover:scale-105 cursor-pointer ${
                      isSpinning
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#60E5AE] hover:bg-[#4ddf9b] hover:shadow-lg hover:shadow-[#60E5AE] hover:scale-[1.02]"
                    }`}
                  >
                    {isSpinning ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Spinning...
                      </span>
                    ) : (
                      "Spin Now"
                    )}
                  </button>
                </div>
              </div>

              {/* Controls Panel */}
              <div className="flex-1">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4">
                      Category Selection
                    </h2>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Manual Selection:
                      </label>
                      <select
                        value={selectedCategory || ""}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-slate-800 shadow-sm"
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <p className="text-sm font-medium text-slate-600 mb-1">
                        Current Selection
                      </p>
                      {isSpinning ? (
                        <div className="flex items-center text-slate-800">
                          <span className="h-2 w-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                          <span className="font-medium">Spinning...</span>
                        </div>
                      ) : selectedCategory ? (
                        <div className="flex items-center">
                          <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                          <span className="font-semibold text-slate-800">
                            {selectedCategory}
                          </span>
                        </div>
                      ) : (
                        <p className="text-slate-500 italic">
                          No category selected yet
                        </p>
                      )}
                    </div>
                  </div>

                  {selectedCategory && !isSpinning && (
                    <div>
                      <button className="w-full py-3 px-4 bg-[#60E5AE] hover:bg-[#4ddf9b] hover:shadow-lg hover:shadow-[#60E5AE] text-black font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center cursor-pointer">
                        Go To Task
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-6 bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <h3 className="text-lg font-medium text-slate-800 mb-3">
                    How it works
                  </h3>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                        1
                      </span>
                      <span>
                        Click "Spin Now" to randomly select a category
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                        2
                      </span>
                      <span>
                        Or manually select a category from the dropdown
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                        3
                      </span>
                      <span>View activities for your selected category</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spin;
