import React from "react";

export default function LoadBar() {
  return (
    <div>
      <div
        className="bg-gray-900 rounded h-6 mt-5"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="bg-blue-800 rounded h-6 text-center text-white text-sm transition"
          style={{ width: "100%" }}
          x-text="`${width}%`"
        >
          100
        </div>
      </div>
    </div>
  );
}
